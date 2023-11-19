import React from 'react';
import PostId from '../Components/PostId';
import Nav from '../Components/NavBar/Nav';
import Sidebar from '../Components/SideBar/Sidebar';
import { useParams } from 'react-router-dom';

function Post() {
    let param = useParams();
    return (
        <div className='flex gap-4 w-11/12 mt-2 mx-auto'>
            <Nav/>
            <PostId postId={param.id}/>
            <Sidebar/>
        </div>
    )
}

export default Post;