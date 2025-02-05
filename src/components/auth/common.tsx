import React from 'react'
import Image from 'next/image'
import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/admin/login/image3.svg'

const RightSection = () => {
  return (
    <div className="md:w-[45%] bg-[#266CA8] flex w-[100%] px-6">
      <div className="text-white text-right w-full">
        <div className="mt-10 md:mt-20">
          <h1 className="font-semibold md:text-[40px] text-[27.32px]">
            Effective Way To Create DXF Files
          </h1>
        </div>
        <div>
          <Image
            src={backarrow}
            alt="backarrow"
            width={200}
            height={200}
            priority
            className="ml-auto mt-5"
          />
        </div>
        <div className="w-full overflow-hidden mt-10 md:mt-16">
          {/* Ensures the image fits perfectly within the container */}
          <Image
            src={image3}
            alt="image3"
            priority
            className="object-contain h-auto w-full mb-8 md:mb-10"
          />
        </div>
      </div>
    </div>
  )
}

export default RightSection
