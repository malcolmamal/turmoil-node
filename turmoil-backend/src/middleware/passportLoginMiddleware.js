import passport from 'passport';

// authorize fills req.user

const passportLogin = passport.authenticate('local', { session: false }, null);

export default passportLogin;
