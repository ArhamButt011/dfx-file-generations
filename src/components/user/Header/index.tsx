import Link from 'next/link'
// import DropdownNotification from './DropdownNotification'
import DropdownUser from './DropdownUser'
import Image from 'next/image'

const Header = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white dark:bg-boxdark">
      <div className="flex flex-grow items-center justify-between lg:justify-end px-4 py-4 border-b md:px-6 2xl:px-11">

        <Link className="block flex-shrink-0 lg:hidden" href="/">
          <Image
            className="w-[217px] h-[40px]  z-50"
            src="/images/user/home/logo.svg"
            alt="Flowbite Logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="flex justify-between items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className="z-99999 block rounded-sm bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-[#266CA8] delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-[#266CA8] delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-[#266CA8] delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
            </span>
          </button>

        </div>



        <div className="lg:flex items-center gap-3 2xsm:gap-7 hidden ">
          {/* <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul> */}

          <DropdownUser />
        </div>
      </div>
    </header>
  )
}

export default Header
