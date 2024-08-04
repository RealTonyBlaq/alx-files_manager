import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnected = false;

    this.client.on('error', (err) => {
      console.error(`Connection error: ${err}`);
      return this.isConnected = false;
    });

    this.client.on('ready', () => {
      return this.isConnected = true;
    });

    this.clientConnect();

    this.client.on('end', () => {
      return this.isConnected = false;
    });
  }

  async clientConnect() {
    await this.client.connect();
  }

  isAlive() {
    this.clientConnect();
    return this.isConnected;
  }

  async get(key) {
    if (!this.isAlive()) {
      await this.clientConnect();
    }

    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.log(`Fetch error: ${err}`);
    }
  }

  async set(key, value, duration) {
    if (!this.isAlive()) {
      this.clientConnect();
    }

    try {
      const reply = await this.client.SETEX(key, duration, value.toString());
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

const redisClient = new RedisClient();

export default redisClient;
