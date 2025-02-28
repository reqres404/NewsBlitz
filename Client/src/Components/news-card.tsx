import { format } from "date-fns";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { cn } from "../lib/utils";
import type { NewsArticle } from "../shared/schema";
import { Badge } from "./badge";
import { Card } from "./card";

interface NewsCardProps {
    article: NewsArticle;
    className?: string;
    onSwipe?: (direction: "left" | "right") => void;
    isMobile?: boolean;
}

export function NewsCard({ article, className, onSwipe, isMobile = false }: NewsCardProps) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
    const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);

    useEffect(() => {
        const animation = animate(x, 0, {
            type: "spring",
            stiffness: 400,
            damping: 30
        });

        return animation.stop;
    }, [article.id, x]);

    return (
        <div className="flex items-center justify-center h-screen pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <motion.div
                style={{ x, rotate, opacity, scale }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 100) {
                        onSwipe?.(info.offset.x > 0 ? "right" : "left");
                    }
                }}
                className={cn(
                    "relative w-full cursor-grab active:cursor-grabbing",
                    className
                )}
            >
                <Card className="overflow-visible bg-white/10 dark:bg-black/10 border-0 h-full backdrop-blur-xl">
                    <div className="relative w-full h-full">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute left-0 right-0 bottom-0 p-6">
                            <div className="mb-2">
                                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                    {article.category}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-white/90 backdrop-blur-xs bg-black/20 px-3 py-1 rounded-full">
                                    {format(new Date(article.date), "MMM d, yyyy")}
                                </span>
                                <a
                                    href={article.readMoreUrl}
                                    className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-xs text-white font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read more
                                </a>
                            </div>
                            <div className="bg-black/50 backdrop-blur-lg p-4 rounded">
                                <h3 className="text-3xl font-bold text-white mb-3">{article.title}</h3>
                                <p className="text-sm md:text-lg text-white/90 leading-relaxed">
                                    {article.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}