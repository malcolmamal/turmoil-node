import Layout from './turmoil-layout';
import Error from './turmoil-error';
import Permissions from './turmoil-permissions';

const Fetch = {
  baseUrl: 'http://localhost:3030/',
  baseHeaders: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  async fetch(params, fetchParams) {
    try {
      if (params.blockActions === true) {
        // TODO: this whole section should be moved to a more logical place
        if (!Permissions.areActionsAllowed()) {
          window.turmoil.logDebug('Actions are currently blocked', params);

          return null;
        }

        Permissions.blockActions();
      }

      Layout.showSpinner();
      const response = await fetch(`${this.baseUrl}${params.path}`, fetchParams);
      if (!response.ok) {
        Permissions.enableActions();

        const jsonResponse = await response.json();

        return Error.handleError({
          message: jsonResponse.message, stack: jsonResponse.stack, status: response.status, params, fetchParams,
        });
      }

      const jsonResponse = await response.json();
      if (typeof (params.onSuccessThis) !== 'undefined') {
        params.onSuccess(jsonResponse, params.onSuccessThis);
      } else {
        params.onSuccess(jsonResponse);
      }

      return null;
    } catch (err) {
      Permissions.enableActions();

      Error.handleError({
        message: err, params, fetchParams,
      });

      return JSON.stringify(err);
    } finally {
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
