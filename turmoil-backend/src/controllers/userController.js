import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { secretKey } from '../configs/passport/passport.js';
import sleep from '../utils/sleep.js';

export const createUser = async (req, res, next) => {
  await sleep(500);

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
    res.status(StatusCodes.CREATED).json({ message: 'User created!!', userId: result.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }

  return null;
};

export const loginUser = async (req, res, next) => {
  await sleep(500);

  const { user } = req;
  try {
    const token = await jwt.sign(
      { email: user.email, name: user.name, id: user.id },
      secretKey,
      { expiresIn: '2h' },
      null,
    );

    res.status(StatusCodes.OK).json(
      {
        token,
        userId: user.id.toString(),
        userName: user.email,
      },
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }

  return null;
};
