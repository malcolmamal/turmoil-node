import Utils from '../../core/turmoil-utils';

const ReduxHandlers = {
  handleUpdateItemsInEquipment(currentState, payload) {
    const newState = {};

    if (typeof payload.wornItems !== 'undefined') {
      newState.equipmentItems = [...payload.wornItems.items];

      return ReduxHandlers.properResponse(currentState, newState);
    }

    newState.equipmentItems = [...currentState.equipmentItems];

    if (typeof payload.itemToAdd !== 'undefined') {
      const { slot } = payload.itemToAdd;

      newState.equipmentItems = Utils.removeFromArrayBySlot(slot, newState.equipmentItems);
      newState.equipmentItems.push(payload.itemToAdd);
    }

    if (typeof payload.itemToRemove !== 'undefined') {
      const { slot } = payload.itemToRemove;
      const { ident } = payload.itemToRemove;

      newState.equipmentItems = Utils.removeFromArrayByIdent(ident, newState.equipmentItems);
      newState.equipmentItems.push(window.turmoil.equipment.defaultItems[slot]);
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },
  handleUpdateItemsInStash(currentState, payload) {
    const newState = {};

    if (typeof payload.stashItems !== 'undefined') {
      newState.stashItems = [...payload.stashItems.items];

      return ReduxHandlers.properResponse(currentState, newState);
    }

    newState.stashItems = [...currentState.stashItems];

    if (typeof payload.itemToAdd !== 'undefined') {
      newState.stashItems.push(payload.itemToAdd);
    }

    if (typeof payload.itemToRemove !== 'undefined') {
      const { ident } = payload.itemToRemove;

      newState.stashItems = Utils.removeFromArrayByIdent(ident, newState.stashItems);
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },
  handleUpdateEnemyUnits(currentState, payload) {
    const newState = {};

    if (typeof payload.enemyUnits !== 'undefined') {
      newState.enemyUnits = [...payload.enemyUnits];

      return ReduxHandlers.properResponse(currentState, newState);
    }

    newState.enemyUnits = [...currentState.enemyUnits];

    if (typeof payload.unitToAdd !== 'undefined') {
      newState.enemyUnits.push(payload.unitToAdd);
    }

    if (typeof payload.unitToRemove !== 'undefined') {
      const { ident } = payload.unitToRemove;

      newState.enemyUnits = Utils.removeFromArrayByIdent(ident, newState.enemyUnits);
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },
  handleUpdateFriendlyUnits(currentState, payload) {
    const newState = {};

    if (typeof payload.friendlyUnits !== 'undefined') {
      newState.friendlyUnits = [...payload.friendlyUnits];

      return ReduxHandlers.properResponse(currentState, newState);
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },

  properResponse(currentState, newState) {
    return { ...currentState, ...newState };
  },
};

export default ReduxHandlers;
