'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaEye } from 'react-icons/fa'
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
import RightSection from './common'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
// import eye from '/public/images/admin/eye.svg'
import { LuEyeClosed } from 'react-icons/lu'

interface ResetProps {
  title: string
  content: string
}

const ResetPassword: React.FC<ResetProps> = ({ title, content }) => {
  const email = sessionStorage.getItem('email')

  const [ResetFormData, setResetFormData] = useState({
    password: '',
    confirm: '',
  })
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(
    false,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (ResetFormData.password != ResetFormData.confirm) {
      Swal.fire({
        title: 'Error!',
        text: 'The Passwords are not same',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/ResetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ResetFormData }),
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.message)
      }
      router.push('/admin')
      Swal.fire({
        title: 'Success',
        text: 'Password Reset Successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      })
      setResetFormData({
        password: '',
        confirm: '',
      })
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

  const handleResetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setResetFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="flex flex-col w-full md:flex-row">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}
      {/* Left Form Section */}
      <div className="w-full bg-white flex items-center justify-center md:max-w-[60%] p-6 md:px-5">
        <div className="md:max-w-[500px] w-full">
          <div className="flex items-center md:mb-6 mb-10">
            <Image src={logo} alt="logo" width={360} height={55} priority />
          </div>
          <h1 className="text-[28px] font-bold mb-2 text-black xl:text-[40px]">
            {title}
          </h1>
          <p className="text-primary mb-6 text-[13px] xl:text-[18px]">
            {content}
          </p>

          <form onSubmit={handleResetPasswordSubmit}>
            <div className="mb-8 relative">
              <label className="block text-black font-semibold mb-1 text-lg xl:text-[18px]">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter Password"
                  value={ResetFormData.password}
                  onChange={handleResetPassword}
                  className="w-full px-4 py-4 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm"
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
                    <FaEye size={20} className="text-[#005B97] mr-2" />
                  ) : (
                    <LuEyeClosed size={20} className="text-[#005B97] mr-2" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-2 relative">
              <label className="block text-black font-semibold mb-1 text-lg xl:text-[18px]">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  name="confirm"
                  placeholder="Enter Password"
                  value={ResetFormData.confirm}
                  onChange={handleResetPassword}
                  className="w-full px-4 py-4 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm"
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
                    <FaEye size={20} className="text-[#005B97] mr-2" />
                  ) : (
                    <LuEyeClosed size={20} className="text-[#005B97] mr-2" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              //   className={`w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-full hover:bg-[#005b97f0] transition duration-300 ${
              //     loading ? 'opacity-50 cursor-not-allowed' : ''
              //   }`}
              className="w-full bg-[#266CA8] text-white py-4 px-4 mt-12 xl:mt-16 font-semibold rounded-full hover:bg-[#005b97f0] transition duration-300 xl:text-[16px] text-[14px]"
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
