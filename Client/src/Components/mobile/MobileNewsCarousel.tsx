import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import type { NewsArticle } from "../../shared/schema";
import { MobileNewsCard } from "./MobileNewsCard";

interface MobileNewsCarouselProps {
    news: NewsArticle[];
    className?: string;
}

export function MobileNewsCarousel({ news, className }: MobileNewsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const currentNews = news[activeIndex];

    // Horizontal swipe variants:
    const variants = {
        initial: (direction: "left" | "right") => ({
            opacity: 0,
            x: direction === "right" ? 100 : -100,
        }),
        animate: { opacity: 1, x: 0 },
        exit: (direction: "left" | "right") => ({
            opacity: 0,
            x: direction === "right" ? -100 : 100,
        }),
    };

    const handleDragEnd = useCallback(
        (event: MouseEvent | TouchEvent, info: any) => {
            const swipeThreshold = 100;
            const offsetX = info.offset.x;
            const velocityX = info.velocity.x;
            const swipePower = offsetX + velocityX * 0.2;

            if (swipePower > swipeThreshold) {
                // Swiped right: new article
                setDirection("right");
                setActiveIndex((prev) => (prev < news.length - 1 ? prev + 1 : 0));
            } else if (swipePower < -swipeThreshold) {
                // Swiped left: previous article
                setDirection("left");
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : news.length - 1));
            }
        },
        [news.length]
    );

    return (
        <div className={`relative w-full h-full overflow-hidden ${className || ""}`}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    className="w-full h-full"
                >
                    <MobileNewsCard article={currentNews} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
