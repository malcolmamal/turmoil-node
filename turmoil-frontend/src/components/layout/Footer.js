import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

function Footer(props) {
  const { logout } = props;

  const spinnerDisplayStyle = {
    display: 'none',
  };

  let logoutBox = null;
  if (localStorage.getItem('userName')) {
    logoutBox = (
      <Link onClick={logout} to="/login" id="logout">
        <FormattedMessage id="turmoil.footer.logout" /> - (logged as{' '}
        {localStorage.getItem('userName')})
      </Link>
    );
  }

  const { children } = props;

  return (
    <div id="turmoilFooter" className="turmoilFooter" role="contentinfo">
      <div className="footerBlock">
        {logoutBox}
        {logoutBox && ' | '}
        {children}
      </div>
      <div
        id="spinner"
        className="spinner"
        style={spinnerDisplayStyle}
        title={`${useIntl().formatMessage({
          id: 'turmoil.footer.loading',
        })}...`}
      />
    </div>
  );
}

export default Footer;
