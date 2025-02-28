import axios from 'axios';
import type { NewsArticle } from '../shared/schema';

const url = "http://localhost:4000/api/news";

export const fetchNewsData = async (): Promise<NewsArticle[]> => {
    try {
        const response = await axios.get(url);
        return response.data as NewsArticle[];
    } catch (error) {
        console.error("Error fetching news data:", error);
        throw error;
    }
};