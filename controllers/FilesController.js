/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import { v4 } from 'uuid';
import { writeFile, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import dbClient from '../utils/db.js';
import UsersController from './UsersController.js';
import redisClient from '../utils/redis.js';

class FilesController {
  static async postUpload(req, res) {
    let user;
    try {
      user = await UsersController.getMe(req);
    } catch (err) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    // Retrieving the request body parameters
    const { name } = req.body;
    const { type } = req.body;
    const parentId = req.body.parentId || 0;
    const isPublic = req.body.isPublic || false;
    const { data } = req.body;

    const acceptedTypes = ['folder', 'file', 'image'];

    if (!name || name === '' || name === ' ') return res.status(400).send({ error: 'Missing name' });
    if (!type || !acceptedTypes.includes(type)) return res.status(400).send({ error: 'Missing type' });
    if (!data && type !== 'folder') return res.status(400).send({ error: 'Missing data' });
    if (parentId !== 0) {
      if (!(await dbClient.fileExists({ _id: parentId }))) return res.status(400).send({ error: 'Parent not found' });

      let file;
      try {
        file = await dbClient.retrieveFile({ _id: parentId });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Parent is not a folder' });
      }

      if (file.type !== 'folder') return res.status(400).send({ error: 'Parent is not a folder' });
    }

    const obj = {
      userId: user.id,
      parentId,
      name,
      type,
      isPublic,
    };

    if (type !== 'folder') {
      const relativePath = process.env.FOLDER_PATH || '/tmp/files_manager';
      const path = `${relativePath}/${v4()}`;

      this.saveToPath(path, data);
      obj.localPath = path;
    }
    const newFile = await dbClient.createFile(obj);

    newFile.id = newFile._id;
    delete newFile._id;
    if (newFile.localPath) delete newFile.localPath;

    return res.status(201).send(newFile);
  }

  static saveToPath(path, data) {
    const content = atob(data);

    const dir = dirname(path);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFile(path, content, 'utf-8', (err) => {
      if (err) console.error(err);
    });
  }

  static async getShow(req, res, id) {
    const token = req.headers['x-token'] || req.headers['X-Token'];
    if (token) {
      const key = `auth_${token}`;
      const _id = await redisClient.get(key);

      if (!_id) return res.status(401).send({ error: 'Unauthorized' });

      let user;
      try {
        user = await dbClient.retrieveUser({ _id });
      } catch (err) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      let file;
      try {
        file = await dbClient.retrieveFile({ _id: id, userId: user.id });
      } catch (err) {
        return res.status(404).send({ error: 'Not found' });
      }
      if (file.localPath) delete file.localPath;
      return res.status(200).send(file);
    }
    return res.status(401).send({ error: 'Unauthorized' });
  }
}

export default FilesController;
