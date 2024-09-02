import React, { useState } from 'react';
import "../styles/filter.css";

export default function FilterControls({ filters, onFilterChange, onSearchChange, enableSearch = true }) {
    const [activeFilter, setActiveFilter] = useState('protein');

    const handleFilterClick = (filterValue) => {
        setActiveFilter(filterValue === activeFilter ? null : filterValue);
        onFilterChange(filterValue);
    };

    return (
        <div className="filter-controls">
            {enableSearch && (
                <input
                    className='search-in'
                    type="text"
                    placeholder="Search ingredients..."
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            )}
            
            <div className="filter-buttons">
                {filters.map((filter, index) => (
                    <button 
                        key={index} 
                        className={`filter-but ${activeFilter === filter.value ? 'activebtn' : ''}`} 
                        onClick={() => handleFilterClick(filter.value)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
