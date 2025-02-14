'use client'

import React, { useState, FormEvent } from 'react'
// import { useRouter } from 'next/navigation'
import { FaEye } from 'react-icons/fa'
import { RiEyeCloseFill } from "react-icons/ri";
import Image from 'next/image'
import logo from '/public/images/user/home/logo.svg'
import Modal from '../UI/Modal'
import Subscribe from '@/components/user/Subscription/Subscribe'
// import { useRouter } from 'next/navigation'
// import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/user/AuthScreens/rightSection.svg'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import { useAuth } from '@/context/AuthContext'
// Defining types for the props


const UserLogin = () => {
  const [Timer, setTimer] = useState(0);
  // const router = useRouter()
  const [email, setEmail] = useState<string>('')
  // const [password, setPassword] = useState<string>('')
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'User',
  })
  const { login } = useAuth()
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false)
  const [isVerifyOpen, setIsVerifyOpen] = useState<boolean>(false)
  const [isForgetOpen, setIsForgetOpen] = useState<boolean>(false)
  const [isResetOpen, setIsResetOpen] = useState<boolean>(false)
  const [isBilingOpen, setIsBilingOpen] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState<boolean>(false)
  const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false)
  const onClose = () => {
    setIsNewOpen(false)
    setIsVerifyOpen(false)
    setIsForgetOpen(false)
    setIsResetOpen(false)
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

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    // Only allow digits and ensure only one digit is entered
    if (/^\d?$/.test(value)) {
      setVerifyFormData((prevData) => ({
        ...prevData,
        [`otp${index + 1}`]: value,
      }));

      // Move focus to the next input field
      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

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
      if (/\s/.test(loginForm.password)) {
        Swal.fire({
          title: 'Error!',
          text: 'Password should not contain spaces',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
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

      // router.push('/Generate_DXF')

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

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };


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
    }
    else if (/\s/.test(newAccountFormData.password)) {
      Swal.fire({
        title: 'Error!',
        text: 'Password should not contain spaces',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    else if (validateEmail(email)) {
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
      // setIsBilingOpen(true);
      setVerifyFormData({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
      })

      const { token } = await res?.json()
      login(token)


      console.log("verified");



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
    e.preventDefault();

    if (Timer > 0) return; // Prevent resending while timer is active

    try {
      setLoading(true)
      const res = await fetch("/api/auth/OTPVerification/sendOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      // Start Timer (e.g., 30 seconds)
      let timeLeft = 60;
      setTimer(timeLeft);

      const timerInterval = setInterval(() => {
        timeLeft -= 1;
        setTimer(timeLeft);

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err instanceof Error ? err.message : String(err),
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    finally {
      setLoading(false);
    }
  };

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
    else if (/\s/.test(ResetFormData.password)) {
      Swal.fire({
        title: 'Error!',
        text: 'Password should not contain spaces',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
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

      Swal.fire({
        title: 'Success',
        text: "Password Reset Successfully",
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

    //get response from backend
    //const response=fetch();
    setIsResetOpen(false)
  }



  return (
    <div className="flex flex-col w-full h-[100vh] md:h-full  md:flex-row">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}
      {/* Left Form Section */}
      <div className="flex-1 bg-white flex md:items-center justify-center md:p-6  md:mt-0 mt-10">
        <div className="md:w-[90%] md:p-6 mx-5 ">
          <div className="flex items-center  mb-16 mob:mb-10">
            <Image
              src={logo}
              alt="logo"
              width={250}
              height={250}
              priority
            //   style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h1 className="md:text-[45px] text-[28px] font-medium text-black -mb-5">
            Effortless & Efficient{' '}
          </h1>
          <p className="font-semibold md:text-[60px] text-[39px] md:mt-0 mt-5">
            {' '}
            <span className="text-[#266CAB]">DXF</span> File Creation
          </p>
          <form onSubmit={handleLogin}>
            <div className="md:mb-4 md:mt-0 my-10">
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
            <div className="md:mb-2 mb-10 relative">
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
                    <RiEyeCloseFill size={20} className="text-[#005B97]" />
                  )}
                </button>
                <p className="text-right mt-2">
                  <span
                    className=" underline text-[#266CAB] md:text-xl text-xs cursor-pointer"
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
              className="w-full bg-[#005B97] text-white py-2 px-4  font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"
            //   disabled={loading}
            >
              Login
            </button>
            <p className="font-semibold md:text-xl text-sm text-center mt-5">
              Don&apos;t have an account?{" "}
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
      <div className="md:w-[40%] bg-[#266CA8] flex justify-end w-[100%] md:mt-0 mt-10">
        <Image
          src={image3}
          alt="image3"
          priority
          className="h-[100vh] object-fill"
        />
      </div>


      {/* </div> */}

      {/* create account */}
      <Modal isOpen={isNewOpen} onClose={onClose} buttonContent={<Image src="/images/user/cross.svg" alt="cross" width={20} height={20} />}>
        <div>
          <div className="text-center">
            <p className="font-semibold md:text-xl text-2xl">Create Account</p>
            <p className="font-medium md:text-lg text-sm text-[#00000080]">
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
                className="border w-full p-2 rounded-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#005B97]"
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
                className="border w-full p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#005B97]"
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
                    <RiEyeCloseFill size={20} className="text-[#005B97]" />
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
                    <RiEyeCloseFill size={20} className="text-[#005B97]" />
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
                <span>I have read and agree to the{" "}
                  <a href="#" className="underline text-[#266CAB]">
                    Privacy Policy
                  </a>
                  <span>{" "}&{" "}</span>
                  <a href="#" className="underline text-[#266CAB]">
                    User Agreement
                  </a>
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={!newAccountFormData.agree}
              className={`w-full bg-[#005B97] text-white p-3 font-bold rounded-full hover:bg-[#005b97f0] transition duration-300 mt-10 ${!newAccountFormData.agree ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Continue
            </button>
          </form>
        </div>
      </Modal>
      {/* verification */}
      <Modal isOpen={isVerifyOpen} onClose={onClose} buttonContent={<Image src="/images/user/cross.svg" alt="cross" width={20} height={20} />}>
        <div>
          <div className="text-center">
            <p className="font-semibold md:text-3xl text-2xl">Account Verification</p>
            <p className="font-medium md:text-xl text-sm text-[#00000080]">
              Please enter the verification code sent to{' '}
              <span className="underline text-black">
                <strong>{newAccountFormData.email}</strong>
              </span>
            </p>
          </div>
          <form onSubmit={(e) => SignupOTPVerification(e, email)}>
            <div className="flex justify-center md:space-x-5 space-x-3 mb-2 mt-10">
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
            <p className="font-semibold md:text-xl text-base text-center mt-5">
              Didn’t receive the code?{" "}
              {Timer > 0 ? (
                <span className="text-gray-500">Resend in {Timer}s</span>
              ) : (
                <span
                  className="underline text-[#266CAB] cursor-pointer"
                  onClick={(e) => sendOTP(e)}
                >
                  Resend Code
                </span>
              )}
            </p>
          </form>
        </div>
      </Modal>

      {/* Forget Password */}
      <Modal isOpen={isForgetOpen} onClose={onClose} buttonContent={<Image src="/images/user/cross.svg" alt="cross" width={20} height={20} />}>
        <div>
          <div className="text-center">
            <p className="font-semibold md:text-3xl text-2xl cursor-pointer">
              Forgot Password
            </p>
            <p className="font-medium md:text-xl text-sm text-[#00000080]">
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

          </form>
        </div>
      </Modal>

      {/* Reset Password */}
      <Modal isOpen={isResetOpen} onClose={onClose} buttonContent={<Image src="/images/user/cross.svg" alt="cross" width={20} height={20} />}>
        <div>
          <div className="text-center">
            <p className="font-semibold md:text-3xl text-2xl cursor-pointer">
              Reset Password
            </p>
            <p className="font-medium md:text-xl text-sm text-[#00000080]">
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
                      <RiEyeCloseFill size={20} className="text-[#005B97]" />
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
                      <RiEyeCloseFill size={20} className="text-[#005B97]" />
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

      <Subscribe isBilingOpen={isBilingOpen} setIsBilingOpen={setIsBilingOpen} />

    </div>
  )
}
export default UserLogin
