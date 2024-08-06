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
    const parentId = req.body.parentId || 0;
    const isPublic = req.body.isPublic;
    const data = req.body.data;

    const acceptedTypes = ['folder', 'file', 'image'];

    if (!name || name === '' || name === ' ') return res.status(400).send({ error: 'Missing name'});
    if (!type || !acceptedTypes.includes(type)) return res.status(400).send({ error: 'Missing type'});
    if ()
  }
}
