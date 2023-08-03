"use client";
import { useState } from "react";
import { buttonVariants } from "../ui/button";

const categories = ["Claims", "NFTs", "Passes", "Settings"];

export default function ProfileDisplay() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div
        className="w-full flex pb-8 gap-4 px-8 border-b-2 border-[#66ff91]
"
      >
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`h-9 rounded-md px-3 inline-flex items-center justify-center text-sm font-medium ${
              category === selectedCategory
                ? "p-4 cursor-pointer bg-[#66ff91] text-black"
                : "hover:bg-accent hover:text-accent-foreground"
            } cursor-pointer`}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="flex-grow flex items-center justify-center text-xl">
        {selectedCategory
          ? `Selected: ${selectedCategory}`
          : "Please select a category"}
      </div>
    </div>
  );
}
