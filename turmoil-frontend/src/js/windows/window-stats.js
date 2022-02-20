import { Axios } from '../core/turmoil-axios';

const WindowStats = {
  async updateStats(callBackFunction) {
    const response = await Axios.get('character/state');
    callBackFunction(response.data);
  },
};

export default WindowStats;
