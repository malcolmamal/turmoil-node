import React, { useEffect, useState } from 'react';
import { Routes, Navigate } from 'react-router';
import { Route, Link } from 'react-router-dom';
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
import Button from './Button/Button';
import Logger from '../js/utils/logger';
import Layout from '../js/core/turmoil-layout';
import Utils from '../js/core/turmoil-utils';
import { addDraggable } from '../js/core/turmoil-draggable-sortable-resizable';
import Windows from '../js/core/turmoil-windows';
import Tooltip from '../js/core/turmoil-tooltip';

function Turmoil(props) {
  const { navigate, location } = props;

  const [isAuth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  const keyMapping = [
    ['i', 'equipment'], ['c', 'stats'], ['s', 'stash'], ['l', 'location'], ['o', 'console'],
  ];

  keyMapping.forEach(([key, target]) => {
    useHotkeys(key, () => Windows.switchShowClose(target));
  });

  useEffect(() => {
    if (!localStorage.getItem('token') && location.pathname !== '/login') {
      Logger.log('location redirection from', location.pathname, 'to ', 'login');
      navigate('/login');
    }

    document.querySelectorAll('.windowIcon').forEach((icon) => addDraggable(`#${icon.id}`, {
      revert: true,
    }));

    Layout.setLayout();
    Utils.addEvent(window, 'resize', Layout.resizeEvent);

    Tooltip.init();

    Logger.log('Turmoil container mounted at', location.pathname);
  });

  // componentDidMount() {
  //     const token = localStorage.getItem('token');
  //     const expiryDate = localStorage.getItem('expiryDate');
  //     if (!token || !expiryDate) {
  //         return;
  //     }
  //     if (new Date(expiryDate) <= new Date()) {
  //         this.logoutHandler();
  //         return;
  //     }
  //     const userId = localStorage.getItem('userId');
  //     const remainingMilliseconds =
  //         new Date(expiryDate).getTime() - new Date().getTime();
  //     this.setState({ isAuth: true, token: token, userId: userId });
  //     this.setAutoLogout(remainingMilliseconds);
  // }

  const changeShouldRedirect = (e) => {
    Logger.log('clicked!', e);
    Logger.log('token', token);
    Logger.log('userId', userId);
    Logger.log('isAuth', isAuth);
    Logger.log('error', error);
  };

  // setAutoLogout = (milliseconds) => {
  //   setTimeout(() => {
  //     this.logoutHandler();
  //   }, milliseconds);
  // };

  const loginHandler = (event, authData) => {
    event.preventDefault();

    setAuthLoading(true);

    fetch('http://localhost:3030/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),

      // if we were doing authorization:
      // Authorization: 'Bearer ' + localStorage.getItem('token')

    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          Logger.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then((resData) => {
        Logger.log(resData);
        setAuth(true);
        setToken(resData.token);
        setAuthLoading(false);
        setUserId(resData.userId);

        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        localStorage.setItem('userName', resData.userName);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds,
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        // this.setAutoLogout(remainingMilliseconds);

        navigate('/logged');
      })
      .catch((err) => {
        setAuth(false);
        setAuthLoading(false);
        setError(err);

        Logger.error(err);
      });
  };

  const signupHandler = (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);

    fetch('http://localhost:3030/user/create', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!",
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          Logger.log('Error!');
          throw new Error('Creating a user failed!');
        }
        return res.json();
      })
      .then((resData) => {
        Logger.log(resData);
        setAuth(false);
        setAuthLoading(false);
        // todo redirect to login
        // this.props.history.replace('/logged');

        navigate('/login');
      })
      .catch((err) => {
        Logger.log(err);
        setAuth(false);
        setAuthLoading(false);
        setError(err);
      });
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
          <div>
            <Console />
            <Equipment />
            <Stash />
            <Stats />

            <Location />
          </div>
          )}
      />
      <Route
        path="/signup"
        element={(
          <SignupPage
            onSignup={signupHandler}
            loading={authLoading}
          />
          )}
      />
      <Route
        path="/login"
        element={(
          <LoginPage
            onLogin={loginHandler}
            loading={authLoading}
          />
          )}
      />
    </Routes>
  );

  return (
    <div>
      <Error />
      <Header />

      <div className="turmoilContainer">
        <div id="turmoilBody" className="turmoilBody">
          <div id="shadows">
            <div className="shadowTop" />
            <div className="shadowLeft" />
            <div className="shadowRight" />
            <div className="shadowBottom" />
          </div>

          <Link to="/logged">Main</Link>
          {' '}
          |
          {' '}
          <Link to="/signup">Signup</Link>
          {' '}
          |
          {' '}
          <Link to="/login">Login</Link>

          {routes}

          <form>
            <Button design="raised" type="button" onClick={(e) => changeShouldRedirect(e)}>
              Test me!
            </Button>
          </form>

        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

export default Turmoil;
