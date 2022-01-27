import React from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import Unit from './Unit';
import ReduxActions from '../../../js/redux/actions';
import WindowLocation from '../../../js/windows/window-location';

function mapDispatchToProps(dispatch) {
  return {
    updateItems: (stashItems) => dispatch(ReduxActions.updateItemsInStashAction(stashItems)),
    updateEnemyUnits: (stashItems) => dispatch(ReduxActions.updateEnemyUnitsAction(stashItems)),
  };
}

class ConnectedEnemyUnit extends React.Component {
  constructor(props) {
    super(props);

    this.actionOnUnitHandler = this.actionOnUnitHandler.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.addEnemyUnit = this.addEnemyUnit.bind(this);
    this.removeEnemyUnit = this.removeEnemyUnit.bind(this);
  }

  componentDidMount() {
    const { ident, position } = this.props;

    setTimeout(() => {
      WindowLocation.handleMoveToPolygon(jQuery(`#${position}`), jQuery(`#${ident}`));
    }, 125);
  }

  actionOnUnitHandler(ident) {
    WindowLocation.actionOnUnit(ident, { updateItems: this.updateItems, removeEnemyUnit: this.removeEnemyUnit, addEnemyUnit: this.addEnemyUnit });
  }

  updateItems(item) {
    const { updateItems } = this.props;
    updateItems({ itemToAdd: item });
  }

  addEnemyUnit(unit) {
    const { updateEnemyUnits } = this.props;
    updateEnemyUnits({ unitToAdd: unit });
  }

  removeEnemyUnit(unit) {
    const { updateEnemyUnits } = this.props;
    updateEnemyUnits({ unitToRemove: unit });
  }

  render() {
    const {
      ident, portrait, healthBar, movement,
    } = this.props;

    return (
      <Unit ident={ident} portrait={portrait} healthBar={healthBar} movement={movement} enemy onClick={this.actionOnUnitHandler} />
    );
  }
}

const EnemyUnit = connect(
  null,
  mapDispatchToProps,
)(ConnectedEnemyUnit);

export default EnemyUnit;
