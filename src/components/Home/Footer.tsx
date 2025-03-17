'use client'
import Image from 'next/image'
import React from 'react'
import { useTabContext } from '@/context/TabContsxt'
import Text from '../UI/Text'
import Link from 'next/link'
function ContactUsFooter() {
  const { setActiveTab } = useTabContext()
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div>
      <div className="mt-20 bg-[#F7F7F7] py-5">
        <div className="flex md:flex-row flex-col xl:max-w-[1200px] max-w-[90%] mx-auto md:justify-center lg:gap-60 md:gap-20 xl:gap-70 2xl:gap-100 justify-between">
          {/* left */}
          <div>
            <Image
              className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
              src="/images/user/home/user_login.svg"
              alt=" Logo"
              width={100}
              height={100}
            />
            <Text
              as="p1"
              className="font-medium text-[#22222280] max-w-[490px] md:mt-10 mt-8"
            >
              Effortlessly create precise DXF files for manufacturing custom
              tool drawer inserts with AI-powered automation. Simplify your
              workflow and take tool organization to the next level. Start your
              free trial today!
            </Text>
            <div className="flex gap-6 max-w-[190px] items-center mt-8 md:mt-10">
              <div>
                <a href="https://www.linkedin.com/company/lumashape">
                  <Image
                    className="w-5"
                    src="/images/user/home/social media/linkedin.svg"
                    alt="Flowbite Logo"
                    width={30}
                    height={20}
                  />
                </a>
              </div>
              <div className="self-end">
                <a href="https://m.youtube.com/@Lumashape">
                  <Image
                    className="w-5"
                    src="/images/user/home/social media/youtube.svg"
                    alt="Flowbite Logo"
                    width={30}
                    height={20}
                  />
                </a>
              </div>
              {/* <Image
                                className=" z-50"
                                src="/images/user/home/social media/instagram.svg"
                                alt="Flowbite Logo"
                                width={30}
                                height={20}
                            />
                            <Image
                                className=" z-50"
                                src="/images/user/home/social media/facebook.svg"
                                alt="Flowbite Logo"
                                width={30}
                                height={20}
                            />
                            <Image
                                className=" z-50"
                                src="/images/user/home/social media/youtube.svg"
                                alt="Flowbite Logo"
                                width={40}
                                height={20}
                            /> */}
            </div>
          </div>
          {/* right */}
          <div className="md:mt-0 mt-10">
            <p className="font-semibold md:text-3xl text-xl mb-4">
              Quick Links
            </p>
            <div className="text-[#22222280] font-medium md:text-lg text-sm space-y-4 flex flex-col pl-1">
              <Link href="/">Home</Link>
              <Link href="/">Benefits</Link>
              <Link href="/">Samples</Link>
              <Link href="/">Working</Link>
              <Link href="/">Pricing</Link>
              <Link href="/">FAQ&apos;s</Link>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange('/contact')
                  document.getElementById('contact')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex justify-center items-center h-full w-full text-center md:ps-14">
          <Text className="text-center font-normal text-[#22222280]">
            Lumashape LLC | © 2025 | All Rights Reserved
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ContactUsFooter
