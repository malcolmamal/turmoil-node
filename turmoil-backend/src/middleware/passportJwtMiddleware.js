import passport from 'passport';

const passportAuthorized = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
};

export default passportAuthorized;
