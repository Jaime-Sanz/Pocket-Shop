import axios from 'axios';
import pool from '../../database/pool.js';
import sanitizeHTML from 'sanitize-html';
import { keepItemIds, removeItemsIds } from './itemsArrays.js';

// Sanitize item descriptions
const sanitizeItems = (item) => {
    return {
        ...item,
        description: sanitizeHTML(item.description, {
            allowedTags: ['mainText', 'stats', 'attention', 'br'],
            allowedAttributes: {}
        })
    };
};

// Get the correct version of League of Legends
const fetchVersionFromRiot = async () => {
    try {
        const versionResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = versionResponse.data;
        const latestVersion = versions[0];
        console.log('Latest API Version: ', latestVersion);
        return latestVersion;
    } catch (error) {
        console.log('Error fetching API versions: ', error.message);
        throw error;
    }
};

// Get items from League of Legends
const fetchItemsFromRiot = async (latestVersion) => {
    try {
        const itemResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`);
        return Object.entries(itemResponse.data.data).map(([id, itemData]) => {
            return { id, ...itemData };
        });
    } catch (error) {
        console.log('Error fetching API items: ', error.message);
        throw error;
    }
};

// Transform item data
const transformItemData = async (item, version) => {
    try {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            plaintext: item.plaintext || '',
            gold_total: item.gold.total || 0,
            img: `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.id}.png`,
            tags: item.tags || []
        };
    } catch (error) {
        console.error('Error transforming item data:', error);
    }
};

// Insert items into the database
const insertItems = async (items) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const item of items) {
            const sanitizedItem = sanitizeItems(item);
            const insertQuery = `
            INSERT INTO items (id, name, description, plaintext, gold_total, img, tags)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO UPDATE
            SET name = EXCLUDED.name,
                description = EXCLUDED.description,
                plaintext = EXCLUDED.plaintext,
                gold_total = EXCLUDED.gold_total,
                img = EXCLUDED.img,
                tags = EXCLUDED.tags;
            `;

            const values = [
                sanitizedItem.id,
                sanitizedItem.name,
                sanitizedItem.description,
                sanitizedItem.plaintext,
                sanitizedItem.gold_total,
                sanitizedItem.img,
                sanitizedItem.tags
            ];

            await client.query(insertQuery, values);
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error inserting items:', error);
        throw error;
    } finally {
        client.release();
    }
};

// Filter duplicate items based on name
const filterDuplicates = (items) => {
    const uniqueItems = {};
    items.forEach(item => {
        if (!uniqueItems[item.name]) {
            uniqueItems[item.name] = item; // Keep the first instance
        }
    });
    return Object.values(uniqueItems);
};

// Truncate the items table before inserting new items
const truncateItemsTable = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('TRUNCATE TABLE items RESTART IDENTITY'); // Clear all rows and reset ID
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error truncating items table:', error);
    } finally {
        client.release();
    }
};

// Process and store items
const processAndStoreItems = async () => {
    try {
        const version = await fetchVersionFromRiot();
        const items = await fetchItemsFromRiot(version);
        const transformedItems = await Promise.all(items.map(item => transformItemData(item, version)));

        // Truncate the items table before inserting new items
        await truncateItemsTable(); // Call this here


        // Filter items
        const filteredItems = transformedItems.filter(item => {

            if(removeItemsIds.includes(item.id)) {
                console.log(`Item ${item.name} (ID: ${item.id}) is removed regardless of parameters`)
                return false;
            };

            if (keepItemIds.includes(item.id)) {
                console.log(`Item ${item.name} (ID: ${item.id}) is kept regardless of gold total.`);
                return true; // Keep this item
            }
            return item.gold_total > 0; // Include items with a gold_total greater than 0
        });

        // Insert filtered items into the database
        await insertItems(filteredItems);
        console.log('Filtered items inserted successfully');
        process.exit(0);
    } catch (error) {
        console.log('Error processing items:', error);
    }
};

// Run the process
processAndStoreItems();
