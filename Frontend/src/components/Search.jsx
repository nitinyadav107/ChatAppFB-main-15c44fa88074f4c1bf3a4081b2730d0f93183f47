import React from 'react'
import { FaSearch } from "react-icons/fa";
const Search = () => {
  return (
    <div className='px-6 py-4'>
      <form action="">
        <div className='flex gap-2'>
        <label className="border-[1px] rounded-lg flex items-center gap-2 w-[80%] bg-slate-800">
          <input type="text" className="outline-none border-none px-2" placeholder="Search" />

        </label>
        <button>
          <FaSearch className='text-4xl p-2 hover:bg-gray-800 rounded-full duration-300'/>
        </button>

        </div>
        

      </form>


    </div>
  )
}

export default Search

