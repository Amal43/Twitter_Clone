import React ,{useRef ,useState,useEffect, useContext}from 'react'
import {BiHomeCircle} from 'react-icons/bi';
import {GoSearch} from'react-icons/go';
import {GrNotification} from 'react-icons/gr';
import {BiEnvelope} from 'react-icons/bi';
import {RiFileList2Line} from 'react-icons/ri';
import {LuUsers2} from 'react-icons/lu';
import {BiUser} from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { addNotify } from '../../Redux/Slices/NotificationSlice';
import { SocketContext } from '../../Socket';


function NavLinks() {

    let id=JSON.parse(localStorage.getItem('userId'));
    const links = [
        { id: 1, url: '/home', text: 'Home',icon:<BiHomeCircle className='text-3xl'/> },
        { id: 2, url: '', text: 'Explore',icon:<GoSearch className='text-3xl'/>},
        { id: 3, url: '/notification', text: 'Notifications',icon:<GrNotification className='text-3xl'/>},
        { id: 4, url: '/messages', text: 'Messages',icon:<BiEnvelope className='text-3xl'/> },
        { id: 5, url: '', text: 'Lists',icon:<RiFileList2Line className='text-3xl'/>},
        { id: 6, url: '', text: 'communities',icon:<LuUsers2 className='text-3xl'/> },
        { id: 7, url: '', text: 'Premium',icon:<BiEnvelope className='text-3xl' />},
        { id: 8, url: `/profile/${id}`, text: 'Profile',icon:<BiUser className='text-3xl'/>},
    ];
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    const { notifications } = useSelector((state) => state.notificationSlice);
    console.log(notifications)
    useEffect(()=>{
        const handleNotification = (data)=>{
            console.log(data);
            dispatch(addNotify({ notify: {
                sender:data.sender,
                post:data.post,
                type:data.type,
                createdAt:Date.now()
            }}));
            }
    
        socket.on("getNotification", handleNotification);
    
        return () => {
            socket.off("getNotification", handleNotification);
        };
    },[socket]);


    return (
        <>
            {
                links.map((link)=>{
                    const{id, url,text,icon} = link;
                    const isActive = window.location.pathname === url;
                    return(
                        <NavLink to={url} key={id} className={`flex gap-6 px-2 py-3 hover:bg-gray-200 hover:rounded-full relative hover:w-fit ${isActive ? 'font-bold ' : ''}`}>
                            {icon}
                            <span className={`text-xl hidden lg:block`}>
                                {text}
                            </span>
                            {id === 3 && notifications.length !== 0 && 
                                <span className={`py-0.5 px-1.5 items-center bg-blue-400 text-white text-xs rounded-full absolute left-5 top-2`}>{notifications.length}</span>
                            }
                        </NavLink>
                    );
                })
            }
        </>
    )
}

export default NavLinks;