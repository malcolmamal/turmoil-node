import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

function Footer() {
  const spinnerDisplayStyle = {
    display: 'none',
  };

  let logoutBox = '';
  if (localStorage.getItem('userName')) {
    logoutBox = <div>
      <FormattedMessage id="turmoil.footer.logout" />
      {' '}
      - (logged as
      {' '}
      {localStorage.getItem('userName')}
      )
    </div>;
  }

  return (
    <div id="turmoilFooter" className="turmoilFooter" role="contentinfo">
      <div className="footerBlock">
        {logoutBox}
      </div>
      <div id="spinner" className="spinner" style={spinnerDisplayStyle} title={`${useIntl().formatMessage({ id: 'turmoil.footer.loading' })}...`} />
    </div>
  );
}

export default Footer;
