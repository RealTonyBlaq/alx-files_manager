import { Router } from "express";
import AppController from "../controllers/AppController.js";

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).send(AppController.getStatus());
});

router.get('/stats', async (req, res) => {
  res.status(200).send(await AppController.getStats());
});

export default router;
