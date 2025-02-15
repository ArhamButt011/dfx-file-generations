import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ClickOutside from '../ClickOutside'
import user from '/public/images/admin/dashboard/user.svg'
import Edit from '/public/images/admin/dashboard/edit.svg'
import Lock from '/public/images/admin/dashboard/lock.svg'
import Bell from '/public/images/admin/dashboard/bell.svg'
import arrow from '/public/images/admin/dashboard/arrowright.svg'
import LogoutImage from '/public/images/admin/dashboard/logout.svg'
import { useAuth } from '@/context/AuthContext'
import Modal from '@/components/UI/Modal'
import dltCircle from '/public/images/admin/allusers/dltCircle.svg'
import { FaEye } from 'react-icons/fa'
import eye from '/public/images/admin/eye.svg'

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { logout } = useAuth()
  const { userData } = useAuth()

  const handleLogoutClick = () => {
    setIsOpen(true)
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/admin'
  }

  const onClose = () => {
    setIsOpen(false)
  }
  const onEditClose = () => {
    setIsEditOpen(false)
  }

  const handleEditClick = () => {
    setIsEditOpen(true)
  }

  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {userData?.username}
            </span>
            {/* <span className="block text-xs">UX Designer</span> */}
          </span>

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

          <svg
            className="hidden fill-current sm:block"
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
        {dropdownOpen && (
          <div
            className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
          >
            <ul className="flex flex-col gap-5 border-b border-stroke px-3 py-3 dark:border-strokedark">
              <li>
                <p
                  className="flex items-center gap-1 text-sm font-medium duration-300 ease-in-out hover:text-black lg:text-base text-black cursor-pointer"
                  onClick={handleEditClick}
                >
                  <Image width={27} height={27} src={Edit} alt="edit" />
                  Edit Profile
                </p>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-8 text-sm font-medium duration-300 ease-in-out lg:text-base"
                >
                  <div className="flex items-center gap-1">
                    <Image width={24} height={25} src={Lock} alt="lock" />
                    Change Password
                  </div>
                  <Image width={30} height={31} src={arrow} alt="arrow" />
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out lg:text-base">
                  <div className="flex items-center gap-1">
                    <Image width={24} height={25} src={Bell} alt="bell" />
                    Enable Notifications
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary dark:peer-checked:bg-secondary"></div>
                  </label>
                </div>
              </li>
              <li>
                <button
                  className="flex items-center gap-1 text-sm font-medium duration-300 ease-in-out lg:text-base text-secondary"
                  onClick={handleLogoutClick}
                >
                  <Image
                    width={24}
                    height={25}
                    src={LogoutImage}
                    alt="logout"
                  />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        {/* <!-- Dropdown End --> */}
      </ClickOutside>

      {/* Account logout Modal */}

      <Modal isOpen={isOpen} onClose={onClose} buttonContent="">
        <div className="flex items-center flex-col">
          <Image src={dltCircle} alt="dltCircle" className="" />
          <p className="text-[#000000] text-[29px] font-medium">
            Account Logout
          </p>
          <p className="font-medium text-primary text-[21px]">
            Are you sure you want to logout your account??
          </p>
          <div className="flex gap-10 mt-5">
            <button
              className="font-normal text-[22.48px] rounded-full text-[#266CA8] border border-[#266CA8] px-16 py-3"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="font-normal text-white text-[22.48px] bg-[#266CA8] rounded-full px-16 py-3"
            >
              Yes, I am
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Profile Dropdown */}

      <Modal isOpen={isEditOpen} onClose={onEditClose} buttonContent="">
        <div className="flex  flex-col">
          <p className="text-[#000000] text-[29px] font-medium text-center">
            Chnage Password
          </p>
          <div className="mb-2 relative">
            <label className="block text-black font-semibold mb-1 text-lg">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                name="password" // Ensure this matches the state property name
                // value={loginForm.password}
                // onChange={handleLoginChange}
                className="w-full px-4 py-4 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-1/2 transform text-gray-500"
                style={{ transform: 'translateY(-77%)' }}
              >
                {showPassword ? (
                  <FaEye size={20} className="text-[#005B97] mr-3" />
                ) : (
                  <Image alt="eye" src={eye} className="mr-3" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-2 relative">
            <label className="block text-black font-semibold mb-1 text-lg">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                name="password" // Ensure this matches the state property name
                // value={loginForm.password}
                // onChange={handleLoginChange}
                className="w-full px-4 py-4 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-1/2 transform text-gray-500"
                style={{ transform: 'translateY(-77%)' }}
              >
                {showPassword ? (
                  <FaEye size={20} className="text-[#005B97] mr-3" />
                ) : (
                  <Image alt="eye" src={eye} className="mr-3" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-2 relative">
            <label className="block text-black font-semibold mb-1 text-lg">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                name="password" // Ensure this matches the state property name
                // value={loginForm.password}
                // onChange={handleLoginChange}
                className="w-full px-4 py-4 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-1/2 transform text-gray-500"
                style={{ transform: 'translateY(-77%)' }}
              >
                {showPassword ? (
                  <FaEye size={20} className="text-[#005B97] mr-3" />
                ) : (
                  <Image alt="eye" src={eye} className="mr-3" />
                )}
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="font-normal text-white text-[22.48px] bg-[#266CA8] rounded-full px-16 py-3"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DropdownUser
