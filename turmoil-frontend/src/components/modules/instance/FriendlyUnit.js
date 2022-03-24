import React from 'react';
import Unit from './Unit';
import WindowLocation from '../../../js/windows/window-location';
import Logger from '../../../js/utils/logger';
import useAfterPaintEffect from '../../../js/react/hooks/after-paint-effect';

function FriendlyUnit(props) {
  const {
    position, ident, portrait, healthBar, movement,
  } = props;

  useAfterPaintEffect(() => {
    WindowLocation.handleMoveToPolygon(position, ident);
  }, []);

  const actionOnUnitHandler = () => {
    // do nothing at the moment
    Logger.log('Nothing to do with Unit at the moment', ident);
  };

  return (
    <Unit ident={ident} portrait={portrait} position={position} healthBar={healthBar} movement={movement} onClick={actionOnUnitHandler} />
  );
}

export default FriendlyUnit;
