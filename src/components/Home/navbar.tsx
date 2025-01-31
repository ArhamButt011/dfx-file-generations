'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTabContext } from '@/context/TabContsxt'

function Navbar() {
    const { activeTab, setActiveTab } = useTabContext()
    const handleTabChange = (tab: string) => {
        setActiveTab(tab) // Update context
    }
    return (
        <nav className="absolute z-50 w-full px-16 md:px-20 mob:px-5 ">
            <div className="flex justify-center items-center w-full min-h-[134px] ">
                <div className="min-h-[134px] w-full flex flex-wrap items-center justify-between mx-auto pb-[24px] mob:pb-[50px]">
                    <div className="flex justify-between w-full pb-4">
                        {/* <Link
                            href="/"
                            className="flex  mob:justify-start space-x-3 rtl:space-x-reverse"
                        > */}
                        <Image
                            className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
                            // onClick={() => handleTabChange('/')}
                            src="/images/user/home/logo.svg"
                            alt="Flowbite Logo"
                            width={100}
                            height={100}
                        />
                        {/* </Link> */}
                        {/* <div className="flex xl:pr-4 xl:hidden  pt-2">
                            <button
                                // onClick={toggleMenu}
                                type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm font-light text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 bg-gray-700 dark:ring-gray-600"
                                aria-controls="navbar-default"
                                aria-expanded={isOpen ? 'true' : 'false'}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            </button>

                            <div
                                className={`${isOpen ? 'block' : 'hidden'
                                    } w-full md:block md:w-auto`}
                                id="navbar-default"
                            >*/}
                        <ul className="font-light mob:absolute mob:top-[100px] items-center mob:px-4 mob:left-0 mob:w-full z-50 flex flex-col py-4 md:p-0 mt-4 gap-[24px] md:flex-row  rtl:space-x-reverse md:mt-0  tab:bg-black">
                            <li>
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange('/home');
                                    }}
                                    className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/home'
                                        ? 'text-[#266CA8]'
                                        : 'text-[#FFFFFF]'
                                        }`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange('/sample');
                                    }}
                                    className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/sample'
                                        ? 'text-[#266CA8]'
                                        : 'text-[#FFFFFF]'
                                        }`}
                                >
                                    Sample
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange('/method');
                                    }}
                                    className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/method'
                                        ? 'text-[#266CA8]'
                                        : 'text-[#FFFFFF]'
                                        }`}
                                >
                                    Method
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange('/working');
                                    }}
                                    className={`block text-[16px] font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/working'
                                        ? 'text-[#266CA8]'
                                        : 'text-[#FFFFFF]'
                                        }`}
                                >
                                    Working
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange('/pricing');
                                    }}
                                    className={`block text-[16px] font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/pricing'
                                        ? 'text-[#266CA8]'
                                        : 'text-[#FFFFFF]'
                                        }`}
                                >
                                    Pricing
                                </a>
                            </li>

                        </ul>

                        <Link href="#" className='bg-[#266CA8] text-white rounded-full mt-2 flex h-[10%] px-3 py-1'>login/signup</Link>
                        {/* // </div> */}
                        {/* // </div>  */}

                        {/* tab and mob  menu*/}

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
