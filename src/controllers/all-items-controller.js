import asyncHandler from 'express-async-handler';
import pool from '../../database/pool.js'

export const getItemById = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const id = req.params.id; 
    const item = await client.query('SELECT * FROM items WHERE id = $1', [id]);
    res.render('displayitem', {item: item.rows[0]});
});

export const getAllItems = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items');
    res.render('displayitems', {items: items.rows});
});

export const getStarterItems = asyncHandler(async (req, res) => {
    const excludedIds = ['3866', '3867', '3869', '3870', '3871', '3876', '3877', '1036', '2003', '2031', '2033', '2055', '3340'];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags) OR $2 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 3}`).join(', ')})`,
        ['Lane', 'Jungle', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getConsumablesTrinkets = asyncHandler(async (req, res) => {
    const excludedIds = ['3179', '3865', '4646'];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags) OR $2 = ANY(tags) OR $3 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 4}`).join(', ')})`,
        ['Consumable', 'GoldPer', 'Vision', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getAttackDamageItems = asyncHandler(async (req, res) => {
    const excludedIds = ['2140'];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['Damage', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getCriticalStrikeItems = asyncHandler(async (req, res) => {
    const excludedIds = ['-1'];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['CriticalStrike', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getAttackSpeedItems = asyncHandler(async (req, res) => {
    const excludedIds = ['-1'];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['AttackSpeed', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getOnHitEffectsItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['OnHit', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getArmorPenetrationItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['ArmorPenetration', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getAbilityPowerItems = asyncHandler(async (req, res) => {
    const excludedIds = ['2139'];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['SpellDamage', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

//Mana & Mana Regeneration
export const getManaRegenerationItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags) OR $2 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 3}`).join(', ')})`,
        ['Mana', 'ManaRegen', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getMagicPenetrationItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['MagicPenetration', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

//Health & Health Regeneration
export const getHealthRegenerationItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags) OR $2 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 3}`).join(', ')})`,
        ['Health', 'HealthRegen', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getArmorItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['Armor', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getMagicResistanceItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['SpellBlock', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getAbilityHasteItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(', ')})`,
        ['CooldownReduction', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

export const getMovementItems = asyncHandler(async (req, res) => {
    const excludedIds = [-1];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags) OR $2 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 3}`).join(', ')})`,
        ['Boots', 'NonbootsMovement', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

//Lifesteal & Omnivamp
export const getLifestealOmnivampItems = asyncHandler(async (req, res) => {
    const excludedIds = ['2140'];
    const client = await pool.connect();
    const items = await client.query(
        `SELECT * FROM items 
        WHERE ($1 = ANY(tags) OR $2 = ANY(tags))
        AND id NOT IN (${excludedIds.map((_, i) => `$${i + 3}`).join(', ')})`,
        ['SpellVamp', 'LifeSteal', ...excludedIds]
    );
    res.render('displayitems', {items: items.rows});
});

