import React from 'react'
import Image from 'next/image'
// import backarrow from '/public/images/admin/backarrow.svg'
import image3 from '/public/images/admin/login/frame.jpg'

const RightSection = () => {
  return (
    <div className="md:w-[40%] w-[100%] h-[100vh] bg-[#266CA8]">
      <Image src={image3} alt="image3" priority className="h-[100vh]" />
    </div>
  )
}

export default RightSection
