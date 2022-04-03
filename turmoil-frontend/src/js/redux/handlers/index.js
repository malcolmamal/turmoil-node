import Utils from '../../core/turmoil-utils';

const ReduxHandlers = {
  handleUpdateItemsInEquipment(currentState, payload) {
    const newState = {};

    if (payload.wornItems) {
      newState.equipmentItems = [...payload.wornItems.items];

      return ReduxHandlers.properResponse(currentState, newState);
    }

    newState.equipmentItems = [...currentState.equipmentItems];

    if (payload.itemToAdd) {
      const { slot } = payload.itemToAdd;

      newState.equipmentItems = Utils.removeFromArrayBySlot(
        slot,
        newState.equipmentItems,
      );
      newState.equipmentItems.push(payload.itemToAdd);
    }

    if (payload.itemToRemove) {
      const { slot } = payload.itemToRemove;
      const { ident } = payload.itemToRemove;

      newState.equipmentItems = Utils.removeFromArrayByIdent(
        ident,
        newState.equipmentItems,
      );
      newState.equipmentItems.push(window.turmoil.equipment.defaultItems[slot]);
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },
  handleUpdateItemsInStash(currentState, payload) {
    const newState = {};

    if (payload.stashItems) {
      newState.stashItems = [...payload.stashItems.items];

      return ReduxHandlers.properResponse(currentState, newState);
    }

    newState.stashItems = [...currentState.stashItems];

    if (payload.itemToAdd) {
      newState.stashItems.push(payload.itemToAdd);
    }

    if (payload.itemToRemove) {
      const { ident } = payload.itemToRemove;

      newState.stashItems = Utils.removeFromArrayByIdent(
        ident,
        newState.stashItems,
      );
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },
  handleUpdateEnemyUnits(currentState, payload) {
    const newState = {};

    if (payload.enemyUnits) {
      newState.enemyUnits = [...payload.enemyUnits];

      return ReduxHandlers.properResponse(currentState, newState);
    }

    newState.enemyUnits = [...currentState.enemyUnits];

    if (payload.unitToAdd) {
      newState.enemyUnits.push(payload.unitToAdd);
    }

    if (payload.unitToUpdate) {
      const { ident } = payload.unitToUpdate;

      newState.enemyUnits = Utils.removeFromArrayByIdent(
        ident,
        newState.enemyUnits,
      );
      newState.enemyUnits.push(payload.unitToUpdate);
    }

    if (payload.unitToRemove) {
      const { ident } = payload.unitToRemove;

      newState.enemyUnits = Utils.removeFromArrayByIdent(
        ident,
        newState.enemyUnits,
      );
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },
  handleUpdateFriendlyUnits(currentState, payload) {
    const newState = {};

    if (payload.friendlyUnits) {
      newState.friendlyUnits = [...payload.friendlyUnits];

      return ReduxHandlers.properResponse(currentState, newState);
    }

    newState.friendlyUnits = [...currentState.friendlyUnits];

    if (payload.unitToUpdate) {
      const { ident } = payload.unitToUpdate;

      newState.friendlyUnits = Utils.removeFromArrayByIdent(
        ident,
        newState.friendlyUnits,
      );
      newState.friendlyUnits.push(payload.unitToUpdate);
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },
  handleUpdateLocationField(currentState, payload) {
    const newState = {};

    if (payload && payload.ident) {
      newState.locationFields = { ...currentState.locationFields };

      newState.locationFields[payload.ident] = payload;
    }

    return ReduxHandlers.properResponse(currentState, newState);
  },

  properResponse(currentState, newState) {
    return { ...currentState, ...newState };
  },
};

export default ReduxHandlers;
