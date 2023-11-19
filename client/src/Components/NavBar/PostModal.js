import React from 'react';
import userImg from '../../assets/images/userProfile.jpg';
import {BiPoll} from 'react-icons/bi';
import {BsImage} from 'react-icons/bs';
import {AiOutlineGif} from 'react-icons/ai';
import {BsEmojiSmile} from 'react-icons/bs';
import {GoLocation} from 'react-icons/go';
import {AiOutlineCalendar} from 'react-icons/ai';
import { useState } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import Picker from "emoji-picker-react";
import { createPost } from '../../Redux/Slices/PostSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function PostModal({closePostModal,user}) {
    const api= "http://localhost:3001/assets/";
    const [selectedImage, setSelectedImage] = useState(null);
    const [content ,setContent] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [success , setSuccess] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleImageClick = () => {
        document.getElementById('postImage').click();
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    const onEmojiClick = (emoji,event) => {
        console.log(emoji)
        setContent((prevContent) => prevContent + emoji.emoji);
        setShowPicker(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append('postImage', selectedImage);
        form.append('content', content);
        console.log(selectedImage)
        console.log(content)
    
        try {
            await dispatch(createPost(form));
            setSuccess(true);
            closePostModal(false);
            nav('/home');
        } catch (error) {
            console.log(error);
            setSuccess(false);
        }

    };

    return (
        <div className='flex justify-center'>
        <form 
            onSubmit={handleSubmit} 
            className='w-full md:w-3/6 h-fit  py-4 px-4 font-medium text-left md:rounded-3xl md:shadow-2xl  absolute top-6 bg-white '
        >
            <div className='flex justify-between'> 
                <button
                    onClick={()=>{
                        closePostModal(false)
                    }}
                    className='w-8 h-8 hover:bg-slate-100 hover:rounded-full hover:w-8'
                >X</button>
                <p className='text-blue-400'>Drafts</p>
            </div>
            {showPicker && (
                <div className='absolute z-40 top-48 right-4'>
                    <Picker pickerStyle={{ width: "60%"}} onEmojiClick={onEmojiClick}/>
                </div>
            )} 
            <div className=' flex flex-col py-2 border-b border-0.5'>
                <div className='flex pb-10'>
                    <img  src={`${api}${user?.imageUrl}`} alt='' className='w-10 h-10 rounded-full'/>
                    <input 
                        id='content'
                        name='content'
                        type="text" 
                        value={content}
                        placeholder="what is happining?!" 
                        className='text-xl outline-none pl-4 py-8 w-full'
                        onChange={(e)=>{setContent(e.target.value)}}
                    />
                </div>
                {selectedImage && (
                    <div className="relative mt-2 mx-auto">
                        <img src={URL.createObjectURL(selectedImage)} alt="selected-ima" className="w-8/12 h-80 border-lg mb-4 rounded-xl" />
                        <button className="absolute top-0 left-0 m-0.5 bg-gray-500 rounded-full" onClick={() => setSelectedImage(null)}>
                            <AiOutlineCloseCircle className="text-xl text-white" />
                        </button>
                    </div>                                
                )}
            </div>
            <div className='w-full flex justify-between pt-2 px-1'>
                <ul className='flex list-none py-2'>
                    <li className='mr-4 cursor-pointer'>
                        <BsImage className='text-lg text-blue-500'
                            onClick={handleImageClick} 
                        />
                        <input
                            id="postImage"
                            name='postImage'
                            type='file'
                            className='hidden'
                            onChange={handleImageChange}
                        />
                    </li>
                    <li className='mr-4 cursor-pointer'>
                        <AiOutlineGif className='text-lg text-blue-500'/>
                    </li>
                    <li className='mr-4 cursor-pointer'>
                        <BiPoll className='text-lg text-blue-500'/>
                    </li>
                    <li className='mr-4 cursor-pointer'>
                        <BsEmojiSmile 
                            className='text-lg text-blue-500'
                            onClick={() => setShowPicker((val) => !val)}
                        />
                    </li>
                    <li className='mr-4 cursor-pointer'>
                        <AiOutlineCalendar className='text-lg text-blue-500'/>
                    </li>
                    <li className='mr-4 cursor-pointer'>
                        <GoLocation className='text-lg text-blue-500'/>
                    </li>
                </ul>
                <button type='submit' className=' w-16 py-1 border-0 rounded-full text-center font-medium text-white bg-blue-400 text-base hover:bg-blue-500 '>
                    post
                </button>
            </div>
        </form>
    </div>
    )
}

export default PostModal;