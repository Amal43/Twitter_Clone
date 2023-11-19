import React from 'react';
import {BsBookmark} from 'react-icons/bs';
import {SlArrowDown} from 'react-icons/sl';
import {PiMoneyBold} from 'react-icons/pi';

function MoreModal() {
    return (
        <div className='w-80 font-medium text-left rounded-3xl shadow-2xl absolute z-20 bg-white top-36'>
                <div className='flex flex-col'>
                    <div className=' flex gap-2 items-center px-4 py-4 font-semibold text-xl hover:bg-slate-100 rounded-t-3xl '>
                        <BsBookmark/>
                        <a href='#' >Bookmarks</a>
                    </div>
                    <div className='flex gap-2 items-center px-4 py-4 font-semibold text-xl hover:bg-slate-100'>
                        <p>@</p>
                        <a href='#'>Connect</a>
                    </div>
                    <div className='flex gap-2 items-center px-4 py-4 font-semibold text-xl hover:bg-slate-100'>
                        <PiMoneyBold/>
                        <a href='#'>Monetization</a>
                    </div>
                </div>
                <hr className='mx-4'/>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between px-4 py-4 hover:bg-slate-100'>
                        <a href='#' className='font-medium'>Creator Studio</a>
                        <SlArrowDown/>
                    </div>
                    <div className='flex flex-row justify-between px-4 py-4 hover:bg-slate-100'>
                        <a href='#' className='font-medium'>Professional Tools</a>
                        <SlArrowDown/>
                    </div>
                    <div className='flex flex-row justify-between px-4 py-4 hover:bg-slate-100 rounded-b-3xl'>
                        <a href='#' className='font-medium'>Settings and Support</a>
                        <SlArrowDown/>
                    </div>
                </div>
        </div>
    )
}

export default MoreModal;