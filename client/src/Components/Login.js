import React,{useEffect, useState} from 'react';
import logo from '../assets/images/X-Logo.png';
import { FcGoogle } from "react-icons/fc";
import { FaApple }  from 'react-icons/fa';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure
} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom';
import { loginUser } from '../Redux/Slices/AuthSlice';
import { useDispatch,useSelector  } from 'react-redux';



function Login() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [show,setShow]=useState(true);
    const [email ,setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [success,setSuccess] =useState(null);
    const dispatch =useDispatch();
    let nav= useNavigate();
    let id=JSON.parse(localStorage.getItem('userId'));
    const user = useSelector((state) => state.authSlice);



    const handleSubmit= async(e)=>{
        e.preventDefault();
        
        const loginData={
            email,
            password
        }
        console.log(loginData)
        try {
            await dispatch(loginUser(loginData));
            setSuccess('User loggedin successfully!');
            if(user){
                onClose();
                setTimeout(()=>{
                    nav('/home');
                    window.location.reload();
                }, 400); 
            }
        } catch (error) {
            console.log(error);
            setSuccess('Error lggedin user. Please try again.');
        }
    }

    useEffect(()=>{
        if(!isOpen){
            setShow(true);
        }
    },[isOpen]);

    return (
        <>
            <Button onPress={onOpen} color='light' className='font-bold'>Sign in</Button>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
                isDismissable={false} 
                size={"xl"}    
            >
            <ModalContent>
                {(onClose) =>(
                <>
                    <ModalHeader className="flex flex-col gap-1">
                        <img src={logo} alt="logo twitter" className='w-14 mx-auto'/>
                    </ModalHeader>
                    {show?
                    (<ModalBody>
                        <h1 className='text-4xl font-medium ml-24 mb-4'>Sign in to x</h1>
                        <a href='#' className={`${style.btn} hover:bg-blue-50`}>
                            <div ><FcGoogle className={style.icon}/>Sign up with Google</div>
                        </a>

                        <a href='#' className={`${style.btn} hover:bg-gray-200`}>
                            <div><FaApple className={style.icon}/>Sign up with Apple</div>
                        </a>
                        <span className="mx-auto">or</span>
                        <div className=' w-7/12 my-1 mx-auto py-2 border rounded-md pl-2 focus-within:border-blue-400 focus-within:border-2'>
                            <label className='block text-sm text-blue-500'>Phone, email, or username</label>
                            <input
                                id='email'
                                name='email'
                                type='text'
                                onChange={(e)=>{setEmail(e.target.value)}}
                                className='outline-none	text-xl w-full'
                                placeholder='Phone, email, or username'
                            />
                        </div>    
                        <button 
                            className={`${style.btn} bg-black border-black hover:bg-[#272727] text-white font-bold`}
                            onClick={()=>{setShow(false)}}
                        >
                            Next
                        </button>
                        <a href='#' className={`${style.btn} hover:bg-gray-200 font-bold`}>
                            Forget password?
                        </a>
                    </ModalBody>):
                    (<ModalBody>
                        <form onSubmit={handleSubmit}>
                            <h1 className='text-4xl font-medium ml-24 mb-4'>Enter your password</h1>
                            <div className=' w-10/12 my-1 mx-auto py-2 px-2 bg-slate-100 rounded'>
                                <label className='block text-sm text-gray-400'>Username</label>
                                <input
                                    className='outline-none	text-xl w-full bg-slate-100 '
                                    placeholder={email}
                                    disabled
                                />
                            </div> 
                            <div className=' w-10/12 mt-1 mx-auto border rounded-md px-2 focus-within:border-blue-400 focus-within:border-2'>
                                <label className='block text-sm text-blue-500'>Password</label>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    className='outline-none	text-lg w-full pb-3 '
                                    placeholder='Password'
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                />
                            </div>    
                            
                            <a href='#' className={`text-sm text-blue-500 hover:underline ml-10`}>
                                Forget password?
                            </a>
                            <button type='submit' className={`${style.btn} bg-black border-black hover:bg-[#272727] text-white font-bold mt-32 w-10/12 py-3`}>
                                Log in
                            </button>
                        </form>
                        
                    </ModalBody>)
                    }
                    <ModalFooter className='mx-auto'>
                        <span className='text-[#4b4b4b] mx-auto'>Don't have an account?</span>
                        <a href='#' className={`inline-block pl-1 text-blue-400 hover:underline`}>
                            Sign up
                        </a>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
            </Modal>
        </>
    );
}

const style={
    btn:`block w-7/12 my-1 mx-auto py-2 border rounded-full border-sky-100 text-center`,
    icon:`inline-block pr-1.5 text-2xl`,
}

export default Login;