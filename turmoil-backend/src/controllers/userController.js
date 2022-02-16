import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Logger from '../utils/logger.js';
import { secretKey } from '../configs/passportJwt.js';

export const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if (!req.body) {
    const error = new Error('No body in request.');
    error.statusCode = 422;
    error.data = errors.array();

    return next(error);
  }

  const { email } = req.body;
  const { name } = req.body;
  const { password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPw,
      name,
    });
    const result = await user.save();
    res.status(201).json({ message: 'User created!!', userId: result.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  return null;
};

export const loginUser = async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  let loadedUser;
  try {
    const user = await User.findAll({ where: { email } });
    if (!user || !user.length) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      return next(error);
    }
    [loadedUser] = user;
    Logger.log('user', loadedUser.email, loadedUser.password);
    const isEqual = await bcrypt.compare(password, loadedUser.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      return next(error);
    }

    const token = await jwt.sign(
      { email: loadedUser.email, name: loadedUser.name, id: loadedUser.id },
      secretKey,
      { expiresIn: '2h' },
    );

    res.status(200).json(
      {
        token,
        userId: loadedUser.id.toString(),
        userName: loadedUser.email,
      },
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  return null;
};
