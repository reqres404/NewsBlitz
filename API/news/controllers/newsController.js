import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const loadData = async () => {
    try {
        const newsDataFile = path.join(__dirname, '../../../NewsData/Data/news_summarised.json')
        console.log(`getting news data from ${newsDataFile}`)
        const data = await fs.readFile(newsDataFile, 'utf-8')
        const newsData = JSON.parse(data)
        return newsData
    } catch (error) {
        console.log(error)
    }
}

export const getALLNews = async (req, res) => {
    try {
        const newsData = await loadData();
        res.status(200).json(newsData)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

