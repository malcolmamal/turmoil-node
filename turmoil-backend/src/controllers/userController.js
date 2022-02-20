import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { secretKey } from '../configs/passport/passport.js';
import sleep from '../utils/sleep.js';

export const createUser = async (req, res, next) => {
  await sleep(1000);

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
  console.log('in the loginUser');
  await sleep(1000);

  const { user } = req;
  try {
    const token = await jwt.sign(
      { email: user.email, name: user.name, id: user.id },
      secretKey,
      { expiresIn: '2h' },
      null,
    );

    res.status(200).json(
      {
        token,
        userId: user.id.toString(),
        userName: user.email,
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
