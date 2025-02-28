import React from "react";
import { Navbar } from "../components/navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="h-screen flex flex-col">
            {/* Navbar with fixed height */}
            <Navbar />
            {/* Main container fills remaining space */}
            <main className="flex-grow overflow-hidden">
                {children}
            </main>
        </div>
    );
}
