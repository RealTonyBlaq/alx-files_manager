import UsersController from './UsersController.js';

class FilesController {
  static async postUpload(req, res) {
    try {
      const user = await UsersController.getMe(req);
    } catch (err) {
      return res.status(401).send({ error: 'Unauthorized'});
    }

    // Retrieveing the request body parameters
    const name = req.body.name;
    const type = req.body.type;
    
  }
}
