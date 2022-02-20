import { ExtractJwt, Strategy } from 'passport-jwt';
import Logger from '../../../utils/logger.js';

export default (secret, findUserByEmail) => new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
}, async (jwtPayload, done) => {
  Logger.log('searching for user in password authenticate', jwtPayload.email);
  try {
    const user = await findUserByEmail(jwtPayload.email);
    Logger.log('this is user', user.name);

    if (user) {
      return done(null, user);
    }
  } catch (err) {
    return done(err, false);
  }

  return done(null, false);
});
