import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useRef, useEffect } from "react";
import type { NewsArticle } from "../../shared/schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function MobileNewsCard({ article }: { article: NewsArticle }) {
    const textAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const textArea = textAreaRef.current;
        if (!textArea) return;

        let startY = 0;
        let startX = 0;
        let isHorizontalSwipe = false;

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isHorizontalSwipe = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!startX || !startY) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);

            // If horizontal movement is greater than vertical, treat as horizontal swipe
            if (diffX > diffY && diffX > 10) {
                isHorizontalSwipe = true;
                // Prevent vertical scrolling for horizontal swipes
                e.preventDefault();
            } else if (diffY > diffX && diffY > 10) {
                // Allow vertical scrolling for vertical swipes
                isHorizontalSwipe = false;
            }
        };

        const handleTouchEnd = () => {
            startX = 0;
            startY = 0;
            isHorizontalSwipe = false;
        };

        textArea.addEventListener('touchstart', handleTouchStart, { passive: true });
        textArea.addEventListener('touchmove', handleTouchMove, { passive: false });
        textArea.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            textArea.removeEventListener('touchstart', handleTouchStart);
            textArea.removeEventListener('touchmove', handleTouchMove);
            textArea.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div className="relative h-full" style={{ touchAction: 'pan-x' }}>
            {/* Full background: blurred news image */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${article.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(12px)",
                }}
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Foreground container */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Top section: original crisp image (occupies 1/4 of height) */}
                <div className="h-1/4" style={{ touchAction: 'pan-x' }}>
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="object-cover w-full h-full"
                        style={{ touchAction: 'pan-x' }}
                    />
                </div>

                {/* Bottom section: news context with glass effect (occupies 3/4 of height) */}
                <div className="h-3/4 flex flex-col justify-between bg-black/20 backdrop-blur-md border-t border-white/20 rounded-b-xl">
                    {/* Header: Category, Date, Published info */}
                    <div className="m-2 space-y-2" style={{ touchAction: 'pan-x' }}>
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                {article.category}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(article.date), "MMM d, yyyy")}
                            </div>
                        </div>
                        <div>
                            <span className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                                Published by: {article.publisher}
                            </span>
                        </div>
                    </div>

                    {/* Content: Title and full description */}
                    <div 
                        ref={textAreaRef}
                        className="m-2 flex-grow overflow-auto"
                        style={{ 
                            touchAction: 'pan-x pan-y',
                            overscrollBehavior: 'contain'
                        }}
                    >
                        <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                            {article.title}
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed">
                            {article.description}
                        </p>
                    </div>

                    {/* Footer: Call-to-action and scroll indicator */}
                    <div className="m-2 flex flex-col items-center" style={{ touchAction: 'pan-x' }}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            <a
                                href={article.readMoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                Read More
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
