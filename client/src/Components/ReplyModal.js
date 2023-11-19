import React,{useState,useEffect} from 'react';
import userImg from '../assets/images/userProfile.jpg';
import {BiPoll} from 'react-icons/bi';
import {BsImage} from 'react-icons/bs';
import {AiOutlineGif} from 'react-icons/ai';
import {BsEmojiSmile} from 'react-icons/bs';
import {GoLocation} from 'react-icons/go';
import {AiOutlineCalendar} from 'react-icons/ai';
import { getPostById,addComent } from '../Redux/Slices/PostSlice';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOneUser } from '../Redux/Slices/UserSlice';
import Picker from "emoji-picker-react";


function ReplyModal({closeReplyModal ,postId}) {
    console.log(postId)
    const navigate= useNavigate();
    const [showPicker, setShowPicker] = useState(false);
    const [success,setSuccess] = useState(false);
    const [content , setContent] = useState('');
    const [post , setPost] = useState({});
    const [user,setUser] = useState({})
    const dispatch = useDispatch();
    const api= "http://localhost:3001/assets/";
    let id=JSON.parse(localStorage.getItem('userId'));

    const onEmojiClick = (emoji,event) => {
        console.log(emoji)
        setContent((prevContent) => prevContent + emoji.emoji);
        setShowPicker(false);
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let form = new FormData();
        form.append('content', content);
        console.log(content)
    
        try {
            await dispatch(addComent({content,postId}));
            setSuccess(true);
            closeReplyModal(false);
            navigate(`/post/${postId}`);

        } catch (error) {
            console.log(error);
            setSuccess(false);
        }

    }


    useEffect(() => {
        dispatch(getPostById(postId)).then((result) => {
            setPost(result.payload.data);
        });
        dispatch(getOneUser(id)).then((result) => {
            setUser(result.payload.data);
        });
    }, []);

    return (
        <div className='flex justify-center'>
            {showPicker && (
                <div className='absolute z-40 top-40 mt-20 right-1/3'>
                    <Picker pickerStyle={{ width: "60%"}} onEmojiClick={onEmojiClick}/>
                </div>
            )} 
            <form 
                onSubmit={handleSubmit}
                className='w-full md:w-3/6 h-fit  py-4 px-4 font-medium text-left md:rounded-3xl md:shadow-2xl z-20 absolute top-6 bg-white'
            >
                <div className='flex justify-between'> 
                    <button
                        onClick={()=>{
                            closeReplyModal(false)
                            navigate('/home')
                        }}
                        className='w-8 h-8 hover:bg-slate-100 hover:rounded-full hover:w-8'
                    >X</button>
                    <p className='text-blue-400'>Drafts</p>
                </div>
                <div className='flex flex-col py-2'>
                    <div className='flex'>
                        <img  src={`${api}${post?.user?.imageUrl}`} alt='' className='w-10 h-10 rounded-full'/>
                        <a className='font-medium text-xl px-2'>
                            {post?.user?.fullName}
                            <span className='text-lg font-normal pl-1'>@{post?.user?.userName}</span>
                        </a>
                    </div>
                    <div className='pl-8 pr-2 ml-4 my-2 border-l'>
                        <p>{post?.content}</p>
                        <p className='py-5 text-gray-400'>Replying to 
                            <span className='text-blue-400'> @{post?.user?.userName}</span>
                        </p>
                    </div>
                    <div className='flex'>
                        <img  src={`${api}${user?.imageUrl}`} alt='' className='w-10 h-10 rounded-full'/>
                        <input 
                            type="text" 
                            placeholder="Post your reply" 
                            className='text-xl outline-none pl-2'
                            value={content}
                            onChange={(e)=>{setContent(e.target.value)}}
                        />
                    </div>
                </div>
                <div className='w-full flex justify-between pt-6'>
                    <ul className='flex list-none py-2'>
                        <li className='p-1.5 mr-2 cursor-pointer hover:bg-blue-100 rounded-full' >
                            <BsImage  className='text-lg text-blue-500'/>
                        </li>
                        <li className='p-1.5 mr-2 cursor-pointer hover:bg-blue-100 rounded-full'>
                            <AiOutlineGif className='text-lg text-blue-500'/>
                        </li>
                        <li className='p-1.5 mr-2 cursor-pointer hover:bg-blue-100 rounded-full'>
                            <BiPoll className='text-lg text-blue-500'/>
                        </li>
                        <li className='p-1.5 mr-2 cursor-pointer hover:bg-blue-100 rounded-full'>
                            <BsEmojiSmile 
                                className='text-lg text-blue-500'
                                onClick={() => setShowPicker((val) => !val)}
                            />
                        </li>
                        <li className='p-1.5 mr-2 cursor-pointer hover:bg-blue-100 rounded-full'>
                            <AiOutlineCalendar className='text-lg text-blue-500'/>
                        </li>
                        <li className='p-1.5 mr-2 cursor-pointer hover:bg-blue-100 rounded-full'>
                            <GoLocation className='text-lg text-blue-500'/>
                        </li>
                    </ul>
                    <button type='submit' className=' w-20 py-1 border-0 rounded-full text-center font-medium text-white bg-blue-400 text-base hover:bg-blue-500 '>
                        Reply
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReplyModal;