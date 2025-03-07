import Image from 'next/image'
import React from 'react'

function footer() {
    return (
        <div className='border-t-2 border-[#0000001A] py-2'>
            <div className='items-center hidden md:flex justify-between w-full py-4'>
                <div className='w-full max-w-[1300px] mx-auto px-5'>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col justify-between">
                            <Image
                                className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
                                src="/images/user/home/user_login.svg"
                                alt="Logo"
                                width={100}
                                height={100}
                            />
                            <div className='text-center mt-4'>
                                <p className='font-normal text-base text-[#22222280]'>
                                    Lumashape LLC | © 2025 | All Rights Reserved
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src="/images/user/prelanding/letter.svg" alt="Email" width={40} height={20} />
                            <p>sam.peterson@lumashape.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' md:hidden justify-between  ps-5 flex flex-col'>
                <div className="flex flex-col justify-between py-4]">
                    <Image
                        className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
                        src="/images/user/home/user_login.svg"
                        alt=" Logo"
                        width={100}
                        height={100}
                    />

                </div>
                <div className="flex items-center">
                    <Image src="/images/user/prelanding/letter.svg" alt="star" width={40} height={20} />
                    <p>sam.peterson@lumashape.com</p>
                </div>
                <div className='flex h-full w-full text-center '>
                    <p className='font-normal text-base text-[#22222280]'>Lumashape LLC | © 2025 | All Rights Reserved</p>
                </div>

            </div>
        </div>
    )
}

export default footer
