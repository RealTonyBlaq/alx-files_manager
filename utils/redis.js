import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Promisify the necessary Redis methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setexAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

    this.client.on('error', (err) => {
      console.error(`Connection error: ${err}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    try {
      return await this.getAsync(key);
    } catch (err) {
      console.error(`Error getting key "${key}": ${err}`);
    }
  }

  async set(key, value, duration) {
    try {
      await this.setexAsync(key, duration, value.toString());
    } catch (err) {
      console.error(`Error setting key "${key}" with value "${value}": ${err}`);
    }
  }

  async del(key) {
    try {
      await this.delAsync(key);
    } catch (err) {
      console.error(`Error deleting key "${key}": ${err}`);
    }
  }
}

const redisClient = new RedisClient();

export default redisClient;
