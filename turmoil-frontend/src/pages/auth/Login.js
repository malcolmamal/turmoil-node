import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';
import { required, length, email } from '../../js/utils/validators';
import Error from '../../components/layout/Error';
import Logger from '../../js/utils/logger';

function Login(props) {
  const navigate = useNavigate();

  const [authLoading, setAuthLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, email],
    },
    password: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })],
    },
  });

  const inputChangeHandler = (input, value) => {
    let isValid = true;

    loginForm[input].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });

    const updatedForm = {
      ...loginForm,
      [input]: {
        ...loginForm[input],
        valid: isValid,
        value,
      },
    };

    Object.keys(updatedForm).forEach((inputName) => {
      isValid = isValid && updatedForm[inputName].valid;
    });

    setLoginForm(updatedForm);
  };

  const inputBlurHandler = (input) => {
    const updatedForm = {
      ...loginForm,
      [input]: {
        ...loginForm[input],
        touched: true,
      },
    };

    setLoginForm(updatedForm);
  };

  const inputBlurHandlerEmail = () => { inputBlurHandler('email'); };
  const inputBlurHandlerPassword = () => { inputBlurHandler('password'); };

  const setAutoLogout = (milliseconds) => {
    const { logout } = props;
    setTimeout(() => {
      logout();
    }, milliseconds);
  };

  const loginHandler = (event, authData) => {
    /**
     * TODO: fetch only if form data are valid
     */
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
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          Logger.log('Error, could not log in!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then((resData) => {
        Logger.log(resData);
        setAuthLoading(false);

        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        localStorage.setItem('userName', resData.userName);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds,
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);

        navigate('/logged');
      })
      .catch((err) => {
        setAuthLoading(false);

        Logger.error('problem logging in');
        Logger.error(err);
      });
  };

  return (
    <form
      onSubmit={(e) => loginHandler(e, {
        email: loginForm.email.value,
        password: loginForm.password.value,
      })}
    >
      <Input
        id="email"
        label="Your E-Mail"
        type="email"
        control="input"
        onChange={inputChangeHandler}
        onBlur={inputBlurHandlerEmail}
        value={loginForm.email.value}
        valid={loginForm.email.valid}
        touched={loginForm.email.touched}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        control="input"
        onChange={inputChangeHandler}
        onBlur={inputBlurHandlerPassword}
        value={loginForm.password.value}
        valid={loginForm.password.valid}
        touched={loginForm.password.touched}
      />
      <Button design="raised" loading={authLoading}>
        Login
      </Button>
    </form>
  );
}

export default Login;
