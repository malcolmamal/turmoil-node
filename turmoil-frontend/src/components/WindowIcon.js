import React from 'react';
import Windows from '../js/core/turmoil-windows';

function WindowIcon(props) {
  const { ident } = props;

  return (
    <div className={`windowIcon ${ident}WindowIcon noSelection`} id={`windowIcon_${ident}`} onClick={() => Windows.switchShowClose(ident, true)}>
      <div className="windowIconHover" />
      <div className="windowIconText noSelection">{ident}</div>
    </div>
  );
}

export default WindowIcon;
