import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error(`Connection error: ${err}`);
    });

    this.client.on('end', () => {
      this.isConnected = false;
    });

  }

  async clientConnect() {
    try {
      await this.client.connect();
      this.isConnected = true; // Set the status directly after connection
    } catch (err) {
      console.error(`Connection error: ${err}`);
    }
  }

  isAlive() {
    this.clientConnect();
    return this.isConnected;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Fetch error: ${err}`);
    }
  }

  async set(key, value, duration) {
    try {
      const reply = await this.client.setEx(key, duration, value.toString());
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
      console.error(`Delete error: ${err}`);
    }
  }
}


const redisClient = new RedisClient();

export default redisClient;
