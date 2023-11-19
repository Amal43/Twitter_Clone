import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LogModal({userName}) {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleLogOut = ()=>{
        localStorage.clear();
        toast.success('Logged out successfully');
        dispatch(logoutUser);
        nav('/welcome');
    }

    return (
        <>
            <div className='w-68 font-medium text-left  rounded-3xl shadow-2xl py-3 absolute z-20 bg-white top-3/4 '>
                <div className='py-3 px-3 hover:bg-slate-100'>
                    <p>Add an existing account</p>
                </div>
                <div 
                    className='py-3 px-3 hover:bg-slate-100 cursor-pointer'
                    onClick={handleLogOut}
                >
                    <p>Log out @{userName}</p>
                </div>
            </div>
        </>
    )
}

export default LogModal;