import Image from 'next/image'
import React from 'react'

function Pricing() {
    return (
        <div className='max-w-[90%] mx-auto py-28' id='pricing'>
            <p className='font-bold text-[55px] text-center max-w-[80%] mx-auto'>Our <span className='text-[#266CAB]'>Pricing </span>Plans</p>
            <p className='text-center text-[#00000066] text-[29px] mx-auto font-medium max-w-[90%]'>Choose a plan that fits your needs and budget, and let’s embark on this journey of Designing together. Affordable excellence avaits you!</p>
            <div className="flex justify-center mt-10">
                <div className="relative w-1/5 aspect-[4/5]">
                    <Image
                        src="/images/user/home/free.svg"
                        alt="free"
                        fill
                    />
                </div>
                <div className="relative w-2/5 aspect-[5/5]">
                    <Image
                        src="/images/user/home/basic.svg"
                        alt="basic"
                        fill
                    />
                </div>
                <div className="relative w-1/5 aspect-[4/5]">
                    <Image
                        src="/images/user/home/premium.svg"
                        alt="premium"
                        fill
                    />
                </div>
            </div>

        </div>
    )
}

export default Pricing
