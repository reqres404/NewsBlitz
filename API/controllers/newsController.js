const fs = require('fs').promises;
const path = require('path');

async function loadData() {
    try {
        const newsDataFile = path.join(__dirname, '..', 'data.json');
        console.log(newsDataFile)
        const data = await fs.readFile(newsDataFile, 'utf8');
        const newsData = JSON.parse(data);
        console.log("Data Sent");
        return newsData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAllNews(req, res) {
    try {
        console.log("Does this work");
        const newsData = await loadData();
        res.status(200).json(newsData);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}

const testRoute = (req, res) => {
    res.status(200).json({ message: "this works well" });
}

module.exports = {
    getAllNews,
    testRoute
};
