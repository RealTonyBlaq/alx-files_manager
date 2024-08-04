import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnected = false;

    this.client.on('error', (err) => {
      console.error(`Connection error: ${err}`);
    });

    this.client.on('ready', this.setStatus.bind(this));

    this.clientConnect();

    this.client.on('end', () => {
      this.isConnected = false;
    });
  }

  async clientConnect() {
    try {
      await this.client.connect();
    } catch (err) {
      console.error(`Connection error: ${err}`);
    }
  }

  setStatus() {
    this.isConnected = true;
  }

  isAlive() {
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

// Ensure the RedisClient instance is connected before exporting
const redisClient = new RedisClient();
export default redisClient;
