import React from 'react';

function WindowIcon(props) {
  const { ident, onClick } = props;

  return (
    <div className={`windowIcon ${ident}WindowIcon noSelection`} id={`windowIcon_${ident}`} onClick={onClick}>
      <div className="windowIconHover" />
      <div className="windowIconText noSelection">{ident}</div>
    </div>
  );
}

export default WindowIcon;
