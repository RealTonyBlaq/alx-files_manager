/* eslint-disable import/extensions */
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

class UsersController {
  static async postNew(email, password) {
    const user = await dbClient.createUser(email, password);
    return user;
  }

  static async getMe(req) {
    const token = req.headers['x-token'] || req.headers['X-Token'];
    if (token) {
      const key = `auth_${token}`;
      const _id = await redisClient.get(key);

      if (!_id) throw new Error('Incorrect token');

      const user = await dbClient.retrieveUser({ _id });
      return user;
    }
    throw new Error('Incorrect Auth format');
  }
}

export default UsersController;
