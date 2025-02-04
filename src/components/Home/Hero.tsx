import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
    return (
        <>
            <div className='py-44 max-w-[90%] mx-auto'>
                <p className='font-bold text-[55px] text-center max-w-[80%] mx-auto'>Effortless DXF File Creation with AI Precision</p>
                <p className='text-center text-[#00000066] text-[29px] mx-auto font-medium max-w-[90%]'>Transform your designs into production-ready DXF files in seconds. Experience seamless uploads, instant previews, and accurate outputs – all powered by advanced AI technology. Start your free trial today and simplify your workflow!</p>
                <div className='my-10 flex justify-center'>
                    <Link href="#" className='bg-[#266CA8] text-white rounded-full mt-2 flex justify-center h-[10%] px-3 py-2 w-[20%]font-medium'>Try LumaShape Now</Link>
                </div>
                <Image src="/images/user/home/hero.svg" alt="" className='mx-auto w-full' width={100} height={100} />


                {/* why choose */}

            </div>
            <div className='py-20 max-w-[90%] mx-auto' id='benefits'>
                <p className='font-bold text-[55px] text-center '>Why <span className='text-[#266CAB]'>Choose</span> Our DXF Generator?</p>
                <p className='text-center text-[#00000066] text-[29px] mx-auto font-medium max-w-[90%]'>
                    From simplifying your design process to providing unparalleled precision, our DXF Generator is built to meet your needs. Whether you&apos;re a hobbyist or a professional, you&apos;ll find a solution that’s fast, affordable, and reliable. Here&apos;s how we make it easier for you to create and manage DXF files.
                </p>
                <div className="flex pt-20 justify-between ">
                    {/* AI powered */}
                    <div className='flex flex-col items-center'>
                        <Image src="/images/user/home/AI.svg" alt="" className='' width={100} height={100} />
                        <p className='font-bold text-[30px] text-center'>AI-Powered Precision</p>
                        <p className='text-center text-[#00000066] text-[21px] mx-auto font-medium max-w-[80%]'>Our advanced AI detects and processes tool layouts with extreme accuracy, instantly generating high-quality DXF files—no manual tracing required.</p>
                    </div>
                    {/* fast & simple */}
                    <div className='flex flex-col items-center'>
                        <Image src="/images/user/home/fast.svg" alt="" className='' width={100} height={100} />
                        <p className='font-bold text-[30px] text-center'>Custom Offset Parameter</p>
                        <p className='text-center text-[#00000066] text-[21px] mx-auto font-medium max-w-[70%]'>Fine-tune tool fitment with the custom offset parameter, allowing you to control how snug or loose each tool sits within the insert. Achieve the perfect balance of security and accessibility for your tools</p>
                    </div>
                    {/* access Anytime */}
                    <div className='flex flex-col items-center'>
                        <Image src="/images/user/home/access.svg" alt="" className='' width={100} height={100} />
                        <p className='font-bold text-[30px] text-center'>Production-Ready Outputs</p>
                        <p className='text-center text-[#00000066] text-[21px] mx-auto font-medium max-w-[80%]'>Generate DXF files ready for cutting, with an optional bounding box that auto-centers tool contours and scales to your specified width and length—no extra adjustments needed.</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Hero
