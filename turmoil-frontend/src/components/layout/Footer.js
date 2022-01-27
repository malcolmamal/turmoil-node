import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

function Footer() {
  const spinnerDisplayStyle = {
    display: 'none',
  };

  return (
    <div id="turmoilFooter" className="turmoilFooter" role="contentinfo">
      <div className="footerBlock">
        <FormattedMessage id="turmoil.footer.logout" />
        {' '}
        - (logged as
        {' '}
        {localStorage.getItem('userName')}
        )
      </div>
      <div id="spinner" className="spinner" style={spinnerDisplayStyle} title={`${useIntl().formatMessage({ id: 'turmoil.footer.loading' })}...`} />
    </div>
  );
}

export default Footer;
