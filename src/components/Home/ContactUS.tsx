import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'

function ContactUS() {
    const [formData, setFormData] = useState({
        first: "",
        last: "",
        email: "",
        message: ""
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                first: "",
                last: "",
                email: "",
                message: ""
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
            <div className='flex md:flex-row flex-col my-10 max-w-[90%] mx-auto md:gap-10'>
                {/* left */}
                <div className="md:w-1/2">
                    <div>
                        <p className='font-bold md:text-[55px] text-[40px]   mx-auto'><span className='text-[#266CAB]'>Contact </span> Us</p>
                        <p className=' text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium '>Our friendly team would love to hear from you.</p>
                    </div>
                    <form action="" className='mt-10' onSubmit={handleSubmit}>
                        {/* name */}
                        <div className="flex gap-5">
                            <div className='w-1/2'>
                                <label className="block text-black font-[550] mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="first"
                                    id="first"
                                    value={formData.first}
                                    onChange={handleChange}
                                    placeholder='Enter First Name'
                                    className="w-full px-4 py-3 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                                    required
                                />
                            </div>
                            <div className='w-1/2'>
                                <label className="block text-black font-[550] mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="last"
                                    id="last"
                                    value={formData.last}
                                    onChange={handleChange}
                                    placeholder='Enter Last Name'
                                    className="w-full px-4 py-3 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                                    required
                                />
                            </div>
                        </div>
                        {/* email */}
                        <div className='mt-5'>
                            <label className="block text-black font-[550] mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter Email Address'
                                className="w-full px-4 py-3 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-[94.17px]"
                                required
                            />
                        </div>
                        {/* message */}
                        <div className='mt-5'>
                            <label className="block text-black font-[550] mb-1">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows={7}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder='Write your query'
                                className="w-full px-4 py-1 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-2xl align-text-top"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-xl bg-[#005B97] text-white py-3 px-4 2xl:mt-18 md:mt-11  mt-10 font-medium rounded-3xl hover:bg-[#005b97f0] transition duration-300 items-end"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                {/* right */}
                <div className='md:w-1/2 relative md:aspect-4/3 aspect-[7/9] md:mt-0 mt-5'>
                    <Image
                        src="/images/user/home/contact.svg"
                        alt="free"
                        className="w-full h-full object-cover"
                        fill
                    />
                </div>
            </div>
        </>
    )
}

export default ContactUS
