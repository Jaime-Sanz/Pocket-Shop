import express from 'express';
import { getAllItems } from '../controllers/items-controller.js';

const router = express.Router();

//get request to display all items
router.get('/', getAllItems);

export default router;