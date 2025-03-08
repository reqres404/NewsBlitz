import { format } from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import type { NewsArticle } from "../../shared/schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function MobileNewsCard({ article }: { article: NewsArticle }) {
    return (
        <div className="h-full relative">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="object-cover w-full h-full"
                />
            </div>
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end">
                <div className="p-4 space-y-4 bg-linear-to-t from-black via-black/70 to-transparent">
                    {/* Header Row: Category, Date, and Published By */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="bg-yellow-400 text-black">
                                {article.category}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(article.date), "MMM d, yyyy")}
                            </div>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                            Published by: {article.publisher}
                        </span>
                    </div>

                    {/* Title and Description */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white leading-tight">
                            {article.title}
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
                            {article.description}
                        </p>
                    </div>

                    {/* Read Full Article Button */}
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                        Read full article
                    </Button>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                        <ChevronDown className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}