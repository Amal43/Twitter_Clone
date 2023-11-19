import React ,{useState ,useEffect,useRef,useContext}from 'react';
import userImg from '../assets/images/userProfile.jpg';
import {BiArrowBack} from 'react-icons/bi';
import {CgMoreAlt} from 'react-icons/cg';
import {FaRegComment} from 'react-icons/fa';
import { 
    AiOutlineHeart ,
    AiOutlineCloseCircle, 
    AiOutlineRetweet,
    AiOutlineGif,
    AiFillHeart} 
    from 'react-icons/ai';
import {FiShare} from 'react-icons/fi';
import {BsImage,BsBookmark,BsEmojiSmile} from 'react-icons/bs';
import {GoLocation} from 'react-icons/go';
import { addComent, getPostById } from '../Redux/Slices/PostSlice';
import { useDispatch} from 'react-redux';
import Picker from "emoji-picker-react";
import { NavLink} from 'react-router-dom';
import defaultImg from '../assets/images/avatar.jfif';
import {getOneUser} from '../Redux/Slices/UserSlice';
import formatDistance from 'date-fns/formatDistance'
// import {io} from 'socket.io-client';
import { SocketContext } from '../Socket';



function PostId({postId}) {
    const socket = useContext(SocketContext);

    const [post , setPost] = useState({});
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [content, setContent] = useState("");
    const [success ,setSuccess] = useState (false)
    const [user,setUser]=useState({});
    const dispatch = useDispatch();
    // const socket = useRef();

    const api= "http://localhost:3001/assets/";
    let id=JSON.parse(localStorage.getItem('userId'));

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

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

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let form = new FormData();
        form.append('content', content);
        console.log(content)

        socket.emit("sendLikeNotification",{
            sender:user,
            receiverId:post.user._id,
            post:post,
            type:"comment",
        })
    
        try {
            await dispatch(addComent({content,postId}));
            setSuccess(true);

        } catch (error) {
            console.log(error);
            setSuccess(false);
        }

    }
    useEffect(() => {
        // socket.current=io.connect("http://localhost:3001");
        dispatch(getPostById(postId)).then((result) => {
            setPost(result.payload.data);
        });
        dispatch(getOneUser(id)).then((result) => {
            setUser(result.payload.data);
        });
    }, []);
    // useEffect(()=>{
    //     socket.current.emit("addUser",id);
    //     socket.current.on("getUsers",activeUsers=>{
    //         console.log(activeUsers)
    //     });
    // },[id]);
    useEffect(()=>{
        if(success){
            dispatch(getPostById(postId)).then((result) => {
                setPost(result.payload.data);
            });
            setContent('')
        }
    },[success])
    console.log(post.createdAt)
    function formatPostedDate(Posted) {
        if (!Posted) {
            return "No Joined Date";
        }
        
        try {
            return formatDistance(new Date(Posted), new Date(), { addSuffix: true });
        } catch (error) {
            console.error("Invalid joined date:", Posted);
            return "Invalid Joined Date";
        }
    }
    
    return (
        <div className='w-11/12 lg:w-2/4 h-screen border-r border-l relative'>
            <div className='sticky top-0 pt-0 backdrop-blur-xl z-10'>
                <div className='flex flex-row items-center gap-5 px-4 py-1'>
                    <BiArrowBack className='text-lg'/>
                    <div>
                        <span className='font-medium text-2xl px-2'>Post</span>
                    </div>
                </div>
            </div>
            <div className='w-full flex min-h-min py-3 px-4 border-t-1 cursor-pointer'>
                <img src={`${api}${post?.user?.imageUrl}`} alt="user-imag" className='w-10 h-10 rounded-full'/>
                <div className='w-full flex flex-col ml-2'>
                    <div className='flex justify-between'>
                        <div>
                            <a className='font-medium text-lg'>
                                {post?.user?.fullName}
                            </a>
                            <span className='pl-2 text-sm text-[#5d5b5b]'>
                                .{formatPostedDate(post?.createdAt)}
                            </span>
                            <p className='font-normal'>@{post?.user?.userName}</p>
                            
                        </div>
                        <CgMoreAlt className='text-xl'/>
                    </div>
                    <div className='w-full text-lg py-2'>
                        <p>{post?.content}</p>
                    </div>
                    <div>
                        {console.log(post.postImage)}
                        <img src={`${api}${post?.postImage}`}  alt='post_img' className={`${(post?.postImage) === " "?`hidden`:`w-10/12 h-8/12 rounded-lg my-3`}`} />
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-between text-xl text-[#635f5f] px-5 py-3 border-t border-b'>
                <div className='flex items-center'>
                    <button
                        className='p-1 hover:bg-blue-100 rounded-full'
                    >
                        <FaRegComment className='hover:text-blue-400'/>
                    </button> 
                    <span className='text-blue-400 text-sm ml-2'>{post?.comments?.length===0?'':post?.comments?.length}</span> 
                </div>
                <button
                    className='p-1 hover:bg-green-100 rounded-full'
                >
                    <AiOutlineRetweet className='hover:text-green-400'/>
                </button> 
                {
                    (post?.likes?.includes(user?._id))?(
                        <div className='flex items-center'>
                            <button
                                className='p-1 hover:bg-red-100 rounded-full'
                            >
                                <AiFillHeart className='text-red-400 '/>
                            </button>
                            <span className='text-red-400 text-sm ml-2'>{post?.likes?.length}</span> 
                        </div>    
                    ):(
                        <div className='flex items-center'>
                            <button
                                className='p-1 hover:bg-red-100 rounded-full'
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
                    <BsBookmark className='hover:text-blue-400'/>
                </button> 
                <button
                    className='p-1 hover:bg-blue-100 rounded-full'
                >
                    <FiShare className='hover:text-blue-400'/>
                </button> 
            </div>
            {showPicker && (
                <div className='absolute z-40 top-40 mt-20 right-4'>
                    <Picker pickerStyle={{ width: "60%"}} onEmojiClick={onEmojiClick}/>
                </div>
            )} 
            <div className='w-full px-4  border-b'>
                {isInputFocused && 
                    (<p className='pl-12'>Replying to 
                        <span className='text-blue-400'> @{post?.user?.userName}</span>
                    </p>
                )}
                <div className='flex py-5'>
                    <img src={`${api}${user?.imageUrl}`} alt="user-imag" className='w-10 h-10 rounded-full'/>
                    <form 
                            onSubmit={handleSubmit} 
                            className='w-full flex flex-col justify-evenly ml-2'
                    >
                        <div className='flex items-center justify-between'>
                            <input 
                                type="text" 
                                placeholder="Post your reply" 
                                className='text-xl outline-none'
                                onClick={handleInputFocus}
                                value={content}
                                onChange={(e)=>{setContent(e.target.value)}}
                            />
                            
                            {!isInputFocused &&
                            (<button type='submit' className='w-20 h-8 border-0 rounded-full text-center font-medium text-white bg-blue-400 text-base hover:bg-blue-500'>
                                Reply
                            </button>
                            )}
                        </div>
                        {selectedImage && (
                            <div className="relative mt-2">
                                <img src={URL.createObjectURL(selectedImage)} alt="selected-ima" className="w-9/12 h-48 border-lg mb-4" />
                                <button className="absolute top-0 left-0 m-0.5 bg-gray-500 rounded-full" onClick={() => setSelectedImage(null)}>
                                    <AiOutlineCloseCircle className="text-xl text-white" />
                                </button>
                            </div>                                
                        )}
                        {isInputFocused &&(
                        <div className='w-full flex justify-between pt-6'>
                            <ul className='flex list-none py-2'>
                                <li className='p-1.5 mr-3 cursor-pointer hover:bg-blue-100 rounded-full'>
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
                                <li className='p-1.5 mr-3 cursor-pointer hover:bg-blue-100 rounded-full'>
                                    <AiOutlineGif className='text-lg text-blue-500'/>
                                </li>
                                <li className='p-1.5 mr-3 cursor-pointer hover:bg-blue-100 rounded-full'>
                                    <BsEmojiSmile 
                                        className='text-lg text-blue-500'
                                        onClick={() => setShowPicker((val) => !val)}
                                    />
                                </li>
                                <li className='p-1.5 mr-3 cursor-pointer hover:bg-blue-100 rounded-full'>
                                    <GoLocation className='text-lg text-blue-500'/>
                                </li>
                            </ul>
                            <button type='submit' className=' w-20 py-1 border-0 rounded-full text-center font-medium text-white bg-blue-400 text-base hover:bg-blue-500 '>
                                Reply
                            </button>
                        </div>
                        )}
                        
                    </form>
                </div>
            </div>
            {post?.comments?.map((comment)=>{ 
                return(
                <div className='flex border-b p-2'>
                    <img src={(`${api}${comment?.user?.imageUrl}`) ? (`${api}${comment?.user?.imageUrl}`):defaultImg} alt="user-img" className='w-12 h-12 rounded-full'/>
                    <div className='w-full flex flex-col ml-4'>
                        <div className='flex justify-between'>
                            <NavLink to='/home' className='font-medium text-xl'>
                                {comment?.user?.fullName}
                                <span className='text-lg font-normal pl-1'>@{comment?.user?.userName}</span>
                            </NavLink>
                            <CgMoreAlt className='text-xl'/>
                        </div>
                        <div className='w-full text-lg'>
                            <p>{comment?.content}</p>
                        </div>
                    </div>
                </div>
            
            )})}
        </div>
    )
}

export default PostId;