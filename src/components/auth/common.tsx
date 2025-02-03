import React from 'react'
import Image from 'next/image'
import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/admin/login/image3.svg'

const RightSection = () => {
  return (
    <div className="w-[45%] bg-[#266CA8] flex">
      <div className="text-white text-right w-full px-7">
        <div className="mt-20">
          <h1 className="font-semibold text-[40px]">
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
        <div className="aspect-[3/4] w-full max-h-[450px] overflow-hidden mt-24">
          {/* Ensures the image fits perfectly within the container */}
          <Image
            src={image3}
            alt="image3"
            priority
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default RightSection
