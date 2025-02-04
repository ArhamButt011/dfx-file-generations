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
    <div className="flex h-screen w-full">
      {/* Left Form Section */}
      <div className="w-[55%] bg-white flex items-center justify-center p-6">
        <div className="w-[70%] p-6 mx-5">
          <div className="flex items-center mb-16">
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
          {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading && (
            <p className="text-center text-blue-500 font-medium mb-4">
              Processing your login, please wait...
            </p>
          )} */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                required
              />
            </div>
            <div className="mb-2 relative">
              <label className="block text-black font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
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
              //   className={`w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300 ${
              //     loading ? 'opacity-50 cursor-not-allowed' : ''
              //   }`}
              className="w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"
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
