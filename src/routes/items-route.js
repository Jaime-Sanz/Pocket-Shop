import express from 'express';
import { getAllItems, getStarterItems, getToolsItems, 
        getDefenseItems, getAttackItems, getMagicItems, 
        getMovementItems, getUncategorizedItems } from '../controllers/items-controller.js';

const router = express.Router();

//get request to display all items
router.get('/', getAllItems);

router.get('/starter', getStarterItems);

router.get('/tools', getToolsItems);

router.get('/defense', getDefenseItems);

router.get('/attack', getAttackItems);

router.get('/magic', getMagicItems);

router.get('/movement', getMovementItems);

router.get('/uncategorized', getUncategorizedItems)



export default router;