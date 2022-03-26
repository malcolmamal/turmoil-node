import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';
import { required, length, email } from '../../js/utils/validators';
import { loginAction } from '../../js/api/services/user-service';
import './Login.css';

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

  const loginHandler = async (event, authData) => {
    /**
     * TODO: fetch only if form data are valid
     */
    event.preventDefault();

    setAuthLoading(true);

    const response = await loginAction(authData.email, authData.password);

    setAuthLoading(false);

    if (response) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.userName);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds,
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);

      navigate('/logged');
    }
  };

  return (
    <div className="circleMedium">
      <div className="containerMedium">
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
          <Button design="raised" loading={authLoading} className="centerButton">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
