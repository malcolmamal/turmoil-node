import React, { useEffect, useState } from 'react';
import { Routes, Navigate, useNavigate } from 'react-router';
import { Route, Link, useLocation } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Error from './layout/Error';
import Console from './Console';
import Equipment from './modules/items/Equipment';
import Stash from './modules/items/Stash';
import Stats from './modules/stats/Stats';
import Location from './modules/instance/Location';
import SignupPage from '../pages/auth/Signup';
import LoginPage from '../pages/auth/Login';
import Logger from '../js/utils/logger';
import Layout from '../js/core/turmoil-layout';
import Utils from '../js/core/turmoil-utils';
import Windows from '../js/core/turmoil-windows';
import ResponseInterceptor from './interceptor/ResponseInterceptor';

function Turmoil() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);

  const keyMapping = [
    ['i', 'equipment'], ['c', 'stats'], ['s', 'stash'], ['l', 'location'], ['o', 'console'],
  ];

  keyMapping.forEach(([key, target]) => {
    useHotkeys(key, () => Windows.switchShowClose(target));
  });

  useEffect(() => {
    if (!localStorage.getItem('token')
        && location.pathname !== '/login'
        && location.pathname !== '/signup') {
      Logger.log('location redirection from', location.pathname, 'to ', 'login');
      navigate('/login');
    }

    if (localStorage.getItem('token')) {
      setIsLogged(true);
    }

    Layout.setLayout();
    Utils.addEvent(window, 'resize', Layout.resizeEvent);
  });

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    setIsLogged(false);
    navigate('/login');
  };

  const routes = (
    <Routes>
      <Route
        path="/test"
        element={(
          <div>
            test
            <Navigate to="/login" />
          </div>
          )}
      />
      <Route
        path="/logged"
        element={(
          <>
            <Console />
            <Equipment />
            <Stash />
            <Stats />
            <Location />
          </>
          )}
      />
      <Route
        path="/signup"
        element={(
          <SignupPage />
          )}
      />
      <Route
        path="/login"
        element={(
          <LoginPage
            logout={logoutHandler}
          />
          )}
      />
    </Routes>
  );

  const className = `turmoilBody ${(location.pathname === '/login'
    || location.pathname === '/signup') ? 'turmoilBodyCenterFlex' : ''}`;

  return (
    <div>
      <Error />
      <Header />
      <ResponseInterceptor />

      <div className="turmoilContainer">
        <div id="turmoilBody" className={className}>
          <div id="shadows">
            <div className="shadowTop" />
            <div className="shadowLeft" />
            <div className="shadowRight" />
            <div className="shadowBottom" />
          </div>

          {routes}

        </div>
      </div>

      <Footer logout={logoutHandler}>
        {isLogged && <Link to="/logged">Main</Link>}
        {isLogged && ' | '}
        {<Link to="/signup">Signup</Link>}
        {' | '}
        {<Link to="/login">Login</Link>}
      </Footer>
    </div>
  );
}

export default Turmoil;
