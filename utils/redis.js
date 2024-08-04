import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => console.error(`Connection error: ${err}`));
    this.client.connect();
  }

  isAlive() {
    let status = false;
    this.client.on('ready', () => {
      status = true;
    });
    return status;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.log(`Fetch error: ${err}`);
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
      console.log(reply);
    } catch (err) {
      console.error(`Set error: ${err}`);
    }
  }

  async del(key) {
    try {
      const reply = await this.client.del(key);
      console.log(`Reply: ${reply}`);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
}

export default new RedisClient();
