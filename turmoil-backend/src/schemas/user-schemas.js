import Joi from 'joi';

const passwordRegexp = /^[a-zA-Z0-9]{5,30}/;
const emailRegexp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .pattern(emailRegexp),
  password: Joi.string().pattern(passwordRegexp),
});

export const signupSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .pattern(emailRegexp),
  password: Joi.string().required().pattern(passwordRegexp),
  name: Joi.string().required().min(3).alphanum(),
});
