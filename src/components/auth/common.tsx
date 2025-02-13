import React from 'react'
import Image from 'next/image'
// import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/admin/login/rightImage.svg'

const RightSection = () => {
  return (
    <div className="md:w-[40%] w-[100%] md:bg-[#266CA8] bg-[#266CA8] flex justify-center">
      <Image
        src={image3}
        alt="image3"
        priority
        className="xxl:object-cover md:h-[100vh]"
      />
    </div>
  )
}

export default RightSection
