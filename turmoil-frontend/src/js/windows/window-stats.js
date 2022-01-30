import Ajax from '../core/turmoil-ajax';
import Fetch from '../core/turmoil-fetch';

const WindowStats = {
  updateStats(callBackFunction) {
    Fetch.get({
      path: 'character/state',
      onSuccess: callBackFunction,
    }).then();

    // Ajax.exec({
    //   url: 'character/state',
    //   onSuccess: callBackFunction,
    // });
  },
};

export default WindowStats;
