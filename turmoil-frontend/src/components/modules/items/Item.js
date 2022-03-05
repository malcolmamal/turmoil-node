import React from 'react';
import Tooltip from '../../../js/core/turmoil-tooltip';

function Item(props) {
  const {
    ident, backgroundImage, iconClass, tooltipId, className, slotStyle,
  } = props;

  const opacity = ident ? 1 : 0.85;
  const tooltipClass = ident ? Tooltip.tooltipClass : '';

  return (
    <div style={slotStyle}>
      <span
        className={className}
        style={{ opacity }}
      >
        <span className="icon-item-gradient">
          <span
            id={tooltipId}
            className={`icon-item-inner ${iconClass} ${tooltipClass}`}
            style={{ backgroundImage }}
            data-ident={ident}
            data-tooltip-type="item"
          />
        </span>
      </span>
    </div>
  );
}

export default Item;
