"use client";
// components/FilterSection.tsx
import React, { useEffect, useState } from "react";

interface FilterSectionProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setBudgetRange: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  setSearchTerm,
  setBudgetRange,
}) => {
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let updatedBudget = selectedBudget.includes(value)
      ? selectedBudget.filter((budget) => budget !== value) // Uncheck
      : [...selectedBudget, value]; // Check
    setSelectedBudget(updatedBudget);
    setBudgetRange(updatedBudget); // Update budget range
  };

  return (
    <aside className="w-full md:w-1/4 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <label htmlFor="search" className="block text-gray-700 font-semibold">
          Search by place name
        </label>
        <input
          type="text"
          id="search"
          onChange={handleSearch}
          placeholder="e.g., Beach westplam"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700">Filter by</h3>
        <div className="mt-4">
          <h4 className="font-medium text-gray-700">Your budget per day</h4>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" value="0-200" className="mr-2"  onChange={handleBudgetChange}/> ₹ 0 - ₹ 200
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" value="200-500" onChange={handleBudgetChange} /> ₹ 200 - ₹ 500
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" value="500-5000" onChange={handleBudgetChange} /> ₹ 500 - ₹ 5000
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" value="5000-20000" onChange={handleBudgetChange} /> ₹ 5000 - ₹ 20000
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" value="20000-50000" onChange={handleBudgetChange} /> ₹ 20000 - ₹ 50000
            </label>
          </div>
        </div>
      </div>

      {/* <div className="mb-6">
        <h4 className="font-medium text-gray-700">Rating</h4>
        <div className="mt-2 space-x-2">
          <button className="px-2 py-1 border rounded">1+</button>
          <button className="px-2 py-1 border rounded">2+</button>
          <button className="px-2 py-1 border rounded">3+</button>
          <button className="px-2 py-1 border rounded">4+</button>
          <button className="px-2 py-1 border rounded">5+</button>
        </div>
      </div> */}

      <div className="mb-6">
        <h4 className="font-medium text-gray-700">Popular Filters</h4>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Free cancellation
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Spa
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Beach front
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Tamil Nadu
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Book without credit card
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Kerala
          </label>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-700">Activities</h4>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Fishing
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Hiking
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Beach
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Cycling
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Sauna
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Night lights
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterSection;
