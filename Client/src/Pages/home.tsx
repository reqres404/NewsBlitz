import { useQuery } from "@tanstack/react-query";
import { useNews } from "../hooks/useNews";
import { useState } from "react";
import { DesktopHome } from "../components/desktop/desktop-home";
import { MobileHome } from "../components/mobile/mobile-home";
import { useMediaQuery } from "../hooks/use-mobile";
import type { NewsArticle } from "../shared/schema";


const sampleArticles = [
  {
    news_number: 1,
    date: new Date(),
    category: "Tech",
    title: "Tech Innovation Breakthrough",
    imageUrl: "https://i.guim.co.uk/img/media/7da3665336c8cfb0b49443e8719109e84ebab711/0_18_4534_2720/master/4534.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=7c5f74578c80dea1b7399abe1a8dc5b0",
    publisher: "Times of india",
    description: "Photo by: Ricardo Treviño Jr. Senior Skaters Take Seventh in CS U.S. International Classic Miami's senior team secured seventh place in Boston for the CS U.S. International Classic on Friday night. Miami's RedHawks skated hard against a competitive eight-team field, finishing with a score of 56.13, placing them seventh. Their technical element score of 28.20 and program component score of 28.93 were among the best out of the competition, tying for seventh place. Saturday night saw Miami's team skate a free skate of 116.39, upping their closest competitor by 17 points. Miami's technical element score of 59.59 and program a",
    readMoreUrl: "https://example.com/tech-news/1",
  },
  {
    news_number: 2,
    date: new Date(),
    category: "World",
    title: "Ranji Trophy Final: Spin wizard Harsh Dubey creates history on Day 3 to hand Vidarbha slight edge over Kerala",
    imageUrl: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2025/02/brand-content-1740729701.jpg",
    publisher: "bbc",
    description: "AI is transforming digital marketing by automating tasks like content generation, customer service response, and personalization. However, humans remain essential for creativity, strategy, and ethical considerations. To stay competitive, marketers need seven key AI skills: understanding ChatGPT, content creation, data analysis, automation tools, SEO adaptability, ethical practices, and continuous learning. These skills empower them to harness AI\u2019s power while maintaining creativity and responsibility.",
    readMoreUrl: "https://example.com/climate-news/1",
  },
  {
    news_number: 3,
    date: new Date(),
    category: "Sports",
    title: "Sports Championship Results",
    imageUrl: "https://source.unsplash.com/random/800x600?sports",
    publisher: "bbc",
    description: "Unexpected victory in the world championship finals...",
    readMoreUrl: "https://example.com/sports-news/1",
  },
];

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: articles, isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["newsData"],
    queryFn: async () => {
      return new Promise<NewsArticle[]>((resolve) => {
        setTimeout(() => resolve(sampleArticles), 1500);
      });
    },
  });

  if (isLoading || !articles) {
    return (
      <div className="fixed flex items-center justify-center h-full bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  const filteredArticles = articles?.filter(
    (article) => selectedCategory === "All" || article.category === selectedCategory
  );


  return isMobile ? (
    <MobileHome
      filteredArticles={filteredArticles}
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      isFilterOpen={isFilterOpen}
      onFilterOpenChange={setIsFilterOpen}
    />
  ) : (
    <DesktopHome
      filteredArticles={filteredArticles}
      onFilterChange={setSelectedCategory}
    />
  );
}