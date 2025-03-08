import { format } from "date-fns";
import { Calendar } from "lucide-react";
import type { NewsArticle } from "../../shared/schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function MobileNewsCard({ article }: { article: NewsArticle }) {
    return (
        <div className="relative h-full">
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
                <div className="h-1/4">
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Bottom section: news context with glass effect (occupies 3/4 of height) */}
                <div className="h-3/4 flex flex-col justify-between bg-black/20 backdrop-blur-md border-t border-white/20 rounded-b-xl">
                    {/* Header: Category, Date, Published info */}
                    <div className="m-2 space-y-2">
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="bg-yellow-400 text-black">
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
                    <div className="m-2 flex-grow overflow-auto">
                        <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                            {article.title}
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed">
                            {article.description}
                        </p>
                    </div>

                    {/* Footer: Call-to-action and scroll indicator */}
                    <div className="m-2 flex flex-col items-center">
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                            <a
                                href={article.readMoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                Read full article
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
