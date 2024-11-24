import React, { useState } from 'react';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Placeholder for actual search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">DASHBOARD</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search"
        aria-label="Search input"
        className="w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </header>
  );
}

export default Header;
