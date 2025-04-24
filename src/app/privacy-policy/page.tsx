import Image from 'next/image'
import React from 'react'
import logo from '/public/images/user/home/user_login.svg'

const PrivacyPolicy = () => {
  return (
    <div className="md:p-12 p-5 md:max-w-screen-lg mx-auto py-16 text-gray-800">
      <div className="flex items-center mb-20">
        <Image src={logo} alt="LUMASHAPE Logo" height={73} width={400} />
      </div>
      <h1 className="font-bold md:text-5xl text-4xl mb-4">Privacy Policy</h1>
      <p className="mb-4 sm:text-[20px] text-[16px] font-medium">
        This Privacy Policy describes how Lumashape collects, uses, and shares
        information when you use our web application. By using the web app, you
        agree to the collection and use of information in accordance with this
        Privacy Policy.
      </p>

      <h2 className="text-[26px] font-semibold mt-10">1. Introduction</h2>
      <ul className="list-none pl-8 mb-4 mt-3">
        <li className="sm:text-[20px] text-[16px] font-medium">
          Welcome to Lumashape! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your information when
          you use our services.
        </li>
      </ul>

      <h2 className="text-[26px] font-semibold mt-10">
        2. Information We Collect
      </h2>
      <ul className="list-none pl-6 mb-4 sm:text-[20px] text-[16px] font-medium mt-3">
        <li>We collect the following data when you use our services:</li>
        <ul className="pl-6">
          <li>
            - Personal Information: Name, email address, and payment details.
          </li>
          <li>
            - Usage Data: Information about how you interact with our software,
            including image uploads and downloads.
          </li>
        </ul>
      </ul>
      <h2 className="text-[26px] font-semibold mt-10">
        3. How We Use Your Information
      </h2>
      <ul className="list-none pl-6 mb-4 sm:text-[20px] text-[16px] font-medium mt-3">
        <li>We use the collected data to:</li>
        <ul className="pl-6">
          <li>- Provide and improve our services</li>
          <li>- Conduct analytics and research.</li>
          <li>
            - Communicate with you regarding updates, promotions, and customer
            support
          </li>
        </ul>
      </ul>

      <h2 className="text-[26px] font-semibold mt-10">4. Data Sharing</h2>
      <ul className="list-none pl-6 mb-4 sm:text-[20px] text-[16px] font-medium mt-3">
        <li>
          We do not share, sell, or rent your personal data to third parties.
        </li>
      </ul>

      <h2 className="text-[26px] font-semibold mt-10">
        5. Data Retention & Deletion
      </h2>
      <ul className="list-none pl-6 mb-4 sm:text-[20px] text-[16px] font-medium mt-3">
        <li>
          You may delete your account and payment information at any time. Upon
          deletion, we will remove your data from our systems, except for
          legally required retention.
        </li>
      </ul>

      <h2 className="text-[26px] font-semibold mt-10">6. Security Measures</h2>
      <ul className="list-none pl-6 mb-4 sm:text-[20px] text-[16px] font-medium mt-3">
        <li>
          We implement industry-standard security measures to protect your data
          from unauthorized access, alteration, or loss.
        </li>
      </ul>

      <h2 className="text-[26px] font-semibold mt-10">7. Your Rights</h2>
      <ul className="list-none pl-6 mb-4 sm:text-[20px] text-[16px] font-medium mt-3">
        <li>As a user, you have the right to:</li>
        <ul className="pl-6">
          <li>- Access and update your data.</li>
          <li>- Request account and data deletion.</li>
        </ul>
      </ul>

      <h2 className="text-[26px] font-semibold mt-10">8. Legal Compliance</h2>
      <ul className="list-none pl-6 mb-4 sm:text-[20px] text-[16px] font-medium mt-3">
        <li>
          Lumashape operates in the USA and complies with applicable USA data
          privacy laws.
        </li>
      </ul>

      <h2 className="text-[26px] font-semibold mt-10">
        9. Contact Information
      </h2>
      <ul className="list-none sm:text-[20px] text-[16px] pl-6 mb-4 font-medium mt-3">
        <li>
          If you have any questions, contact us at:{' '}
          <a
            href="mailto:sam.peterson@lumashape.com"
            className="text-[#266CA8] border-b border-[#266CA8]"
          >
            sam.peterson@lumashape.com
          </a>
        </li>
      </ul>
      <div className="mt-24 flex items-center border-t">
        <Image
          src={logo}
          alt="LUMASHAPE Logo"
          height={73}
          width={300}
          className="mt-8"
        />
      </div>
      <div className="mt-5 font-normal pt-4 sm:text-[16px] text-[12px] text-[#266CA8] flex gap-4">
        <a
          href="/privacy-policy"
          className="border-b border-[#266CA8] md:h-5 h-4"
        >
          Privacy Policy
        </a>
        <a
          href="/Terms&Condition"
          className="border-b border-[#266CA8] md:h-5 h-4"
        >
          Terms and Conditions
        </a>
        <a href="/Contact_Us" className="border-b border-[#266CA8] md:h-5 h-4">
          Contact Us
        </a>
      </div>
    </div>
  )
}

export default PrivacyPolicy
