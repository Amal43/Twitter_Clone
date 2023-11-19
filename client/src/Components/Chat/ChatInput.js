import React, { useState,useRef,useEffect,useContext } from 'react';
import {VscSend} from 'react-icons/vsc';
import {BsEmojiSmile} from 'react-icons/bs';
import {BsImage} from 'react-icons/bs';
import {AiOutlineGif} from 'react-icons/ai';
import { sendMessage } from '../../Redux/Slices/MessageSlice';
import { useDispatch } from 'react-redux';
import Picker from "emoji-picker-react";
// import {io} from 'socket.io-client';
import {SocketContext} from '../../Socket';

function ChatInput({conId,setMsgSend,receiver}) {
    const socket = useContext(SocketContext);
    let id=JSON.parse(localStorage.getItem('userId'));
    const dispatch = useDispatch();
    const[ text, setText] = useState("");
    const [success , setSuccess] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    // const socket = useRef();
    
    // useEffect(()=>{
    //     socket.current=io.connect("http://localhost:3001");
    // },[])
    const onEmojiClick = (emoji,event) => {
        console.log(emoji)
        event.preventDefault();
        setText((prevContent) => prevContent + emoji.emoji);
        setShowPicker(false);
    };
    const handleSubmit = async (e) => {
        if(!text){
            return;
        }
        const message ={
            text:text,
            sender:id,
            conversationId:conId
        }
        socket.emit("sendMessage",{
            senderId:id,
            receiverId:receiver._id,
            text:text
        })
        try {
            await dispatch(sendMessage(message));
            setSuccess(true);
            setMsgSend(true);
            setText('')

        } catch (error) {
            console.log(error);
            setSuccess(false);
        }

    };


    return (
        <div className='w-full bg-white sticky bottom-0 py-1 px-3 lg:pr-2'>
            {showPicker && (
                <div className='absolute z-40 -top-96 right-4'>
                    <Picker pickerStyle={{ width: "60%"}} onEmojiClick={onEmojiClick}/>
                </div>
            )} 
            <div
                className='flex items-center px-4 py-2 bg-slate-100 rounded-full focus-within:bg-white focus-within:border-1 focus-within:border-blue-400'
            >
                <button className='py-1 px-0.5  hover:bg-blue-200 rounded-full'>
                    <BsImage className='text-xl mx-1 text-blue-500'/>
                </button>
                <button className='py-1 px-0.5  hover:bg-blue-200 rounded-full'>
                    <AiOutlineGif className='text-xl mx-1 text-blue-500'/>
                </button>
                <button 
                    className='py-1 px-0.5  hover:bg-blue-200 rounded-full'
                    onClick={() => setShowPicker((val) => !val)}
                >
                    <BsEmojiSmile className='text-xl mx-1 text-blue-500'/>
                </button>
                <textarea 
                    id='text' 
                    name='text'
                    value={text}
                    placeholder='Start a new message' 
                    className='w-10/12 h-8 outline-none bg-slate-100 pl-4 text-lg focus:bg-white' 
                    onChange={(e)=>{setText(e.target.value)}}
                    onkeydown="handleKeyPress(event)"
                ></textarea>
                <button 
                    type='submit'
                    onClick={handleSubmit} 
                >
                    <VscSend className='text-xl text-blue-500'/>
                </button>
            </div>
            
        </div>
    )
}

export default ChatInput;