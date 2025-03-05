import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className='md:p-12 p-5 md:max-w-screen-2xl  mx-auto'>
            <div>
                <Image
                    className="z-50 md:w-100 w-75"
                    src="/images/user/home/user_login.svg"
                    alt="Logo"
                    width={400}
                    height={75}
                />
            </div>
            <div className='mt-10'>
                <p className='font-bold md:text-5xl text-4xl'>Terms and Conditions</p>
                <p className='font-medium md:text-2xl text-xl text-[#00000080]'>Welcome to Lumashape These terms and conditions outline the rules and regulations for the use of the Lumashape Web Application.</p>
                <p className='font-medium md:text-2xl text-xl text-[#00000080] mt-5'>By accessing this Web Application, we assume you accept these terms and conditions. Do not continue to use Lumashape if you do not agree to all of the terms and conditions stated on this page.</p>
                <ol className="list-decimal md:pl-5 mt-5 md:mx-10 mx-5 [&>li::marker]:font-bold md:[&>li::marker]:text-4xl [&>li::marker]:text-3xl">
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Acceptance of Terms</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li className=''>By creating an account with Lumashape, you agree to the terms outlined in this agreement.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Account Registration & Security</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li>You must provide accurate personal information.</li>
                            <li>You are responsible for maintaining the security of your account.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Services Provided</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li>Lumashape allows users to upload images of tools, process them, and generate DXF contours for custom tool drawer inserts.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Payment & Refund Policy</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li>Pay-Per-Download Plan: Non-refundable. Users receive a preview before purchasing.</li>
                            <li>Monthly Subscription Plan: Refunds may be issued within the first 7 days of a new billing cycle if no downloads have been made.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Account Termination</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li>We may terminate accounts if</li>
                            <ul>
                                <li>- A user violates our terms (e.g., fraudulent activity, abuse of services)</li>
                                <li>- Non-payment of subscription fees.</li>
                                <li>- Engaging in activities that harm the platform or other users.</li>
                            </ul>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Limitation of Liability</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li>Lumashape is not liable for any direct or indirect damages resulting from the use of our services. Users are responsible for verifying DXF file accuracy before manufacturing.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Changes to Terms</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li>We may update this agreement as needed. Continued use of our services implies acceptance of the updated terms.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Governing Law</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li>This agreement is governed by the laws of the State of Minnesota, USA, without regard to its conflict of law principles. Federal law may apply in certain cases where relevant.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-semibold md:text-4xl text-3xl">Contact Information</p>
                        <ul className='list-disc ps-2 text-[#00000080] md:text-2xl text-xl font-medium'>
                            <li>For questions, contact: <span className='underline text-[#266CA8]'>sam.peterson@lumashape.com</span></li>
                        </ul>
                    </li>
                </ol>
                <hr />
                <div className='pt-5 mx-5'>
                    <div>
                        <Image
                            className="z-50"
                            src="/images/user/home/user_login.svg"
                            alt="Logo"
                            width={227}
                            height={100}
                        />
                    </div>
                    <div className="flex mt-5 gap-2 underline text-[#0000004D] text-xl">
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <Link href="/Terms&Condition">Terms and Conditions</Link>
                        <Link href="/Contact_Us">Contact Us</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page
