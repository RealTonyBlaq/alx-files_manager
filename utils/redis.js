import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => console.error(`Connection error: ${err}`));
    this.client.connect();
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
    } catch (err) {
      
    }
  }

}
