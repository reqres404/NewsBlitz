import React from "react";
import { MobileTopNavbar } from "../components/mobile/MobileTopNavbar";
import { DesktopNavbar } from "../components/Navbar";
import { useMediaQuery } from "../hooks/useMobile";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className="h-screen flex flex-col">
            {isMobile ? <MobileTopNavbar onFilterOpen={() => { }} /> : <DesktopNavbar />}
            <main className="flex-grow overflow-hidden">{children}</main>
        </div>
    );
}