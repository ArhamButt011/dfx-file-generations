'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FaEye } from 'react-icons/fa'
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
import Link from 'next/link'
import RightSection from './common'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import { useAuth } from '@/context/AuthContext'
import eye from '/public/images/admin/eye.svg'

// Defining types for the props
interface LoginProps {
  title: string
  content: string
}

const Login: React.FC<LoginProps> = ({ title, content }) => {
  const { userData } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  if (userData?.role === 'admin') {
    router.push('/admin/dashboard')
  }
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'Admin',
  })
  const { login } = useAuth()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginForm }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }

      const { token } = await res.json()
      login(token)

      router.push('/admin/dashboard')
      // window.location.href('/admin/dashboard')

      setLoginForm({
        email: '',
        password: '',
        role: 'Admin',
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
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLoginForm((prevData) => ({
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
      <div className="w-[100%] bg-white flex items-center justify-center md:w-[60%] p-6 md:p-0">
        <div className="md:w-[70%] w-[100%] mt-[40px]">
          <div className="flex items-center md:mb-12 mb-10">
            <Image src={logo} alt="logo" width={250} height={250} priority />
          </div>
          <div>
            <h1 className="text-[36px] font-bold mb-2 text-black">{title}</h1>
          </div>
          <div>
            <p className="text-primary mb-10 text-lg">{content}</p>
          </div>
          {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading && (
            <p className="text-center text-blue-500 font-medium mb-4">
              Processing your login, please wait...
            </p>
          )} */}
          <form onSubmit={handleLogin}>
            <div className="mb-8">
              <label className="block text-black font-semibold mb-1 text-lg">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                name="email" // Ensure this matches the state property name
                value={loginForm.email}
                onChange={handleLoginChange}
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
                  name="password" // Ensure this matches the state property name
                  value={loginForm.password}
                  onChange={handleLoginChange}
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
                <p className="text-right mt-2">
                  <Link
                    href="/admin/forgot"
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
              className="w-full bg-[#266CA8] text-white py-4 px-4 mt-20 md:mt-24 font-semibold rounded-full hover:bg-[#005b97f0] transition duration-300"
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
