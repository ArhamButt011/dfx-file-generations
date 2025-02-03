import Image from 'next/image'
import React from 'react'

function Sample() {
    return (
        <div className='max-w-[90%] mx-auto ' id='sample'>
            <p className='font-bold text-[55px] text-center max-w-[80%] mx-auto'><span className='text-[#266CAB]'>Sample </span>Images</p>
            <p className='text-center text-[#00000066] text-[29px] mx-auto font-medium max-w-[90%]'>Here aregvrde some of the sample images that includes input added images and output images you can access this</p>
            <div className="flex justify-between gap-4">
                <div className="relative w-1/2 aspect-square">
                    <Image
                        src="/images/user/home/sample1.svg"
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="relative w-1/2 aspect-[16/9]">
                    <Image
                        src="/images/user/home/sample2.svg"
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>


        </div>
    )
}

export default Sample
