import React, { useState,useEffect,useRef,useContext } from 'react';
import logo from '../assets/images/X-Logo.png';
import {BsImage} from 'react-icons/bs';
import {AiOutlineGif} from 'react-icons/ai';
import {BiPoll} from 'react-icons/bi';
import {BsEmojiSmile} from 'react-icons/bs';
import {AiOutlineCalendar} from 'react-icons/ai';
import {GoLocation} from 'react-icons/go';
import {CgMoreAlt} from 'react-icons/cg';
import {FaRegComment} from 'react-icons/fa';
import {AiOutlineRetweet} from 'react-icons/ai';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import {BiBarChart} from 'react-icons/bi';
import {FiShare} from 'react-icons/fi';
// import userImg from '../assets/images/userProfile.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import defaultImg from '../assets/images/avatar.jfif';
import { useDispatch} from 'react-redux';
import {getOneUser} from '../Redux/Slices/UserSlice';
import { createPost,getAllPosts ,likePost ,unlikePost } from '../Redux/Slices/PostSlice';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import Picker from "emoji-picker-react";
import formatDistance from 'date-fns/formatDistance';
import Loader from './Loader';
// import {io} from 'socket.io-client';
import {SocketContext} from '../Socket';


function MainContent({openReplyModal}) {
    const socket = useContext(SocketContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [content, setContent] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [posts, setPosts] = useState([]);
    const [success,setSuccess] =useState(false);
    const [done,setDone] =useState(false);
    // const socket = useRef();
    const dispatch =useDispatch();
    const [user,setUser]=useState({});
    const api= "http://localhost:3001/assets/";
    const navigate =useNavigate();
    let id=JSON.parse(localStorage.getItem('userId'));

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

        } catch (error) {
            console.log(error);
            setSuccess(false);
        }

    };

    const like = async (id,receiver,post)=>{

        socket.emit("sendLikeNotification",{
            sender:user,
            receiverId:receiver._id,
            post:post,
            type:"like",
        })
        try {
            await dispatch(likePost(id));
            setDone(true);
        } catch (error) {
            console.log(error);
            setDone(false);
        }
    }
    const unlike = async (id)=>{
        try {
            await dispatch(unlikePost(id));
            setDone(true);
        } catch (error) {
            console.log(error);
            setDone(false);
        }
    }
    useEffect(() => {
        // socket.current=io.connect("http://localhost:3001");
        dispatch(getOneUser(id)).then((result) => {
            setUser(result.payload.data);
        });
        dispatch(getAllPosts()).then((result) => {
            setPosts(result.payload.data);
        });

    }, []);
    useEffect(()=>{
        socket.emit("addUser",id);
        socket.on("getUsers",activeUsers=>{
            console.log(activeUsers)
        });
    },[id]);
    console.log(user)
    useEffect (()=>{
        if(done){
            setDone(false);
            dispatch(getAllPosts()).then((result) => {
                setPosts(result.payload.data);
            });
        }
    },[done]);
    

    useEffect(() => {
        if(success){
            setContent('');
            setSelectedImage(null);
            setSuccess(false);
            dispatch(getAllPosts()).then((result) => {
                setPosts(result.payload.data);
            });
        }
    }, [success]);


    return (
        <>
        
        <div className='w-11/12 lg:w-2/4 border-r border-l relative '>
            <div className='sticky z-10 top-0 pt-2 backdrop-blur-xl border-b'>
                <div>
                    <span className='font-medium text-2xl px-2'>Home</span>
                </div>
                <div className='flex w-full pt-3 gap-0 '>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <NavLink to='#'>For you</NavLink>
                    </div>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <NavLink to='#'>Following</NavLink>
                    </div>
                </div>
            </div>
            {showPicker && (
                <div className='absolute z-40 top-52 right-4'>
                    <Picker pickerStyle={{ width: "60%"}} onEmojiClick={onEmojiClick}/>
                </div>
            )} 
            {posts?.length === 0 ? 
            <div>
                <Loader/>
                <Loader/>
                <Loader/>
                <Loader/>
                <Loader/>
                <Loader/>
            </div>
            :(
            <>
                <div>
                    <form 
                        onSubmit={handleSubmit} 
                        className='w-full px-2 py-4 flex'
                    >
                        <img src={(`${api}${user?.imageUrl}`) ? (`${api}${user?.imageUrl}`):defaultImg} alt="user-img" className='w-12 h-12 rounded-full'/>
                        <div className='w-full flex flex-col justify-evenly ml-2'>
                            <input 
                                id='content'
                                name='content'
                                type="text" 
                                placeholder="What is happening?!" 
                                value={content}
                                className='w-full h-24 pb-10 text-2xl outline-none bg-white'
                                onChange={(e)=>{setContent(e.target.value)}}
                            />
                            {selectedImage && (
                                <div className="relative mt-2">
                                    <img src={URL.createObjectURL(selectedImage)} alt="selected-ima" className="w-8/12 h-80 border-lg mb-4" />
                                    <button className="absolute top-0 left-0 m-0.5 bg-gray-500 rounded-full" onClick={() => setSelectedImage(null)}>
                                        <AiOutlineCloseCircle className="text-xl text-white" />
                                    </button>
                                </div>                                
                            )}
                            <div className='w-full flex justify-between pt-3 border-t'>
                                <ul className='flex list-none py-2'>
                                    <li className='p-1.5 mr-4 cursor-pointer hover:bg-blue-100 rounded-full'>
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
                                    <li className='p-1.5 mr-4 cursor-pointer hover:bg-blue-100 rounded-full'>
                                        <AiOutlineGif className='text-lg text-blue-500'/>
                                    </li>
                                    <li className='p-1.5 mr-4 cursor-pointer hover:bg-blue-100 rounded-full hidden lg:block'>
                                        <BiPoll className='text-lg text-blue-500'/>
                                    </li>
                                    <li className='p-1.5 mr-4 cursor-pointer hover:bg-blue-100 rounded-full'>
                                        <BsEmojiSmile 
                                            className='text-lg text-blue-500'
                                            onClick={() => setShowPicker((val) => !val)}
                                        />
                                    </li>
                                    <li className='p-1.5 mr-4 cursor-pointer hover:bg-blue-100 rounded-full'>
                                        <AiOutlineCalendar className='text-lg text-blue-500'/>
                                    </li>
                                    <li className='p-1.5 mr-4 cursor-pointer hover:bg-blue-100 rounded-full hidden lg:block'>
                                        <GoLocation className='text-lg text-blue-500'/>
                                    </li>
                                </ul>
                                <button className='w-20 lg:w-16 lg:text-sm py-1 border-0 rounded-full text-center font-medium text-white bg-blue-400 text-base hover:bg-blue-500 '>
                                    Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {posts?.map((post)=>{
                    return(
                        <div 
                            className='w-full flex min-h-min py-3 px-4 border-t-1 cursor-pointer hover:bg-slate-100'
                            onClick={()=>{
                                navigate(`/post/${post?._id}`)
                            }}
                        >
                            <img src={(`${api}${post?.user?.imageUrl}`) ? (`${api}${post?.user?.imageUrl}`):defaultImg} alt="user-img" className='w-12 h-12 rounded-full'/>
                            <div className='w-full flex flex-col ml-4'>
                                <div className='flex justify-between'>
                                    <button 
                                        className='font-medium text-xl'
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            openReplyModal(true);
                                            navigate(`/profile/${post?.user?._id}`)
                                        }}
                                    >
                                        {post?.user?.fullName}
                                        <span className='text-lg font-normal pl-1'>@{post?.user?.userName}</span>
                                        <span className='pl-2 text-sm text-[#5d5b5b]'>
                                            {`.${formatDistance(new Date(post?.createdAt), new Date(), { addSuffix: true })}`}
                                        </span>
                                    </button>
                                    <CgMoreAlt className='text-xl'/>
                                </div>
                                <div className='w-full text-lg'>
                                    <p>{post?.content}</p>
                                </div>
                                <div>
                                    {console.log(post.postImage)}
                                    <img src={`${api}${post?.postImage}`}  alt='post_img' className={`${(post?.postImage) === " "?`hidden`:`w-10/12 h-5/12 rounded-lg my-3`}`} />
                                </div>
                                <div className='w-full flex items-center justify-between mt-6 text-xl text-[#635f5f]'>
                                    <div className='flex items-center'>
                                        <button 
                                            onClick={(e)=>{
                                                e.stopPropagation();
                                                openReplyModal(true);
                                                navigate(`/home/${post?._id}`)
                                            }}
                                            className='p-1 hover:bg-blue-100 rounded-full'
                                        >
                                            <FaRegComment className='hover:text-blue-400'/>
                                        </button>
                                        <span className='text-blue-400 text-sm ml-2'>{post?.comments?.length===0?'':post?.comments?.length}</span> 

                                    </div>
                                    <button
                                        className='p-1 hover:bg-green-100 rounded-full'
                                    ><AiOutlineRetweet className='hover:text-green-400'/>
                                    </button>
                                    {
                                        (post?.likes?.includes(user?._id))?(
                                            <div className='flex items-center'>
                                                <button
                                                    className='px-1 py-0.5 hover:bg-red-100 rounded-full'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        unlike(post?._id);
                                                    }}
                                                >
                                                    <AiFillHeart className='text-red-400 inline-block'/>
                                                </button>
                                                <span className='text-red-400 text-sm ml-2'>{post?.likes?.length=== 0?'':post?.likes?.length}</span> 
                                            </div>
                                        ):(
                                            <div className='flex items-center'>
                                                <button
                                                    className='p-1 py-0.5 hover:bg-red-100 rounded-full'
                                                    onClick={(e) =>{
                                                        e.stopPropagation();
                                                        like(post?._id,post?.user,post);
                                                    }}
                                                >
                                                    <AiOutlineHeart className='hover:text-red-400 '/>
                                                </button>
                                                <span className='text-red-400 text-sm ml-2'>{post?.likes?.length===0?'':post?.likes?.length}</span> 
                                            </div>
                                            
                                        )
                                    }
                                    <button
                                        className='p-1 hover:bg-blue-100 rounded-full'
                                    >
                                        <BiBarChart className='hover:text-blue-400'/>
                                    </button> 
                                    <button
                                        className='p-1 hover:bg-blue-100 rounded-full'
                                    >
                                        <FiShare className='hover:text-blue-400'/>
                                    </button>  
                                    
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
            )}
        </div>
        </>
    )
}

export default MainContent;