import passport from 'passport';

// authorize fills req.account

const passportAuthorized = passport.authorize('jwt', { session: false }, null);

export default passportAuthorized;
