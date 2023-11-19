import React from 'react';
import {CiSearch} from'react-icons/ci';

function SearchBar() {
    return (
        <div className='w-full bg-white sticky top-0 py-1 hidden lg:block'>
            <div className='flex px-4 py-2 bg-slate-100 rounded-full focus-within:bg-white focus-within:border-1 focus-within:border-blue-400'>
                <CiSearch className='text-lg mt-1 focus-within:text-blue-400'/>
                <input type='search' placeholder='Search' className='w-full outline-none bg-slate-100 pl-4 text-lg focus:bg-white' />
            </div>
        </div>
    )
}

export default SearchBar;