import Logger from '../utils/logger';
import Layout from './turmoil-layout';

export class GenericError extends Error {
  errorObject = {};
}

const ErrorHandler = {
  debugInfo: '',
  handleError(method, url, data, error) {
    const {
      message, stack, response, originalData,
    } = error;

    const {
      status, statusText,
    } = response;

    Logger.error('Error:', method, url, status, data, message, statusText, stack);
    if (window.debug) {
      // TODO: move that html somewhere nice and add a scroller
      const errorContent = `
        <span style="font-weight: bold;">${method} ${url}: ${status}</span>
        <br> ${statusText}<br>
        <br> ${message}<br><br> 
        <pre style="white-space: pre-wrap;">${stack} 
            <br><br>Params: ${JSON.stringify(data)}
        </pre>
        Original response:  ${JSON.stringify(originalData)}`;

      if (window.debugPopup) {
        document.querySelector('#modalContent').innerHTML = errorContent;
        window.modal.style.display = 'block';
      }

      ErrorHandler.debugInfo = errorContent;
    }

    Layout.hideSpinner();
  },
  showErrorPage() {
    const windowId = window.open('', 'errorWindow', 'height=900, width=1600');
    windowId.document.write(ErrorHandler.debugInfo);
    windowId.focus();

    Layout.hideSpinnerWithDelay();
  },
};

export default ErrorHandler;
