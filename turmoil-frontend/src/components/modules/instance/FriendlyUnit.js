import React, { useEffect } from 'react';
import Unit from './Unit';
import WindowLocation from '../../../js/windows/window-location';
import Logger from '../../../js/utils/logger';

function FriendlyUnit(props) {
  const {
    position, ident, portrait, healthBar, movement,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      WindowLocation.handleMoveToPolygon(document.querySelector(`#${position}`), document.querySelector(`#${ident}`));
    }, 200);

    setTimeout(() => {
      WindowLocation.setActivePolygons();
    }, 500);
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
