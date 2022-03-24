import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Window from '../../Window';
import Field from './Field';
import FriendlyUnit from './FriendlyUnit';
import EnemyUnit from './EnemyUnit';
import ReduxActions from '../../../js/redux/actions';
import WindowLocation from '../../../js/windows/window-location';
import '../../../stylesheets/window-location.css';
import Logger from '../../../js/utils/logger';
import { initializeEnemyUnitsAction, initializeFriendlyUnitsAction } from '../../../js/api/services/instance-service';
import useAfterPaintEffect from '../../../js/react/hooks/after-paint-effect';

function Location() {
  const enemyUnits = useSelector((state) => state.enemyUnits);
  const friendlyUnits = useSelector((state) => state.friendlyUnits);
  const locationFields = useSelector((state) => state.locationFields);

  const dispatch = useDispatch();

  useAfterPaintEffect(async () => {
    const updateEnemyUnits = (units) => {
      dispatch(ReduxActions.updateEnemyUnitsAction(units));
    };

    const updateFriendlyUnits = (units) => {
      dispatch(ReduxActions.updateFriendlyUnitsAction(units));
    };

    let response = await initializeEnemyUnitsAction();
    updateEnemyUnits(response.data);

    response = await initializeFriendlyUnitsAction();
    updateFriendlyUnits(response.data);

    if (window.debug) {
      Logger.log('Location initialized...');
    }
  }, []);

  useAfterPaintEffect(() => {
    if (friendlyUnits[0]) {
      const friendlyUnit = friendlyUnits[0];
      WindowLocation.setEquipmentBackground(friendlyUnit.gender);

      window.turmoil.instance.activeUnit = friendlyUnit.ident;
      window.turmoil.instance.polygonsInRange = friendlyUnit.polygonsInRange;
      WindowLocation.setActivePolygons();
    }
  });

  const updateUnit = (unit) => {
    if (unit.ident.includes('Enemy')) {
      dispatch(ReduxActions.updateEnemyUnitsAction({ unitToUpdate: unit }));
    } else {
      dispatch(ReduxActions.updateFriendlyUnitsAction({ unitToUpdate: unit }));
    }
  };

  const finalizeActionOnField = (data) => {
    if (data && data.actionType === 'move') {
      let unit = friendlyUnits.find((friendlyUnit) => friendlyUnit.ident === data.unitId);

      if (!unit) {
        unit = enemyUnits.find((enemyUnit) => enemyUnit.ident === data.unitId);
      }

      if (unit) {
        unit.position = data.polygonId;
        if (data.polygonsInRange) {
          unit.polygonsInRange = data.polygonsInRange;
        }

        updateUnit(unit);
      }
    }
  };

  const background = {
    backgroundImage: "url('/images/backgrounds/background_grunge_650x550.png')",
    backgroundSize: 'cover',
    width: '850px',
    height: '780px',
  };

  /*
   * TODO: this needs to come from back end at some point
   */

  const fields = [];
  for (let i = 1; i < 11; i += 1) {
    for (let j = 1; j < 9; j += 1) {
      fields.push({ column: i, row: j });
    }
  }

  return (
    <Window ident="location" background={background}>
      {friendlyUnits.map((unit) => (
        <FriendlyUnit
          ident={unit.ident}
          portrait={unit.portrait}
          healthBar={unit.healthBar}
          position={unit.position}
          key={unit.ident}
          movement={unit.movementPoints}
        />
      ))}

      {enemyUnits.map((unit) => (
        <EnemyUnit
          ident={unit.ident}
          portrait={unit.portrait}
          healthBar={unit.healthBar}
          position={unit.position}
          key={unit.ident}
          movement={unit.movementPoints}
          locationCallbackAction={finalizeActionOnField}
        />
      ))}

      <div className="instanceSvg">
        <svg
          style={{
            width: '160px', height: '160px', left: '320', top: '320', position: 'relative', transform: 'scale(5)',
          }}
          id="svgElement"
        >
          <g>
            {fields.map((field) => {
              const fieldIdent = `polygon-${field.column}-${field.row}`;
              let unit = friendlyUnits.find((friendlyUnit) => friendlyUnit.position === fieldIdent);

              if (!unit) {
                unit = enemyUnits.find((enemyUnit) => enemyUnit.position === fieldIdent);
              }

              return <Field column={field.column} row={field.row} key={fieldIdent} unit={unit} locationCallbackAction={finalizeActionOnField} />;
            })}
          </g>
        </svg>
      </div>
    </Window>
  );
}

export default connect()(Location);
