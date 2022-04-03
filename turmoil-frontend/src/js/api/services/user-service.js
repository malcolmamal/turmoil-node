import { Axios } from '../../core/turmoil-axios';

const servicePrefix = 'user';

export const loginAction = async (email, password) =>
  await Axios.post(`${servicePrefix}/login`, {
    email,
    password,
  });

export const signupAction = async (email, password, name) =>
  await Axios.post(`${servicePrefix}/create`, {
    email,
    password,
    name,
  });
