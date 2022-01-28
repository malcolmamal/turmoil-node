import Layout from './turmoil-layout';
import Ajax from './turmoil-ajax';

const Fetch = {
  baseUrl: 'http://localhost:3030/',
  baseHeaders: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  async fetch(params, fetchParams) {
    try {
      Layout.showSpinner();
      const response = await fetch(`${this.baseUrl}${params.path}`, fetchParams);

      const jsonResponse = await response.json();
      if (typeof (params.onSuccessThis) !== 'undefined') {
        params.onSuccess(jsonResponse, params.onSuccessThis);
      } else {
        params.onSuccess(jsonResponse);
      }

      return null;
    } catch (err) {
      console.log('its bad', err);
      Ajax.handleAjaxError(err, err, '');
      return JSON.stringify(err);
    } finally {
      console.log('wtf');
      Layout.hideSpinner();
    }
  },
  async post(params) {
    const fetchParams = {
      method: 'POST',
      body: JSON.stringify(params.body || {}),
      headers: this.baseHeaders,
    };

    return this.fetch(params, fetchParams);
  },
  async get(params) {
    const fetchParams = {
      method: 'GET',
      headers: this.baseHeaders,
    };

    return this.fetch(params, fetchParams);
  },
};

export default Fetch;
