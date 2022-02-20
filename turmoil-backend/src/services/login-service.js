import bcrypt from 'bcrypt';
import User from '../models/User.js';

const loginCallback = async (email, password, done) => {
  let user;
  try {
    user = await User.findAll({ where: { email } });
  } catch (err) {
    return done(err);
  }

  if (!user || !user.length) {
    return done(null, false);
  }

  const [loadedUser] = user;
  const isEqual = await bcrypt.compare(password, loadedUser.password);
  if (!isEqual) {
    const err = new Error('Wrong password!');
    err.statusCode = 401;
    return done(err);
  }

  return done(null, loadedUser);
};

export default loginCallback;
