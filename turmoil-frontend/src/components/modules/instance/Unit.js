import React from 'react';
import Tooltip from '../../../js/core/turmoil-tooltip';

function Unit(props) {
  const {
    healthBar, title, enemy, ident, movement, portrait, onClick,
  } = props;

  const unitStyle = {
    width: `${healthBar}px`,
  };
  const unitAlt = title || 'unit';
  const imageClass = enemy ? ' instancePortraitFlipped instanceEnemy instanceEnemyCursor' : '';
  const mainDivClass = enemy ? ' enemyUnit' : '';
  const tooltipType = enemy ? 'monster' : '';
  const tooltipClass = enemy ? Tooltip.tooltipClass : '';

  window.turmoil.instance.units[ident] = {
    movement,
  };

  return (
    <div className={`instanceElement${mainDivClass}`} id={ident} onClick={() => onClick(ident)}>
      <div className="instancePortraitHealthBar">
        <div className="instancePortraitHealthBarInner" id={`${ident}Health`} style={unitStyle} />
      </div>
      <img
        alt={unitAlt}
        className={`instancePortrait${imageClass}${tooltipClass}`}
        src={`/images/portraits/${portrait}`}
        data-ident={ident}
        data-tooltip-type={tooltipType}
      />
      <div id={`${ident}Effect`} />
    </div>
  );
}

export default Unit;
