import fetch from 'node-fetch';

const API_PATH = 'http://localhost:8080';

class Server {
  static initializeStash = async () => {
    const result = await fetch(
      `${API_PATH}/initializeStash`,
    );

    return result.json();
  };
}

export default Server;
