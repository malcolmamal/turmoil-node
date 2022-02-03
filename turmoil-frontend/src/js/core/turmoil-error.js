import jQuery from 'jquery';
import Logger from '../utils/logger';
import Layout from './turmoil-layout';

const Error = {
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

    console.error('Error:', message, status, stack, path || null, fetchParams);
    jQuery('#error').html(message); // TODO: possibly not needed
    if (window.debug) {
      Logger.log('Error in ajax call', stack);
      Error.debugInfo = message;

      // TODO: move that html somewhere nice and add a scroller
      if (window.debugPopup) {
        jQuery('#modalContent').html(`<span style="font-weight: bold;">${status || ''} ${path}</span><br> ${message}<br><br> <pre style="white-space: pre-wrap;">${stack} <br><br>Params: ${JSON.stringify(fetchParams)}</pre><br><br> <pre></pre>`);
        window.modal.style.display = 'block';
      }
    }

    Layout.hideSpinner();
  },
  showError() {
    const windowId = window.open('', 'ajaxError', 'height=900, width=1600');
    windowId.document.write(Error.debugInfo);
    windowId.focus();

    Layout.hideSpinnerWithDelay();
  },
};

export default Error; // TODO: should this be renamed?
