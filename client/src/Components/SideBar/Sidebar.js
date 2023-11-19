import React from 'react';
import FollowBar from './FollowBar';
import SubscribeBar from './SubscribeBar';
import SearchBar from './SearchBar';
import NewsBar from './NewsBar';


function Sidebar() {
    return (
        <div className=' hidden lg:block w-1/4'>
            <SearchBar/>
            <SubscribeBar/>
            <NewsBar/>
            <FollowBar/>
        </div>
    )
}

export default Sidebar;