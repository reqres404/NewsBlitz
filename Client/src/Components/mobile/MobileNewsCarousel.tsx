import { useState } from "react";
import type { NewsArticle } from "../../shared/schema";
import { Button } from "../ui/button";
import { MobileNewsCard } from "./MobileNewsCard";

interface MobileNewsCarouselProps {
    news: NewsArticle[];
}


export function MobileNewsCarousel({ news }: MobileNewsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const currentNews = news[activeIndex];

    return (
        <div className="relative h-full touch-pan-y">
            <MobileNewsCard article={currentNews} />
            {/* Up/Down controls */}
            <div className="absolute top-1/2 left-4 flex flex-col gap-2">
                <Button
                    onClick={() =>
                        setActiveIndex((prev) => (prev > 0 ? prev - 1 : news.length - 1))
                    }
                    variant="ghost"
                >
                    Up
                </Button>
            </div>
            <div className="absolute bottom-16 right-4 flex flex-col gap-2">
                <Button
                    onClick={() =>
                        setActiveIndex((prev) => (prev < news.length - 1 ? prev + 1 : 0))
                    }
                    variant="ghost"
                >
                    Down
                </Button>
            </div>
            {/* News Count Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold">
                {`News ${activeIndex + 1} of ${news.length}`}
            </div>
        </div>
    );
}