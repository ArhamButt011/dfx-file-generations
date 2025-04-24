'use client'

import React, { useState, FormEvent, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
import { FaEye } from 'react-icons/fa'
import { LuEyeClosed } from 'react-icons/lu'
import Image from 'next/image'
import logo from '/public/images/user/home/user_login.svg'
import Modal from '../UI/Modal'
import Subscribe from '@/components/user/Subscription/Subscribe'
// import { useRouter } from 'next/navigation'
// import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/user/AuthScreens/rightSection.svg'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
// import { console } from 'inspector';
// Defining types for the props

const UserLogin = () => {
  const [Timer, setTimer] = useState(0)
  // const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [emailSend, setEmailSend] = useState<string>('')
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
  const [isBilingOpen, setIsBilingOpen] = useState(false)
  const [isAccountVerified, setIsAccountVerified] = useState<boolean>(false)
  const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false)
  const [OTPSent, setOTPSent] = useState(false)

  const onClose = () => {
    setIsNewOpen(false)
    setIsVerifyOpen(false)
    setIsForgetOpen(false)
    setIsResetOpen(false)
  }
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPassword1, setShowPassword1] = useState<boolean>(false)
  const [showPassword2, setShowPassword2] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [showConfirmPassword1, setShowConfirmPassword1] = useState<boolean>(
    false,
  )
  const [newAccountFormData, setNewAccountFormData] = useState({
    name: '',
    lastName: '',
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

    // Only allow digits and ensure only one digit is entered
    if (/^\d?$/.test(value)) {
      setVerifyFormData((prevData) => ({
        ...prevData,
        [`otp${index + 1}`]: value,
      }))

      // Move focus to the next input field
      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
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

  // const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     if (/\s/.test(loginForm.password)) {
  //       Swal.fire({
  //         title: 'Error!',
  //         text: 'Password should not contain spaces',
  //         icon: 'error',
  //         showConfirmButton: false,
  //         timer: 2000,
  //         didOpen: () => {
  //           const swalContainer = document.querySelector('.swal2-container') as HTMLElement;
  //           if (swalContainer) {
  //             swalContainer.style.setProperty('z-index', '100000', 'important');
  //           }
  //         }
  //       });
  //       return;
  //     }
  //     const res = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ loginForm }),
  //     })

  //     if (!res.ok) {
  //       const data = await res.json()

  //       throw new Error(data.message)
  //     }

  //     const { token } = await res.json()
  //     login(token)
  //     // router.push('/Generate_DXF')
  //     setLoginForm({
  //       email: '',
  //       password: '',
  //       role: 'User',
  //     })
  //   } catch (err) {
  //     Swal.fire({
  //       title: 'Error!',
  //       text: err instanceof Error ? err.message : String(err),
  //       icon: 'error',
  //       showConfirmButton: false,
  //       timer: 2000,
  //       didOpen: () => {
  //         const swalContainer = document.querySelector('.swal2-container') as HTMLElement;
  //         if (swalContainer) {
  //           swalContainer.style.setProperty('z-index', '100000', 'important');
  //         }
  //       }
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

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
        })
        return
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

      const { token, is_verified, email } = await res.json()

      if (!is_verified) {
        setEmailSend(email)
        setIsVerifyOpen(true)
        sendOTP(undefined, email)
        return
      }

      login(token)
      // router.push('/Generate_DXF')
      setLoginForm({
        email: '',
        password: '',
        role: 'User',
      })
      sessionStorage.setItem('billingTriggered', 'false')
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
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email.trim())
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
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
      return
    } else if (/\s/.test(newAccountFormData.password)) {
      Swal.fire({
        title: 'Error!',
        text: 'Password should not contain spaces',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
      return
    } else if (validateEmail(email)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter valid Email',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
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
      setEmailSend(newAccountFormData.email)
      setNewAccountFormData({
        name: '',
        lastName: '',
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
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
    } finally {
      setLoading(false)
    }
  }

  // const verifyOTP = async (e: React.FormEvent, email: string) => {
  //   e.preventDefault()
  //   try {
  //     const otp = parseInt(
  //       verifyFormData.otp1 +
  //       verifyFormData.otp2 +
  //       verifyFormData.otp3 +
  //       verifyFormData.otp4 +
  //       verifyFormData.otp5,
  //     )

  //     const res = await fetch('/api/auth/OTPVerification/verifyOTP', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, otp }),
  //     })

  //     if (!res.ok) {
  //       const data = await res.json();
  //       throw new Error(data)
  //     }

  //     return res
  //   } catch (err) {
  //     Swal.fire({
  //       title: 'Error 1!',
  //       text: err instanceof Error ? err.message : String(err),
  //       icon: 'error',
  //       showConfirmButton: false,
  //       timer: 2000,
  //       didOpen: () => {
  //         const swalContainer = document.querySelector('.swal2-container') as HTMLElement;
  //         if (swalContainer) {
  //           swalContainer.style.setProperty('z-index', '100000', 'important');
  //         }
  //       }
  //     })
  //   }
  // }

  // const SignupOTPVerification = async (e: React.FormEvent, email: string) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     const res = await verifyOTP(e, email)

  //     setIsAccountCreated(false)
  //     setIsAccountVerified(false)
  //     setIsVerifyOpen(false)
  //     setIsNewOpen(false)
  //     setEmail('')
  //     setVerifyFormData({
  //       otp1: '',
  //       otp2: '',
  //       otp3: '',
  //       otp4: '',
  //       otp5: '',
  //     })

  //     const { token } = await res?.json()

  //     login(token)
  //   } catch (err) {
  //     Swal.fire({
  //       title: 'Error!',
  //       text: err instanceof Error ? err.message : String(err),
  //       icon: 'error',
  //       showConfirmButton: false,
  //       timer: 2000,
  //       didOpen: () => {
  //         const swalContainer = document.querySelector('.swal2-container') as HTMLElement;
  //         if (swalContainer) {
  //           swalContainer.style.setProperty('z-index', '100000', 'important');
  //         }
  //       }
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const SignupOTPVerification = async (e: React.FormEvent, email: string) => {
    e.preventDefault()
    setLoading(true)
    const otpTexts = 'registration'

    try {
      const res = await verifyOTP(e, email, otpTexts)

      if (!res.success) {
        throw res.error
      }

      setIsAccountCreated(false)
      setIsAccountVerified(false)
      setIsVerifyOpen(false)
      setIsNewOpen(false)
      setEmail('')
      setVerifyFormData({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
      })

      const { token } = res.data

      login(token)
      setEmailSend('')
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text:
          typeof err === 'string'
            ? err
            : err && typeof err === 'object' && 'message' in err
            ? (err as { message: string }).message
            : JSON.stringify(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const ForgetOTPVerification = async (e: React.FormEvent, email: string) => {
    e.preventDefault()
    setLoading(true)
    const otpTexts = 'forget'
    try {
      const res = await verifyOTP(e, email, otpTexts)

      if (!res.success) {
        throw res.error
      }
      setIsForgetOpen(false)
      setIsResetOpen(true)
      setVerifyFormData({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
      })
    } catch (err) {
      const errorMessage =
        typeof err === 'string'
          ? err
          : err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : JSON.stringify(err)

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async (
    e: React.FormEvent,
    email: string,
    otpTexts: string,
  ) => {
    e.preventDefault()
    try {
      const otp = parseInt(
        verifyFormData.otp1 +
          verifyFormData.otp2 +
          verifyFormData.otp3 +
          verifyFormData.otp4 +
          verifyFormData.otp5,
        10,
      )

      const res = await fetch('/api/auth/OTPVerification/verifyOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, otpTexts }),
      })

      const data = await res.json()

      if (!res.ok) {
        return { success: false, error: data }
      }

      return { success: true, data }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      }
    }
  }

  // const sendOTP = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (Timer > 0) return;

  //   try {
  //     setLoading(true)
  //     const res = await fetch("/api/auth/OTPVerification/sendOTP", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (!res.ok) {
  //       const data = await res.json();
  //       throw new Error(data.message);
  //     }

  //     // Start Timer (e.g., 30 seconds)
  //     let timeLeft = 60;
  //     setTimer(timeLeft);

  //     const timerInterval = setInterval(() => {
  //       timeLeft -= 1;
  //       setTimer(timeLeft);

  //       if (timeLeft <= 0) {
  //         clearInterval(timerInterval);
  //       }
  //     }, 1000);
  //   } catch (err) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: err instanceof Error ? err.message : String(err),
  //       icon: "error",
  //       showConfirmButton: false,
  //       timer: 2000,
  //       didOpen: () => {
  //         const swalContainer = document.querySelector('.swal2-container') as HTMLElement;
  //         if (swalContainer) {
  //           swalContainer.style.setProperty('z-index', '100000', 'important');
  //         }
  //       }
  //     });
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // };

  const sendOTP = async (e?: React.FormEvent, userEmail?: string) => {
    if (e) e.preventDefault()
    if (Timer > 0) return
    console.log('call')
    const targetEmail = userEmail || email

    try {
      setLoading(true)
      const res = await fetch('/api/auth/OTPVerification/sendOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }

      // Start Timer (e.g., 60 seconds)
      let timeLeft = 60
      setTimer(timeLeft)

      const timerInterval = setInterval(() => {
        timeLeft -= 1
        setTimer(timeLeft)

        if (timeLeft <= 0) {
          clearInterval(timerInterval)
        }
      }, 1000)
      setOTPSent(true)
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
    } finally {
      setLoading(false)
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
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
      return
    } else if (/\s/.test(ResetFormData.password)) {
      Swal.fire({
        title: 'Error!',
        text: 'Password should not contain spaces',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
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

      Swal.fire({
        title: 'Success',
        text: 'Password Reset Successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
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
        customClass: {
          popup: 'swal-high-zindex', // Custom class
        },
      })
    } finally {
      setLoading(false)
    }

    //get response from backend
    //const response=fetch();
    setIsResetOpen(false)
  }
  useEffect(() => {
    setTimeout(() => {
      const firstInput = document.getElementById('otp-1')
      if (firstInput) {
        firstInput.focus()
      }
    }, 100) // Small delay to ensure DOM is rendered
  }, [])

  return (
    <div className="flex flex-col w-full h-[100vh] md:h-full md:flex-row">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}
      {/* Left Form Section */}
      <div className="w-full bg-white flex items-center justify-center md:max-w-[60%] p-6 md:px-5">
        {/* <div className="w-[60%] sm:w-[90%] md:p-6 md:pb-0 mx-5"> */}
        <div className="md:max-w-[500px] w-full">
          <div className="flex items-center 2xl:mb-10 md:mb-5 sm:mb-5 mb-10">
            <Image src={logo} alt="logo" width={300} height={300} priority />
          </div>
          <h1 className="md:text-[36px] text-[22px] font-medium text-black -mb-5">
            Effortless & Efficient
          </h1>
          <p className="font-[550] md:text-[46px] text-[32px] md:mt-0  2xl:mb-15 mt-5 sm:mb-2 mb-5 text-black">
            <span className="text-[#266CAB]">DXF</span> File Creation
          </p>
          <form onSubmit={handleLogin}>
            <div className="2xl:mb-4 md:mb-2 md:mt-5 sm:mb-2 mb-5">
              <label className="block text-black font-[550] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="w-full px-4 py-3 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px] placeholder:text-sm"
                required
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
              />
            </div>
            <div className="2xl:mb-4 md:mb-0 relative">
              <label className="block text-black font-[550] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={loginForm.password}
                  name="password"
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 mt-1 pr-10 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px] placeholder:text-sm"
                  required
                  readOnly
                  onFocus={(e) => e.target.removeAttribute('readonly')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 top-11 transform text-gray-500"
                  style={{ transform: 'translateY(-77%)' }}
                >
                  {showPassword ? (
                    <FaEye size={20} className="text-[#005B97]" />
                  ) : (
                    <LuEyeClosed size={20} className="text-[#005B97]" />
                  )}
                </button>
                <p className="text-right mt-2">
                  <span
                    className="underline text-[#266CAB] md:text-xl text-xs cursor-pointer"
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
              className="w-full xl:text-[16px] text-[14px] bg-[#005B97] text-white py-3 px-4 2xl:mt-18 md:mt-11 2xl:mb-6 md:mb-3 mb-3 mt-10 font-bold rounded-3xl hover:bg-[#005b97f0] transition duration-300"
            >
              Login
            </button>
            <p className="font-[550] md:text-[18px] text-[12px] text-center text-black mb-5">
              Don&apos;t have an account?{' '}
              <span
                className=" underline text-[#266CAB] cursor-pointer"
                onClick={() => {
                  if (isAccountCreated && !isAccountVerified) {
                    setIsVerifyOpen(true)
                  } else if (!isAccountCreated) {
                    setNewAccountFormData({
                      name: '',
                      lastName: '',
                      email: '',
                      password: '',
                      confirm: '',
                      agree: false,
                      role: 'User',
                    })
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
      <div className="md:w-[40%] w-[100%] md:bg-[#266CA8] bg-[#266CA8] flex justify-center">
        <Image
          src={image3}
          alt="image3"
          priority
          className="xxl:object-cover md:h-[100vh]"
        />
      </div>

      {/* create account */}
      <Modal
        isOpen={isNewOpen}
        onClose={onClose}
        buttonContent={
          <Image
            src="/images/user/cross.svg"
            alt="cross"
            width={22}
            height={20}
          />
        }
      >
        <div>
          <div className="text-center">
            <p className="font-[550] md:text-2xl text-xl text-black">
              Create Account
            </p>
            <p className="font-medium md:text-[16px] text-[14px] text-[#00000080]">
              Create your account with Lumashape by providing the following
              information
            </p>
          </div>
          <form action="" onSubmit={handleNewAccountSubmit}>
            {/* name */}
            <div className="mb-4">
              <label className="text-black font-[550]" htmlFor="name">
                First Name
              </label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                required
                value={newAccountFormData.name}
                placeholder="Enter First Name"
                className="border border-[#0000001A] w-full mt-1 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#005B97] text-black placeholder:text-sm"
                onChange={handleSignupChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-black font-[550]" htmlFor="last name">
                Last Name
              </label>
              <br />
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                value={newAccountFormData.lastName}
                placeholder="Enter Last Name"
                className="placeholder:text-sm border text-black border-[#0000001A] w-full mt-1 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#005B97]"
                onChange={handleSignupChange}
              />
            </div>
            {/* email */}
            <div className="mb-4">
              <label className="text-black font-[550]" htmlFor="email">
                Email Address
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                required
                value={newAccountFormData.email}
                placeholder="Enter Email Address"
                className=" placeholder:text-sm border text-black border-[#0000001A] w-full mt-1 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#005B97]"
                onChange={handleSignupChange}
                readOnly
                onFocus={(e) => e.target.removeAttribute('readonly')}
              />
            </div>
            {/* password */}
            <div className="mb-4 relative">
              <label className="text-black font-[550]">Password</label>
              <div className="relative">
                <input
                  type={showPassword1 ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter Password"
                  value={newAccountFormData.password}
                  onChange={handleSignupChange}
                  className="placeholder:text-sm w-full border-[#0000001A] mt-1 p-3 pr-10 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                  required
                  minLength={8}
                  readOnly
                  onFocus={(e) => e.target.removeAttribute('readonly')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword1(!showPassword1)}
                  className="absolute inset-y-0 right-3 top-2 flex items-center text-gray-500"
                >
                  {showPassword1 ? (
                    <FaEye size={20} className="text-[#005B97]" />
                  ) : (
                    <LuEyeClosed size={20} className="text-[#005B97]" />
                  )}
                </button>
              </div>
            </div>
            {/* confirm password */}
            <div className="mb-4 relative">
              <label className="text-black font-[550]">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm"
                  placeholder="Confirm Password"
                  value={newAccountFormData.confirm}
                  onChange={handleSignupChange}
                  className="placeholder:text-sm w-full border-[#0000001A] mt-1 p-3 pr-10 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 top-2 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FaEye size={20} className="text-[#005B97]" />
                  ) : (
                    <LuEyeClosed size={20} className="text-[#005B97]" />
                  )}
                </button>
              </div>
            </div>
            {/* agreement */}
            <div className="flex items-baseline">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={newAccountFormData.agree}
                className="mr-2"
                onChange={handleSignupChange}
              />
              <label
                htmlFor="agree"
                className="flex items-center space-x-1 text-black"
              >
                <span>
                  I have read and agree to the{' '}
                  <Link
                    href="/privacy-policy"
                    className="underline text-[#266CAB]"
                  >
                    Privacy Policy
                  </Link>
                  <span> & </span>
                  <Link
                    href="/Terms&Condition"
                    className="underline text-[#266CAB]"
                  >
                    Terms & Conditions
                  </Link>
                </span>
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
      <Modal
        isOpen={isVerifyOpen}
        onClose={onClose}
        buttonContent={
          <Image
            src="/images/user/cross.svg"
            alt="cross"
            width={20}
            height={20}
          />
        }
      >
        <div>
          <div className="text-center">
            <p className="font-[550] md:text-3xl text-2xl">
              Account Verification
            </p>
            <p className="font-medium md:text-xl text-sm text-[#00000080]">
              Please enter the verification code sent to
              <span className="underline text-black block">
                <span className="font-[550]">{emailSend}</span>
              </span>
            </p>
          </div>
          <form onSubmit={(e) => SignupOTPVerification(e, email || emailSend)}>
            <div className="flex justify-center md:space-x-5 space-x-3 mb-2 mt-10">
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
                      } else if (
                        e.key === 'Enter' ||
                        input.value.length === 1
                      ) {
                        const nextInput = document.getElementById(
                          `otp-${index + 2}`,
                        )
                        if (nextInput) {
                          nextInput.focus()
                        }
                      }
                    }}
                    id={`otp-${index + 1}`}
                    className="w-[50px] h-[50px] text-center px-4 py-2 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
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
            <p className="font-[550] md:text-xl text-base text-center mt-5">
              Didn’t receive the code?{' '}
              {Timer > 0 ? (
                <span className="text-[#266CAB]">Resend in {Timer}s</span>
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
      <Modal
        isOpen={isForgetOpen}
        onClose={onClose}
        buttonContent={
          <Image
            src="/images/user/cross.svg"
            alt="cross"
            width={20}
            height={20}
          />
        }
      >
        <div>
          <div className="text-center mt-2">
            <p className="font-[550] md:text-3xl text-2xl cursor-pointer">
              Forgot Password
            </p>
            <p className="font-medium md:text-[16px] text-[14px] text-[#00000080]">
              Please enter the email address so that we can verify your account
            </p>
          </div>

          <form action="" onSubmit={sendOTP}>
            <div className="mb-4">
              <label className="block text-black font-[550] mb-1 text-lg xl:text-[18px]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px] placeholder:text-sm"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-right mt-2 text-[#266CA8] underline text-sm font-[550] cursor-pointer"
                >
                  {Timer > 0 ? (
                    <span className="text-gray-500">Resend in {Timer}s</span>
                  ) : (
                    <>{`${OTPSent ? 'Resend OTP' : 'Send OTP'}`}</>
                  )}
                </button>
              </div>
            </div>
          </form>

          <form onSubmit={(e) => ForgetOTPVerification(e, email)}>
            {/* <div className="flex justify-center space-x-5 mb-2 mt-10">
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
                    id={`otp-${index + 1}`}
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
                    className="w-[50px] h-[50px] text-center px-4 py-2 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                  />
                </div>
              ))}
            </div> */}

            <div className="flex justify-center space-x-5 mb-2 mt-10">
              {Array.from({ length: 5 }).map((_, index) => {
                const key = `otp${index + 1}` as keyof typeof verifyFormData

                return (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      maxLength={1}
                      id={`otp-${index}`}
                      value={verifyFormData[key] || ''}
                      onChange={(e) => {
                        // const input = e.target;
                        const value = e.target.value.replace(/[^0-9]/g, '')
                        handleOTPChange(e, index)
                        if (value && index < 4) {
                          document.getElementById(`otp-${index + 1}`)?.focus()
                        }
                      }}
                      onKeyDown={(e) => {
                        const input = e.target as HTMLInputElement

                        if (
                          e.key === 'Backspace' &&
                          !input.value &&
                          index > 0
                        ) {
                          document.getElementById(`otp-${index - 1}`)?.focus()
                        }
                      }}
                      className="w-[50px] h-[50px] text-center px-4 py-2 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                      required
                    />
                  </div>
                )
              })}
            </div>

            <button
              type="submit"
              className="w-full bg-[#005B97] xl:text-[16px] text-[14px] text-white p-3 md:mt-10 mt-10 font-bold rounded-[94.17px] hover:bg-[#005b97f0] transition duration-300"
              //   disabled={loading}
            >
              Verify
            </button>
          </form>
        </div>
      </Modal>

      {/* Reset Password */}
      <Modal
        isOpen={isResetOpen}
        onClose={onClose}
        buttonContent={
          <Image
            src="/images/user/cross.svg"
            alt="cross"
            width={20}
            height={20}
          />
        }
      >
        <div>
          <div className="text-center">
            <p className="font-[550] md:text-3xl text-2xl cursor-pointer">
              Reset Password
            </p>
          </div>

          <form onSubmit={handleResetPasswordSubmit}>
            <div className="">
              <div className="mb-5 relative">
                <label className="block text-black font-[550] mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword2 ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter New Password"
                    value={ResetFormData.password}
                    onChange={handleResetPassword}
                    className="w-full p-3 pr-10 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword2 ? (
                      <FaEye size={20} className="text-[#005B97]" />
                    ) : (
                      <LuEyeClosed size={20} className="text-[#005B97]" />
                    )}
                  </button>
                </div>
              </div>
              {/* confirm password */}
              <div className="mb-5 relative">
                <label className="block text-black font-[550] mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword1 ? 'text' : 'password'}
                    name="confirm"
                    placeholder="Confirm New Password"
                    value={ResetFormData.confirm}
                    onChange={handleResetPassword}
                    className="w-full p-3 mt-1 pr-10 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword1(!showConfirmPassword1)
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword1 ? (
                      <FaEye size={20} className="text-[#005B97]" />
                    ) : (
                      <LuEyeClosed size={20} className="text-[#005B97]" />
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
              Continue
            </button>
          </form>
        </div>
      </Modal>

      <Subscribe
        isBilingOpen={isBilingOpen}
        setIsBilingOpen={setIsBilingOpen}
      />
    </div>
  )
}
export default UserLogin
