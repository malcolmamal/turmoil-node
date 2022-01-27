import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../js/utils/validators';

class Signup extends Component {
  constructor(props, context) {
    super(props, context);

    this.inputBlurHandlerName = this.inputBlurHandler.bind(this, 'name');
    this.inputBlurHandlerEmail = this.inputBlurHandler.bind(this, 'email');
    this.inputBlurHandlerPassword = this.inputBlurHandler.bind(this, 'password');

    this.state = {
      signupForm: {
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
        name: {
          value: '',
          valid: false,
          touched: false,
          validators: [required],
        },
        formIsValid: false,
      },
    };
  }

  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;

      prevState.signupForm[input].validators.forEach((validator) => {
        isValid = isValid && validator(value);
      });

      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value,
        },
      };

      let formIsValid = true;
      Object.keys(updatedForm).forEach((inputName) => {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      });

      return {
        signupForm: updatedForm,
        formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => ({
      signupForm: {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          touched: true,
        },
      },
    }));
  };

  render() {
    const { onSignup, loading } = this.props;
    const { signupForm } = this.state;

    return (
      <form onSubmit={(e) => onSignup(e, this.state)}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandlerEmail}
          value={signupForm.email.value}
          valid={signupForm.email.valid}
          touched={signupForm.email.touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandlerName}
          value={signupForm.name.value}
          valid={signupForm.name.valid}
          touched={signupForm.name.touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandlerPassword}
          value={signupForm.password.value}
          valid={signupForm.password.valid}
          touched={signupForm.password.touched}
        />
        <Button design="raised" loading={loading}>
          Signup
        </Button>
      </form>
    );
  }
}

export default Signup;
