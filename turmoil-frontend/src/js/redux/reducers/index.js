import {
  UPDATE_CHARACTER_STATE,
  UPDATE_ENEMY_UNITS, UPDATE_FRIENDLY_UNITS,
  UPDATE_ITEMS_IN_EQUIPMENT,
  UPDATE_ITEMS_IN_STASH,
} from '../constants/action-types';
import ReduxHandlers from '../handlers';

const initialState = {
  characterState: {},
  equipmentItems: [],
  stashItems: [],
  enemyUnits: [],
  friendlyUnits: [],
};

function rootReducer(state = initialState, action = '') {
  switch (action.type) {
    case UPDATE_CHARACTER_STATE: {
      return { ...state, characterState: action.payload };
    }
    case UPDATE_ITEMS_IN_EQUIPMENT: {
      return ReduxHandlers.handleUpdateItemsInEquipment(state, action.payload);
    }
    case UPDATE_ITEMS_IN_STASH: {
      return ReduxHandlers.handleUpdateItemsInStash(state, action.payload);
    }
    case UPDATE_ENEMY_UNITS: {
      return ReduxHandlers.handleUpdateEnemyUnits(state, action.payload);
    }
    case UPDATE_FRIENDLY_UNITS: {
      return ReduxHandlers.handleUpdateFriendlyUnits(state, action.payload);
    }
    default:
  }

  return state;
}

export default rootReducer;
