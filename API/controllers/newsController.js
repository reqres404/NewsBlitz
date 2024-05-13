const fs = require('fs').promises;
const path = require('path');

async function loadData() {
    try {
        // ../API/data.json
        const newsDataFile = path.join(__dirname, '..', 'data.json');
        const data = await fs.readFile(newsDataFile, 'utf8');
        const newsData = JSON.parse(data);
        
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it outside
    }
}

async function getAllNews(req,res) {
    try {
        // Load data
        const newsData = await loadData();

        // Perform operations that depend on newsData here
        // For example:
        res.status(200).json(newsData)
        
        return newsData;
    } catch (error) {
        console.error(error);
        res.status(404).json({error:error})
        throw error; // Re-throw the error to handle it outside
    }
}

module.exports = {
    getAllNews
};

// Usage:
// getAllNews().then(newsData => {
//     // Use newsData here
// }).catch(error => {
//     // Handle error
// });
