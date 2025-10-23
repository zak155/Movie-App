import React from 'react';

const Search = ({searchTerm,setsearchTerm}) => {
  return (
    <div className="search">
        <div>
        <img src='/search.svg' />
        <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={(e)=>setsearchTerm(e.target.value)}
        />
    </div>
    </div>
  );
};

export default Search;
