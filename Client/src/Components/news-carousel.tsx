import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import type { NewsArticle } from "../shared/schema";
import { format } from "date-fns";

interface NewsCarouselProps {
    articles: NewsArticle[];
    className?: string;
}

export function NewsCarousel({ articles, className }: NewsCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className={`relative ${className || ""}`}>
            <div className="overflow-visible" ref={emblaRef}>
                <div className="flex">
                    {articles.map((article) => (
                        <div key={article.id} className="relative flex-[0_0_100%] overflow-visible">
                            <div className="relative aspect-2/1 md:aspect-3/1">
                                <img src={article.imageUrl || "/placeholder.svg"} alt={article.title} className="object-cover w-full h-full" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white bg-black/50 backdrop-blur-lg">
                                <div className="container max-w-(--breakpoint-xl) mx-auto space-y-2">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-4">
                                            <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                                {article.category}
                                            </Badge>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="w-4 h-4" />
                                                <span>{format(new Date(article.date), "MMM d, yyyy")}</span>
                                            </div>
                                        </div>
                                        <a
                                            href={article.readMoreUrl}
                                            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-xs text-white font-medium"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Read more
                                        </a>
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-bold">{article.title}</h2>
                                    <p className="text-sm md:text-base max-w-6xl text-gray-200">{article.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2">
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-xs"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-xs"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                {articles.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-white w-6" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
