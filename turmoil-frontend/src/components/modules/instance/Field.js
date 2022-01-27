import React from 'react';

function Field(props) {
  const {
    column, row,
  } = props;

  const ident = `polygon-${column}-${row}`;
  const text = `${column}:${row}`;

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
      <polygon id={ident} stroke="#4f4f4f" transform={`translate(${columnPosition}, ${rowPosition})`} className="instancePolygon" strokeWidth="0.15" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" />
      <text className="locationText" x={valueX} y={valueY}>{text}</text>
    </>
  );
}

export default Field;
