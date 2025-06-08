import React, { useEffect } from "react";
import { DesktopNavbar } from "../components/navbar";
import { useMediaQuery } from "../hooks/useMobile";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Initialize theme on mount
    useEffect(() => {
        const stored = localStorage.getItem('newsblitz-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = stored === 'dark' || (!stored && prefersDark);

        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <div className="h-screen flex flex-col">
            {!isMobile && <DesktopNavbar />}
            <main className="flex-grow overflow-auto">{children}</main>
        </div>
    );
}