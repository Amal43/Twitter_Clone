import React,{useState} from 'react';
import logo from '../assets/images/X-Logo.png';

import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    Button, 
    useDisclosure
} from "@nextui-org/react";
import { registerUser } from '../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function SignUp() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isButtonDisabled ,setIsButtonDisabled]= useState(true); 
    const [emailError, setEmailError] = useState('');

    const dispatch = useDispatch();
    const month=['January','February','March','April','May','June','July','August','September','October','November','December']
    const day=['1','2','3','4','5','6','7','8','9','10',
                '11','12','13','14','15','16','17','18','19','20',
                '21','22','23','24','25','26','27','28','29','30','31'
            ]
    const year=['2023','2022','2021','2020',
                '2019','2018','2017','2016','2015','2014','2013','2012','2011','2010',
                '2009','2008','2007','2006','2005','2004','2003','2002','2001','2000',
                '1999','1998','1997','1996','1995','1994','1993','1992','1991','1990',
            ]
              // Function to handle email input change
            const handleEmailChange = (e) => {
                setEmail(e.target.value);
                setEmailError('');
            };

            const handleSubmit = async(e) => {
                e.preventDefault();
                
                const validateEmail = (email) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                };
                
                // Check if email is empty or invalid
                if (!email) {
                    setEmailError('Please enter your email.');
                    return;
                }
                if (!validateEmail(email)) {
                    setEmailError('Invalid email format.');
                    return;
                }
                // Form the birthDate value
                const birthDate = new Date(`${selectedMonth} ${selectedDay}, ${selectedYear}`);                
                const newUser = {
                    fullName,
                    email,
                    password,
                    birthDate
                };

                try {
                    await dispatch(registerUser(newUser));
                    onClose();
                    setIsButtonDisabled(true);
                } catch (error) {
                    console.log(error);
                }
            };

        useEffect(() => {
            if (fullName && 
                email && 
                password && 
                selectedMonth && 
                selectedDay && 
                selectedYear
                ){
                setIsButtonDisabled(false);
            } 
        }, [fullName, email, password, selectedMonth, selectedDay, selectedYear]);
    return (
        <>
            <Button onPress={onOpen} color='light' className="font-bold">Create account</Button>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
                isDismissable={false} 
                size={"xl"}
            >
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className={style.header}>
                            <img src={logo} alt="logo_twitter" className={style.logo}/>
                        </ModalHeader>
                        <ModalBody className={style.body}>
                            <h1 className='text-4xl font-medium mb-2'>Create your account</h1>
                            <form onSubmit={handleSubmit}>
                                <div className={`w-full ${style.inputDiv}`}>
                                    <label className={style.label}>Name</label>
                                    <input
                                        id='fullName'
                                        name='fullName'
                                        type='text'
                                        className={style.input}
                                        onChange={(e)=>{setFullName(e.target.value)}}
                                        placeholder='Name'
                                        required
                                    />
                                </div> 
                                <div className={`w-full ${style.inputDiv}`}>
                                    <label className={style.label}>Email</label>
                                    <input
                                        id='email'
                                        name='email'
                                        type='text'
                                        className={style.input}
                                        onChange={handleEmailChange}
                                        placeholder='Email'
                                    />
                                </div>  
                                {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
                                <div className={`w-full ${style.inputDiv}`}>
                                    <label className={style.label}>Password</label>
                                    <input
                                        id='password'
                                        name='password'
                                        type='password'
                                        className={style.input}
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                        placeholder='Password'
                                        required
                                    />
                                </div> 
                                <div className='mt-2'>
                                    <p className='font-medium text-black py-1'>Date of birth</p>
                                    <p className='text-sm text-[#403d3d] py-2'>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                                    <div className='flex flex-row'>
                                        <div className={`w-2/5 ${style.inputDiv}`}>
                                            <label className={style.label}>Month</label>
                                            <select 
                                                name='month'
                                                aria-invalid='false' 
                                                className={style.input}
                                                onChange={(e)=>{setSelectedMonth(e.target.value)}}
                                                required
                                            >
                                                <option disabled value=""> </option>
                                                {
                                                    month.map((item, index) => {
                                                        return<option value={item}>{item}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className={`w-1/5 ${style.inputDiv}`}>
                                            <label className={style.label}>Day</label>
                                            <select 
                                                name='day'
                                                aria-invalid='false' 
                                                className={style.input}
                                                onChange={(e)=>{setSelectedDay(e.target.value)}}
                                                required
                                            >
                                                <option disabled value=''> </option>
                                                {
                                                    day.map((item, index) => {
                                                        return<option value={item}>{item}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className={`${style.inputDiv}`}>
                                            <label className={style.label}>Year</label>
                                            <select 
                                                name='year'
                                                aria-invalid='false' 
                                                className={style.input}
                                                onChange={(e)=>{setSelectedYear(e.target.value)}}
                                                required
                                            >
                                                <option disabled> </option>
                                                {
                                                    year.map((item, index) => {
                                                        return<option value={item}>{item}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    type='submit' 
                                    disabled={isButtonDisabled}
                                    className={`${style.btn} text-white font-bold mt-2 w-full py-3 
                                    ${isButtonDisabled?` bg-[#272727] `:
                                    `bg-black border-black`}
                                    `} 
                                
                                >
                                    Create
                                </button>
                            </form>
                        </ModalBody>
                    </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

const style={
    header:`flex flex-col gap-1`,
    logo:`w-14 mx-auto`,
    body:` w-10/12 mx-auto`,
    inputDiv:`mt-1 mx-auto px-2 border rounded 
            focus-within:border-blue-400 
            focus-within:border-2
    `,
    label:`block text-sm text-blue-400`,
    input:` w-full outline-none	text-lg pb-3`,
    btn:`block w-7/12 my-1 mx-auto py-2 border rounded-full border-sky-100 text-center`,
    icon:`inline-block pr-1.5 text-2xl`,
}

export default SignUp;