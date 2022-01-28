import fetch from 'node-fetch';

const API_PATH = 'http://localhost:8080';

class JavaServerService {
  static initializeStash = async () => {
    const result = await fetch(
      `${API_PATH}/initializeStash`,
    );

    return result.json();
  };

  static initializeEnemyUnits = async () => {
    const result = await fetch(
      `${API_PATH}/instance/initializeEnemyUnits`,
    );

    return result.json();
  };
}

export default JavaServerService;
