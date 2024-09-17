import axios from 'axios';

const fetchItemsFromRiot = async () => {
    try {
        //getting correct version of the game
        const versionResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = versionResponse.data;
        const latestVersion = versions[0];

        console.log('Latest API Version: ', latestVersion);
        //getting all items based on latest version of the game
        const itemResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`);

        //transforming data into object
        return Object.values(itemResponse.data.data);
    } catch (error) {
        console.log('Error fetching API versions: ', error.message);
        throw error;
    }
};

// const transformItemData = (item) => {
//     return {
//         id: item.id,
//         name: item.name,
//         description: item.description,
//         plaintext: item.plaintext,
        
//     }
// }

const processAndStoreItems = async () => {
    try {
        const items = await fetchItemsFromRiot();
        console.log(items);
        // const transformedItems = items.map(transformItemData);
        // await insertItems(transformedItems);
    } catch (error) {
        console.log('Error processing items:', error);
    }
};

processAndStoreItems();