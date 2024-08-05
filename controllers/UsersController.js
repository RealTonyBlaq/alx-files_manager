/* eslint-disable import/extensions */
import dbClient from '../utils/db.js';

class UsersController {
  static async postNew(email, password) {
    const user = await dbClient.createUser(email, password);
    return user;
  }
}

export default UsersController;
