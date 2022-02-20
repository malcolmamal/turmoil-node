import passport from 'passport';
import Logger from '../../utils/logger.js';
import localStrategy from './strategy/local-strategy.js';
import jwtStrategy from './strategy/jwt-strategy.js';
import loginCallback from '../../services/login-service.js';
import findUserByEmail from '../../services/user-service.js';

export const secretKey = 'turmoil-secret-key';

const initializePassport = () => {
  Logger.log('initializing passport');

  passport.use('local', localStrategy(loginCallback));
  passport.use('jwt', jwtStrategy(secretKey, findUserByEmail));
};

export default initializePassport;
