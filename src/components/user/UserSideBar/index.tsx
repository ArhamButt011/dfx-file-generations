'use client'

import React from 'react'
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

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
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
        route: '/users',
      },
      {
        Whiteicon: WhiteSubscriptionIcon,
        Grayicon: GraySubscriptionIcon,
        label: 'Manage Subscription ',
        route: '/payment',
      },
    ],
  },
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  // const pathname = usePathname()
  const [pageName, setPageName] = useLocalStorage('selectedMenu', 'dashboard')

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen md:w-72.5 w-full flex-col overflow-y-hidden bg-[#F8F8F8] duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
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
        </div>
      </aside>
    </ClickOutside>
  )
}

export default Sidebar
