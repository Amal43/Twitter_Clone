import React, { useEffect, useState } from 'react';
import userImg from '../assets/images/userProfile.jpg';
import userCover from '../assets/images/userCover.jfif';
import {BiCamera} from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { editProfile ,getOneUser} from '../Redux/Slices/UserSlice';



function EditModal({ closeEditModal ,track}) {
    let userId=JSON.parse(localStorage.getItem('userId'));
    const[imageUrl,setImageUrl] = useState(null);
    const[bgImageUrl,setBgImageUrl] = useState(null);
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [user ,setUser] = useState({});
    const [sucess ,setSuccess] = useState(false);
    const dispatch = useDispatch();
    const api= "http://localhost:3001/assets/";
    let id=JSON.parse(localStorage.getItem('userId'));

    const handleUserImageClick = () => {
        document.getElementById('imageUrl').click();
    };
    const handleBgImageClick = () => {
        document.getElementById('bgImageUrl').click();
    };
    const handleUserImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageUrl(file);
        }
        console.log(imageUrl)
    };
    const handleBgImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBgImageUrl(file);
        }
        console.log(bgImageUrl)
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let form = new FormData();
        if(bgImageUrl){
            form.append('bgImageUrl', bgImageUrl);
        }
        if(imageUrl){
            form.append('imageUrl', imageUrl);
        }
        if(fullName){
            form.append('fullName', fullName);
        }
        if(userName){
            form.append('userName', userName);
        }
        if(bio){
            form.append('bio',bio);
        }
        console.log(imageUrl)
        console.log(bgImageUrl)
    
        try {
            await dispatch(editProfile(form));
            setSuccess(true);
            track(true)
            closeEditModal(false);

        } catch (error) {
            console.log(error);
            setSuccess(false);
        }
    }
    
    useEffect(()=>{
        dispatch(getOneUser(id)).then((result) => {
            setUser(result.payload.data);
        });
        
    },[]);
    
    return (
        <div className='flex justify-center'>
            <form 
                className='w-full md:w-3/6 h-fit font-medium text-left md:rounded-3xl md:shadow-2xl z-20 absolute top-6 bg-white'
                onSubmit={handleSubmit}
            >
                <div className='sticky top-0 backdrop-blur-xl border-t rounded-3xl z-10 px-3 py-2'>
                    <div className='flex flex-row justify-between  items-center gap-5 py-1'>
                        <div>
                            <button
                                onClick={()=>{
                                    closeEditModal(false);
                                }}
                                className='w-8 h-8 hover:bg-slate-100 hover:rounded-full hover:w-8'
                            >X</button>
                            
                                <span className='font-medium text-xl px-2'>Edit Profile</span>
                        </div>
                        <div>
                            <button type='submit' className='bg-black px-4 py-1 rounded-full text-white font-medium hover:bg-[#171717]'>
                                save
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-100 h-40 relative mb-20 border-t">
                    <img src={!bgImageUrl?(`${api}${user?.bgImageUrl}`):(URL.createObjectURL(bgImageUrl))} alt="Cover Imag" className='bg-cover h-40 w-full'/>
                    <div 
                        className='cursor-pointer absolute top-1/3 left-1/2  p-3 bg-black opacity-60 rounded-full'
                        onClick={handleBgImageClick} 
                    >
                        <BiCamera className='text-white text-xl'/>
                        <input
                            id="bgImageUrl"
                            name='bgImageUrl'
                            type='file'
                            className='hidden'
                            onChange={handleBgImageChange}
                        />
                    </div>
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
                                src={!imageUrl?(`${api}${user?.imageUrl}`):(URL.createObjectURL(imageUrl))}
                            />
                        
                            <div 
                                className='absolute top-1/3 left-1/3 p-3 bg-black opacity-60 rounded-full'
                                onClick={handleUserImageClick} 
                            >
                                <BiCamera className='text-white text-xl'/>
                                <input
                                    id="imageUrl"
                                    name='imageUrl'
                                    type='file'
                                    className='hidden'
                                    onChange={handleUserImageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-11/12 mb-3 mx-auto border rounded-md px-2 focus-within:border-blue-400 focus-within:border-2'>
                    <label className='block text-sm text-blue-500'>FullName</label>
                    <input
                        id='fullName'
                        name='fullName'
                        type='text'
                        className='outline-none	text-lg w-full pb-3 '
                        placeholder={user?.fullName}
                        onChange={(e)=>{setFullName(e.target.value)}}
                    />
                </div>   
                <div className=' w-11/12 mb-3 mx-auto border rounded-md px-2 focus-within:border-blue-400 focus-within:border-2'>
                    <label className='block text-sm text-blue-500'>UserName</label>
                    <input
                        id='userName'
                        name='userName'
                        type='text'
                        className='outline-none	text-lg w-full pb-3 '
                        placeholder={user?.userName}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                </div>
                <div className=' w-11/12 mb-3 mx-auto border rounded-md px-2 focus-within:border-blue-400 focus-within:border-2'>
                    <label className='block text-sm text-blue-500'>Bio</label>
                    <input
                        id='bio'
                        name='bio'
                        type='text'
                        className='outline-none	text-lg w-full pb-3 '
                        placeholder={user?.bio}
                        onChange={(e)=>{setBio(e.target.value)}}
                    />
                </div>
            </form>
        </div>
    )
}

export default EditModal;