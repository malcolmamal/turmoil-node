import passport from 'passport';

const passportLogin = passport.authenticate('local', { session: false });

export default passportLogin;
