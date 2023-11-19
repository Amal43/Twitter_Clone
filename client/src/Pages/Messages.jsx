import React, { useEffect, useState } from 'react';
import Nav from '../Components/NavBar/Nav';
import ChatMenu from '../Components/Chat/ChatMenu';
import ChatBox from '../Components/Chat/ChatBox';
import { useDispatch } from 'react-redux';
import { getOneUser } from '../Redux/Slices/UserSlice';

function Messages() {
    const [con,setCon] = useState(null);
    const dispatch = useDispatch();
    const [user ,setUser] = useState(null);
    useEffect(()=>{
        let currentUserId=JSON.parse(localStorage.getItem('userId'));
        const receiverId= con?.members.find((m)=> m !== currentUserId)
        dispatch(getOneUser(receiverId)).then((result) => {
            setUser(result.payload.data);
        });
    },[con])

    console.log(con);
    return (
        <div className='flex w-11/12 mt-2 mx-auto'>
            <Nav/>
            <ChatMenu setCon={setCon}/>
            <ChatBox conId={con?._id} receiver={user}/>
        </div>
    )
}

export default Messages;