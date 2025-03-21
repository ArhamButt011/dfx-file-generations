'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTabContext } from '@/context/TabContsxt'
import Drawer from '../UI/Drawer'

function ContactNavbar() {
  const { activeTab, setActiveTab } = useTabContext()
  const handleTabChange = (tab: string) => {
    setActiveTab(tab) // Update context
    onClose()
  }
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    setActiveTab('/home')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      let currentTab = ''

      const sectionIds = [
        'home',
        'benefits',
        'sample',
        'working',
        'pricing',
        'faqs',
        'contact',
      ]

      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= window.innerHeight / 3) {
            currentTab = `/${id}`
          }
        }
      })

      if (currentTab) handleTabChange(currentTab)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleTabChange])

  return (
    <>
      <nav className="fixed z-50 w-full xl:px-20  px-5 border-b-2 border-[#0000001A]  md:pb-0 top-0 bg-white items-center">
        <div className="flex justify-center items-center w-full">
          <div className=" w-full flex flex-wrap items-center justify-between mx-auto ">
            <div className="xl:flex justify-between w-full py-4 hidden max-w-[1500px] mx-auto">
              <Image
                className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
                src="/images/user/home/user_login.svg"
                alt=" Logo"
                width={100}
                height={100}
              />

              <ul className="font-light  items-center mob:px-4  z-50 flex flex-col py-4 md:p-0 mt-4 gap-[24px] md:flex-row  md:mt-0 ">
                <li>
                  <Link
                    href="/"
                    onClick={() => {
                      handleTabChange('/home')
                      document.getElementById('home')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }}
                    className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                      activeTab === '/home'
                        ? 'text-[#266CA8]'
                        : 'text-[#00000080]'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                      activeTab === '/benefits'
                        ? 'text-[#266CA8]'
                        : 'text-[#00000080]'
                    }`}
                  >
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    // href="#sample"
                    // onClick={(e) => {
                    //   e.preventDefault()
                    //   handleTabChange('/sample')
                    //   document.getElementById('sample')?.scrollIntoView({
                    //     behavior: 'smooth',
                    //     block: 'start',
                    //   })
                    // }}
                    className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                      activeTab === '/sample'
                        ? 'text-[#266CA8]'
                        : 'text-[#00000080]'
                    }`}
                  >
                    Sample
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    // href="#working"
                    // onClick={(e) => {
                    //   e.preventDefault()
                    //   handleTabChange('/working')
                    //   document.getElementById('working')?.scrollIntoView({
                    //     behavior: 'smooth',
                    //     block: 'start',
                    //   })
                    // }}
                    className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                      activeTab === '/working'
                        ? 'text-[#266CA8]'
                        : 'text-[#00000080]'
                    }`}
                  >
                    Working
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    // href="#pricing"
                    // onClick={(e) => {
                    //   e.preventDefault()
                    //   handleTabChange('/pricing')
                    //   document.getElementById('pricing')?.scrollIntoView({
                    //     behavior: 'smooth',
                    //     block: 'start',
                    //   })
                    // }}
                    className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                      activeTab === '/pricing'
                        ? 'text-[#266CA8]'
                        : 'text-[#00000080]'
                    }`}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    // onClick={(e) => {
                    //   e.preventDefault()
                    //   handleTabChange('/faqs')
                    //   document.getElementById('faqs')?.scrollIntoView({
                    //     behavior: 'smooth',
                    //     block: 'start',
                    //   })
                    // }}
                    className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                      activeTab === '/faqs'
                        ? 'text-[#266CA8]'
                        : 'text-[#00000080]'
                    }`}
                  >
                    FAQ&apos;s
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Contact_Us"
                    // onClick={() => {
                    //   handleTabChange('/contact')
                    // }}
                    className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                      activeTab === '/contact'
                        ? 'text-[#266CA8]'
                        : 'text-[#00000080]'
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>

              <Link
                href="/user"
                className="bg-[#266CA8] text-white rounded-full mt-2 flex h-[10%] px-3 py-2 font-medium text-lg px-5"
              >
                Login/Signup
              </Link>
            </div>

            <div className="xl:hidden w-full flex  justify-between py-2">
              <div className="relative cursor-pointer flex justify-between w-full items-center  pt-[5px] max-w-[90%] mx-auto">
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
                  onClick={() => {
                    if (isOpen) {
                      setIsOpen(false)
                    } else {
                      setIsOpen(true)
                    }
                  }}
                >
                  <Image
                    src="/images/user/home/menu.svg"
                    alt="menu"
                    width={40}
                    height={40}
                  />
                </button>
              </div>

              {/* side menu */}
              <div className="relative z-40">
                <Drawer isOpen={isOpen} onClose={onClose}>
                  <div className="h-full w-full px-5 mt-16">
                    <ul className="flex flex-col items-start justify-center gap-5">
                      <li>
                        <Link
                          href="/"
                          onClick={(e) => {
                            e.preventDefault()
                            handleTabChange('/home')
                            document.getElementById('home')?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            })
                          }}
                          className={` text-xl text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                            activeTab === '/home'
                              ? 'text-[#266CA8]'
                              : 'text-[#00000080]'
                          }`}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          //   href="#"
                          //   onClick={(e) => {
                          //     e.preventDefault()
                          //     handleTabChange('/benefits')
                          //     document
                          //       .getElementById('benefits')
                          //       ?.scrollIntoView({
                          //         behavior: 'smooth',
                          //         block: 'start',
                          //       })
                          //   }}
                          className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                            activeTab === '/benefits'
                              ? 'text-[#266CA8]'
                              : 'text-[#00000080]'
                          }`}
                        >
                          Benefits
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          //   href="#sample"
                          //   onClick={(e) => {
                          //     e.preventDefault()
                          //     handleTabChange('/sample')
                          //     document.getElementById('sample')?.scrollIntoView({
                          //       behavior: 'smooth',
                          //       block: 'start',
                          //     })
                          //   }}
                          className={`block text-xl font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                            activeTab === '/sample'
                              ? 'text-[#266CA8]'
                              : 'text-[#00000080]'
                          }`}
                        >
                          Sample
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/"
                          //   href="#working"
                          //   onClick={(e) => {
                          //     e.preventDefault()
                          //     handleTabChange('/working')
                          //     document.getElementById('working')?.scrollIntoView({
                          //       behavior: 'smooth',
                          //       block: 'start',
                          //     })
                          //   }}
                          className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                            activeTab === '/working'
                              ? 'text-[#266CA8]'
                              : 'text-[#00000080]'
                          }`}
                        >
                          Working
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          //   href="#pricing"
                          //   onClick={(e) => {
                          //     e.preventDefault()
                          //     handleTabChange('/pricing')
                          //     document.getElementById('pricing')?.scrollIntoView({
                          //       behavior: 'smooth',
                          //       block: 'start',
                          //     })
                          //   }}
                          className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                            activeTab === '/pricing'
                              ? 'text-[#266CA8]'
                              : 'text-[#00000080]'
                          }`}
                        >
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          //   href="#faqs"
                          //   onClick={(e) => {
                          //     e.preventDefault()
                          //     handleTabChange('/faqs')
                          //     document.getElementById('faqs')?.scrollIntoView({
                          //       behavior: 'smooth',
                          //       block: 'start',
                          //     })
                          //   }}
                          className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                            activeTab === '/faqs'
                              ? 'text-[#266CA8]'
                              : 'text-[#00000080]'
                          }`}
                        >
                          FAQ&apos;s
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/Contact_Us"
                          // onClick={() => {
                          //   handleTabChange('/contact')
                          // }}
                          className={`block text-xl font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                            activeTab === '/contact'
                              ? 'text-[#266CA8]'
                              : 'text-[#00000080]'
                          }`}
                        >
                          Contact Us
                        </Link>
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

export default ContactNavbar
