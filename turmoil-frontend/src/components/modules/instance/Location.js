import React from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import Window from '../../Window';
import Field from './Field';
import FriendlyUnit from './FriendlyUnit';
import EnemyUnit from './EnemyUnit';
import ReduxActions from '../../../js/redux/actions';
import Ajax from '../../../js/core/turmoil-ajax';
import WindowLocation from '../../../js/windows/window-location';
import '../../../stylesheets/window-location.css';
import Logger from '../../../js/utils/logger';

const mapStateToProps = (state) => ({
  enemyUnits: state.enemyUnits,
  friendlyUnits: state.friendlyUnits,
});

function mapDispatchToProps(dispatch) {
  return {
    updateEnemyUnits: (enemyUnits) => dispatch(ReduxActions.updateEnemyUnitsAction(enemyUnits)),
    updateFriendlyUnits: (friendlyUnits) => dispatch(ReduxActions.updateFriendlyUnitsAction(friendlyUnits)),
  };
}

class ConnectedLocation extends React.Component {
  componentDidMount() {
    jQuery('#window_location').disableSelection();

    jQuery('.instancePolygon').click(function onClickAction() {
      WindowLocation.actionOnPolygon(jQuery(this));
    });

    const { updateEnemyUnits, updateFriendlyUnits } = this.props;

    Ajax.exec({
      url: 'instance/initializeEnemyUnits',
      onSuccess: updateEnemyUnits,
      onSuccessThis: this,
    });

    Ajax.exec({
      url: 'instance/initializeFriendlyUnits',
      onSuccess: updateFriendlyUnits,
      onSuccessThis: this,
    });

    if (window.debug) {
      Logger.log('Location initialized...');
    }
  }

  render() {
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

    const { friendlyUnits, enemyUnits } = this.props;

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
}

const Location = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedLocation);

export default Location;
