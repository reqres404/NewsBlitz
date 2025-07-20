// src/data/fetchNewsData.ts
import axios from "axios";
import type { NewsArticle } from "../shared/schema";

interface BEArticle {
    news_number: number;
    title: string;
    content: string;
    publisher: string;
    url: string;
    imgURL: string;
    date: string | null;
}


const url = "http://127.0.0.1:3000/api/news";

export const fetchNewsData = async (): Promise<NewsArticle[]> => {
    try {
        const response = await axios.get(url);
        const data = response.data as Record<string, BEArticle[]>; // data is grouped by category (e.g. "AI", "Health")
        const articles: NewsArticle[] = [];

        Object.entries(data).forEach(([category, items]) => {
            items.forEach((item: BEArticle) => {
                articles.push({
                    news_number: Number(item.news_number),
                    title: item.title,
                    imageUrl: item.imgURL,
                    category,                        // use the category key from BE
                    publisher: item.publisher,
                    description: item.content,
                    date: item.date ? new Date(item.date) : new Date(),
                    readMoreUrl: item.url,
                });
            });
        });
        return articles;
    } catch (error) {
        console.error("Error fetching news data:", error);
        throw error;
    }
};
