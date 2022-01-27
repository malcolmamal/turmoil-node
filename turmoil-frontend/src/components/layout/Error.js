import React from 'react';
import '../../stylesheets/turmoil-error.css';
import Logger from '../../js/utils/logger';

export default class Error extends React.Component {
  componentDidMount() {
    // Get the modal
    window.modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    const span = document.getElementById('modalClose');

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
      window.modal.style.display = 'none';
    };

    // When the user clicks anywhere outside the modal, close it
    window.onclick = (event) => {
      if (event.target === window.modal) {
        window.modal.style.display = 'none';
      }
    };

    if (window.debug) {
      Logger.log('Error modal initialized...');
    }
  }

  render() {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" id="modalClose">&times;</span>
          <p id="modalContent" />
        </div>
      </div>
    );
  }
}
