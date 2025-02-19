import Image from 'next/image'
import React from 'react'

function Pricing() {
    return (
        <div className='max-w-[90%] mx-auto md:py-20' id='pricing'>
            <p className='font-bold md:text-[55px] text-[40px] text-center md:max-w-[80%] mx-auto'><span className='text-[#266CAB]'>Our </span> Pricing Plans</p>
            <p className='text-center text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium md:max-w-[90%]'>Choose a plan that fits your needs, and let&apos;s start designing together.</p>
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
