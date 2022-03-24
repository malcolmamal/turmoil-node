import axios from 'axios';
import ErrorHandler, { GenericError } from './turmoil-error';
import Layout from './turmoil-layout';
import Permissions from './turmoil-permissions';

const getAuthHeader = () => `Bearer ${localStorage.getItem('token')}`;

export const handleError = (error) => {
  Layout.hideSpinner();
  Permissions.enableActions();

  const errorSource = error.response ? error.response : error.request;

  const err = new GenericError(errorSource.statusText);
  err.errorObject = error;
  err.errorObject.originalData = errorSource.data;

  ErrorHandler.handleError(error.config.method, error.config.url, error.config.data, err.errorObject);
};

export const responseInterceptor = (navigate, location) => axios.interceptors.response.use((response) => {
  Layout.hideSpinner();
  return response;
}, (error) => {
  switch (error.response.status) {
    case 404:
      Layout.hideSpinner();
      navigate('/404');
      break;
    case 401:
      Layout.hideSpinner();

      if (location.pathname === '/login' || location.pathname === '/signup') {
        handleError(error);
        return;
      }

      navigate('/login');
      break;
    default:
      handleError(error);
  }
});

export const responseInterceptorEject = (interceptorId) => {
  axios.interceptors.response.eject(interceptorId);
};

const initAxios = () => {
  axios.defaults.baseURL = 'http://localhost:3030/';

  axios.interceptors.request.use(
    (config) => {
      Layout.showSpinner();
      const localConfig = config;

      if (config.url === '/user/login' || config.url === '/user/signup') {
        return localConfig;
      }

      localConfig.headers.Authorization = getAuthHeader();

      return localConfig;
    },
    (error) => handleError(error),
  );

  // response interceptor initialized from ResponseInterceptor.js due to navigate()
};

export const Axios = {
  METHOD_GET: 'GET',
  METHOD_POST: 'POST',
  blockNextAction: false,
  async axios(method, url, data) {
    if (this.blockNextAction) {
      if (!Permissions.areActionsAllowed()) {
        window.turmoil.logDebug('Actions are currently blocked', data);

        return null;
      }

      Permissions.blockActions();
    }
    this.blockNextAction = false;

    let resolvedResponse;

    if (method === this.METHOD_GET) {
      resolvedResponse = await axios.get(url, data);
    }

    if (method === this.METHOD_POST) {
      resolvedResponse = await axios.post(url, data);
    }

    return resolvedResponse;
  },
  async get(url, data) {
    return this.axios(this.METHOD_GET, url, data);
  },
  async post(url, data) {
    return this.axios(this.METHOD_POST, url, data);
  },
  block() {
    this.blockNextAction = true;

    return this;
  },
};

export default initAxios;
