import React from 'react';
import { Oval } from  'react-loader-spinner';


function Loader() {
    return (
        <div className=' mb-10 flex justify-center items-center h-full'>
            <Oval
                height={50}
                width={50}
                color="#758fd5"
                wrapperStyle={{}}
                wrapperClass="margin:auto"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="##8989cd"
                strokeWidth={2}
                strokeWidthSecondary={2}
            
            />
        </div>
    )
}

export default Loader;