import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import jQuery from 'jquery';
import Window from '../../Window';
import Field from './Field';
import FriendlyUnit from './FriendlyUnit';
import EnemyUnit from './EnemyUnit';
import ReduxActions from '../../../js/redux/actions';
import WindowLocation from '../../../js/windows/window-location';
import '../../../stylesheets/window-location.css';
import Logger from '../../../js/utils/logger';
import Fetch from '../../../js/core/turmoil-fetch';
import Windows from '../../../js/core/turmoil-windows';

function Location() {
  const stateData = useSelector((state) => state);
  const dispatch = useDispatch();

  const { enemyUnits, friendlyUnits } = stateData;

  useEffect(() => {
    jQuery('#window_location').disableSelection();

    jQuery('.instancePolygon').click(function onClickAction() {
      WindowLocation.actionOnPolygon(this);
    });

    const updateEnemyUnits = (units) => {
      dispatch(ReduxActions.updateEnemyUnitsAction(units));
    };

    const updateFriendlyUnits = (units) => {
      dispatch(ReduxActions.updateFriendlyUnitsAction(units));
    };

    Fetch.post({
      path: 'instance/initializeEnemyUnits',
      onSuccess: updateEnemyUnits,
    }).then();

    Fetch.post({
      path: 'instance/initializeFriendlyUnits',
      onSuccess: updateFriendlyUnits,
    }).then();

    if (window.debug) {
      Logger.log('Location initialized...');
    }

    Windows.initWindow('location', true);
  }, []);

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
          polygonsInRange={unit.polygonsInRange}
          gender={unit.gender}
        />
      ))}

      {enemyUnits.map((unit) => (
        <EnemyUnit ident={unit.ident} portrait={unit.portrait} healthBar={unit.healthBar} position={unit.position} key={unit.ident} movement={unit.movementPoints} />
      ))}

      <div className="instanceSvg">
        <svg
          style={{
            width: '160px', height: '160px', left: '320', top: '320', position: 'relative', transform: 'scale(5)',
          }}
          id="svgElement"
        >
          <g>
            {fields.map((field) => (
              <Field column={field.column} row={field.row} key={`polygon-${field.column}-${field.row}`} />
            ))}
          </g>
        </svg>
      </div>
    </Window>
  );
}

export default connect()(Location);
