import React from 'react'
import Image from 'next/image'
import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/admin/login/image3.svg'

const RightSection = () => {
  return (
    <div className="md:w-[45%] bg-[#266CA8] flex w-[100%]">
      <div className="text-white text-right w-full">
        <div className="mt-20 md:mt-8 px-8 px-4">
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
            className="ml-auto mt-5 md:pr-8 pr-4"
          />
        </div>
        <div className="w-full max-h-[43rem] overflow-hidden mt-10 lg:max-h-[32rem] xl:aspect-auto xl:max-h-[32rem] 2xl:max-h-[35rem]">
          {/* Ensures the image fits perfectly within the container */}
          <Image
            src={image3}
            alt="image3"
            priority
            className="object-contain px-4 h-auto w-full mb-5 md:mb-0"
          />
        </div>
      </div>
    </div>
  )
}

export default RightSection
