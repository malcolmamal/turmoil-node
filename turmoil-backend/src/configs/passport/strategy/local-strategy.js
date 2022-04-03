import { Strategy } from 'passport-local';

const options = {
  usernameField: 'email',
  passwordField: 'password',
};

export default (loginCallback) => new Strategy(options, loginCallback);
