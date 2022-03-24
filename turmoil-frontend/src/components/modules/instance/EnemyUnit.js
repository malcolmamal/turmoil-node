import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Unit from './Unit';
import ReduxActions from '../../../js/redux/actions';
import WindowLocation from '../../../js/windows/window-location';
import useAfterPaintEffect from '../../../js/react/hooks/after-paint-effect';

function EnemyUnit(props) {
  const dispatch = useDispatch();

  const { ident, position, locationCallbackAction } = props;

  useAfterPaintEffect(() => {
    WindowLocation.handleMoveToPolygon(position, ident);
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

  const actionOnUnitHandler = (unitIdent) => {
    WindowLocation.actionOnUnit(unitIdent, {
      updateItems, removeEnemyUnit, addEnemyUnit, locationCallbackAction,
    });
  };

  const {
    portrait, healthBar, movement,
  } = props;

  return (
    <Unit ident={ident} portrait={portrait} position={position} healthBar={healthBar} movement={movement} enemy onClick={actionOnUnitHandler} />
  );
}

export default connect()(EnemyUnit);
