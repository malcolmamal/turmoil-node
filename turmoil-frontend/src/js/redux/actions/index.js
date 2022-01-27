import {
  UPDATE_CHARACTER_STATE,
  UPDATE_ITEMS_IN_EQUIPMENT,
  UPDATE_ITEMS_IN_STASH,
  UPDATE_ENEMY_UNITS,
  UPDATE_FRIENDLY_UNITS,
} from '../constants/action-types';

const ReduxActions = {
  updateCharacterStatsAction(payload) {
    return { type: UPDATE_CHARACTER_STATE, payload };
  },
  updateItemsInEquipmentAction(payload) {
    return { type: UPDATE_ITEMS_IN_EQUIPMENT, payload };
  },
  updateItemsInStashAction(payload) {
    return { type: UPDATE_ITEMS_IN_STASH, payload };
  },
  updateEnemyUnitsAction(payload) {
    return { type: UPDATE_ENEMY_UNITS, payload };
  },
  updateFriendlyUnitsAction(payload) {
    return { type: UPDATE_FRIENDLY_UNITS, payload };
  },
};

export default ReduxActions;
