// components/desktop/DesktopHome.tsx
import type { NewsArticle } from "../../shared/schema";
import Filter from "../Flter";
import { NewsCarousel } from "./NewsCarousel";

interface DesktopHomeProps {
    filteredArticles: NewsArticle[];
    onFilterChange: (category: string) => void;
}

export function DesktopHome({
    filteredArticles,
    onFilterChange,
}: DesktopHomeProps) {
    return (
        <div className="container py-6 space-y-8">
            <div className="flex justify-center">
                <Filter onFilterChange={onFilterChange} />
            </div>
            <div className="flex-grow flex justify-center">
                <div className="flex-grow rounded-xl overflow-hidden border bg-card">
                    <NewsCarousel articles={filteredArticles} className="h-full" />
                </div>
            </div>
        </div>
    );
}
