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
    const reply = await this.getAsync(key);
    return reply;
  }

  async set(key, value, duration) {
    await this.setexAsync(key, duration, value.toString());
  }

  async del(key) {
    await this.delAsync(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
