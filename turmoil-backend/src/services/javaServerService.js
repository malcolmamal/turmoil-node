import fetch from 'node-fetch';

const API_PATH = 'http://localhost:8080';

class JavaServerService {
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
}

export default JavaServerService;
