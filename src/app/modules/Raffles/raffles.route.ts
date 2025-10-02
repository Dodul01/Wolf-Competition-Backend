import express from 'express';
import { upload, uploadRaffle } from '../../utils/uploadImage';
import { RafflesController } from './raffles.controller';

const router = express.Router();

router.post('/create-raffles', uploadRaffle.single("thumbnail"), RafflesController.createRaffles);
router.put('/update-raffles/:rafflesId', uploadRaffle.single('thumbnail'), RafflesController.updateRaffles);

export const RafflesRoutes = router;