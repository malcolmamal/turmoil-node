import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Unit from './Unit';
import ReduxActions from '../../../js/redux/actions';
import WindowLocation from '../../../js/windows/window-location';

function EnemyUnit(props) {
  const dispatch = useDispatch();

  const { position, locationCallbackAction } = props;

  useEffect(() => {
    const { ident } = props;

    setTimeout(() => {
      WindowLocation.handleMoveToPolygon(document.querySelector(`#${position}`), document.querySelector(`#${ident}`));
    }, 125);
  }, []);

  const updateItems = (item) => {
    dispatch(ReduxActions.updateItemsInStashAction({ itemToAdd: item }));
  };

  const addEnemyUnit = (unit) => {
    dispatch(ReduxActions.updateEnemyUnitsAction({ unitToAdd: unit }));
  };

  const removeEnemyUnit = (unit) => {
    dispatch(ReduxActions.updateEnemyUnitsAction({ unitToRemove: unit }));
  };

  const actionOnUnitHandler = (ident) => {
    WindowLocation.actionOnUnit(ident, {
      updateItems, removeEnemyUnit, addEnemyUnit, locationCallbackAction,
    });
  };

  const {
    ident, portrait, healthBar, movement,
  } = props;

  return (
    <Unit ident={ident} portrait={portrait} position={position} healthBar={healthBar} movement={movement} enemy onClick={actionOnUnitHandler} />
  );
}

export default connect()(EnemyUnit);
