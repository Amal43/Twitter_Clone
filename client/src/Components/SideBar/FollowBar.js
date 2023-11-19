import defaultImg from '../../assets/images/avatar.jfif';
import React, { useEffect, useState ,useRef ,useContext} from 'react'
import { useDispatch} from 'react-redux';
import {getAllUsers ,getOneUser, follow ,unfollow} from '../../Redux/Slices/UserSlice';
import { SocketContext } from '../../Socket';
import { createConversation } from '../../Redux/Slices/MessageSlice';


const FollowBar = () => {
    const socket = useContext(SocketContext);
    const authUserId=JSON.parse(localStorage.getItem('userId'));
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [user,setUser]=useState({});
    const [success,setSuccess] =useState(false);
    const api= "http://localhost:3001/assets/";
    let arr=[]; 
    let id=JSON.parse(localStorage.getItem('userId'));

    const followUser = async (id) => {
        socket.emit("sendLikeNotification",{
            sender:user,
            receiverId:id,
            post:'',
            type:"follow",
        })
        try {
            await dispatch(follow(id));
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
        }
        try {
            await dispatch(createConversation(id));
            // setSuccess(true);
        } catch (error) {
            // setSuccess(false);
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
        dispatch(getAllUsers()).then((result) => {
            setUsers(result.payload.data);
        })
            dispatch(getOneUser(id)).then((result) => {
                setUser(result.payload.data);
        })
    }, []);
    useEffect(() => {
        if(success){
            dispatch(getOneUser(id)).then((result) => {
                setUser(result.payload.data);
            })
            setSuccess(false);
        } 
    }, [success]);
    arr=users?.map((userr) => {
        const isFollowing = user?.following?.includes(userr._id);
        return { ...userr, isFollowing };
    })


    
    return (
        <div className='bg-slate-100 rounded-2xl my-3'>
                <h2 className='font-bold text-xl p-4'>Who to follow</h2>
                    {arr.map((user)=>{
                    return(
                        authUserId !== user._id &&
                            <div className='w-full flex py-2 hover:bg-slate-50 pl-2 '>
                                <img src={(`${api}${user?.imageUrl}`) ? (`${api}${user?.imageUrl}`):defaultImg} alt='user_image' className='w-12 h-12 rounded-full'/>
                                <div className='flex flex-row justify-between w-3/4 pl-2'>
                                    <div>
                                        <p className='font-bold'>{user?.fullName}</p>
                                        <p>@{user?.userName}</p>
                                    </div>
                                    <div>
                                        {user.isFollowing ? (
                                            <button
                                                className="w-full bg-white text-black border font-semibold rounded-full px-3 py-2 mt-2"
                                                onClick={() => {
                                                        unfollowUser(user._id);
                                                    }}
                                            >
                                                Unfollow
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full bg-black text-white font-semibold rounded-full px-3 py-2 mt-2"
                                                onClick={() => {
                                                    followUser(user._id);
                                                }}
                                            >
                                                Follow
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );

                    })}
                
                <div className='p-4 hover:bg-slate-50'>
                    <a href="#" className='text-blue-500'>Show more</a>
                </div>
        </div> 
    );
};

export default FollowBar;