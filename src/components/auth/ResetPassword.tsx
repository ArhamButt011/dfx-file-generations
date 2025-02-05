'use client'

import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
// import backarrow from '/public/images/admin/backarrow.svg'
// import image3 from '/public/images/admin/login/image3.svg'
// import Link from 'next/link'
import RightSection from './common'
import Swal from 'sweetalert2'

// Defining types for the props
interface ResetProps {
  title: string
  content: string
}

const ResetPassword: React.FC<ResetProps> = ({ title, content }) => {
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(
    false,
  )

  //   const [error, setError] = useState<string | null>(null)
  //   const [loading, setLoading] = useState<boolean>(false)

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmNewPassword === newPassword) {
      setConfirmNewPassword('')
      setNewPassword('')
    }

    if (newPassword != confirmNewPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'The Passwords are not same',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
  }

  return (
    <div className="flex flex-col w-full md:flex-row">
      {/* Left Form Section */}
      <div className="w-[100%] bg-white flex items-center justify-center md:w-[55%] p-6 md:p-0">
        <div className="md:w-[70%] w-[100%]">
          <div className="flex items-center md:mb-16 mb-10">
            <Image
              src={logo}
              alt="logo"
              width={220}
              height={220}
              priority
              //   style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h1 className="text-[34px] font-bold mb-2 text-black">{title}</h1>
          <p className="text-gray-500 mb-7">{content}</p>
          {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}
          {/* {loading && (
            <p className="text-center text-blue-500 font-medium mb-4">
              Processing your login, please wait...
            </p>
          )} */}
          <form onSubmit={handleResetPasswordSubmit}>
            <div className="mb-5 relative">
              <label className="block text-black font-semibold mb-1 text-lg">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-4 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-3 top-1/2 transform text-gray-500"
                  style={{ transform: 'translateY(-42%)' }}
                >
                  {showNewPassword ? (
                    <FaEye size={20} className="text-[#005B97]" />
                  ) : (
                    <FaEyeSlash size={20} className="text-[#005B97]" />
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
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-4 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                  className="absolute inset-y-0 right-3 top-1/2 transform text-gray-500"
                  style={{ transform: 'translateY(-42%)' }}
                >
                  {showConfirmNewPassword ? (
                    <FaEye size={20} className="text-[#005B97]" />
                  ) : (
                    <FaEyeSlash size={20} className="text-[#005B97]" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              //   className={`w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-full hover:bg-[#005b97f0] transition duration-300 ${
              //     loading ? 'opacity-50 cursor-not-allowed' : ''
              //   }`}
              className="w-full bg-[#005B97] text-white py-4 px-4 md:mt-20 mt-10 font-bold rounded-full hover:bg-[#005b97f0] transition duration-300"
              //   disabled={loading}
            >
              Continue
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <RightSection />
    </div>
  )
}
export default ResetPassword
