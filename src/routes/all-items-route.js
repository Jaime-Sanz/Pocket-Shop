import express from 'express';
import { getAllItems, getItemById, getStarterItems, getConsumablesTrinkets, getAttackDamageItems, 
        getCriticalStrikeItems, getAttackSpeedItems, getOnHitEffectsItems, getArmorPenetrationItems, getAbilityPowerItems,
        getManaRegenerationItems, getMagicPenetrationItems, getHealthRegenerationItems, getArmorItems, getMagicResistanceItems,
        getAbilityHasteItems, getMovementItems, getLifestealOmnivampItems } from '../controllers/all-items-controller.js';

const router = express.Router();

//get request to display all items
router.get('/', getAllItems);

router.get('/item/:id', getItemById);

router.get('/starter', getStarterItems);

router.get('/consumables-trinkets', getConsumablesTrinkets);

router.get('/attack-damage', getAttackDamageItems);

router.get('/critical-strike', getCriticalStrikeItems);

router.get('/attack-speed', getAttackSpeedItems);

router.get('/on-hit', getOnHitEffectsItems);

router.get('/armor-penetration', getArmorPenetrationItems);

router.get('/ability-power', getAbilityPowerItems);

router.get('/mana-regeneration', getManaRegenerationItems);

router.get('/magic-penetration', getMagicPenetrationItems);

router.get('/health-regeneration', getHealthRegenerationItems);

router.get('/armor', getArmorItems);

router.get('/magic-resistance', getMagicResistanceItems)

router.get('/ability-haste', getAbilityHasteItems);

router.get('/movement', getMovementItems);

router.get('/lifesteal-omnivamp', getLifestealOmnivampItems);

export default router;