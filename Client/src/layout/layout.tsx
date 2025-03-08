import React from "react";
import { DesktopNavbar } from "../components/Navbar";
import { useMediaQuery } from "../hooks/useMobile";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className="h-screen flex flex-col">
            {!isMobile && <DesktopNavbar />}
            <main className="flex-grow overflow-auto">{children}</main>
        </div>
    );
}