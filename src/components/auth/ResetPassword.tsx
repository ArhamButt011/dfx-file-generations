'use client'

import { useState, FormEvent } from 'react'
// import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
// import backarrow from '/public/images/admin/backarrow.svg'
// import image3 from '/public/images/admin/login/image3.svg'
// import Link from 'next/link'
import RightSection from './common'

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

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(newPassword, confirmNewPassword)
    // Handle login logic here
  }

  return (
    <div className="flex h-screen w-full mob:flex-col">
      {/* Left Form Section */}
      <div className="w-[55%] bg-white flex items-center justify-center p-6 mob:w-[100%] mob:p-0">
        <div className="w-[70%] p-6 mx-5 mob:mx-0 mob:w-[100%]">
          <div className="flex items-center mb-16 mob:mb-10">
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
          <form onSubmit={handleResetPassword}>
            <div className="mb-5 relative">
              <label className="block text-black font-semibold mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                  required
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
              <label className="block text-black font-semibold mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                  required
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
              //   className={`w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300 ${
              //     loading ? 'opacity-50 cursor-not-allowed' : ''
              //   }`}
              className="w-full bg-[#005B97] text-white py-2 px-4 mt-20  mob:mt-10 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"
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
