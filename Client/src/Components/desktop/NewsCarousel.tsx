import { format } from "date-fns"
import useEmblaCarousel from "embla-carousel-react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import type { NewsArticle } from "../../shared/schema"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

interface NewsCarouselProps {
  articles: NewsArticle[]
  className?: string
}

export function NewsCarousel({ articles, className }: NewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className={`relative w-full h-[600px] overflow-hidden ${className || ""}`}>
      {/* Embla main viewport */}
      <div className="w-full h-full" ref={emblaRef}>
        {/* Slides container: horizontal scrolling */}
        <div className="flex h-full">
          {articles.map((article) => (
            <div className="relative flex-[0_0_100%] w-full h-full overflow-hidden"            >
              {/* Blurred background to pick up the image's hue */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${article.imageUrl || "/placeholder.svg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(12px)",
                }}
              />
              {/* Optional darker overlay for contrast */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Foreground: split into left (focused image) & right (glass overlay) */}
              <div className="relative z-10 flex w-full h-full">
                {/* Left half: the news image in focus */}
                <div className="w-1/2 h-full relative">
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Right half: glass overlay for text */}
                <div
                  className="
                    w-1/2 h-full p-6
                    flex flex-col justify-start
                    bg-black/20
                    backdrop-blur-md
                    border-l border-white/20
                    text-white
                    rounded-r-xl
                  "
                >
                  {/* Header row: left for category & date, right for published by */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(article.date), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      Published by: {article.publisher ?? "Unknown"}
                    </span>
                  </div>

                  {/* Title and description */}
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">{article.title}</h2>
                    <p className="text-sm md:text-base leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  {/* Read more button pinned at the bottom left with extra spacing above */}
                  <div className="mt-auto flex justify-start mt-4">
                    <a
                      href={article.readMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        px-2 py-1
                        rounded-full
                        bg-primary
                        text-primary-foreground
                        hover:bg-gray-300
                        hover:text-primary-foreground
                        transition-all
                        backdrop-blur-xs
                        font-bold
                      "
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons at bottom right */}
      <div className="absolute bottom-4 right-4 flex gap-2">
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

      {/* News Count Indicator (outside the carousel) */}
      <div className="mt-4 text-center text-white text-sm font-bold">
        {`News ${selectedIndex + 1} of ${articles.length}`}
      </div>
    </div>
  )
}
