// Search.jsx
import React from 'react';
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  return (
    <div className='px-6 py-4'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex gap-2'>
          <label className="border-[1px] rounded-lg flex items-center gap-2 w-full bg-slate-800">
            <input
              type="text"
              className="outline-none border-none px-3 py-2 bg-transparent w-full text-white placeholder-gray-400"
              placeholder="Search users..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </label>
          <button type="submit" className="hidden">
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
