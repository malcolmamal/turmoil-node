import Logger from '../utils/logger';
import Layout from './turmoil-layout';

export class GenericError extends Error {
  errorObject = {};
}

const ErrorHandler = {
  debugInfo: '',
  handleError(error) {
    let { message } = error;
    const {
      stack, status, fetchParams, params,
    } = error;
    if (message === undefined) {
      message = error.status;
    }

    const path = params ? (params.path || '') : '';

    Logger.error('Error:', message, status, stack, path || null, fetchParams);
    if (window.debug) {
      Logger.log('Error in call', stack);
      Error.debugInfo = message;

      // TODO: move that html somewhere nice and add a scroller
      if (window.debugPopup) {
        document.querySelector('#modalContent').innerHTML = `<span style="font-weight: bold;">${status || ''} ${path}</span><br> ${message}<br><br> <pre style="white-space: pre-wrap;">${stack} <br><br>Params: ${JSON.stringify(fetchParams)}</pre><br><br> <pre></pre>`;
        window.modal.style.display = 'block';
      }
    }

    Layout.hideSpinner();
  },
  handleAxiosError(method, url, data, error) {
    const {
      message, stack, response, originalData,
    } = error;

    const {
      status, statusText,
    } = response;

    Logger.error('Error:', method, url, status, data, message, statusText, stack);
    if (window.debug) {
      Error.debugInfo = message;

      // TODO: move that html somewhere nice and add a scroller
      if (window.debugPopup) {
        document.querySelector('#modalContent').innerHTML = `<span style="font-weight: bold;">${method} ${url}: ${status}
            </span><br> ${statusText}<br><br> ${message}<br><br> 
            <pre style="white-space: pre-wrap;">${stack} 
                <br><br>Params: ${JSON.stringify(data)}
            </pre>
            Original response:  ${JSON.stringify(originalData)}`;
        window.modal.style.display = 'block';
      }
    }

    Layout.hideSpinner();
  },
  showError() {
    const windowId = window.open('', 'errorWindow', 'height=900, width=1600');
    windowId.document.write(Error.debugInfo);
    windowId.focus();

    Layout.hideSpinnerWithDelay();
  },
};

export default ErrorHandler; // TODO: should this be renamed?
