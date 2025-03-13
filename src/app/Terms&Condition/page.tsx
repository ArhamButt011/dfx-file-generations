import Image from 'next/image'
import React from 'react'
import logo from '/public/images/user/home/user_login.svg'

function page() {
  return (
    <div className="md:p-12 p-5 md:max-w-screen-lg mx-auto py-16 text-gray-800">
      <div>
        <div className="flex items-center mb-20">
          <Image src={logo} alt="LUMASHAPE Logo" height={73} width={400} />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-[32px] sm:text-[40px] font-bold mb-4">
          Terms and Conditions
        </h1>
        <p className="mb-4 sm:text-[20px] text-[16px] font-medium">
          Welcome to Lumashape These terms and conditions outline the rules and
          regulations for the use of the Lumashape Web Application.
        </p>
        <p className="sm:text-[20px] text-[16px] font-medium mt-5">
          By accessing this Web Application, we assume you accept these terms
          and conditions. Do not continue to use Lumashape if you do not agree
          to all of the terms and conditions stated on this page.
        </p>
        <ol className="list-decimal md:pl-5 mt-5 md:mx-10 mx-5 [&>li::marker]:font-bold md:[&>li::marker]:text-[26px]">
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Acceptance of Terms
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                By creating an account with Lumashape, you agree to the terms
                outlined in this agreement.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Account Registration & Security
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                You must provide accurate personal information.
              </li>
              <li className="sm:text-[20px] text-[16px] font-medium">
                You are responsible for maintaining the security of your
                account.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Services Provided
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                Lumashape allows users to upload images of tools, process them,
                and generate DXF contours for custom tool drawer inserts.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Payment & Refund Policy
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                Monthly Subscription Plan: Refunds may be issued within the
                first 7 days of a new billing cycle if no downloads have been
                made.
              </li>
              {/* <li className="sm:text-[20px] text-[16px] font-medium">
                Monthly Subscription Plan: Refunds may be issued within the
                first 7 days of a new billing cycle if no downloads have been
                made.
              </li> */}
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Account Termination
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                We may terminate accounts if
              </li>
              <ul>
                <li className="sm:text-[20px] text-[16px] font-medium">
                  - A user violates our terms (e.g., fraudulent activity, abuse
                  of services)
                </li>
                <li className="sm:text-[20px] text-[16px] font-medium">
                  - Non-payment of subscription fees.
                </li>
                <li className="sm:text-[20px] text-[16px] font-medium">
                  - Engaging in activities that harm the platform or other
                  users.
                </li>
              </ul>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Limitation of Liability
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                Lumashape is not liable for any direct or indirect damages
                resulting from the use of our services. Users are responsible
                for verifying DXF file accuracy before manufacturing.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Changes to Terms
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                We may update this agreement as needed. Continued use of our
                services implies acceptance of the updated terms.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">Governing Law</h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                This agreement is governed by the laws of the State of
                Minnesota, USA, without regard to its conflict of law
                principles. Federal law may apply in certain cases where
                relevant.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Contact Information
            </h2>
            <ul className="list-none sm:text-[20px] text-[16px] mb-4 font-medium mt-3 mb-24">
              <li className="sm:text-[20px] text-[16px] font-medium">
                For questions, contact:{' '}
                <span className="underline text-[#266CA8]">
                  sam.peterson@lumashape.com
                </span>
              </li>
            </ul>
          </li>
        </ol>
        <hr />
        <div className="pt-5 mx-5">
          <div>
            <Image
              className="z-50"
              src="/images/user/home/user_login.svg"
              alt="Logo"
              width={227}
              height={100}
            />
          </div>
          <div className="mt-5 font-normal pt-4 sm:text-[16px] text-[14px] text-[#266CA8] flex gap-4">
            <a href="/privacy-policy" className="border-b border-[#266CA8] h-5">
              Privacy Policy
            </a>
            <a
              href="/Terms&Condition"
              className="border-b border-[#266CA8] h-5"
            >
              Terms and Conditions
            </a>
            <a href="/Contact_Us" className="border-b border-[#266CA8] h-5">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
