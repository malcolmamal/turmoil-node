import React, { useState } from 'react';
import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';
import { required, length, email } from '../../js/utils/validators';

function Signup(props) {
  const [signupForm, setSignupForm] = useState({
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
  });

  const inputChangeHandler = (input, value) => {
    let isValid = true;

    signupForm[input].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });

    const updatedForm = {
      ...signupForm,
      [input]: {
        ...signupForm[input],
        valid: isValid,
        value,
      },
    };

    let formIsValid = true;
    Object.keys(updatedForm).forEach((inputName) => {
      formIsValid = formIsValid && updatedForm[inputName].valid;
    });

    setSignupForm(updatedForm);
  };

  const inputBlurHandler = (input) => {
    const updatedForm = {
      ...signupForm,
      [input]: {
        ...signupForm[input],
        touched: true,
      },
    };

    setSignupForm(updatedForm);
  };

  const inputBlurHandlerName = () => { inputBlurHandler('name'); };
  const inputBlurHandlerEmail = () => { inputBlurHandler('email'); };
  const inputBlurHandlerPassword = () => { inputBlurHandler('password'); };

  const { onSignup, loading } = props;

  return (
    <form onSubmit={(e) => onSignup(e, { signupForm })}>
      <Input
        id="email"
        label="Your E-Mail"
        type="email"
        control="input"
        onChange={inputChangeHandler}
        onBlur={inputBlurHandlerEmail}
        value={signupForm.email.value}
        valid={signupForm.email.valid}
        touched={signupForm.email.touched}
      />
      <Input
        id="name"
        label="Your Name"
        type="text"
        control="input"
        onChange={inputChangeHandler}
        onBlur={inputBlurHandlerName}
        value={signupForm.name.value}
        valid={signupForm.name.valid}
        touched={signupForm.name.touched}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        control="input"
        onChange={inputChangeHandler}
        onBlur={inputBlurHandlerPassword}
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

export default Signup;
