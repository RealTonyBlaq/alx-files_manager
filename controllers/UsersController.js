/* eslint-disable import/extensions */
import dbClient from '../utils/db.js';

class UsersController {
  static async postNew(email, password) {
    const user = await dbClient.createUser(email, password);
    return user;
  }

  static async getMe(req) {
    const token = req.headers['x-token'];
    if (token) {
      const user = await dbClient.retrieveUser({ token });
      return user;
    }
    throw new Error('Incorrect Auth format');
  }
}

export default UsersController;
