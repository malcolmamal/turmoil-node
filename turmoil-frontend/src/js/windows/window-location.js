import Svg from '../core/turmoil-svg';
import Animations from '../core/turmoil-animations';
import Logger from '../utils/logger';
import Consts from '../core/turmoil-consts';
import Permissions from '../core/turmoil-permissions';
import { onPolygonAction } from '../api/services/instance-service';

const WindowLocation = {
  async actionOnPolygon(polygonId, callbacks) {
    const polygon = document.querySelector(`#${polygonId}`);

    if (!polygon) {
      window.turmoil.logDebug('Wrong polygon parameter', polygon, callbacks);

      return;
    }

    const response = await onPolygonAction(polygon.getAttribute('id'));
    WindowLocation.finalizeActionsOnPolygon(response.data, callbacks);
  },
  actionOnUnit(unitId, callbacks) {
    const unit = document.querySelector(`#${unitId}`);

    return WindowLocation.actionOnPolygon(
      unit.dataset.previousPolygonId,
      callbacks,
    );
  },
  finalizeActionsOnPolygon(data, callbackFunctions) {
    WindowLocation.inactivatePolygons();

    data.actions.forEach((action, index, thisArray) => {
      setTimeout(() => {
        WindowLocation.finalizeActionOnPolygon(action, callbackFunctions);
      }, window.turmoil.settings.delayBetweenActions * index);

      if (Object.is(thisArray.length - 1, index)) {
        setTimeout(() => {
          WindowLocation.inactivateUnits();
          Permissions.enableActions();
        }, window.turmoil.settings.delayBetweenActions * index + window.turmoil.settings.delayBetweenActions / 2);
      }
    });
  },
  finalizeActionOnPolygon(data, callbackFunctions) {
    if (data != null && data.success === false) {
      window.turmoil.logErrors(data.message);
    } else if (data != null && data.success === true && data.polygonId) {
      if (data.unit && data.unit.polygonsInRange) {
        window.turmoil.instance.polygonsInRange = data.unit.polygonsInRange;
      }

      const polygon = document.querySelector(`#${data.polygonId}`);
      if (polygon && data.actionType) {
        if (data.actionType === 'attack') {
          if (!data.attackingUnit) {
            window.turmoil.logErrors('Attack action failed');
          }
          WindowLocation.handleAttackPolygon(
            polygon,
            document.querySelector(`#${data.attackingUnit}`),
            data,
          );
        } else if (data.actionType === 'move') {
          if (!data.unitToMove) {
            window.turmoil.logErrors('Move action failed');
          }
          WindowLocation.handleMoveToPolygon(
            data.polygonId,
            data.unitToMove,
            callbackFunctions,
            data,
          );
        }
      }

      if (data.unitToAdd) {
        if (
          callbackFunctions &&
          typeof callbackFunctions.removeEnemyUnit === 'function'
        ) {
          callbackFunctions.removeEnemyUnit(data.unitToRemove);
        }

        if (
          callbackFunctions &&
          typeof callbackFunctions.addEnemyUnit === 'function'
        ) {
          callbackFunctions.addEnemyUnit(data.unitToAdd);

          WindowLocation.handleMoveToPolygon(
            data.unitToAdd.position,
            data.unitToAdd.ident,
            callbackFunctions,
          );
        }
      }

      if (data.itemForStash) {
        if (
          callbackFunctions &&
          typeof callbackFunctions.updateItems === 'function'
        ) {
          callbackFunctions.updateItems(data.itemForStash);
        }
      }
    }
  },
  getOffset(element) {
    const rect = element.getBoundingClientRect();
    const { defaultView } = element.ownerDocument;

    return {
      top: rect.top + defaultView.pageYOffset,
      left: rect.left + defaultView.pageXOffset,
    };
  },
  handleMoveToPolygon(polygonId, unitId, callbackFunctions, data) {
    WindowLocation.inactivateUnits();

    const polygon = document.querySelector(`#${polygonId}`);
    const unit = document.querySelector(`#${unitId}`);

    if (!unit) {
      Logger.log('Unit not found, perhaps it was just killed?');
      return;
    }

    if (!polygon) {
      Logger.log('Polygon undefined');
      return;
    }

    if (unit.dataset.previousPolygonId) {
      const previousPolygon = document.querySelector(
        `#${unit.dataset.previousPolygonId}`,
      );

      Svg.addClass(previousPolygon, 'instancePolygon');
      if (unit.classList.contains('enemyUnit')) {
        Svg.removeClass(previousPolygon, 'instancePolygonEnemy');
      } else {
        Svg.removeClass(previousPolygon, 'instancePolygonActive');
      }
      previousPolygon.dataset.unit = '';
    }

    const offsetContainer = WindowLocation.getOffset(
      document.querySelector('#locationContainer'),
    );
    const offset = WindowLocation.getOffset(polygon);

    const centerX = offset.left - offsetContainer.left + 18;
    const centerY = offset.top - offsetContainer.top + 19;

    Animations.moveUnit(
      unit,
      polygon,
      centerX,
      centerY,
      callbackFunctions,
      data,
    );

    unit.setAttribute('data-previous-polygon-id', polygon.getAttribute('id'));
    polygon.setAttribute('data-unit', unit.getAttribute('id'));
  },
  handleAttackPolygon(polygon, unit, data) {
    // TODO: make sure that it is not possible to do actions when enemy is doing stuff
    WindowLocation.markUnitAsActive(unit);

    const targetUnit = document.querySelector(`#${polygon.dataset.unit}`);

    let damageDealt = 0;
    if (data.damageDealt) {
      let hitType = null;
      if (data.type) {
        hitType = data.type;
      }

      damageDealt = data.damageDealt;
      Animations.addDamageIndicator(targetUnit, damageDealt, hitType);
    }
    window.turmoil.logCombat(
      `Unit ${unit.getAttribute('id')} attacks unit ${
        polygon.dataset.unit
      } on ${polygon.getAttribute('id')} dealing ${damageDealt} damage`,
    );

    if (data.healthBar) {
      document.querySelector(
        `#${polygon.dataset.unit}Health`,
      ).style.width = `${data.healthBar}px`;
    }

    Animations.attackSwing(targetUnit.getAttribute('id'));
  },
  markUnitAsActive(unit) {
    if (unit.classList.contains('enemyUnit')) {
      WindowLocation.inactivateUnits();

      const polygon = document.querySelector(
        `#${unit.dataset.previousPolygonId}`,
      );
      Svg.replaceClass(
        polygon,
        'instancePolygonEnemyActive',
        'instancePolygonEnemy',
      );
    }
  },
  inactivateUnits() {
    document
      .querySelectorAll('.instancePolygonEnemyActive')
      .forEach((element) => {
        Svg.replaceClass(
          element,
          'instancePolygonEnemy',
          'instancePolygonEnemyActive',
        );
      });
  },
  setActivePolygons() {
    window.turmoil.instance.polygonsInRange.forEach((element) => {
      const polygon = document.querySelector(`#${element}`);
      if (polygon.classList.contains('instancePolygon')) {
        Svg.replaceClass(polygon, 'instancePolygonInRange', 'instancePolygon');
      }
    });
  },
  inactivatePolygons() {
    document.querySelectorAll('.instancePolygonInRange').forEach((element) => {
      Svg.replaceClass(element, 'instancePolygon', 'instancePolygonInRange');
    });
  },
  setAttackType(item) {
    if (item.slot !== 'slot_right_hand') {
      return;
    }

    const root = document.querySelector(':root');
    const rootStyles = getComputedStyle(root);

    if (item.itemSpecificType === 'BOW') {
      root.style.setProperty(
        '--cursor-current',
        rootStyles.getPropertyValue('--cursor-bow'),
      );
      window.turmoil.instance.attackType = Consts.ATTACK_TYPE_BOW;
    } else {
      root.style.setProperty(
        '--cursor-current',
        rootStyles.getPropertyValue('--cursor-melee'),
      );
      window.turmoil.instance.attackType = Consts.ATTACK_TYPE_MELEE;
    }
  },
  setEquipmentBackground(gender) {
    const root = document.querySelector(':root');
    const rootStyles = getComputedStyle(root);

    if (gender === 'female') {
      root.style.setProperty(
        '--equipment-background-current',
        rootStyles.getPropertyValue('--equipment-background-female'),
      );
    } else {
      root.style.setProperty(
        '--equipment-background-current',
        rootStyles.getPropertyValue('--equipment-background-male'),
      );
    }
  },
};

export default WindowLocation;
