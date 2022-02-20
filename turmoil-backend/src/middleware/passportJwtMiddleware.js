import passport from 'passport';

const passportAuthorized = passport.authenticate('jwt', { session: false });

export default passportAuthorized;
