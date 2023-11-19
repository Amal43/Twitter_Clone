import React, { useEffect, useRef, useState,useContext } from 'react';
// import defaultImg from '../assets/images/avatar.jfif';
import Message from './Message';
import ChatInput from '../Chat/ChatInput';
import { useDispatch } from 'react-redux';
import { getMessages } from '../../Redux/Slices/MessageSlice';
// import {io} from 'socket.io-client';
import { addNotify } from '../../Redux/Slices/NotificationSlice';
import {SocketContext} from '../../Socket';

let userId=JSON.parse(localStorage.getItem('userId'));

function ChatBox({conId,receiver}) {
    const socket = useContext(SocketContext);

    // const socket = useRef();
    const api= "http://localhost:3001/assets/";
    const dispatch = useDispatch();
    const [currentChat, setCurrentChat] = useState(null);
    const [messages , setMessages] = useState([]);
    const [arrivalMessage , setArrivalMessage] = useState(null);
    const [msgSend , setMsgSend] = useState(false);
    
    const scrollRef = useRef();
    
    // useEffect(()=>{
    //     socket.current=io.connect("http://localhost:3001");
    //     console.log('aaaaaaaa')
    // },[]);
    useEffect(()=>{
        console.log('bbbbbb')

        const handleMessage = (data) => {
            console.log(data);
            if (data) {
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                });
            }
        };
        
        socket.on("getMessage", handleMessage);
        
        return () => {
        socket.off("getMessage", handleMessage);
        };

    },[socket])
    useEffect(()=>{
        arrivalMessage && (arrivalMessage.sender === receiver?._id)&&
        setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,receiver])
    // useEffect(()=>{
    //     socket.emit("addUser",userId);
    //     socket.on("getUsers",activeUsers=>{
    //         console.log(activeUsers)
    //     });
    // },[userId]);

    useEffect(()=>{
        setCurrentChat(conId);
        dispatch(getMessages(conId)).then((result) => {
            setMessages(result.payload.data);
        });
    },[conId]);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    useEffect(()=>{
        if(msgSend){
            setMsgSend(false);
            dispatch(getMessages(conId)).then((result) => {
                setMessages(result.payload.data);
            });
        }
    },[msgSend]);
    



    return (
        <div className={`border-r h-screen w-full lg:w-3/6 ${currentChat?`block lg:block`:`hidden lg:block`}`}>
            {currentChat&&(
            <>
                <div className='flex flex-row items-center sticky top-0 px-2 py-1 backdrop-blur-xl mb-2'>
                    <div>
                        <img src={`${api}${receiver?.imageUrl}`} alt="user-img" className='w-12 h-12 rounded-full'/>
                    </div>
                    <span className='font-medium text-xl px-2'>{receiver?.fullName}</span>
                </div>
                <div className='overflow-y-auto h-screen'>
                    {
                        messages.map((msg,index)=>{
                            return(
                                <div ref={scrollRef}>
                                    <Message 
                                        key={index} 
                                        message={msg} 
                                        own={msg.sender === userId} 
                                        receiver={receiver}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <ChatInput 
                    conId={conId}  
                    setMsgSend={setMsgSend}
                    receiver={receiver}
                />
            </>
            )}

            {!currentChat &&(<div className='w-full h-full flex flex-col justify-center items-center' >
                <p className='text-4xl font-bold py-4'>Select a message</p>
                <p className='text-[#474545]'>Choose from your existing conversations </p>
            </div>)}

        </div>
    )
}

export default ChatBox;