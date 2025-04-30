'use client'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'

function Signup() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const linkedinUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}linkedin.jpg`
  const youtubeUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}youtube.jpg`

  // const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     console.log(email)
  //     const res = await fetch('/api/user/addEmail', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email }),
  //     })

  //     if (!res.ok) {
  //       const data = await res.json()
  //       throw new Error(data.message)
  //     }
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Success',
  //       text: 'Our Team will reach out to you soon',
  //       timer: 2000,
  //       showConfirmButton: false,
  //     })
  //     setEmail('')
  //   } catch (err) {
  //     Swal.fire({
  //       title: 'Error!',
  //       text: err instanceof Error ? err.message : String(err),
  //       icon: 'error',
  //       showConfirmButton: false,
  //       timer: 2000,
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res1 = await axios.post('/api/user/addEmail', { email })

      const successMessage =
        res1.data.message || 'Our Team will reach out to you soon'

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: successMessage,
        timer: 2000,
        showConfirmButton: false,
      })

      setEmail('')

      const emailData = {
        to: email,
        subject: 'Thanks for Subscribing to Lumashape!',
        body: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <div style="text-align:center">
            <img src="https://aletheia.ai.ml-bench.com/public/images/mailLogo.jpg" alt="Lumashape Logo" width="250" />
          </div>
          <p style="color:#333333; font-size: 18px; font-weight: 600;">Hi there,</p>
          <div style="font-size: 16px;">
            <p style="margin-bottom: 30px;">Thank you for subscribing to Lumashape! You’re now on our exclusive list for the latest updates, special announcements, and early access to new features.</p>
            <p style="margin-top: 30px;">If you have any questions or need assistance, please contact our founder at <a href="mailto:sam.peterson@lumashape.com" style="color: #266CA8;">sam.peterson@lumashape.com</a></p>
          </div>
          <p style="margin-top: 60px;">
            <a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> 
            <span style="color: #000000;">  |  </span>
            <a href="mailto:sam.peterson@lumashape.com" style="color: #000000;">sam.peterson@lumashape.com</a>
          </p>
          <div style="text-align: start; margin-top: 10px;">
        <a href="https://www.linkedin.com/company/lumashape/" style="text-decoration: none;">
          <img src=${linkedinUrl} alt="LinkedIn" width="20" />
        </a>
         <a href="https://www.youtube.com/@Lumashape?app=desktop" style="text-decoration: none; margin-left: 20px;">
          <img src=${youtubeUrl} alt="youtube" width="20" />
        </a>
      </div>
        </div>
      `,
      }

      const res = axios
        .post(
          'https://aletheia.ai.ml-bench.com/api/send-microsoft-email',
          emailData,
        )
        .catch(() => {
          // Error is caught silently and ignored
        })
      console.log('res-> ', res)
    } catch (err) {
      let errorMessage = 'Something went wrong'
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}
      <div className="md:max-w-[1328px] max-w-[90%] mx-auto">
        <h1 className="md:text-[40px] text-[34px] text-center font-bold mt-10 mb-5 leading-[43.3px] md:leading-[50.2px]">
          Get Updated Or Support New Ideas!!
        </h1>
        <p className="md:text-[20px] text-[16px] text-center font-medium text-[#00000066] max-w-[700px] mx-auto">
          Stay in the loop as we get ready to launch Lumashape! Sign up with
          your email below for exclusive updates and early access.
        </p>
        <form onSubmit={handleSignIn}>
          <div className="flex justify-center gap-[8px] mt-10 md:mb-24 mb-10">
            <input
              className="w-full max-w-[477px] md:h-[44px] h-[42px] px-3 border-[1px] outline-none rounded-xl placeholder:text-[13px] md:placeholder:text-[14px] placeholder:font-foghe"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }}
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="bg-[#266CA8] text-white w-[156px] md:w-[130px] md:h-[44px] h-[42px]  font-medium md:text-[14px] text-[13px] rounded-xl"
            >
              Get Connected
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup
