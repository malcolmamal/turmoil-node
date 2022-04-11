import { Axios } from '../../core/turmoil-axios';

const servicePrefix = 'user';

export const loginAction = async (username, password) =>
  await Axios.post(`${servicePrefix}/login`, {
    username,
    password,
  });

export const signupAction = async (email, password, name) =>
  await Axios.post(`${servicePrefix}/create`, {
    email,
    password,
    name,
  });
