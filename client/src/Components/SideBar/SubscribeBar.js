import React from 'react';

function SubscribeBar() {
    return (
        <div className='bg-slate-100 rounded-2xl p-4 my-3'>
            <div className='font-bold text-xl'>
                <span>Subscribe to Premium</span>
            </div>
            <div className='font-medium py-2'>
                <span>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</span>
            </div>
            <button className='bg-black text-white font-bold rounded-full px-4 py-1'>Subscribe</button>
        </div>
    )
}

export default SubscribeBar;