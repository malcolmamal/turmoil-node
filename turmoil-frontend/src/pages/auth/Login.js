import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../js/utils/validators';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.inputBlurHandlerEmail = this.inputBlurHandler.bind(this, 'email');
    this.inputBlurHandlerPassword = this.inputBlurHandler.bind(this, 'password');

    this.state = {
      loginForm: {
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
        formIsValid: false,
      },
    };
  }

  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;

      prevState.loginForm[input].validators.forEach((validator) => {
        isValid = isValid && validator(value);
      });

      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value,
        },
      };

      let formIsValid = true;
      Object.keys(updatedForm).forEach((inputName) => {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      });

      return {
        loginForm: updatedForm,
        formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => ({
      loginForm: {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          touched: true,
        },
      },
    }));
  };

  render() {
    const { onLogin, loading } = this.props;
    const { loginForm } = this.state;

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
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandlerEmail}
          value={loginForm.email.value}
          valid={loginForm.email.valid}
          touched={loginForm.email.touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandlerPassword}
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
}

export default Login;
