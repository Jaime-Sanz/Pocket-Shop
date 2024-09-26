import express from 'express';
import { getAllItems, getItemsByTag } from '../controllers/items-controller.js';

const router = express.Router();

//get request to display all items
router.get('/', getAllItems);

router.get('/items/:tag', getItemsByTag);

export default router;