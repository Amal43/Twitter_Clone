import React from 'react';
import logo from '../assets/images/X-Logo.png';
import { FcGoogle } from "react-icons/fc";
import { FaApple }  from 'react-icons/fa';
import Login from './Login';
import SignUp from './SignUp';

function Welcome() {
    return (
        <div className={style.container}>
            <div className={style.flex}>
                <div className={style.logo}>
                    <img src={logo} alt="X_logo"/>
                </div>
                <div className={style.contentDiv}>
                    <h1 className={style.headingOne}>Happening now</h1>
                    <p className={style.pOne}>Join today.</p>

                    <a href='#' className={`${style.btn} py-2 hover:bg-blue-50`}>
                        <div ><FcGoogle className={style.icon}/>Sign up with Google</div>
                    </a>

                    <a href='#' className={`${style.btn} py-2 hover:bg-gray-200`}>
                        <div><FaApple className={style.icon}/>Sign up with Apple</div>
                    </a>

                        <hr className={style.hr}/>
                        <span className="px-2 w-2 h-1">or</span>
                        <hr className={style.hr}/>
                        
                    <div className={`${style.btn}  py-0.5 bg-blue-400 border-blue-400 hover:bg-blue-500 hover:border-blue-500 text-white font-bold`}>
                        {/* Create account */}
                        <SignUp/>
                    </div>

                    <div className={style.links}>
                            By signing up, you agree to the 
                        <a href='#' className={style.link}> Terms of Service </a> 
                            and
                        <a href='#' className={style.link}> Privacy Policy </a>
                            ,including 
                        <a href='#' className={style.link}> Cookie Use.</a>
                    </div>

                    <span className="text-lg font-medium mb-5">Already have account?</span>

                    <div className={`${style.btn} py-0.5 text-blue-400 font-bold hover:bg-blue-50`}>
                        <Login/>
                    </div>

                </div>
            </div>
        </div>
    )
};

const style={
    container:`mx-10`,
    flex:`w-full flex flex-wrap justify-between`,
    logo:`w-20 mt-4 lg:w-3/6 lg:mt-40`,
    contentDiv:`w-full lg:w-2/5`,
    headingOne:`w-full text-4xl mt-4 font-bold py-6 md:text-6xl md:mt-10`,
    pOne:`text-2xl lg:text-3xl font-bold py-6`,
    btn:`block w-7/12 my-3 border rounded-full text-center`,
    icon:`inline-block pr-1.5  text-2xl`,
    links:`w-7/12 text-xs mb-12`,
    link:`text-blue-500 hover:underline`,
    hr:`border-0.5 border-gray-100 inline-block w-1/4`
}
export default Welcome;