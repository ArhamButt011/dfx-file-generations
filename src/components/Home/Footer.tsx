import Image from 'next/image'
import React from 'react'

function Footer() {
    return (
        <div>
            <div className='mt-20 bg-[#F7F7F7] py-14'>
                <div className="flex max-w-[90%] mx-auto justify-between">
                    {/* left */}
                    <div>
                        <Image
                            className=" z-50"
                            src="/images/user/home/logo.svg"
                            alt="Flowbite Logo"
                            width={387}
                            height={100}
                        />
                        <p className='font-medium text-2xl text-[#22222280] max-w-[490px] mt-10'>Transform your designs into production-ready DXF files in seconds. Experience seamless uploads, instant previews, and accurate outputs – all powered by advanced AI technology. Start your free trial today and simplify your workflow!</p>
                        <div className="flex justify-between max-w-[190px] items-center mt-10 border-b">
                            <Image
                                className=" z-50"
                                src="/images/user/home/social media/linkedin.svg"
                                alt="Flowbite Logo"
                                width={30}
                                height={20}
                            />
                            <Image
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
                            />

                        </div>
                    </div>
                    {/* center */}
                    <div className='mt-24'>
                        <p className='font-semibold text-3xl mb-4'>Quick Links</p>
                        <div className='text-[#22222280] font-medium text-2xl space-y-4'>
                            <p>Home</p>
                            <p>Spaces Benefits</p>
                            <p>How it works</p>
                            <p>Subscription Plan</p>
                            <p>FAQ’s</p>
                        </div>
                    </div>
                    {/* right */}
                    <div className='mt-24'>
                        <p className='font-semibold text-3xl mb-4'>Contact Information</p>
                        <div className='text-[#22222280] font-medium text-2xl space-y-4'>
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
