'use client'
import { useState, FormEvent } from 'react'
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
import RightSection from './common'
// import { useRouter } from 'next/navigation'

interface ForgotProps {
  title: string
  content: string
}

const Forgot: React.FC<ForgotProps> = ({ title, content }) => {
  //   const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [otp1, setOtp1] = useState<string>('')
  const [otp2, setOtp2] = useState<string>('')
  const [otp3, setOtp3] = useState<string>('')
  const [otp4, setOtp4] = useState<string>('')
  const [otp5, setOtp5] = useState<string>('')

  //   const [error, setError] = useState<string | null>(null)
  //   const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(otp1, otp2, otp3, email)
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
              <p className="text-right mt-2 text-[#266CA8] underline text-sm font-semibold">
                Send OTP
              </p>
            </div>

            <div className="flex justify-center space-x-5 mb-2">
              {/* OTP Inputs */}
              {[otp1, otp2, otp3, otp4, otp5].map((otp, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                      if (index === 0) setOtp1(value)
                      if (index === 1) setOtp2(value)
                      if (index === 2) setOtp3(value)
                      if (index === 3) setOtp4(value)
                      if (index === 4) setOtp5(value)
                    }}
                    maxLength={1} // Ensure 1 character per input
                    className="w-[50px] h-[50px] text-center px-4 py-2 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              //   className={`w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300 ${
              //     loading ? 'opacity-50 cursor-not-allowed' : ''
              //   }`}
              className="w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"

              //   disabled={loading}
            >
              Verify
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <RightSection />
    </div>
  )
}
export default Forgot
