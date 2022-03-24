import React from 'react';
import WindowLocation from '../../../js/windows/window-location';

function Field(props) {
  const {
    column, row, unit, locationCallbackAction,
  } = props;

  const ident = `polygon-${column}-${row}`;
  const text = `${column}:${row}`;

  let className = 'instancePolygon';
  const unitIdent = unit?.ident;

  if (unitIdent) {
    if (unitIdent.includes('Enemy')) {
      className = 'instancePolygonEnemy';
    } else {
      className = 'instancePolygonActive';
    }
  }

  const baseHeight = 15;
  const baseWidth = 9;

  const textHeightOffset = 8; // move text top <-> right
  const verticalOffset = 12; // move whole grid left <-> right
  const horizontalOffset = 2; // move whole grid top <-> bottom

  const rowFixed = row * 2 - 1;
  const offset = (column + rowFixed + 1) % 2;

  const columnPosition = ((column - 1) * baseHeight) + verticalOffset;
  const rowPosition = ((rowFixed + offset) * baseWidth) + horizontalOffset;

  const valueX = ((column - 1) * baseHeight) + verticalOffset;
  const valueY = ((rowFixed + offset) * baseWidth) + textHeightOffset + horizontalOffset;

  return (
    <>
      <polygon
        contextMenu="none"
        id={ident}
        stroke="#4f4f4f"
        transform={`translate(${columnPosition}, ${rowPosition})`}
        className={className}
        strokeWidth="0.15"
        points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0"
        onClick={() => { WindowLocation.actionOnPolygon(ident, { locationCallbackAction }); }}
        onContextMenu={(event) => { event.preventDefault(); console.log('rightclicked', ident, className, unit); }}
      />
      <text className="locationText" x={valueX} y={valueY}>{text}</text>
    </>
  );
}

export default Field;
