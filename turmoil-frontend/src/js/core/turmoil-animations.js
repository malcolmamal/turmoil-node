import jQuery from 'jquery';
import Utils from './turmoil-utils';
import Sound from './turmoil-sound';
import Svg from './turmoil-svg';
import Consts from './turmoil-consts';

const Animations = {
  animateToTop(id) {
    const element = jQuery(`#${id}`);
    if (element.length > 0) {
      let direction = 1;
      if (element.data('direction') === 2) {
        direction = -1;
      }
      element.css('top', '-=2px');
      if (direction !== 0) {
        element.css('left', `-=${element.data('variable')}px`);
        if (element.data('variable') > 5) {
          element.data('variable', element.data('variable') + 0.05 * direction);
        } else {
          element.data('variable', element.data('variable') + 0.1 * direction);
        }
      }
      setTimeout(
        () => {
          Animations.animateToTop(id);
        },
        25,
      );
    }
  },
  animateIndicator(id) {
    const element = jQuery(`#${id}`);
    element.data('variable', 0);
    element.data('direction', Utils.randomInt(2));
    this.animateToTop(id);
    element.fadeTo(2000, 0.0, () => {
      element.remove();
    });
  },
  blink(element) {
    jQuery(element).fadeTo(1000, 0.4, function increase() {
      jQuery(this).fadeTo(750, 0.9, function decrease() {
        Animations.blink(this);
      });
    });
  },
  addDamageIndicator(unit, value, type) {
    const ident = `indicator_${new Date().getTime()}`;
    let styleClass = 'damageIndicator';

    if (typeof (type) !== 'undefined') {
      styleClass += ' ';
      switch (type) {
        case 'critical': {
          styleClass += 'damageIndicatorCritical';
          break;
        }
        case 'devastate': {
          styleClass += 'damageIndicatorDevastate';
          break;
        }
        case 'healing': {
          styleClass += 'damageIndicatorHealing';
          break;
        }
        default:
      }
    }

    const damageIndicator = `<div id="${ident}" class="${styleClass}">${value}</div>`;
    unit.prepend(damageIndicator);
    Animations.animateIndicator(ident);
  },
  attackSwing(unitId) {
    const effect = jQuery(`#${unitId}Effect`);

    // TODO: check attack type per attacking unit
    const targetUnit = jQuery(`#${unitId}`);

    if (window.turmoil.instance.attackType === Consts.ATTACK_TYPE_BOW && targetUnit.hasClass('enemyUnit')) {
      effect.addClass('attackArrow');
      Sound.playAudio(`soundAttackBow${Utils.randomInt(3)}`);

      setTimeout(
        () => {
          effect.removeClass('attackArrow');
        },
        500,
      );
    } else {
      effect.addClass('attackSwing');
      Sound.playAudio(`soundAttackMelee${Utils.randomInt(3)}`);

      setTimeout(
        () => {
          effect.removeClass('attackSwing');
        },
        500,
      );
    }
  },
  moveUnit(unit, polygon, positionX, positionY) {
    Sound.playAudioLoop('soundMoveLeather', unit.attr('id'));

    unit.stop().animate(
      {
        left: positionX,
        top: positionY,
      },
      250,
      () => {
        if (unit.hasClass('enemyUnit')) {
          Svg.addClass(polygon, 'instancePolygonEnemy');
        } else {
          Svg.addClass(polygon, 'instancePolygonActive');
        }
        Svg.removeClass(polygon, 'instancePolygon');
        Sound.stopAudioLoop('soundMoveLeather', unit.attr('id'));

        if (window.turmoil.instance.activeUnit === unit.attr('id')) {
          Animations.blink(`#${unit.attr('id')}`);
        }
      },
    );
  },
};

export default Animations;
