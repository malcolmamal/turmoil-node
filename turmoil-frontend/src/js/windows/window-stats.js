import Ajax from '../core/turmoil-ajax';

const WindowStats = {
  updateStats(callBackFunction) {
    Ajax.exec({
      url: 'character/state',
      onSuccess: callBackFunction,
    });
  },
};

export default WindowStats;
