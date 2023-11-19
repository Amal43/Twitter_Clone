import React, { useEffect } from 'react';
import {AiOutlineSetting} from 'react-icons/ai';
import {TbMessagePlus} from 'react-icons/tb';
import Conversation from './Conversation';
import {CiSearch} from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getUserCons } from '../../Redux/Slices/MessageSlice';

function ChatMenu({setCon}) {
    const dispatch = useDispatch();
    const [conversations , setConversations] = useState([]);
    const [show ,setShow] = useState(false);

    useEffect(()=>{
        dispatch(getUserCons()).then((result) => {
            setConversations(result.payload.data);
        });
    },[]);

    console.log(conversations)
    return (
        <div className={`border-x w-full lg:w-2/6 h-screen ${show?`hidden lg:block`:`block lg:block`}`}>
            <div className='flex flex-row justify-between items-center sticky top-0 py-2 backdrop-blur-xl'>
                <div>
                    <span className='font-medium text-xl px-2'>Messages</span>
                </div>
                <div className='flex flex-row text-xl'>
                    <AiOutlineSetting className='mx-1'/>
                    <TbMessagePlus className='mx-1'/>
                </div>
            </div>
            <div className='px-2 my-3'>
                <div className='flex px-4 py-2 bg-slate-100 rounded-full focus-within:bg-white focus-within:border-1 focus-within:border-blue-400'>
                    <CiSearch className='text-lg mt-1 focus-within:text-blue-400'/>
                    <input type='search' placeholder='Search' className='w-full outline-none bg-slate-100 pl-4 text-lg focus:bg-white' />
                </div>
            </div>
            {
                conversations.map((con, index)=>{
                    return(
                        <div   
                            onClick={()=>{
                                setCon(con)
                                setShow(true)
                            }}
                        >
                            <Conversation key={index} conversation={con}/>
                        </div> 
                    )
                })
            }
            
        </div>
    )
}

export default ChatMenu;