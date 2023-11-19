import React from 'react';
// import defaultImg from '../assets/images/avatar.jfif';
import formatDistance from 'date-fns/formatDistance'

function Message({message,own,receiver}) {
    const api= "http://localhost:3001/assets/";

    return (
        <div className={`flex flex-col mb-3 mx-3 ${own ?`items-end `:`items-start`}`}>
            <div className={`flex flex-row`}>
                <div>
                    <img src={`${api}${receiver?.imageUrl}`} alt="user-img" className={own?'hidden':`w-14 h-14 hidden lg:block rounded-full`}/>
                </div>
                <p className={`rounded-2xl py-3 px-2 max-w-md ${own?`bg-blue-500 text-white`:` bg-slate-100`} `}> {message?.text} </p>
            </div>
            <p>{`.${formatDistance(new Date(message?.createdAt), new Date(), { addSuffix: true })}`}</p>
        </div>
    )
}

export default Message;