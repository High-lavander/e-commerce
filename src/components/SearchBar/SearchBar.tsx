import React, { useState } from 'react';
import logo from '../../assets/icons/search.svg';

import './SearchBar.scss';
function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search_bar_block">
      <input
        type="text"
        placeholder="Search product..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="search_btn" onClick={handleSearch}>
        {' '}
        <img src={logo} alt="Logo" />
      </button>
    </div>
  );
}

export default SearchBar;
