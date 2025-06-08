import { useQuery } from "@tanstack/react-query";
import type { NewsArticle } from "../shared/schema";
import { fetchNewsData } from "../data/newsData";

export function useNews() {
    return useQuery<NewsArticle[]>({
        queryKey: ["newsData"],
        queryFn: fetchNewsData,
    });
}
