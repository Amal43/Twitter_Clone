import React from 'react';
import {CgMoreAlt} from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

function NewsBar() {
    return (
        <div className='bg-slate-100 rounded-2xl my-3'>
                <h2 className='font-bold text-xl p-4'>What’s happening</h2>
                <div className='w-full'>
                    <div className='py-2 px-4 hover:bg-slate-50'>
                        <div className='flex justify-between'>
                            <div>
                                <span>Trending in Egypt</span>
                            </div>
                            <CgMoreAlt className='text-xl mt-2'/>
                        </div>
                        <p className='font-bold'>Egypt</p>
                    </div>
                    <div className='py-2 px-4 hover:bg-slate-50'>
                        <div className='flex justify-between'>
                            <div>
                                <span>Trending in Egypt</span>
                            </div>
                            <CgMoreAlt className='text-xl mt-2'/>
                        </div>
                        <p className='font-bold'>South Korea</p>
                    </div>
                </div>
                <div className='p-4 hover:bg-slate-50'>
                    <NavLink to="/home" className='text-blue-500'>Show more</NavLink>
                </div>
            </div>
    )
}

export default NewsBar;