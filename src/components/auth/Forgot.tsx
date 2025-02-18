'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
import RightSection from './common'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'

interface ForgotProps {
  title: string
  content: string
}

const Forgot: React.FC<ForgotProps> = ({ title, content }) => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isOTPSent, setIsOTPSent] = useState(false)
  const [OTPSent, setOTPSent] = useState(false)
  const [timer, setTimer] = useState(60) // 1 minute
  const [verifyFormData, setVerifyFormData] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
  })

  // const validateEmail = (email: string) => {
  //   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  //   if (regex.test(email)) {
  //     return true
  //   }
  //   return false
  // }

  const sendOTP = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/OTPVerification/sendOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text:
            'An OTP has been sent to your registered email. Please check your inbox to proceed.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        })
      }

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.message)
      }
      setIsOTPSent(true)
      setOTPSent(true)
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
      })
    } finally {
      setLoading(false)
    }
  }
  const verifyOTP = async (e: React.FormEvent, email: string) => {
    setLoading(true)
    e.preventDefault()

    try {
      const otp = parseInt(
        verifyFormData.otp1 +
          verifyFormData.otp2 +
          verifyFormData.otp3 +
          verifyFormData.otp4 +
          verifyFormData.otp5,
      )

      const res = await fetch('/api/auth/OTPVerification/verifyOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      if (res.ok) {
        sessionStorage.setItem('email', email)
        router.push('/admin/reset-password')
      }
      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.message)
      }

      return res
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOTPSent) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isOTPSent])
  useEffect(() => {
    if (timer === 0) {
      setIsOTPSent(false)
      setTimer(60)
    }
  }, [timer])

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value

    if (/^\d?$/.test(value)) {
      setVerifyFormData((prevData) => ({
        ...prevData,
        [`otp${index + 1}`]: value,
      }))
    }
  }

  return (
    <div className="flex flex-col w-full md:flex-row">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}
      {/* Left Form Section */}
      <div className="w-[100%] bg-white flex items-center justify-center md:w-[60%] p-6 md:p-0">
        <div className="md:w-[70%] w-[100%]">
          <div className="flex items-center md:mb-6 mb-10">
            <Image src={logo} alt="logo" width={360} height={55} priority />
          </div>
          <h1 className="text-[36px] font-bold mb-2 text-black xl:text-[50.04px]">
            {title}
          </h1>
          <p className="text-primary mb-6 text-lg xl:text-[21.56px]">
            {content}
          </p>

          <form action="" onSubmit={sendOTP}>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1 text-lg xl:text-[23.8px]">
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
              <div className="flex justify-end mt-2 xl:mt-3">
                {isOTPSent ? (
                  <p className="text-right mt-2 text-secondary font-semibold">
                    00:{timer}
                  </p>
                ) : (
                  <button
                    type="submit"
                    className="text-right mt-2 text-[#266CA8] underline text-[18px] xl:text-[20.78px] font-semibold cursor-pointer"
                  >
                    {OTPSent ? 'Resend OTP' : 'Send OTP'}
                  </button>
                )}
              </div>
            </div>
          </form>
          <form onSubmit={(e) => verifyOTP(e, email)}>
            <div className="flex justify-center space-x-5 mb-2 mt-10">
              {/* OTP Inputs */}
              {[
                verifyFormData.otp1,
                verifyFormData.otp2,
                verifyFormData.otp3,
                verifyFormData.otp4,
                verifyFormData.otp5,
              ].map((otp, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => handleOTPChange(e, index)}
                    onKeyUp={(e) => {
                      const input = e.target as HTMLInputElement
                      if (e.key === 'Backspace' && input.value.length === 0) {
                        const prevInput = document.getElementById(
                          `otp-${index}`,
                        )
                        if (prevInput) {
                          prevInput.focus()
                        }
                      } else if (input.value.length === 1) {
                        const nextInput = document.getElementById(
                          `otp-${index + 2}`,
                        )
                        if (nextInput) {
                          nextInput.focus()
                        }
                      }
                    }}
                    className="w-[50px] h-[50px] text-center px-4 py-2 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                    id={`otp-${index + 1}`}
                    maxLength={1}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#266CA8] text-white py-4 px-4 mt-12 xl:mt-16 font-semibold rounded-full hover:bg-[#005b97f0] transition duration-300 xl:text-[20px] text-[18px]"

              //   disabled={loading}
            >
              Verify
            </button>
            {/* <p className="font-semibold text-xl text-center mt-5">
              Didn’t receive the code?{' '}
              <span className=" underline text-[#266CAB] cursor-pointer">
                Resend Code
              </span>
            </p> */}
          </form>
        </div>
      </div>

      {/* Right Section */}
      <RightSection />
    </div>
  )
}
export default Forgot
