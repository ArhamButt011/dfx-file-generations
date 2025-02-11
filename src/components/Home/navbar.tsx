'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTabContext } from '@/context/TabContsxt'
import Drawer from '../UI/Drawer'

function Navbar() {
  const { activeTab, setActiveTab } = useTabContext()
  const handleTabChange = (tab: string) => {
    setActiveTab(tab) // Update context
  }
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="absolute z-50 w-full md:px-20 px-5 ">
      <div className="flex justify-center items-center w-full min-h-[134px] ">
        <div className="min-h-[134px] w-full flex flex-wrap items-center justify-between mx-auto pb-[24px] mob:pb-[50px]">
          <div className="md:flex justify-between w-full pb-4 hidden ">
            <Image
              className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
              src="/images/user/home/logo.svg"
              alt="Flowbite Logo"
              width={100}
              height={100}
            />

            <ul className="font-light mob:absolute mob:top-[100px] items-center mob:px-4 mob:left-0 mob:w-full z-50 flex flex-col py-4 md:p-0 mt-4 gap-[24px] md:flex-row  rtl:space-x-reverse md:mt-0  tab:bg-black">
              <li>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('/home')
                  }}
                  className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/home'
                    ? 'text-[#266CA8]'
                    : 'text-[#00000080]'
                    }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#benefits"
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('/benefits')
                    document.getElementById('benefits')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/benefits'
                    ? 'text-[#266CA8]'
                    : 'text-[#00000080]'
                    }`}
                >
                  Benefits
                </a>
              </li>
              <li>
                <a
                  href="#sample"
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('/sample')
                    document.getElementById('sample')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/sample'
                    ? 'text-[#266CA8]'
                    : 'text-[#00000080]'
                    }`}
                >
                  Sample
                </a>
              </li>

              <li>
                <a
                  href="#working"
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('/working')
                    document.getElementById('working')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  className={`block text-[16px] font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/working'
                    ? 'text-[#266CA8]'
                    : 'text-[#00000080]'
                    }`}
                >
                  Working
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('/pricing')
                    document.getElementById('pricing')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  className={`block text-[16px] font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/pricing'
                    ? 'text-[#266CA8]'
                    : 'text-[#00000080]'
                    }`}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('/faqs')
                    document.getElementById('faqs')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  className={`block text-[16px] font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/faqs'
                    ? 'text-[#266CA8]'
                    : 'text-[#00000080]'
                    }`}
                >
                  FAQs
                </a>
              </li>
            </ul>

            <Link
              href="/user"
              className="bg-[#266CA8] text-white rounded-full mt-2 flex h-[10%] px-3 py-1"
            >
              login/signup
            </Link>
          </div>
          <div className="md:hidden w-full flex  justify-between">
            <div
              className="relative cursor-pointer flex justify-between w-full items-center  pt-[5px]"
            onClick={() => {
              if (isOpen) {
                setIsOpen(false)
              } else {
               setIsOpen(true)
              }
            }}
            >
              <Image
                className="z-50"
                src="/images/user/home/logo.svg"
                alt="Flowbite Logo"
                width={180}
                height={180}
              />
              <button
                type="button"
                className={`relative z-50 flex flex-col mt-2 items-center justify-center w-10 h-10 rounded-md focus:outline-none bottom-[8px] ${isOpen}? "hidden" : `}
                aria-controls="navbar-default"
                aria-expanded={isOpen ? 'true' : 'false'}
              >
                <Image
                  src="/images/user/home/menu.svg"
                  alt='menu'
                  width={40}
                  height={40}
                />
              </button>
            </div>

            {/* side menu */}
            <div className="relative z-40">
              <Drawer isOpen={isOpen}>
                <div className="flex h-full w-full z-0 pt-10">
                  <ul className="font-light  w-full  mob:left-0 mob:w-full z-50 flex flex-col py-4 md:p-0 mt-4 gap-[0px]  rtl:space-x-reverse md:mt-0 ">
                    {/* <Link
                      href="/about"
                      onClick={() => handleTabChange('/about')}
                      className={`block  text-[19px] font-inter font-normal leading-[25.5px] text-[#FFFFFF] hover:text-[#2CFF06] ${activeTab === '/about'
                          ? 'text-[#2CFF06]'
                          : 'text-[#FFFFFF]'
                        }`}
                    >
                      <li className="flex ms-5 py-[15px] list-items">
                        About
                      </li>
                    </Link>
                     <hr className="h-px  bg-[#C0C0C0] border-0 dark:bg-[#C0C0C0]"></hr> 

                    <Link
                      href="/work"
                      onClick={() => handleTabChange('/work')}
                      className={`block  text-[19px] font-inter font-normal leading-[25.5px] text-[#FFFFFF] hover:text-[#2CFF06] ${activeTab === '/work'
                          ? 'text-[#2CFF06]'
                          : 'text-[#FFFFFF]'
                        }`}
                    >
                      <li className="flex ms-5 py-[15px] list-items">
                        Work
                      </li>
                    </Link>
                     <hr className="h-px  bg-[#C0C0C0] border-0 dark:bg-[#C0C0C0]"></hr> 

                    <li className="flex ms-5 py-[15px] list-items z-40">
                      <div
                        className="z-50 block text-center text-[19px] font-inter font-normal leading-[25.5px] text-[#FFFFFF] hover:text-[#2CFF06] cursor-pointer"
                        onClick={toggleDropdown}
                      >
                        <div
                          className="flex items-center gap-1"
                          aria-controls="navbar-default"
                          aria-expanded={isServicesOpen ? 'true' : 'false'}
                          onClick={() => setIsServicesOpen(true)}
                        >
                          Services
                          <Image
                            src={arrow}
                            alt="Dropdown arrow"
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                       <Tippy
                            content={dropdownContent}
                            interactive={true}
                            placement="bottom"
                            arrow={false}
                            visible={isDropdownOpen}
                            onClickOutside={() => setIsDropdownOpen(false)}
                          >
                            <div className="z-50 block text-center text-[20px] font-inter font-medium leading-[25.5px] text-[#FFFFFF] hover:text-[#2CFF06] cursor-pointer" onClick={toggleDropdown}>
                              <div className="flex items-center gap-1">
                                Services
                                <Image src={arrow} alt="Dropdown arrow" width={24} height={24} />
                              </div>
                            </div>
                          </Tippy> *
                    </li>

                     <hr className="h-px  bg-[#C0C0C0] border-0 dark:bg-[#C0C0C0]"></hr> 

                    <Link
                      href="/press"
                      onClick={() => handleTabChange('/press')}
                      className={`block  text-[19px] font-inter font-normal leading-[25.5px] text-[#FFFFFF] hover:text-[#2CFF06] ${activeTab === '/press'
                          ? 'text-[#2CFF06]'
                          : 'text-[#FFFFFF]'
                        }`}
                    >
                      <li className="flex ms-5 py-[15px] list-items">
                        Press
                      </li>
                    </Link>
                     <hr className="h-px  bg-[#C0C0C0] border-0 dark:bg-[#C0C0C0]"></hr> 

                    <Link
                      href="/contact"
                      onClick={() => handleTabChange('/contact')}
                      className={`block  text-[19px] font-inter font-normal leading-[25.5px] text-[#FFFFFF] hover:text-[#2CFF06] ${activeTab === '/contact'
                          ? 'text-[#2CFF06]'
                          : 'text-[#FFFFFF]'
                        }`}
                    >
                      <li className="flex ms-5 py-[15px] list-items">
                        Contact
                      </li>
                    </Link> */}
                  </ul>
                </div>
              </Drawer>
            </div> 


          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
