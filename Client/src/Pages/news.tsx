import { useState } from "react";
import { DesktopHome } from "../components/desktop/DesktopHome";
import { MobileHome } from "../components/mobile/MobileHome";
import { useMediaQuery } from "../hooks/useMobile";
import { useNews } from "../hooks/useNews";




export default function News() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: articles, isLoading } = useNews();

  if (isLoading || !articles) {
    return (
      <div className="fixed inset-0 flex items-center justify-center w-full h-screen bg-background">
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