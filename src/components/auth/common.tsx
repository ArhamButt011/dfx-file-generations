import React from 'react'
import Image from 'next/image'
import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/admin/login/image3.svg'

const RightSection = () => {
  return (
    <div className="w-[45%] bg-[#266CA8] flex mob:w-[100%]">
      <div className="text-white text-right w-full">
        <div className="mt-10 mob:mt-8 px-8 mob:px-4">
          <h1 className="font-semibold text-[40px] mob:text-[27.32px]">
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
            className="ml-auto mt-5 pr-8 mob:pr-4"
          />
        </div>
        <div className="relative w-full max-w-[89%] mx-auto mt-5 mob:mb-8">
          <Image
            src={image3}
            alt="image3"
            layout="responsive"
            className="w-full h-[400px] object-fill"
          />
        </div>
      </div>
    </div>
  )
}

export default RightSection
