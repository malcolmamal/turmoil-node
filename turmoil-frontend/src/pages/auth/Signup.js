import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';
import { required, length, email } from '../../js/utils/validators';
import Logger from '../../js/utils/logger';
import { signupAction } from '../../js/api/services/user-service';
import './Signup.css';

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

  const signupHandler = async (event, authData) => {
    /**
     * TODO: fetch only if form data are valid
     */

    event.preventDefault();

    setAuthLoading(true);

    const response = await signupAction(
      authData.signupForm.email.value,
      authData.signupForm.password.value,
      authData.signupForm.name.value,
    );

    setAuthLoading(false);

    if (response) {
      Logger.log(response.data);

      navigate('/login');
    }
  };

  const inputBlurHandlerName = () => {
    inputBlurHandler('name');
  };
  const inputBlurHandlerEmail = () => {
    inputBlurHandler('email');
  };
  const inputBlurHandlerPassword = () => {
    inputBlurHandler('password');
  };

  return (
    <div className="circleMedium">
      <div className="containerMedium">
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
          <Button
            design="raised"
            loading={authLoading}
            className="centerButton"
          >
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
