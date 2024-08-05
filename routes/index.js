/* eslint-disable import/extensions */
import { Router } from 'express';
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).send(AppController.getStatus());
});

router.get('/stats', async (req, res) => {
  res.status(200).send(await AppController.getStats());
});

router.post('/users', async (req, res) => {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ error: 'Missing email' });
  if (!password) res.status(400).send({ error: 'Missing password' });

  try {
    const response = await UsersController.postNew(email, password);
    res.status(201).send(response);
  } catch (err) {
    res.status(400).send({ error: 'Already exist' });
  }
});

export default router;
