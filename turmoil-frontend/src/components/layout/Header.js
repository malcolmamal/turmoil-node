import React from 'react';

function Header() {
  const headerBannerStyle = {
    position: 'relative',
  };

  const languageSelectorStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
  };

  return (
    <div
      role="banner"
      id="turmoilHeader"
      className="turmoilHeader"
      style={headerBannerStyle}
    >
      <div style={languageSelectorStyle}>
        {/* bring back language selector */}
      </div>
      {/* <div style="position: absolute; right: 0; bottom: 0;"> */}
      {/* bring back the old menu */}
      {/* </div> */}
    </div>
  );
}

export default Header;
