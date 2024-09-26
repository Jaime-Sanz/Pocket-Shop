import asyncHandler from 'express-async-handler';
import pool from '../../database/pool.js'

//displays all items with no filters from database
export const getAllItems = asyncHandler(async (req, res) => {
    //connecting to riot_items db
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items');
    res.render('homepage', {items: items.rows});
});

export const getItemsByTag = asyncHandler(async (req, res) => {
    const { tag } = req.params;
    const client = await pool.connect();
    const items = await client.query('SELECT * FROM items WHERE $1 = ANY(tags)', [tag]);
    res.render('itemsByTag', {items: items.rows, tag});
});