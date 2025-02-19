import Image from 'next/image'
import React from 'react'

function ContactUS() {
    // const [formData,setFormData]=useState({
    //     first:"",
    //     last:"",
    //     email:"",
    //     message:""
    // })
    return (
        <div className='flex md:flex-row flex-col my-10 max-w-[90%] mx-auto md:gap-10'>
            {/* left */}
            <div className="md:w-1/2">
                <div>
                    <p className='font-bold md:text-[55px] text-[40px]   mx-auto'><span className='text-[#266CAB]'>Contact </span> Us</p>
                    <p className=' text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium '>Our friendly team would love to hear from you.</p>
                </div>
                <form action="" className='mt-10'>
                    {/* name */}
                    <div className="flex gap-5">
                        <div className='w-1/2'>
                            <label className="block text-black font-[550] mb-1">First Name</label>
                            <input
                                type="text"
                                name="first"
                                id="first"
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
                            placeholder='Write your query'
                            className="w-full px-4 py-1 mt-1 border text-black focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-2xl align-text-top"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-xl bg-[#005B97] text-white py-3 px-4 2xl:mt-18 md:mt-11 2xl:mb-6 md:mb-3 mb-3 mt-10 font-bold rounded-3xl hover:bg-[#005b97f0] transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            {/* right */}
            <div className='md:w-1/2 relative aspect-square'>
                <Image
                    src="/images/user/home/contact.svg"
                    alt="free"
                    className="w-full h-full object-cover"
                    fill
                />
            </div>
        </div>
    )
}

export default ContactUS
