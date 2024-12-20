import { Router } from 'express';
import { getFalPage, getRandomFal } from '../controllers/hafezController';

const router = Router();

// Main page route
router.get('/', getFalPage);

// Fetch random Hafez poem
router.get('/fal', getRandomFal);

export default router;
