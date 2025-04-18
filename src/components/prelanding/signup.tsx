'use client'
import React, { FormEvent, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'

function Signup() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log(email)
      const res = await fetch('/api/user/addEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Our Team will reach out to you soon',
        timer: 2000,
        showConfirmButton: false,
      })
      setEmail('')
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
