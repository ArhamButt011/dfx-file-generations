import Image from 'next/image'
import React from 'react'

function Pricing() {
    return (
        <div className='max-w-[90%] mx-auto md:py-28' id='pricing'>
            <p className='font-bold md:text-[55px] text-[40px] text-center md:max-w-[80%] mx-auto'>Our <span className='text-[#266CAB]'>Pricing </span>Plans</p>
            <p className='text-center text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium max-w-[90%]'>Choose a plan that fits your needs and budget, and let’s embark on this journey of Designing together. Affordable excellence avaits you!</p>
            <div className="flex md:flex-row flex-col justify-center mt-10 md:gap-0 gap-6">
                <div className="relative md:w-1/5 aspect-[4/5]">
                    <Image
                        src="/images/user/home/free.svg"
                        alt="free"
                        fill
                    />
                </div>
                <div className="relative md:w-2/5 md:aspect-[5/5] aspect-[4/5]">
                    <Image
                        src="/images/user/home/basic.svg"
                        alt="basic"
                        fill
                    />
                </div>
                <div className="relative md:w-1/5 aspect-[4/5]">
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
