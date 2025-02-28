import { Home, MessageSquare, Info, DollarSign } from "lucide-react";
import { useMediaQuery } from "../hooks/use-mobile";
import { Link } from "wouter";
import { Button } from "./button";

export function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header
      className={`sticky ${isMobile ? "bottom-0" : "top-0"} z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <div className="absolute transform rotate-45 bg-primary w-6 h-6" />
            <div className="absolute transform -rotate-45 bg-yellow-500 w-6 h-6 left-2" />
          </div>
          <span className="font-bold text-xl">NewsBlitz</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/news"
            className="text-foreground/60 hover:text-foreground transition-colors duration-200"
          >
            {isMobile ? <Home className="w-6 h-6" /> : <span>News</span>}
          </Link>
          <Link
            href="/feedback"
            className="text-foreground/60 hover:text-foreground transition-colors duration-200"
          >
            {isMobile ? <MessageSquare className="w-6 h-6" /> : <span>Feedback</span>}
          </Link>
          <Link
            href="/about"
            className="text-foreground/60 hover:text-foreground transition-colors duration-200"
          >
            {isMobile ? <Info className="w-6 h-6" /> : <span>About</span>}
          </Link>
          {isMobile ? (
            <Link href="/donate" className="text-foreground/60 hover:text-foreground transition-colors duration-200">
              <DollarSign className="w-6 h-6" />
            </Link>
          ) : (
            <Button variant="secondary">Donate</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
