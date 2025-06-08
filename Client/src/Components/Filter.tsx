import React from "react";
import { FILTERS } from "../constants/filters";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface FilterProps {
    onFilterChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const handleTabChange = (value: string) => {
        // Find the original filter name that matches the lowercase value
        const originalFilter = FILTERS.find(filter => filter.toLowerCase() === value);
        onFilterChange(originalFilter || value);
    };

    return (
        <div className="py-6">
            <Tabs defaultValue="all" className="max-w-4xl mx-auto px-4" onValueChange={handleTabChange}>
                <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${FILTERS.length}, minmax(0, 1fr))` }}>
                    {FILTERS.map((filter) => (
                        <TabsTrigger
                            key={filter}
                            value={filter.toLowerCase()}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm px-3 py-2"
                        >
                            {filter}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};

export default Filter;