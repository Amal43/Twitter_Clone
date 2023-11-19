import React, { useEffect, useState } from 'react';
// import defaultImg from '../assets/images/avatar.jfif';
import {CgMoreAlt} from 'react-icons/cg';
import { getOneUser } from '../../Redux/Slices/UserSlice';
import { useDispatch } from 'react-redux';

function Conversation({conversation}) {
    const api= "http://localhost:3001/assets/";
    let currentUserId=JSON.parse(localStorage.getItem('userId'));
    const dispatch = useDispatch();
    const [user ,setUser] = useState(null);
    const receiverId= conversation.members.find((m)=> m !== currentUserId)

    useEffect(()=>{
        dispatch(getOneUser(receiverId)).then((result) => {
            setUser(result.payload.data);
        });
    },[]);
    
    return (
        <div 
            className='w-full flex min-h-min py-3 px-2  cursor-pointer hover:bg-slate-50'
        >
            <img src={`${api}${user?.imageUrl}`} alt="user-img" className='w-12 h-12 rounded-full'/>
            <div className='w-full flex flex-col ml-4'>
                <div className='flex justify-between'>
                    <button 
                        className='font-medium text-xl'
                    >
                        {user?.fullName}
                        <span className='text-lg font-normal pl-1'>@{user?.userName}</span>
                        <span className='pl-2 text-sm text-[#5d5b5b]'>
                            .1h
                        </span>
                    </button>
                    <CgMoreAlt className='text-xl'/>
                </div>
                <div className='w-full text-lg'>
                    <p>the last message</p>
                </div>
            </div>
        </div>
    )
}

export default Conversation;