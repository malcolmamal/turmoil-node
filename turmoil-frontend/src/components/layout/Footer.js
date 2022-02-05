import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

function Footer(props) {
  const [isAuth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const { navigate } = props;

  const logoutHandler = () => {
    setAuth(false);
    setUserId(null);
    setToken(null);

    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');

    navigate('/login');
  };

  const spinnerDisplayStyle = {
    display: 'none',
  };

  let logoutBox = '';
  if (localStorage.getItem('userName')) {
    logoutBox = (
      <div>
        <Link onClick={logoutHandler} to="/logout">
          <FormattedMessage id="turmoil.footer.logout" />
          {' '}
          - (logged as
          {' '}
          {localStorage.getItem('userName')}
          )
        </Link>
      </div>
    );
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
