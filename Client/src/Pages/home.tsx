import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NewsCard } from "../components/news-card";
import { NewsCarousel } from "../components/news-carousel";
import { fetchNewsData } from "../data/newsData";
import { useMediaQuery } from "../hooks/use-mobile";
import type { NewsArticle } from "../shared/schema";


const sampleArticles = [
  {
    id: 1,
    date: new Date(),
    category: "Tech",
    title: "Tech Innovation Breakthrough",
    imageUrl: "https://i.guim.co.uk/img/media/7da3665336c8cfb0b49443e8719109e84ebab711/0_18_4534_2720/master/4534.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=7c5f74578c80dea1b7399abe1a8dc5b0",
    description: "Photo by: Ricardo Treviño Jr. Senior Skaters Take Seventh in CS U.S. International Classic Miami's senior team secured seventh place in Boston for the CS U.S. International Classic on Friday night. Miami's RedHawks skated hard against a competitive eight-team field, finishing with a score of 56.13, placing them seventh. Their technical element score of 28.20 and program component score of 28.93 were among the best out of the competition, tying for seventh place. Saturday night saw Miami's team skate a free skate of 116.39, upping their closest competitor by 17 points. Miami's technical element score of 59.59 and program a",
    readMoreUrl: "https://example.com/tech-news/1",
  },
  {
    id: 2,
    date: new Date(),
    category: "World",
    title: "Climate Change Summit",
    imageUrl: "https://source.unsplash.com/random/800x600?climate",
    description: "World leaders gather to discuss urgent climate action measures...",
    readMoreUrl: "https://example.com/climate-news/1",
  },
  {
    id: 3,
    date: new Date(),
    category: "Sports",
    title: "Sports Championship Results",
    imageUrl: "https://source.unsplash.com/random/800x600?sports",
    description: "Unexpected victory in the world championship finals...",
    readMoreUrl: "https://example.com/sports-news/1",
  },
];

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentIndex, setCurrentIndex] = useState(0);

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

  if (isMobile) {
    return (
      <div className="h-screen bg-linear-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-950/50 dark:to-purple-950/50">
        <div className="relative h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full p-4"
            >
              <NewsCard
                article={articles[currentIndex]}
                className="h-full"
                isMobile={true}
                onSwipe={(direction) => {
                  if (direction === "left" && currentIndex < articles.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                  } else if (direction === "right" && currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Swipe indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-lg rounded-full px-4 py-2">
              <ChevronLeft className="w-4 h-4 text-white/60" />
              <span className="text-white/80 text-sm">Swipe</span>
              <ChevronRight className="w-4 h-4 text-white/60" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-8 ">
      {/* Header Text */}
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Stay <span className="text-primary">Informed</span>, Stay{" "}
          <span className="text-yellow-500">Engaged</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Get instant news summaries that matter to you
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded bg-primary text-white">
            All
          </button>
          <button className="px-4 py-2 rounded border">International</button>
          <button className="px-4 py-2 rounded border">Health</button>
          <button className="px-4 py-2 rounded border">Sports</button>
          <button className="px-4 py-2 rounded border">Politics</button>
          <button className="px-4 py-2 rounded border">Finance</button>
        </div>
      </div>

      {/* Carousel Container (fills remaining space) */}
      <div className="flex-grow flex justify-center">
        <div className="flex-grow rounded-xl overflow-hidden border bg-card">
          <NewsCarousel articles={articles} className="h-full" />
        </div>
      </div>
    </div>
  );
}