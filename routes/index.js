/* eslint-disable import/extensions */

import { Router } from 'express';
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';
import AuthController from '../controllers/AuthController.js';

const router = Router();

router.get('/status', (req, res) => res.status(200).send(AppController.getStatus()));

router.get('/stats', async (req, res) => res.status(200).send(await AppController.getStats()));

router.get('/connect', async (req, res) => {
  try {
    const response = await AuthController.getConnect(req);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
});

router.get('/disconnect', async (req, res) => {
  try {
    await AuthController.getDisconnect(req);
    return res.status(204).send('');
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
});

router.get('/users/me', async (req, res) => {
  try {
    const response = await UsersController.getMe(req);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
});

router.post('/users', async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ error: 'Missing email' });
  if (!password) return res.status(400).send({ error: 'Missing password' });

  try {
    const response = await UsersController.postNew(email, password);
    return res.status(201).send(response);
  } catch (err) {
    return res.status(400).send({ error: 'Already exist' });
  }
});

export default router;
