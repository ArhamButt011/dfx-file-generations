import Image from 'next/image'
import React from 'react'

function Sample() {
    return (
        <div className='max-w-[90%] mx-auto md:py- py-20 ' id='sample'>
            <p className='font-bold md:text-[55px] text-[40px] text-center md:max-w-[80%] mx-auto'><span className='text-[#266CAB]'>Sample </span>Images</p>
            <p className='text-center text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium max-w-[90%]'>See how our software transforms the input image into precise, production-ready DXF files for your custom tool drawer inserts.</p>
            {/* upper images */}
            <div className="flex md:flex-row flex-col justify-center mt-5 md:gap-50 gap-20">
                {/* Left Image */}
                <div className="relative md:w-1/3 aspect-[10/9]">
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/user/home/sample/input.svg"
                            alt="Input Image"
                            fill
                        />
                    </div>
                    <p className="text-start mt-5 ms-5 font-semibold text-4xl">Input Image</p>
                    <p className='font-medium text-xl invisible'>Isolates tool contours, providing the precise geometry needed to generate accurate DXF contours.</p>

                </div>


                {/* Right Image */}
                <div className="relative md:w-1/3 aspect-[10/9]">
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/user/home/sample/mask.svg"
                            alt="Mask Image"
                            fill
                        />
                    </div>
                    <p className="text-start mt-5 ms-5 font-semibold text-4xl">Mask</p>
                    <p className='font-medium text-xl text-[#00000080] ms-5'>Isolates tool contours, providing the precise geometry needed to generate accurate DXF contours.</p>
                </div>
            </div>
            {/* lower images */}
            <div className="flex md:flex-row flex-col justify-center md:mt-10 mt-50 gap-50">
                {/* Left Image */}
                <div className="relative md:w-1/3 aspect-[10/9]">
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/user/home/sample/overlay.svg"
                            alt="Input Image"
                            fill
                        />
                    </div>
                    <p className="text-start mt-5 ms-5 font-semibold text-4xl">Overlay</p>
                    <p className='font-medium text-xl text-[#00000080] ms-5'>DXF contours (in red) overlayed onto the input image with the optional offset parameter applied, allowing users to confirm accurate tool edge detection.</p>

                </div>


                {/* Right Image */}
                
                <div className="relative md:w-1/3 aspect-[10/9] my-10 md:mt-0">
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/user/home/sample/preview.svg"
                            alt="Input Image"
                            fill
                        />
                    </div>
                    <p className="text-start mt-5 ms-5 font-semibold text-4xl">DFX Preview</p>
                    <p className='font-medium text-xl text-[#00000080] ms-5'>DXF contours (in red) overlayed onto the input image with the optional offset parameter applied, allowing users to confirm accurate tool edge detection.</p>
                    

                </div>
            </div>
        </div>
    )
}

export default Sample
