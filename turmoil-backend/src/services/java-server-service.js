import fetch from 'node-fetch';

export const API_PATH = 'http://localhost:8080';

// TODO: wrap each fetch and check for errors

class JavaServerService {
  static tooltip = async (type, ident) => {
    const result = await fetch(
      `${API_PATH}/tooltip/${type}/${ident}`,
    );

    if (!result.ok) {
      const errorMessage = await result.text();
      const error = new Error(`tooltip -> ${errorMessage}`);
      error.statusCode = result.status;

      return Promise.reject(error);
    }

    return result.text();
  };

  static characterState = async () => {
    const result = await fetch(
      `${API_PATH}/character/state`,
    );

    return result.json();
  };

  static characterEquipItem = async (item) => {
    const result = await fetch(
      `${API_PATH}/character/equip/${item}`,
    );

    return result.json();
  };

  static characterUnequipItem = async (item) => {
    const result = await fetch(
      `${API_PATH}/character/unequip/${item}`,
    );

    return result.json();
  };

  static initializeStash = async () => {
    const result = await fetch(
      `${API_PATH}/initializeStash`,
    );

    return result.json();
  };

  static initializeEquipment = async () => {
    const result = await fetch(
      `${API_PATH}/initializeEquipment`,
    );

    return result.json();
  };

  static initializeEnemyUnits = async () => {
    const result = await fetch(
      `${API_PATH}/instance/initializeEnemyUnits`,
    );

    return result.json();
  };

  static initializeFriendlyUnits = async () => {
    const result = await fetch(
      `${API_PATH}/instance/initializeFriendlyUnits`,
    );

    return result.json();
  };

  static instanceActionOnPosition = async (position) => {
    const result = await fetch(
      `${API_PATH}/instance/instanceActionOnPosition/${position}`,
    );

    return result.json();
  };

  static itemToStash = async (body) => {
    const result = await fetch(
      `${API_PATH}/json/jsonItemToStash`,
      { method: 'POST', body },
    );

    return result.json();
  };

  static generateItem = async (boost) => {
    const result = await fetch(
      `${API_PATH}/json/jsonGenerateItem/${boost || 0}`,
    );

    return result.json();
  };

  static fetchItem = async (itemIdent) => {
    const result = await fetch(
      `${API_PATH}/json/jsonFetchItem/${itemIdent}`,
    );

    return result.json();
  };
}

export default JavaServerService;
