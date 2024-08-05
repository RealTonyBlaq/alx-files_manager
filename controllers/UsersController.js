/* eslint-disable import/extensions */
import dbClient from "../utils/db.js";


class UsersController {
  static async postNew(email, password) {
    return await dbClient.createUser(email, password);
  }
}

export default UsersController;
