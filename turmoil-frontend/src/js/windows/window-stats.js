import { stateAction } from '../api/services/character-service';

const WindowStats = {
  async updateStats(callBackFunction) {
    const response = await stateAction();
    callBackFunction(response.data);
  },
};

export default WindowStats;
