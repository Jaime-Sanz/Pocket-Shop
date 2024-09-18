import axios from 'axios';
import pool from '../../database/pool.js';

//used to get correct version of league of legends
const fetchVersionFromRiot = async () => {
    try {
        const versionResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = versionResponse.data;
        const latestVersion = versions[0];
        console.log('Latest API Version: ', latestVersion);
        return(latestVersion);
    } catch (error) {
        console.log('Error fetching API versions: ', error.message);
        throw error;
    }
}

//used to get items from league of legends
const fetchItemsFromRiot = async (latestVersion) => {
    try {
        //getting all items based on latest version of the game
        const itemResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`);

        //transforming data into object
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
            img: `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.id}.png`
        };
    } catch (error) {
        console.error('Error transforming item data:', error);
        // Handle the error or return default values
        return {
            id: item.id,
            name: item.name,
            description: cleanDescription(item.description),
            plaintext: item.plaintext || '',
            gold_total: item.gold.total || 0,
            img: ''  // Or some default image URL
        };
    }
}

const insertItems = async (items) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const item of items) {
            const insertQuery = `
            INSERT INTO items (id, name, description, plaintext, gold_total, img)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO UPDATE
            SET name = EXCLUDED.name,
                description = EXCLUDED.description,
                plaintext = EXCLUDED.plaintext,
                gold_total = EXCLUDED.gold_total,
                img = EXCLUDED.img;
            `;

            const values = [
                item.id,
                item.name,
                item.description,
                item.plaintext,
                item.gold_total,
                item.img,
            ];

            await client.query(insertQuery, values);
        }

        await client.query('COMMIT');
    }  catch (error) {
        await client.query('ROLLBACK');
        console.error('Error inserting items:', error);
        throw error;
    } finally {
        client.release();
    }
};


const processAndStoreItems = async () => {
    try {
        const version = await fetchVersionFromRiot();
        const items = await fetchItemsFromRiot(version);
        const transformedItems = await Promise.all(items.map(item => transformItemData(item, version)));
        await insertItems(transformedItems);
        console.log('Items inserted successfully');
        process.exit(0); 
    } catch (error) {
        console.log('Error processing items:', error);
    }
};

processAndStoreItems();