'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTabContext } from '@/context/TabContsxt'
import Drawer from '../UI/Drawer'

function Navbar() {
  const { activeTab, setActiveTab } = useTabContext()
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);// Update context
    onClose();
  }
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    setActiveTab("/home")
  }, [])
  return (
    <>
      <nav className="fixed md:absolute z-50 w-full md:px-20 px-5 border-b-2 border-[#0000001A] pb-5 md:pb-0 top-0 bg-white items-center">

        <div className="flex justify-center items-center w-full">
          <div className=" w-full flex flex-wrap items-center justify-between mx-auto ">
            <div className="lg:flex justify-between w-full py-4 hidden ">
              <Image
                className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
                src="/images/user/home/user_login.svg"
                alt=" Logo"
                width={100}
                height={100}
              />

              <ul className="font-light  items-center mob:px-4  z-50 flex flex-col py-4 md:p-0 mt-4 gap-[24px] md:flex-row  rtl:space-x-reverse md:mt-0 ">
                <li>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('/home')
                    }}
                    className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/home'
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
                    className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/benefits'
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
                    className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/sample'
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
                    className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/working'
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
                    className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/pricing'
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
                    className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/faqs'
                      ? 'text-[#266CA8]'
                      : 'text-[#00000080]'
                      }`}
                  >
                    FAQ&apos;s
                  </a>
                </li>
                <li>
                  <a
                    href='#contact'
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('/contact')
                      document.getElementById('contact')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }}
                    className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/contact'
                      ? 'text-[#266CA8]'
                      : 'text-[#00000080]'
                      }`}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>

              <Link
                href="/user"
                className="bg-[#266CA8] text-white rounded-full mt-2 flex h-[10%] px-3 py-2 font-medium text-xl"
              >
                Login/Signup
              </Link>
            </div>

            <div className="lg:hidden w-full flex  justify-between">
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
                  src="/images/user/home/user_login.svg"
                  alt="Logo"
                  width={180}
                  height={180}
                />
                <button
                  type="button"
                  className={`relative flex flex-col mt-2 items-center justify-center w-10 h-10 rounded-md focus:outline-none bottom-[8px] ${isOpen}? "hidden" : `}
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
                <Drawer isOpen={isOpen} onClose={onClose}>
                  <div className='h-full w-full px-5 mt-16'>
                    <ul className='flex flex-col items-start justify-center gap-5'>
                      <li>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handleTabChange('/home')

                          }}
                          className={` text-xl text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/home'
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
                          className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/benefits'
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
                          className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/sample'
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
                          className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/working'
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
                          className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/pricing'
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
                          className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/faqs'
                            ? 'text-[#266CA8]'
                            : 'text-[#00000080]'
                            }`}
                        >
                          FAQ&apos;s
                        </a>
                      </li>
                      <li>
                        <a
                          href='#contact'
                          onClick={(e) => {
                            e.preventDefault()
                            handleTabChange('/contact')
                            document.getElementById('contact')?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            })
                          }}
                          className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${activeTab === '/contact'
                            ? 'text-[#266CA8]'
                            : 'text-[#00000080]'
                            }`}
                        >
                          Contact Us
                        </a>
                      </li>
                      <Link
                        href="/user"
                        className="bg-[#266CA8] text-white rounded-full mt-2 flex h-[10%] px-3 py-2"
                        onClick={() => onClose()}
                      >
                        Login/Signup
                      </Link>
                    </ul>

                  </div>
                </Drawer>
              </div>


            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
