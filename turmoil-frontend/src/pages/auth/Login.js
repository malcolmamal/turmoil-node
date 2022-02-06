import React, { useState } from 'react';
import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';
import { required, length, email } from '../../js/utils/validators';

function Login(props) {
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

  const [formIsValid, setFormIsValid] = useState(false);

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
    setFormIsValid(isValid);
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

  const { onLogin, loading } = props;

  return (
    <form
      onSubmit={(e) => onLogin(e, {
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
      <Button design="raised" loading={loading}>
        Login
      </Button>
    </form>
  );
}

export default Login;
