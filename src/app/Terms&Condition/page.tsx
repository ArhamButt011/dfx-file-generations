import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className='p-12'>
            <div>
                <Image
                    className="z-50"
                    src="/images/user/home/user_login.svg"
                    alt="Logo"
                    width={180}
                    height={180}
                />
            </div>
            <div className='mt-10'>
                <p className='font-bold text-4xl'>Terms and Conditions</p>
                <p className='font-medium text-base text-[#00000080]'>Welcome to Lumashape These terms and conditions outline the rules and regulations for the use of the Lumashape Web Application.</p>
                <p className='font-medium text-base text-[#00000080] mt-5'>By accessing this Web Application, we assume you accept these terms and conditions. Do not continue to use Lumashape if you do not agree to all of the terms and conditions stated on this page.</p>
                <ol className="list-decimal pl-5 mt-5 mx-1 [&>li::marker]:font-bold">
                    <li>
                        <p className="font-bold">Acceptance of Terms</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li className=''>By creating an account with Lumashape, you agree to the terms outlined in this agreement.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-bold">Account Registration & Security</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li>You must provide accurate personal information.</li>
                            <li>You are responsible for maintaining the security of your account.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-bold">Services Provided</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li>Lumashape allows users to upload images of tools, process them, and generate DXF contours for custom tool drawer inserts.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-bold">Payment & Refund Policy</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li>Pay-Per-Download Plan: Non-refundable. Users receive a preview before purchasing.</li>
                            <li>Monthly Subscription Plan: Refunds may be issued within the first 7 days of a new billing cycle if no downloads have been made.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-bold">Account Termination</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li>We may terminate accounts if</li>
                            <ul>
                                <li>- A user violates our terms (e.g., fraudulent activity, abuse of services)</li>
                                <li>- Non-payment of subscription fees.</li>
                                <li>- Engaging in activities that harm the platform or other users.</li>
                            </ul>
                        </ul>
                    </li>
                    <li>
                        <p className="font-bold">Limitation of Liability</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li>Lumashape is not liable for any direct or indirect damages resulting from the use of our services. Users are responsible for verifying DXF file accuracy before manufacturing.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-bold">Changes to Terms</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li>We may update this agreement as needed. Continued use of our services implies acceptance of the updated terms.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-bold">Governing Law</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li>This agreement is governed by the laws of the State of Minnesota, USA, without regard to its conflict of law principles. Federal law may apply in certain cases where relevant.</li>
                        </ul>
                    </li>
                    <li>
                        <p className="font-bold">Contact Information</p>
                        <ul className='list-disc ps-2 text-[#00000080] text-sm'>
                            <li>For questions, contact: <span className='underline text-[#266CA8]'>sam.peterson@lumashape.com</span></li>
                        </ul>
                    </li>
                </ol>
                <hr />
                <div className='pt-5'>
                    <div>
                        <Image
                            className="z-50"
                            src="/images/user/home/user_login.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex mt-5 gap-2 underline text-[#0000004D]">
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
