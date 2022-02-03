import Fetch from '../core/turmoil-fetch';

const WindowStats = {
  updateStats(callBackFunction) {
    Fetch.get({
      path: 'character/state',
      onSuccess: callBackFunction,
    }).then();
  },
};

export default WindowStats;
