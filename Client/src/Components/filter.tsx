import React from "react";
import { FILTERS } from "../constants/filters";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
interface FilterProps {
    onFilterChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const handleTabChange = (value: string) => {
        onFilterChange(value.charAt(0).toUpperCase() + value.slice(1));
    };

    return (
        <div className="py-6">
            <Tabs defaultValue="all" className="max-w-2xl mx-auto px-4" onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-6 w-full">
                    {FILTERS.map((filter) => (
                        <TabsTrigger
                            key={filter}
                            value={filter.toLowerCase()}
                            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
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