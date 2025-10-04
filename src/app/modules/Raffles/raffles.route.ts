import express from 'express';
import { uploadRaffle } from '../../utils/uploadImage';
import { RafflesController } from './raffles.controller';

const router = express.Router();

router.post('/create-raffles', uploadRaffle.single("thumbnail"), RafflesController.createRaffles);
router.put('/update-raffles/:rafflesId', uploadRaffle.single('thumbnail'), RafflesController.updateRaffles);
router.get('/get-single-raffle/:rafflesId', RafflesController.getSingleRaffle);
router.get('/get-all-raffle', RafflesController.getAllRaffles);


export const RafflesRoutes = router;