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
      console.log('Connected');
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
    return this.isConnected;
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
      const reply = await this.client.SETEX(key, );
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
