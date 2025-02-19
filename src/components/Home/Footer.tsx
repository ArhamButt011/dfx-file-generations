import Image from 'next/image'
import React from 'react'
import { useTabContext } from '@/context/TabContsxt'
function Footer() {
    const { setActiveTab } = useTabContext()
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    }
    return (
        <div>
            <div className='mt-20 bg-[#F7F7F7] py-5'>
                <div className="flex md:flex-row flex-col max-w-[90%] mx-auto md:justify-center lg:gap-60 md:gap-40 xl:gap-100 2xl:gap-180 justify-between">
                    {/* left */}
                    <div>
                        <Image
                            className="md:w-90 w-70 z-50"
                            src="/images/user/home/logo.svg"
                            alt="Flowbite Logo"
                            width={387}
                            height={100}
                        />
                        <p className='font-medium md:text-2xl text-xl text-[#22222280] max-w-[490px] mt-10'>Effortlessly create precise DXF files for manufacturing custom tool drawer inserts with AI-powered automation. Simplify your workflow and take tool organization to the next level. Start your free trial today!</p>
                        <div className="flex justify-between max-w-[190px] items-center mt-10 ">
                            <Image
                                className="w-5 z-50"
                                src="/images/user/home/social media/linkedin.svg"
                                alt="Flowbite Logo"
                                width={30}
                                height={20}
                            />
                            {/* <Image
                                className=" z-50"
                                src="/images/user/home/social media/instagram.svg"
                                alt="Flowbite Logo"
                                width={30}
                                height={20}
                            />
                            <Image
                                className=" z-50"
                                src="/images/user/home/social media/facebook.svg"
                                alt="Flowbite Logo"
                                width={30}
                                height={20}
                            />
                            <Image
                                className=" z-50"
                                src="/images/user/home/social media/youtube.svg"
                                alt="Flowbite Logo"
                                width={40}
                                height={20}
                            /> */}

                        </div>
                    </div>
                    {/* center */}
                    <div className='md:mt-0 mt-20'>
                        <p className='font-semibold md:text-3xl text-2xl mb-4'>Quick Links</p>
                        <div className='text-[#22222280] font-medium md:text-2xl text-xl space-y-4 flex flex-col'>
                            <a href='#home'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleTabChange('/home')
                                    document.getElementById('home')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    })
                                }}>Home</a>
                            <a
                                href='#benefits'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleTabChange('/benefits')
                                    document.getElementById('benefits')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    })
                                }}
                            >Benefits</a>
                            <a
                                href='#sample'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleTabChange('/sample')
                                    document.getElementById('sample')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    })
                                }}
                            >Samples</a>
                            <a
                                href='#working'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleTabChange('/working')
                                    document.getElementById('working')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    })
                                }}
                            >Working</a>
                            <a
                                href='#pricing'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleTabChange('/pricing')
                                    document.getElementById('pricing')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    })
                                }}
                            >Pricing</a>
                            <a
                                href='#faqs'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleTabChange('/faqs')
                                    document.getElementById('faqs')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    })
                                }}
                            >FAQ’s</a>
                        </div>
                    </div>
                    {/* right */}
                    
                </div>
                <hr className='my-5'/>
                <div className='flex justify-center md:justify-start md:items-start items-center h-full w-full text-center md:text-start md:ps-14'>
                    <p className=' text-center md:text-start font-normal text-base text-[#22222280]'>Lumashape LLC | © 2025 | All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
