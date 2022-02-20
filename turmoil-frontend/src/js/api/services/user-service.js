import { Axios } from '../../core/turmoil-axios';

export const loginAction = async (email, password) => await Axios.post('/user/login', {
  email, password,
});

export const signupAction = async (email, password, name) => await Axios.post('/user/create', {
  email, password, name,
});
