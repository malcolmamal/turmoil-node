import axios from 'axios';
import ErrorHandler, { GenericError } from './turmoil-error';
import Layout from './turmoil-layout';

const getAuthHeader = () => `Bearer ${localStorage.getItem('token')}`;

const initAxios = () => {
  axios.defaults.baseURL = 'http://localhost:3030/';

  axios.interceptors.request.use((config) => {
    Layout.showSpinner();
    const localConfig = config;

    if (config.url === '/user/login' || config.url === '/user/signup') {
      return localConfig;
    }

    localConfig.headers.Authorization = getAuthHeader();

    return localConfig;
  });

  axios.interceptors.response.use(
    (response) => {
      console.log('response finished');
      Layout.hideSpinner();
      return response;
    },
    (error) => {
      if (error.response) {
        console.log('error in response', [error.request, error.response]);
      } else if (error.request) {
        console.log('no response :(', error.request);
      }

      Layout.hideSpinner();

      const err = new GenericError(error.response.statusText);
      err.errorObject = error;
      err.errorObject.originalData = error.response.data;
      throw err;
    },
  );
};

export const Axios = {
  METHOD_GET: 'GET',
  METHOD_POST: 'POST',
  async axios(method, url, data) {
    let resolvedResponse;

    try {
      if (method === this.METHOD_GET) {
        resolvedResponse = await axios.get(url, data);
      }

      if (method === this.METHOD_POST) {
        resolvedResponse = await axios.post(url, data);
      }

      return resolvedResponse;
    } catch (err) {
      ErrorHandler.handleAxiosError(method, url, data, err.errorObject);
    }

    return null;
  },
  async get(url, data) {
    return this.axios(this.METHOD_GET, url, data);
  },
  async post(url, data) {
    return this.axios(this.METHOD_POST, url, data);
  },
};

export default initAxios;
