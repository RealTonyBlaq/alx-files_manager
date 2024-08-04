import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => console.error(`Connection error: ${err}`));
    await this.client.connect();
  }


}
