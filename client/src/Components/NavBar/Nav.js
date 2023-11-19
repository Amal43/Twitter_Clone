import React, { useState ,useEffect} from 'react';
import logo from '../../assets/images/X-Logo.png';
import {CgMoreO,CgMoreAlt} from 'react-icons/cg';
import { NavLink} from 'react-router-dom';
import LogModal from './LogModal';
import MoreModal from './MoreModal';
import PostModal from './PostModal';
import defaultImg from '../../assets/images/avatar.jfif';
import { useDispatch} from 'react-redux';
import {getOneUser} from '../../Redux/Slices/UserSlice';
import NavLinks from './NavLinks';
import { GiFeather } from "react-icons/gi";


function Nav({donetrack}) {
    const dispatch=useDispatch();
    const [openLogModal, setOpenLogModal] =useState(false);
    const [openMoreModal, setOpenMoreModal] =useState(false);
    const [openPostModal,setOpenPostModal] = useState(false);
    const [user,setUser]=useState({});
    const api= "http://localhost:3001/assets/";
    let id=JSON.parse(localStorage.getItem('userId'));
    useEffect(() => {
        dispatch(getOneUser(id)).then((result) => {
            setUser(result.payload.data);
        })
    }, []);

    useEffect(() => {
        if(donetrack){
            dispatch(getOneUser(id)).then((result) => {
                setUser(result.payload.data);
            })
        }
    }, [donetrack]);

    


    return (
    <>
        <div className='w-2/12 lg:w-1/5  mb-10 '>
            <div className='w-16 lg:w-60 fixed lg:pr-4 overflow-y-auto h-screen'>
                <NavLink to="/home">
                    <img src={logo} alt="X_logo" className={style.logo}/>
                </NavLink>
                
                <nav>
                    <NavLinks/>
                    <button 
                        onClick={()=>{
                            setOpenMoreModal(!openMoreModal);
                        }} 
                    >
                        <div className='flex gap-6  px-2 py-3 hover:bg-gray-200 hover:rounded-full hover:w-fit'>
                            <CgMoreO className='text-3xl'/>
                            <span className='text-xl  hidden lg:block'>
                                More
                            </span>
                        </div>
                    </button>
                </nav>

                <button 
                    onClick={()=>{
                        setOpenPostModal(true)
                    }}
                    className=' w-full my-3 border-0 rounded-full text-center font-bold text-white bg-blue-400 py-3 text-lg hover:bg-blue-500 hidden lg:block'
                >
                    Post
                </button>
                <div 
                    className='w-10 h-10 mb-1  ml-1 rounded-full bg-blue-400 p-2 cursor-pointer block lg:hidden'
                    onClick={()=>{
                        setOpenPostModal(true)
                    }}
                >
                    <GiFeather className='text-white text-2xl font-semibold'/>
                </div>
                
                <button className='w-12 lg:w-full flex items-center hover:bg-gray-200 hover:rounded-full p-1 lg:p-2 mb-6'
                    onClick={()=>{
                        setOpenLogModal(!openLogModal);
                    }} 
                >
                    <div>
                        <img src={(`${api}${user?.imageUrl}`) ? (`${api}${user?.imageUrl}`):defaultImg} className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full `} alt=''/>
                    </div>
                    <div className='lg:flex justify-between items-center w-3/4 hidden pl-2'>
                        <div>
                            <p className='font-bold'>{user?.fullName}</p>
                            <p>@{user?.userName}</p>
                        </div>
                        <CgMoreAlt className='text-3xl'/>
                    </div>
                </button>
                {openMoreModal && <MoreModal/>}
                {openLogModal && <LogModal userName={user?.userName}/>}
                                
            </div>
        </div>
        {openPostModal && (
            <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="absolute top-0 left-0 w-full h-full bg-white md:opacity-60 md:bg-[#8e8989]" onClick={() => setOpenPostModal(false)}></div>
                <div className="">
                    <PostModal closePostModal={setOpenPostModal} user={user} />
                </div>
            </div>
        )}
    </>    
    
)
}

const style={
logo:`w-14 py-2`

};

export default Nav;


