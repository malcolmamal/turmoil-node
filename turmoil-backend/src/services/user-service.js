import User from '../models/User.js';

const findUserByEmail = async (email) => User.findOne({ where: { email } });

export default findUserByEmail;
