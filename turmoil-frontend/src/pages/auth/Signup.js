import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';
import { required, length, email } from '../../js/utils/validators';
import Error from '../../components/layout/Error';
import Logger from '../../js/utils/logger';

function Signup() {
  const navigate = useNavigate();

  const [authLoading, setAuthLoading] = useState(false);

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

    Object.keys(updatedForm).forEach((inputName) => {
      isValid = isValid && updatedForm[inputName].valid;
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

  const signupHandler = (event, authData) => {
    /**
     * TODO: fetch only if form data are valid
     */

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
        setAuthLoading(false);

        navigate('/login');
      })
      .catch((err) => {
        Logger.log(err);
        setAuthLoading(false);
      });
  };

  const inputBlurHandlerName = () => { inputBlurHandler('name'); };
  const inputBlurHandlerEmail = () => { inputBlurHandler('email'); };
  const inputBlurHandlerPassword = () => { inputBlurHandler('password'); };

  return (
    <form onSubmit={(e) => signupHandler(e, { signupForm })}>
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
      <Button design="raised" loading={authLoading}>
        Signup
      </Button>
    </form>
  );
}

export default Signup;
