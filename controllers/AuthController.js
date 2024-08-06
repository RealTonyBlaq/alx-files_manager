/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import sha1 from 'sha1';
import { v4 } from 'uuid';
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

class AuthController {
  static async getConnect(req) {
    const headers = req.headers.Authorization || req.headers.authorization;
    if (!headers) {
      throw new Error('Incorrect Auth format type');
    }

    const [authType, Base64] = headers.split(' ');
    if (authType === 'Basic') {
      const [email, pwd] = atob(Base64).split(':');

      const password = sha1(pwd);
      const userDetails = await dbClient.retrieveUser({ email, password });

      const token = v4();
      const key = `auth_${token}`;
      const duration = 24 * 60 * 60;

      await redisClient.set(key, userDetails.id, duration);

      return { token };
    }
    throw new Error('Incorrect Authorization format');
  }

  static async getDisconnect(req) {
    const token = req.headers['x-token'] || req.headers['X-Token'];
    if (token) {
      const key = `auth_${token}`;
      await redisClient.del(key);
      return;
    }
    throw new Error('Incorrect Auth format');
  }
}

export default AuthController;
