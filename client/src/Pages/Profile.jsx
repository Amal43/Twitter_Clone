import React,{useEffect, useState} from 'react';
import Nav from '../Components/NavBar/Nav';
import Sidebar from '../Components/SideBar/Sidebar';
import UserProfile from '../Components/UserProfile';
import EditModal from '../Components/EditModal';
import { useParams } from 'react-router-dom';

function Profile() {
    let param = useParams();
    const [openEditModal, setOpenEditModal] =useState(false);
    const [track,setTrack] =useState(false);
    useEffect(()=>{
        if(openEditModal){
            setTrack(false);
        }
    },[openEditModal])


    return (
        <>
            <div className='flex gap-4 w-11/12 mt-2 mx-auto'>
                <Nav donetrack={track}/>
                <UserProfile  openEditModal={setOpenEditModal} userId={param.id} donetrack={track}/>
                <Sidebar/>
            </div>


            {openEditModal && (
                <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-white md:opacity-60 md:bg-[#8e8989]" onClick={() => setOpenEditModal(false)}></div>
                    <div className="">
                        <EditModal closeEditModal={setOpenEditModal} track={setTrack}/>
                    </div>
                </div>
            )}
        </>
        
    )
}

export default Profile;   