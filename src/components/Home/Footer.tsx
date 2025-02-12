import Image from 'next/image'
import React from 'react'

function Footer() {
    return (
        <div>
            <div className='mt-20 bg-[#F7F7F7] py-14'>
                <div className="flex md:flex-row flex-col max-w-[90%] mx-auto justify-between">
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
                        <div className="flex justify-between max-w-[190px] items-center mt-10 border-b">
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
                    <div className='mt-24'>
                        <p className='font-semibold md:text-3xl text-2xl mb-4'>Quick Links</p>
                        <div className='text-[#22222280] font-medium md:text-2xl text-xl space-y-4'>
                            <p>Home</p>
                            <p>Spaces Benefits</p>
                            <p>How it works</p>
                            <p>Subscription Plan</p>
                            <p>FAQ’s</p>
                        </div>
                    </div>
                    {/* right */}
                    <div className='mt-24'>
                        <p className='font-semibold md:text-3xl text-2xl mb-4'>Contact Information</p>
                        <div className='text-[#22222280] font-medium md:text-2xl text-xl space-y-4'>
                            <p>support@example.com</p>
                            <p>+1-800-123-4567</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
