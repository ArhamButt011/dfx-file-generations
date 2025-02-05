'use client'

import React, { useState, FormEvent } from 'react'
// import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
import Modal from '../UI/Modal'
import BilingModal from '../UI/BilingModal'
import { useRouter } from 'next/navigation'
import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/user/AuthScreens/login.svg'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
// Defining types for the props
type included = {
  id: number
  text: string
}

type DataItem = {
  id: number
  desc: string
  title: string
  price: string
  include: included[]
  buttonText: string
}

const UserLogin = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  // const [password, setPassword] = useState<string>('')
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'User',
  })
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false)
  const [isVerifyOpen, setIsVerifyOpen] = useState<boolean>(false)
  const [isForgetOpen, setIsForgetOpen] = useState<boolean>(false)
  const [isResetOpen, setIsResetOpen] = useState<boolean>(false)
  const [isBilingOpen, setIsBilingOpen] = useState<boolean>(false)
  const [isAccountVerified, setIsAccountVerified] = useState<boolean>(false)
  const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false)
  const onClose = () => {
    setIsNewOpen(false)
    setIsVerifyOpen(false)
    setIsForgetOpen(false)
    setIsResetOpen(false)
    setIsBilingOpen(false)
  }
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [newAccountFormData, setNewAccountFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    agree: false,
    role: 'User',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [ResetFormData, setResetFormData] = useState({
    password: '',
    confirm: '',
  })

  const [verifyFormData, setVerifyFormData] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
  })

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value

    // Only allow digits
    if (/^\d?$/.test(value)) {
      setVerifyFormData((prevData) => ({
        ...prevData,
        [`otp${index + 1}`]: value,
      }))
    }
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLoginForm((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target

    setNewAccountFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

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

      const { token, name } = await res.json()
      localStorage.setItem('token', token)
      localStorage.setItem('username', name)

      router.push('/Generate_DXF')

      setLoginForm({
        email: '',
        password: '',
        role: 'User',
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

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regex.test(email)) {
      return true
    }
    return false
  }

  const handleNewAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newAccountFormData.password != newAccountFormData.confirm) {
      Swal.fire({
        title: 'Error!',
        text: 'The Passwords are not same',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else if (!validateEmail(email)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter valid Email',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newAccountFormData }),
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.message)
      }

      setIsAccountCreated(true)
      setIsVerifyOpen(true)
      setIsNewOpen(false)
      setEmail(newAccountFormData.email)
      setNewAccountFormData({
        name: '',
        email: '',
        password: '',
        confirm: '',
        agree: false,
        role: 'User',
      })
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
      // if (err instanceof Error) {
      //     setError(err.message);
      // } else {
      //     setError("An unexpected error occurred");
      // }
    } finally {
      setLoading(false)
    }
  }
  const SignupOTPVerification = async (e: React.FormEvent, email: string) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await verifyOTP(e, email)

      setIsAccountCreated(false)
      setIsAccountVerified(false)
      setIsVerifyOpen(false)
      setIsNewOpen(false)
      setEmail('')
      // setIsBilingOpen(true);
      setVerifyFormData({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
      })

      const { token, name } = await res?.json()
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('username', name)

      router.push('/Generate_DXF')
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

  const verifyOTP = async (e: React.FormEvent, email: string) => {
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
    }
  }

  const ForgetOTPVerification = async (e: React.FormEvent, email: string) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await verifyOTP(e, email)
      setVerifyFormData({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
      })

      if (!res?.ok) {
        const data = await res?.json()

        throw new Error(data.message)
      }

      setIsForgetOpen(false)
      setIsResetOpen(true)
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

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/OTPVerification/sendOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.message)
      }

      // router.push("/Generate_DXF");
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }

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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newAccountFormData }),
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.message)
      }

      setIsAccountCreated(true)
      setIsVerifyOpen(true)
      setIsNewOpen(false)
      setEmail(newAccountFormData.email)
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

    //get response from backend
    //const response=fetch();
    setIsResetOpen(false)
  }

  const bilingPlans: DataItem[] = [
    {
      id: 1,
      desc: 'Free Plan',
      title: 'Free Trial',
      price: '$0.00/month',
      include: [
        {
          id: 1,
          text: 'Unlimited DXF file downloads for 7 days.',
        },
        {
          id: 2,
          text: 'No payment required',
        },
      ],
      buttonText: 'Start Free Trial',
    },
    {
      id: 2,
      desc: 'Pay Per Download',
      title: 'Basic',
      price: '$10.00/File',
      include: [
        {
          id: 1,
          text: 'Free upload and preview',
        },
        {
          id: 2,
          text: 'Purchase DXF files individually for $10 per download.',
        },
        {
          id: 3,
          text: 'No commitment or subscription',
        },
        {
          id: 4,
          text: 'Secure payment processing',
        },
      ],
      buttonText: 'Get Started',
    },
    {
      id: 3,
      desc: 'Unlimited Plan',
      title: 'Premium',
      price: '$100.00/Month',
      include: [
        {
          id: 1,
          text: 'Unlimited DXF downloads',
        },
        {
          id: 2,
          text: 'Exclusive customer support ',
        },
        {
          id: 3,
          text: 'Cancel or modify anytime',
        },
        {
          id: 4,
          text: 'Secure payment processing',
        },
      ],
      buttonText: 'Get Started',
    },
  ]

  return (
    <div className="flex h-screen w-full mob:flex-col">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}
      {/* Left Form Section */}
      <div className="w-[55%] bg-white flex items-center justify-center p-6 mob:w-[100%] mob:p-0">
        <div className="w-[90%] p-6 mx-5 mob:mx-0 mob:w-[100%]">
          <div className="flex items-center mb-16 mob:mb-10">
            <Image
              src={logo}
              alt="logo"
              width={250}
              height={250}
              priority
              //   style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h1 className="text-[45px] font-medium text-black -mb-5">
            Effortless & Efficient{' '}
          </h1>
          <p className="font-semibold text-[60px]">
            {' '}
            <span className="text-[#266CAB]">DXF</span> File Creation
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
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
                  value={loginForm.password}
                  name="password"
                  onChange={handleLoginChange}
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
                  <span
                    className=" underline text-[#266CAB] cursor-pointer"
                    onClick={() => setIsForgetOpen(true)}
                  >
                    {' '}
                    Forget Password?
                  </span>
                </p>
              </div>
            </div>
            <button
              type="submit"
              //   className={`w-full bg-[#005B97] text-white py-2 px-4 mt-20 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300 ${
              //     loading ? 'opacity-50 cursor-not-allowed' : ''
              //   }`}
              className="w-full bg-[#005B97] text-white py-2 px-4 xxxl:mt-20 xxl:mt-12 mob:mt-10 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"
              //   disabled={loading}
            >
              Login
            </button>
            <p className="font-semibold text-xl text-center mt-5">
              Don&apos;t have an account?
              <span
                className=" underline text-[#266CAB] cursor-pointer"
                onClick={() => {
                  if (isAccountCreated && !isAccountVerified) {
                    setIsVerifyOpen(true)
                  } else if (!isAccountCreated) {
                    setIsNewOpen(true)
                  }
                }}
              >
                Create Account
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-[45%] bg-[#266CA8] flex w-[100%]">
        <div className="text-white text-right w-full">
          <div className="mt-10 mob:mt-8 px-8 mob:px-4 flex justify-end">
            <h1 className="font-semibold text-[40px] mob:text-[27.32px] max-w-[460px] text-right">
              Transform your designs into production-ready DXF files
            </h1>
          </div>
          <div>
            <Image
              src={backarrow}
              alt="backarrow"
              width={200}
              height={200}
              priority
              className="ml-auto mt-5 md:pr-8 pr-4"
            />
          </div>
          <div className="w-full max-h-[43rem] overflow-hidden mt-10 lg:max-h-[32rem] xl:aspect-auto xl:max-h-[32rem] 2xl:max-h-[35rem]">
            {/* Ensures the image fits perfectly within the container */}
            <Image
              src={image3}
              alt="image3"
              priority
              className="object-contain px-4 h-auto w-full mb-5 md:mb-0"
            />
          </div>
        </div>
      </div>

      {/* create account */}
      <Modal isOpen={isNewOpen} onClose={onClose}>
        <div>
          <div className="text-center">
            <p className="font-semibold text-3xl">Create Account</p>
            <p className="font-medium text-xl text-[#00000080]">
              Create Your account to Lumashape by adding and verifying your
              details
            </p>
          </div>
          <form action="" onSubmit={handleNewAccountSubmit}>
            {/* name */}
            <div className="mb-5">
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                required
                value={newAccountFormData.name}
                placeholder="Enter User Name"
                className="border w-full p-3 rounded-full mt-2"
                onChange={handleSignupChange}
              />
            </div>
            {/* email */}
            <div className="mb-5">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                required
                value={newAccountFormData.email}
                placeholder="Enter Email Address"
                className="border w-full p-3 rounded-full"
                onChange={handleSignupChange}
              />
            </div>
            {/* password */}
            <div className="mb-5 relative">
              <label className="block text-black font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter Password"
                  value={newAccountFormData.password}
                  onChange={handleSignupChange}
                  className="w-full p-3 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <FaEye size={20} className="text-[#005B97]" />
                  ) : (
                    <FaEyeSlash size={20} className="text-[#005B97]" />
                  )}
                </button>
              </div>
            </div>
            {/* confirm password */}
            <div className="mb-5 relative">
              <label className="block text-black font-semibold mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm"
                  placeholder="Confirm Password"
                  value={newAccountFormData.confirm}
                  onChange={handleSignupChange}
                  className="w-full p-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FaEye size={20} className="text-[#005B97]" />
                  ) : (
                    <FaEyeSlash size={20} className="text-[#005B97]" />
                  )}
                </button>
              </div>
            </div>
            {/* agreement */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={newAccountFormData.agree}
                className="mr-2"
                onChange={handleSignupChange}
              />
              <label htmlFor="agree" className="flex items-center space-x-1">
                <span>I have read and agree to the</span>
                <a href="#" className="underline text-[#266CAB]">
                  Privacy Policy
                </a>
                <span>&</span>
                <a href="#" className="underline text-[#266CAB]">
                  User Agreement
                </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={!newAccountFormData.agree}
              className={`w-full bg-[#005B97] text-white p-3 font-bold rounded-full hover:bg-[#005b97f0] transition duration-300 mt-10 ${
                !newAccountFormData.agree ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Continue
            </button>
          </form>
        </div>
      </Modal>
      {/* verification */}
      <Modal isOpen={isVerifyOpen} onClose={onClose}>
        <div>
          <div className="text-center">
            <p className="font-semibold text-3xl">Account Verification</p>
            <p className="font-medium text-xl text-[#00000080]">
              Please enter the verification code sent to{' '}
              <span className="underline text-black">
                <strong>{newAccountFormData.email}</strong>
              </span>
            </p>
          </div>
          <form onSubmit={(e) => SignupOTPVerification(e, email)}>
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
                    className="w-[50px] h-[50px] text-center px-4 py-2 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#005B97] text-white p-3 md:mt-10 mt-10 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"

              //   disabled={loading}
            >
              Verify
            </button>
            <p className="font-semibold text-xl text-center mt-5">
              Didn’t receive the code?{' '}
              <span
                className=" underline text-[#266CAB] cursor-pointer"
                onClick={() => setIsNewOpen(true)}
              >
                Resend Code
              </span>
            </p>
          </form>
        </div>
      </Modal>

      {/* Forget Password */}
      <Modal isOpen={isForgetOpen} onClose={onClose}>
        <div>
          <div className="text-center">
            <p className="font-semibold text-3xl cursor-pointer">
              Forgot Password
            </p>
            <p className="font-medium text-xl text-[#00000080]">
              Please enter the email address so that we can verify your account
            </p>
          </div>

          <form action="" onSubmit={sendOTP}>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-right mt-2 text-[#266CA8] underline text-sm font-semibold cursor-pointer"
                >
                  Send OTP
                </button>
              </div>
            </div>
          </form>

          <form onSubmit={(e) => ForgetOTPVerification(e, email)}>
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
                    className="w-[50px] h-[50px] text-center px-4 py-2 mt-1 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#005B97] text-white p-3 md:mt-10 mt-10 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"

              //   disabled={loading}
            >
              Verify
            </button>
            <p className="font-semibold text-xl text-center mt-5">
              Didn’t receive the code?{' '}
              <span
                className=" underline text-[#266CAB] cursor-pointer"
                onClick={() => setIsNewOpen(true)}
              >
                Resend Code
              </span>
            </p>
          </form>
        </div>
      </Modal>

      {/* Reset Password */}
      <Modal isOpen={isResetOpen} onClose={onClose}>
        <div>
          <div className="text-center">
            <p className="font-semibold text-3xl cursor-pointer">
              Forgot Password
            </p>
            <p className="font-medium text-xl text-[#00000080]">
              Please enter the email address so that we can verify your account
            </p>
          </div>

          <form onSubmit={handleResetPasswordSubmit}>
            <div className="">
              <div className="mb-5 relative">
                <label className="block text-black font-semibold mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter Password"
                    value={ResetFormData.password}
                    onChange={handleResetPassword}
                    className="w-full p-3 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <FaEye size={20} className="text-[#005B97]" />
                    ) : (
                      <FaEyeSlash size={20} className="text-[#005B97]" />
                    )}
                  </button>
                </div>
              </div>
              {/* confirm password */}
              <div className="mb-5 relative">
                <label className="block text-black font-semibold mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm"
                    placeholder="Confirm Password"
                    value={ResetFormData.confirm}
                    onChange={handleResetPassword}
                    className="w-full p-3 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <FaEye size={20} className="text-[#005B97]" />
                    ) : (
                      <FaEyeSlash size={20} className="text-[#005B97]" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#005B97] text-white p-3 md:mt-10 mt-10 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"

              //   disabled={loading}
            >
              Verify
            </button>
            <p className="font-semibold text-xl text-center mt-5">
              Didn’t receive the code?{' '}
              <span
                className=" underline text-[#266CAB] cursor-pointer"
                onClick={() => setIsNewOpen(true)}
              >
                Resend Code
              </span>
            </p>
          </form>
        </div>
      </Modal>

      {/* biling */}
      <BilingModal isOpen={isBilingOpen} onClose={onClose}>
        <div>
          <div className="text-center">
            <p className="font-semibold text-3xl cursor-pointer">
              Choose Your Subscription Plan
            </p>
            <p className="font-medium text-xl text-[#00000080]">
              Choose a plan that fits your needs, and let&apos;s start designing
              together.
            </p>
          </div>

          <div className="flex justify-between mt-10">
            {bilingPlans.map((item) => (
              <div
                key={item.id}
                className="border p-4 flex-1 max-w-[30%] rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <p className="font-medium text-base text-[#22222280]">
                    {item.desc}
                  </p>
                  <p className="font-semibold text-3xl">{item.title}</p>
                  <p className="mt-10">
                    <span className="text-4xl font-semibold text-[#266CA8]">
                      {item.price.split('/')[0]}
                    </span>
                    <span className="text-base text-[#22222280] font-medium">
                      /{item.price.split('/')[1]}
                    </span>
                  </p>
                  <p className="font-semibold text-base mt-5">Whats Included</p>
                  {item.include.map((inc) => (
                    <div key={inc.id} className="flex items-center gap-2">
                      <Image
                        src="/images/user/AuthScreens/Check Circle.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                      />
                      <p className="font-medium text-base text-[#22222280]">
                        {inc.text}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 bg-[#266CA8] text-white py-2 px-4 rounded-full">
                  {item.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </BilingModal>
    </div>
  )
}
export default UserLogin
