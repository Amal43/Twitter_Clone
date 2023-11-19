import React ,{useEffect, useRef, useState} from 'react';
import {BiSolidUser} from 'react-icons/bi';
import {AiFillHeart} from 'react-icons/ai';
import userImg from '../assets/images/userProfile.jpg';
import {AiOutlineRetweet} from 'react-icons/ai';
import { io } from 'socket.io-client';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance';
import { clearNotify } from '../Redux/Slices/NotificationSlice';
import { IoMdNotifications } from "react-icons/io";


function NotificationsFeed() {
    const socket = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const api= "http://localhost:3001/assets/";
    let id=JSON.parse(localStorage.getItem('userId'));
    const { notifications } = useSelector((state) => state.notificationSlice);
    console.log(notifications)

    useEffect(()=>{
        socket.current=io.connect("http://localhost:3001");
        socket.current.emit("addUser",id);
    },[]);



    return (
        <div className="w-11/12 lg:w-2/4 h-screen border-r-1 border-l-1 ">
            <div className='sticky top-0 pt-2 backdrop-blur-xl border-b'>
                <div>
                    <span className='font-medium text-2xl px-2'>Notifications</span>
                </div>
                <div className='flex w-full pt-3 gap-0 '>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <a href='#'>All</a>
                    </div>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <a href='#'>Verified</a>
                    </div>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <a href='#'>Mentions</a>
                    </div>
                </div>
            </div>
            {notifications?.length !== 0?(

            <>
                {notifications.map((notify)=>{
                    return(
                    <div 
                        className="w-full flex flex-row  px-6 py-2 gap-4 border-t-[1px] cursor-pointer hover:bg-slate-100 "
                        onClick={()=>{
                            navigate(`/post/${notify?.post?._id}`)
                        }}
                    >
                        {notify?.type === 'like' &&
                        <>
                            <AiFillHeart className='text-4xl text-red-400'/>
                            <div className='w-full flex flex-col ml-1'>
                                <img src={`${api}${notify?.sender?.imageUrl}`} alt="user-img" className='w-10 h-10 rounded-full'/>
                                <div className='flex justify-between'>
                                    <div className='font-medium text-lg lg:text-xl'>
                                        {notify?.sender?.fullName}
                                        <span className='text-base lg:text-lg font-normal pl-1'>like your post</span>
                                    </div>
                                </div>
                                <div>
                                    <p>{notify?.post?.content} </p>
                                </div>
                            </div>
                        </>
                        }
                        {notify?.type === 'comment' &&
                        <>
                            <img src={`${api}${notify?.sender?.imageUrl}`} alt="user-img" className='w-10 h-10 rounded-full'/>
                            <div className='w-full flex flex-col ml-1'>
                                <div className='flex justify-between'>
                                    <div className='font-medium text-lg lg:text-xl'>
                                        {notify?.sender?.fullName}
                                        <span className='text-base lg:text-lg font-normal pl-1'>@{notify?.sender?.userName}</span>
                                    </div>
                                </div>
                                <div className='w-full text-lg'>
                                    <p>Replying to you</p>
                                </div>
                            </div>
                        </>
                        }
                        {notify?.type === 'follow' &&
                        <>
                            <BiSolidUser className='text-4xl text-blue-400'/>
                            <div className='w-full flex flex-col ml-1'>
                                <img src={`${api}${notify?.sender?.imageUrl}`} alt="user-img" className='w-10 h-10 rounded-full'/>
                                <div className='flex justify-between'>
                                    <div 
                                        className='font-medium text-lg lg:text-xl'
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            navigate(`/profile/${notify?.sender?._id}`)
                                        }}
                                    >
                                        {notify?.sender?.fullName}
                                        <span className='text-base lg:text-lg font-normal pl-1'>.followed you</span>
                                    </div>
                                </div>
                            </div>
                        </>
                        }
                        <p className='text-sm w-4/12'>
                            {`.${formatDistance(new Date(notify?.createdAt), new Date(), { addSuffix: true })}`}
                        </p>
                    </div>
                    )
                })}

                <div 
                    className='text-center text-[#413f3f] font-semibold text-xl cursor-pointer bg-slate-200 py-2'
                    onClick={(()=>{
                        dispatch(clearNotify())
                    })}
                >
                    Mark as Read
                </div>
            </> 
            ):(
            <div className='h-4/6 flex flex-col justify-center items-center text-[#4e4a4a] text-4xl font-semibold'>
                <IoMdNotifications className='text-blue-400'/>
                <p>no notifications</p>
            </div>

            )}

         
        </div>
    )
}

export default NotificationsFeed;