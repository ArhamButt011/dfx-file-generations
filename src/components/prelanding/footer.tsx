import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function footer() {
  return (
    <div className="border-t-2 border-[#0000001A] py-2">
      <div className="items-center hidden md:flex justify-between w-full py-4">
        <div className="w-full max-w-[1300px] mx-auto px-5">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-between">
              <Image
                className="w-[259.2px] h-[56px] mob:w-[175.89px] mob:h-[38px] z-50"
                src="/images/user/home/user_login.svg"
                alt="Logo"
                width={100}
                height={100}
              />
              <div className="flex justify-between max-w-[70px] items-end mt-5 ">
                <Link href="https://www.linkedin.com/company/lumashape">
                  <Image
                    className="w-5"
                    src="/images/user/home/social media/linkedin.svg"
                    alt="Flowbite Logo"
                    width={30}
                    height={20}
                  />
                </Link>
                <Link href="https://m.youtube.com/@Lumashape">
                  <Image
                    className="w-5"
                    src="/images/user/home/social media/youtube.svg"
                    alt="Flowbite Logo"
                    width={30}
                    height={20}
                  />
                </Link>
              </div>

              <div className="text-center mt-4">
                <p className="font-normal text-base text-[#22222280]">
                  Lumashape LLC | © 2025 | All Rights Reserved
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/user/prelanding/letter.svg"
                alt="Email"
                width={40}
                height={20}
              />
              <a
                href="mailto:sam.peterson@lumashape.com"
                className="text-[22px] text-[#266CA8] underline"
              >
                sam.peterson@lumashape.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden justify-between flex flex-col items-center mt-6 mb-2">
        <div className="flex flex-col justify-between mb-6">
          <Image
            // className="w-[175.89px] h-[38px] z-50"
            src="/images/lumashape.svg"
            alt=" Logo"
            width={208}
            height={38}
          />
        </div>
        <div className="flex items-center mb-4 gap-1">
          <Image
            src="/images/user/prelanding/letter.svg"
            alt="email"
            width={30}
            height={20}
          />
          <a
            href="mailto:sam.peterson@lumashape.com"
            className="text-[16px] text-[#266CA8] underline"
          >
            sam.peterson@lumashape.com
          </a>
        </div>

        <div className="flex justify-between max-w-[70px] items-end gap-3 mb-6">
          <Link href="https://www.linkedin.com/company/lumashape">
            <Image
              className="w-5"
              src="/images/user/home/social media/linkedin.svg"
              alt="Flowbite Logo"
              width={30}
              height={20}
            />
          </Link>
          <Link href="https://m.youtube.com/@Lumashape">
            <Image
              className="w-5"
              src="/images/user/home/social media/youtube.svg"
              alt="Flowbite Logo"
              width={30}
              height={20}
            />
          </Link>
        </div>
        <div className="">
          <p className="font-normal text-base text-[12px] text-[#22222280]">
            Lumashape LLC | © 2025 | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}

export default footer
