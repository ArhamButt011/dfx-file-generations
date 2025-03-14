'use client'
// import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import Text from '../UI/Text'

function ContactUS() {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/user/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }

      setFormData({
        first: '',
        last: '',
        email: '',
        message: '',
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

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}
      <div
        className="flex md:flex-row flex-col items-center justify-center my-10 max-w-[700px] mx-auto md:gap-10 md:mt-44 mt-24 md:px-2 px-5"
        id="contact"
      >
        {/* left */}
        <div className="w-full">
          <div>
            <Text as="h1">
              <span className="text-[#266CAB]">Contact </span> Us
            </Text>
            <Text as="p1" className="text-[#00000066]">
              Our friendly team would love to hear from you.
            </Text>
          </div>
          <form action="" className="mt-10" onSubmit={handleSubmit}>
            {/* name */}
            <div className="flex gap-5 md:flex-row flex-col">
              <div className="w-full">
                <label className="block text-black font-semibold md:mb-1 mb-0 text-[15px] xl:text-[17px]">
                  First Name
                </label>
                <input
                  type="text"
                  name="first"
                  id="first"
                  value={formData.first}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="placeholder:text-sm w-full px-4 py-3 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-black font-semibold md:mb-1 mb-0 text-[15px] xl:text-[17px]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last"
                  id="last"
                  value={formData.last}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="placeholder:text-sm w-full px-4 py-3 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                  required
                />
              </div>
            </div>
            {/* email */}
            <div className="mt-5">
              <label className="block text-black font-semibold md:mb-1 mb-0 text-[15px] xl:text-[17px]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="placeholder:text-sm w-full px-4 py-3 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                required
              />
            </div>
            {/* message */}
            <div className="mt-5">
              <label className="block text-black font-semibold md:mb-1 mb-0 text-[15px] xl:text-[17px]">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={7}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your query"
                className="placeholder:text-sm w-full px-4 py-1 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-2xl align-text-top"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-xl bg-[#005B97] text-white py-3 px-4 2xl:mt-18 md:mt-11 mt-10 font-medium rounded-3xl hover:bg-[#005b97f0] transition duration-300 items-end md:text-[17px] text-[14px]"
            >
              Send Message
            </button>
          </form>
        </div>
        {/* right */}
      </div>
    </>
  )
}

export default ContactUS
