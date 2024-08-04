/* eslint-disable import/extensions */
import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

class AppController {
  static getStatus() {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();

    return { redis, db };
  }

  static async getStats() {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();

    return { users, files };
  }
}

export default AppController;
