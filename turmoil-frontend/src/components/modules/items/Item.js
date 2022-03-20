import React from 'react';
import Tooltip from '../../tooltip/Tooltip';

function Item(props) {
  const {
    ident, backgroundImage, iconClass, tooltipId, className, slotStyle,
  } = props;

  const opacity = ident ? 1 : 0.85;

  return (
    <div style={slotStyle}>
      <Tooltip ident={ident} />
      <span
        className={className}
        style={{ opacity }}
      >
        <span className="icon-item-gradient">
          <span
            id={tooltipId}
            className={`icon-item-inner ${iconClass}`}
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
