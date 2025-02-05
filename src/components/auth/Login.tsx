'use client'

import { useState, FormEvent } from 'react'
// import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
//
import Link from 'next/link'
import RightSection from './common'

// Defining types for the props
interface LoginProps {
  title: string
  content: string
}

const Login: React.FC<LoginProps> = ({ title, content }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  //   const role = 'admin'
  const [showPassword, setShowPassword] = useState<boolean>(false)
  //   const [error, setError] = useState<string | null>(null)
  //   const [loading, setLoading] = useState<boolean>(false)
  //   const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState<
  //     boolean
  //   >(false)
  //   const [isResetPasswordVisible, setIsResetPasswordVisible] = useState<boolean>(
  //     false,
  //   )
  //   const [userEmail, setUserEmail] = useState<string | null>(null)
  //   const router = useRouter()

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div className="flex flex-col w-full md:flex-row">
      {/* Left Form Section */}
      <div className="w-[100%] bg-white flex items-center justify-center md:w-[55%] p-6 md:p-0">
        <div className="md:w-[70%] w-[100%]">
          <div className="flex items-center md:mb-16 mb-10">
            <Image src={logo} alt="logo" width={250} height={250} priority />
          </div>
          <h1 className="text-[36px] font-bold mb-2 text-black">{title}</h1>
          <p className="text-gray-500 mb-7">{content}</p>
          {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading && (
            <p className="text-center text-blue-500 font-medium mb-4">
              Processing your login, please wait...
            </p>
          )} */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1 text-lg">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                required
              />
            </div>
            <div className="mb-2 relative">
              <label className="block text-black font-semibold mb-1 text-lg">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    <FaEye size={20} className="text-[#005B97]" />
                  ) : (
                    <FaEyeSlash size={20} className="text-[#005B97]" />
                  )}
                </button>
                <p className="text-right mt-2">
                  <Link
                    href="/forgot"
                    className="text-[#266CA8] underline text-sm font-semibold"
                  >
                    Forget Password?
                  </Link>
                </p>
              </div>
            </div>
            <button
              type="submit"
              //   className={`w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-full hover:bg-[#005b97f0] transition duration-300 ${
              //     loading ? 'opacity-50 cursor-not-allowed' : ''
              //   }`}
              className="w-full bg-[#005B97] text-white py-4 px-4 mt-20 md:mt-10 font-bold rounded-full hover:bg-[#005b97f0] transition duration-300"
              //   disabled={loading}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <RightSection />
    </div>
  )
}
export default Login
