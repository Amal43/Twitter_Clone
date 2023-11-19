import React,{useEffect, useState} from 'react';
import {BiArrowBack} from 'react-icons/bi';
import {BiCalendar} from 'react-icons/bi';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {CgMoreAlt} from 'react-icons/cg';
import {FaRegComment} from 'react-icons/fa';
import {AiOutlineRetweet,AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {BiBarChart} from 'react-icons/bi';
import {FiShare} from 'react-icons/fi';
import {getOneUser ,follow ,unfollow} from '../Redux/Slices/UserSlice';
import { getAllPosts } from '../Redux/Slices/PostSlice';
import { useDispatch } from 'react-redux';
import defaultImg from '../assets/images/avatar.jfif';
import { useNavigate } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance'
import format from 'date-fns/format';

function UserProfile({openEditModal ,userId ,donetrack}) {
    const [user,setUser] = useState({});
    const [authUser,setAuthUser] = useState({});
    const [posts,setPosts] = useState([]);
    const [success,setSuccess] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const api= "http://localhost:3001/assets/";
    let authUserId=JSON.parse(localStorage.getItem('userId'));
    console.log(authUserId)
    let id;
    let userPosts;
    id=JSON.parse(localStorage.getItem('userId'));
    if(typeof userId !== 'undefined'){
        id= userId;
    } 

    function formatJoinedDate(joined) {
        if (!joined) {
            return "No Joined Date";
        }
        
        try {
            return format(new Date(joined), 'MMM yyyy');
        } catch (error) {
            console.error("Invalid joined date:", joined);
            return "Invalid Joined Date";
        }
    }

    const followUser = async (id) => {
        try {
            await dispatch(follow(id));
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
        }
    }
    const unfollowUser = async (id) => {
        try {
            await dispatch(unfollow(id));
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
        }
    }
    useEffect(() => {
        dispatch(getOneUser(id)).then((result) => {
            setUser(result.payload.data);
        });
        dispatch(getAllPosts()).then((result) => {
            setPosts(result.payload.data);
        });
        dispatch(getOneUser(authUserId)).then((result) => {
            setAuthUser(result.payload.data);
        });
    }, [id]);
    useEffect(()=>{
        if(donetrack){
            dispatch(getOneUser(id)).then((result) => {
                setUser(result.payload.data);
            });
            dispatch(getAllPosts()).then((result) => {
                setPosts(result.payload.data);
            });
        }

    },[donetrack]);
    useEffect(()=>{
        if(success){
            setSuccess(false);
            dispatch(getOneUser(authUserId)).then((result) => {
                setAuthUser(result.payload.data);
            });
            dispatch(getOneUser(id)).then((result) => {
                setUser(result.payload.data);
            });
        }

    },[success])

    userPosts= posts.filter((post)=>{
        return id === post.user._id;
    });

    return (
        <div className='w-11/12 lg:w-2/4 border-r border-l'>
            <div className='sticky top-0 pt-0 backdrop-blur-xl border-b z-10'>
                <div className='flex flex-row items-center gap-5 px-4 py-1'>
                    <BiArrowBack className='text-lg'/>
                    <div>
                        <span className='font-medium text-2xl px-2'>{user?.fullName}</span>
                        <p className='text-sm'>{`${userPosts?.length}  posts`}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-neutral-100 h-44 relative">
                    <img src={`${api}${user?.bgImageUrl}`} alt="Cover Imag" className='bg-cover h-44 w-full'/>
                    <div className="absolute -bottom-16 left-4">
                        <div
                            className={`border-2 border-#aaa5a5 h-32 w-32  rounded-full 
                            hover:opacity-90 
                            transition 
                            cursor-pointer
                            relative
                        `}
                        >
                        <img className='bg-cover rounded-full h-32 w-32'
                            alt="Avatar"
                            src={`${api}${user?.imageUrl}`}
                        />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" pb-4">
                <div className="flex justify-end p-2">
                    {(authUserId === id) ?(
                        <button 
                        className='border rounded-full py-2 px-3 font-semibold hover:bg-slate-100'
                        onClick={(e)=>{
                            openEditModal(true);
                        }}
                    >
                        Edit Profile
                    </button>
                    ):(<>
                        {(authUser?.following?.includes(user?._id))? (
                        
                            <button
                                className=" bg-white text-black border font-semibold rounded-full px-3 py-2 mt-2"
                                onClick={() => {
                                    unfollowUser(user._id);
                                }}
                            >
                                Unfollow
                            </button>
                        
                        ) : (
                            <button
                                className=" bg-black text-white font-semibold rounded-full px-3 py-1 mt-2"
                                onClick={() => {
                                    followUser(user._id);
                                }}
                            >
                                Follow
                            </button>
                        )}
                        </>
                    )}
                </div>
                <div className="mt-8 px-4 ">
                    <div className="flex flex-col">
                        <p className=" text-lg font-semibold">
                            {user?.fullName}
                        </p>
                        <p className="text-md text-neutral-500">
                            @{user?.userName}
                        </p>
                    </div>
                    <div className="flex flex-col mt-4">
                    <p>  
                        {user?.bio}
                    </p>
                    <div 
                        className="
                        flex 
                        flex-row 
                        items-center 
                        gap-2 
                        mt-4 
                        text-neutral-500
                    ">
                        <HiOutlineLocationMarker size={20}/>
                        <p>Egypt</p>
                        <BiCalendar size={20} />
                        <p>
                        Joined {formatJoinedDate(user?.createdAt)}
                        </p>
                    </div>
                    </div>
                    <div className="flex flex-row items-center mt-4 gap-6">
                    <div className="flex flex-row items-center gap-1">
                        <p>{user?.following?.length}</p>
                        <p className="text-neutral-500">Following</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <p>{user?.followedBy?.length}</p>
                        <p className="text-neutral-500">Followers</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full gap-0'>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <a href='#'>Posts</a>
                    </div>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <a href='#'>Replies</a>
                    </div>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <a href='#'>Highlights</a>
                    </div>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <a href='#'>Media</a>
                    </div>
                    <div className='w-2/4 text-center py-4 hover:bg-slate-100'>
                        <a href='#'>Likes</a>
                    </div>
            </div>
            
            {userPosts?.map((post)=>{
                return(
                    <div 
                        className='w-full flex min-h-min py-3 px-4 border-t-1 cursor-pointer hover:bg-slate-100'
                        onClick={()=>{
                            navigate(`/post/${post._id}`)
                        }}
                    >
                        <img src={(`${api}${post?.user?.imageUrl}`) ? (`${api}${post?.user?.imageUrl}`):defaultImg} alt="user-img" className='w-12 h-12 rounded-full'/>
                        <div className='w-full flex flex-col ml-4'>
                            <div className='flex justify-between'>
                                <button 
                                    className='font-medium text-xl'
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        // openReplyModal(true);
                                        // navigate(`/profile/${post?.user?._id}`)
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
                                <img src={`${api}${post?.postImage}`}  alt='post_img' className={`${(post?.postImage) === " "?`hidden`:`w-10/12 h-8/12 rounded-lg my-3`}`} />
                            </div>
                            <div className='w-full flex justify-between mt-6 text-xl text-[#635f5f]'>
                                <button 
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        // openReplyModal(true);
                                        // navigate(`/home/${post._id}`)
                                    }}
                                    className='p-1 hover:bg-blue-100 rounded-full'
                                >
                                    <FaRegComment className='hover:text-blue-400'/>
                                </button>
                                <button
                                className='p-1 hover:bg-green-100 rounded-full'
                                ><AiOutlineRetweet className='hover:text-green-400'/></button>
                                {
                                    (post?.likes?.includes(user._id))?(
                                        <button
                                            className='p-1 hover:bg-red-100 rounded-full'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // unlike(post._id);
                                            }}
                                        >
                                            <AiFillHeart className='text-red-400 '/>
                                        </button>
                                    ):(

                                        <button
                                            className='p-1 hover:bg-red-100 rounded-full'
                                            onClick={(e) =>{
                                                e.stopPropagation();
                                                // like(post._id);
                                            }}
                                        >
                                            <AiOutlineHeart className='hover:text-red-400 '/>
                                        </button>
                                        
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
        </div>
    )
}

export default UserProfile;