import React from 'react';
import Nav from '../Components/NavBar/Nav';
import Sidebar from '../Components/SideBar/Sidebar';
import NotificationsFeed from '../Components/NotificationsFeed';

function Notification() {
    return (
        <div className='flex gap-4 w-11/12 mt-2 mx-auto'>
            <Nav/>
            <NotificationsFeed/>
            <Sidebar/>
        </div>
    )
}

export default Notification;