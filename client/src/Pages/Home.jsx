import React, { useEffect, useState } from 'react';
import Nav from '../Components/NavBar/Nav';
import Sidebar from '../Components/SideBar/Sidebar';
import MainContent from '../Components/MainContent';
import ReplyModal from '../Components/ReplyModal';
import { useParams } from 'react-router-dom';

function Home() {
    const [openReplyModal, setOpenReplyModal] =useState(false);

    let param = useParams();

    return (
        <>
            <div className='flex gap-0 lg:gap-2 w-11/12 mt-2 mx-auto'>
                <Nav/>
                <MainContent  openReplyModal={setOpenReplyModal} />
                <Sidebar/>
            </div>
            {openReplyModal && (
                <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-white md:opacity-60 md:bg-[#8e8989]" onClick={() => setOpenReplyModal(false)}></div>
                    <div className="">
                        <ReplyModal closeReplyModal={setOpenReplyModal} postId={param.id} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Home;