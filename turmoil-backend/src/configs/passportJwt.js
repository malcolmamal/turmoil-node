import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../models/User.js';
import Logger from '../utils/logger.js';

export const secretKey = 'turmoil-secret-key';

const initializePassport = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
  };

  Logger.log('initializing passport');

  passport.use(new Strategy(options, async (jwtPayload, done) => {
    Logger.log('searching for user in password authenticate', jwtPayload.email);
    try {
      const user = await User.findOne({ where: { email: jwtPayload.email } });
      Logger.log('this is user', user);

      if (user) {
        return done(null, user);
      }
    } catch (err) {
      return done(err, false);
    }

    return done(null, false);
  }));
};

export default initializePassport;
