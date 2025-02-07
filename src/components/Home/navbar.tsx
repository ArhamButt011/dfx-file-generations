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
            <Image
              className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
              // onClick={() => handleTabChange('/')}
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
                  className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                    activeTab === '/home'
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
                  className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                    activeTab === '/benefits'
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
                  className={`block text-[16px] font-inter text-[#00000080] font-light leading-[25.5px] hover:text-[#266CA8] ${
                    activeTab === '/sample'
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
                  className={`block text-[16px] font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                    activeTab === '/working'
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
                  className={`block text-[16px] font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                    activeTab === '/pricing'
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
                  className={`block text-[16px] font-inter font-light text-[#00000080] leading-[25.5px] hover:text-[#266CA8] ${
                    activeTab === '/faqs'
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
