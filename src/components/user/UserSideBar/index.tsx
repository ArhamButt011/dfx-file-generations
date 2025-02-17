'use client'

import React from 'react'
// import { useState } from 'react'
import { useState, useEffect, useRef } from 'react';
// import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import useLocalStorage from '@/components/admin/hooks/useLocalStorage'
import SidebarItem from './SidebarItem'
import ClickOutside from '@/components/admin/ClickOutside'
import logo from '/public/images/user/home/logo.svg'
import WhiteGenerateIcon from '/public/images/user/sidebar/whiteGenerateIcon.svg'
import GrayGenerateIcon from '/public/images/user/sidebar/grayGenerateIcon.svg'
import WhiteDownloadIcon from '/public/images/user/sidebar/whiteDownloadIcon.svg'
import GrayDownloadIcon from '/public/images/user/sidebar/GrayDownloadIcon.svg'
import WhiteSubscriptionIcon from '/public/images/user/sidebar/whiteSubscriptionIcon.svg'
import GraySubscriptionIcon from '/public/images/user/sidebar/GraySubcriptionIcon.svg'
import { useAuth } from '@/context/AuthContext'
import user from '/public/images/admin/dashboard/user.svg'
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
  setIsBilingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuGroups = [
  {
    menuItems: [
      {
        Whiteicon: WhiteGenerateIcon,
        Grayicon: GrayGenerateIcon,
        label: 'Generate DXF',
        route: '/Generate_DXF',
      },
      {
        Whiteicon: WhiteDownloadIcon,
        Grayicon: GrayDownloadIcon,
        label: 'Downloaded Files',
        route: '/downloaded-files',
      },
      {
        Whiteicon: WhiteSubscriptionIcon,
        Grayicon: GraySubscriptionIcon,
        label: 'Manage Subscription ',
        route: '/subscription',
      },
    ],
  },
]

const Sidebar = ({ sidebarOpen, setSidebarOpen, setIsBilingOpen }: SidebarProps) => {
  // const pathname = usePathname()
  const [pageName, setPageName] = useLocalStorage('selectedMenu', 'dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const handleLogoutClick = () => {
    logout()
    window.location.href = '/user'
  }

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      dropdownRef.current.scrollTo({
        top: dropdownRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [dropdownOpen]);

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen md:w-72.5 w-full flex-col overflow-y-scroll bg-[#F8F8F8] duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 pt-5.5 lg:pt-6.5">
          <Link href="/">
            <Image width={176} height={32} src={logo} alt="Logo" priority />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <Image src="/images/user/home/NavbarCross.svg" alt="cross" width={20} height={20} />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-scroll duration-300 ease-linear h-screen pb-10">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3> */}

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}

          <div className='bg-[#FFFFFF] flex flex-col justify-center rounded-2xl mx-5 p-5 mb-5'>
            <div>
              <h1 className='font-medium text-xl mb-2'>New Update</h1>
            </div>
            <div className=' flex justify-between items-center mx-2'>
              <span className='text-[#00000066] text-sm'>
                Upgrade to Premium to unlock unlimited downloads and exclusive customer support
              </span>
              <span>
                <svg width="59" height="50" viewBox="0 0 59 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M57.0244 1.4129C56.9412 1.10105 56.621 0.915666 56.3091 0.998826L51.2273 2.35399C50.9154 2.43715 50.73 2.75736 50.8132 3.06921C50.8964 3.38106 51.2166 3.56645 51.5284 3.48329L56.0456 2.2787L57.2502 6.79591C57.3334 7.10776 57.6536 7.29314 57.9654 7.20999C58.2773 7.12683 58.4627 6.80661 58.3795 6.49476L57.0244 1.4129ZM1.44873 49.7763L18.2502 20.8404L17.2395 20.2535L0.437992 49.1894L1.44873 49.7763ZM23.5995 21.5516L27.9956 37.9639L29.1246 37.6615L24.7284 21.2492L23.5995 21.5516ZM35.4872 38.9551L56.9654 1.85627L55.954 1.27068L34.4757 38.3695L35.4872 38.9551ZM27.9956 37.9639C28.938 41.4821 33.6623 42.1071 35.4872 38.9551L34.4757 38.3695C33.1722 40.6209 29.7977 40.1745 29.1246 37.6615L27.9956 37.9639ZM18.2502 20.8404C19.5557 18.5921 22.9268 19.0403 23.5995 21.5516L24.7284 21.2492C23.7867 17.7334 19.0671 17.1059 17.2395 20.2535L18.2502 20.8404Z" fill="#266CA8" />
                </svg>
              </span>
            </div>
            <div className='text-center mt-3 cursor-pointer'>
              <div
                className="bg-[#266CA8] text-white rounded-2xl py-1 font-semibold"
                onClick={() => setIsBilingOpen(true)}
              >
                Upgrade
              </div>
            </div>
          </div>

          <div className='lg:hidden flex justify-center mb-15'>
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="relative">
              <Link
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 justify-center"
                href="#"
              >

                <span className="h-12 w-12 rounded-full">
                  <Image
                    width={112}
                    height={112}
                    src={user}
                    style={{
                      width: 'auto',
                      height: 'auto',
                    }}
                    alt="User"
                  />
                </span>
                <span className="lg:hidden text-left">
                  <span className="block text-lg font-semibold text-black dark:text-white">
                    Thomas Anree
                  </span>
                  <span className="block text-xs font-normal text-[#00000066]">alexhavaidai123@gmail.com</span>
                </span>

                <svg
                  className="fill-current sm:block"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                    fill=""
                  />
                </svg>
              </Link>
              {/* <!-- Dropdown Start --> */}
              <AnimatePresence>

                {dropdownOpen && (
                  // <div
                  //   className={`absolute  mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
                  // >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                  >

                    <div className=' flex justify-center flex-col items-center py-3'>
                      <span className="h-18 w-18 text-center rounded-full">
                        <Image
                          width={100}
                          height={100}
                          src={user}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          alt="User"
                        />
                      </span>
                      <span className="text-center lg:block">
                        <span className="block text-lg font-semibold text-black dark:text-white">
                          Thomas Anree
                        </span>
                        <span className="block  text-center text-xs font-normal text-[#00000066]">alexhavaidai123@gmail.com</span>
                      </span>
                    </div>
                    <ul className="flex flex-col border-t border-gray-300 gap-3 px-6 py-5">
                      <li>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#266CA8] lg:text-base"
                        >
                          <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.60938 22.4318C5.60938 22.0601 5.91067 21.7589 6.28233 21.7589H20.6387C21.0104 21.7589 21.3116 22.0601 21.3116 22.4318C21.3116 22.8035 21.0104 23.1048 20.6387 23.1048H6.28233C5.91067 23.1048 5.60938 22.8035 5.60938 22.4318Z" fill="black" />
                            <path d="M12.179 16.8867C12.4074 16.7086 12.6145 16.5014 13.0288 16.0871L18.3377 10.7783C17.6152 10.4775 16.7594 9.98356 15.95 9.1742C15.1405 8.36472 14.6465 7.50879 14.3458 6.78618L9.03683 12.0952L9.0368 12.0952C8.62253 12.5095 8.41538 12.7166 8.23723 12.945C8.02708 13.2144 7.84691 13.506 7.6999 13.8144C7.57528 14.0759 7.48265 14.3538 7.29737 14.9097L6.32033 17.8408C6.22916 18.1143 6.30035 18.4159 6.50423 18.6198C6.70811 18.8236 7.00968 18.8948 7.28321 18.8036L10.2143 17.8266C10.7701 17.6413 11.0481 17.5487 11.3095 17.4241C11.618 17.2771 11.9095 17.0969 12.179 16.8867Z" fill="black" />
                            <path d="M19.8108 9.30512C20.9132 8.20276 20.9132 6.41549 19.8108 5.31313C18.7085 4.21077 16.9212 4.21077 15.8189 5.31313L15.1821 5.94986C15.1908 5.97619 15.1999 6.00289 15.2093 6.02993C15.4427 6.70262 15.883 7.58447 16.7114 8.41284C17.5397 9.24122 18.4216 9.68156 19.0943 9.91495C19.1212 9.92429 19.1478 9.93329 19.174 9.94197L19.8108 9.30512Z" fill="black" />
                          </svg>
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#266CA8] lg:text-base"
                        >
                          <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.40246 12.334V10.4905C7.40246 7.14549 10.1141 4.43386 13.4591 4.43386C16.804 4.43386 19.5156 7.14549 19.5156 10.4905V12.334C20.5159 12.4087 21.1672 12.5973 21.6434 13.0734C22.4318 13.8618 22.4318 15.1308 22.4318 17.6686C22.4318 20.2065 22.4318 21.4754 21.6434 22.2639C20.855 23.0523 19.586 23.0523 17.0481 23.0523H9.86996C7.33209 23.0523 6.06316 23.0523 5.27474 22.2639C4.48633 21.4754 4.48633 20.2065 4.48633 17.6686C4.48633 15.1308 4.48633 13.8618 5.27474 13.0734C5.75086 12.5973 6.40223 12.4087 7.40246 12.334ZM8.74837 10.4905C8.74837 7.88881 10.8574 5.77977 13.4591 5.77977C16.0607 5.77977 18.1697 7.88881 18.1697 10.4905V12.2882C17.8261 12.285 17.4533 12.285 17.0481 12.285H9.86996C9.46483 12.285 9.09204 12.285 8.74837 12.2882V10.4905Z" fill="black" />
                          </svg>
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#266CA8] lg:text-base"
                        >
                          <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.8708 23.2932H13.5965C16.0934 23.2932 17.3418 23.2932 18.1535 22.48C18.9652 21.6667 19.0483 20.3327 19.2143 17.6646L19.4537 13.8202C19.5438 12.3726 19.5888 11.6488 19.1816 11.1901C18.7744 10.7314 18.0868 10.7314 16.7114 10.7314H9.75587C8.38055 10.7314 7.69289 10.7314 7.28568 11.1901C6.87847 11.6488 6.92353 12.3726 7.01365 13.8202L7.25297 17.6646C7.41906 20.3327 7.5021 21.6667 8.31381 22.48C9.12552 23.2932 10.3739 23.2932 12.8708 23.2932Z" fill="#ED2A2A" />
                            <path d="M5.1582 9.08641C5.1582 8.67346 5.4681 8.33869 5.85038 8.33869L8.24093 8.33829C8.71591 8.32529 9.13493 7.99905 9.29655 7.5164C9.3008 7.50371 9.30569 7.48806 9.32321 7.43126L9.42622 7.09739C9.48925 6.89268 9.54417 6.71434 9.62101 6.55493C9.9246 5.92516 10.4863 5.48784 11.1354 5.37587C11.2997 5.34753 11.4736 5.34765 11.6734 5.34779H14.7941C14.9938 5.34765 15.1678 5.34753 15.3321 5.37587C15.9812 5.48784 16.5429 5.92516 16.8465 6.55493C16.9233 6.71434 16.9782 6.89268 17.0413 7.09739L17.1443 7.43126C17.1618 7.48806 17.1667 7.50371 17.1709 7.5164C17.3325 7.99905 17.8347 8.32569 18.3097 8.33869H20.6169C20.9992 8.33869 21.3091 8.67346 21.3091 9.08641C21.3091 9.49937 20.9992 9.83413 20.6169 9.83413H5.85038C5.4681 9.83413 5.1582 9.49937 5.1582 9.08641Z" fill="#ED2A2A" />
                          </svg>
                          Delete Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          onClick={handleLogoutClick}
                          className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-[#266CA8] lg:text-base"
                        >
                          <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5006 13.4442C17.64 13.5717 17.7194 13.752 17.7194 13.9409C17.7194 14.1298 17.64 14.3101 17.5006 14.4376L13.575 18.0267C13.3007 18.2774 12.875 18.2584 12.6243 17.9841C12.3735 17.7098 12.3925 17.2841 12.6668 17.0333L15.3131 14.6139L5.38194 14.6139C5.01028 14.6139 4.70898 14.3126 4.70898 13.9409C4.70898 13.5692 5.01028 13.2679 5.38194 13.2679L15.3131 13.2679L12.6668 10.8485C12.3925 10.5977 12.3735 10.172 12.6243 9.89772C12.875 9.62343 13.3007 9.60437 13.575 9.85515L17.5006 13.4442Z" fill="#266CA8" />
                            <path d="M16.1492 21.3434C15.7775 21.3434 15.4763 21.6447 15.4763 22.0164C15.4763 22.388 15.7775 22.6893 16.1492 22.6893L16.1985 22.6893C17.4255 22.6893 18.4146 22.6893 19.1925 22.5848C20.0002 22.4762 20.6802 22.2439 21.2203 21.7038C21.7604 21.1637 21.9927 20.4837 22.1012 19.676C22.2058 18.8981 22.2058 17.9091 22.2058 16.682L22.2058 11.1999C22.2058 9.97275 22.2058 8.98367 22.1012 8.20576C21.9927 7.39812 21.7604 6.7181 21.2203 6.17801C20.6802 5.63793 20.0002 5.40563 19.1925 5.29705C18.4146 5.19246 17.4255 5.19248 16.1984 5.19249L16.1492 5.19249C15.7775 5.19249 15.4763 5.49379 15.4763 5.86545C15.4763 6.23711 15.7775 6.5384 16.1492 6.5384C17.4372 6.5384 18.3354 6.53983 19.0132 6.63096C19.6716 6.71947 20.0203 6.88138 20.2686 7.12972C20.5169 7.37805 20.6788 7.7267 20.7673 8.3851C20.8585 9.06285 20.8599 9.96113 20.8599 11.2491L20.8599 16.6327C20.8599 17.9207 20.8585 18.819 20.7673 19.4967C20.6788 20.1551 20.5169 20.5038 20.2686 20.7521C20.0203 21.0004 19.6716 21.1623 19.0132 21.2509C18.3354 21.342 17.4372 21.3434 16.1492 21.3434Z" fill="#266CA8" />
                          </svg>
                          Logout
                        </Link>
                      </li>
                    </ul>

                    {/* </div> */}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* <!-- Dropdown End --> */}
            </div>
          </div>

        </div>


      </aside>
    </ClickOutside >
  )
}

export default Sidebar




