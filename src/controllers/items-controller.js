import asyncHandler from 'express-async-handler';
import pool from '../../database/pool.js'

//displays all items with no filters from database
export const getAllItems = asyncHandler(async (req, res) => {
    //connecting to riot_items db
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items');
    res.render('homepage', {items: items.rows});
});

export const getStarterItems = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items WHERE $1 = ANY(tags) OR $2 = ANY(tags)', ['Lane', 'Jungle']);
    res.render('displayItems', {items: items.rows});
});

export const getToolsItems = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items WHERE $1 = ANY(tags) OR $2 = ANY(tags) OR $3 = ANY(tags)', ['Vision', 'GoldPer', 'Consumable']);
    res.render('displayItems', {items: items.rows});
});

export const getDefenseItems = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items WHERE $1 = ANY(tags) OR $2 = ANY(tags) OR $3 = ANY(tags) OR $4 = ANY(tags)', ['Health', 'SpellBlock', 'Armor', 'HealthRegen']);
    res.render('displayItems', {items: items.rows});
});

export const getAttackItems = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items WHERE $1 = ANY(tags) OR $2 = ANY(tags)', ['Lane', 'Jungle']);
    res.render('displayItems', {items: items.rows});
});

export const getMagicItems = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items WHERE $1 = ANY(tags) OR $2 = ANY(tags)', ['Lane', 'Jungle']);
    res.render('displayItems', {items: items.rows});
});

export const getMovementItems = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items WHERE $1 = ANY(tags) OR $2 = ANY(tags)', ['Lane', 'Jungle']);
    res.render('displayItems', {items: items.rows});
});

export const getUncategorizedItems = asyncHandler(async (req, res) => {
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items WHERE $1 = ANY(tags) OR $2 = ANY(tags)', ['Lane', 'Jungle']);
    res.render('displayItems', {items: items.rows});
});