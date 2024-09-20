import asyncHandler from 'express-async-handler';
import pool from '../../database/pool.js'

//displays all items with no filters from database
export const getAllItems = asyncHandler(async (req, res) => {
    //connecting to riot_items db
    const client = await pool.connect();

    try {
        const items = await client.query('SELECT * FROM items');
        res.render('homepage', {items: items.rows});
    } catch (error) {
        console.log('Error fetching items:', error);
        throw error;
    }
});