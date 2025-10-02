import express from 'express';
import { upload, uploadRaffle } from '../../utils/uploadImage';
import { RafflesController } from './raffles.controller';

const router = express.Router();

router.post('/create-raffles', uploadRaffle.single("thumbnail"), RafflesController.createRaffles);

export const RafflesRoutes = router;