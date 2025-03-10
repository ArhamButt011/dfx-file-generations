import Image from 'next/image'
import React from 'react'

function hero() {
  return (
    <div>
      <div className="border-b-2 border-[#0000001A]">
        <div className="max-w-[1400px] flex justify-start py-4 mx-auto">
          <Image
            className="w-[259.2px] h-[56px]  z-50 pl-5"
            src="/images/lumashape.svg"
            alt=" Logo"
            width={208}
            height={38}
          />
        </div>
      </div>
      <div className="flex justify-center px-5 xl:max-w-[1200px] max-w-[90%] mx-auto">
        <div className="w-full relative md:my-20 my-10 min-h-[500px] overflow-hidden">
          <div className="flex flex-col gap-20 items-start justify-center  z-10 ">
            <div className="flex lg:flex-row flex-col relative z-10 h-full md:gap-20 gap-5">
              <div className="lg:w-1/2">
                <h1 className="md:text-[60.23px] text-[40.23px] font-bold lg:max-w-[559px] w-full leading-[43.3px] md:leading-[67.2px] ">
                  AI-Powered Tool Organization Made Simple
                </h1>
                <p className="font-medium text-[18px] md:text-[23px] text-[#00000066]  max-w-[559px] my-5">
                  Automatically generate precise DXF files from photos of your
                  tool layouts with AI-driven image processing. Create custom
                  foam drawer inserts and keep your workspace organized — no
                  manual tracing or CAD work required.
                </p>
              </div>
              <div className="lg:w-1/2">
                <video
                  className="w-full object-cover rounded-lg md:h-full"
                  loop
                  autoPlay
                  controls
                >
                  <source
                    src="/video/Lumashape_Video_Animation_1st_Cut.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
          {/* <div className='mt-10 max-w-[1028px] mx-auto'>
                        <div>
                            <video
                                className="w-full object-cover rounded-lg" // Optional rounded corners

                                loop
                                muted
                                controls
                            >
                                <source
                                    src="/video/Lumashape_Video_Animation_1st_Cut.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>


                    </div> */}
          <div className="flex flex-col justify-center mt-10">
            {/* <Image
                                src="/images/user/prelanding/video.svg"
                                alt="video"
                                priority
                                width={100}
                                height={100}
                                className="object-contain w-full "
                            /> */}

            <p className="font-semibold md:text-5xl text-4xl md:text-center text-start w-full mb-5">
              How It <span className="text-[#266CA8]">Works</span>?
            </p>

            <div className="flex items-start mt-3 gap-2 mb-5">
              <Image
                src="/images/user/prelanding/plus.svg"
                alt="star"
                width={40}
                height={20}
              />
              <p className="md:text-[28px] text-[22.73px] font-semibold flex flex-col gap-2">
                Upload Your Image
                <p className="font-medium md:[25px] text-[18.09px] text-[#00000066]">
                  Upload an image of your desired tool layout to get started
                </p>
              </p>
            </div>

            <div className="flex items-start my-3 gap-2 mb-5">
              <Image
                src="/images/user/prelanding/bolt.svg"
                alt="star"
                width={40}
                height={20}
              />
              <p className="md:text-[28px] text-[22.73px] font-semibold flex flex-col gap-2">
                Preview DXF File
                <p className="font-medium md:[25px] text-[18.09px] text-[#00000066]">
                  Our AI extracts and scales contours to generate a
                  high-precision DXF file, with customization options for finger
                  clearance holes, text labels, boundary contours, and
                  adjustable contour offset parameter
                </p>
              </p>
            </div>

            <div className="flex items-start gap-2 mb-5">
              <Image
                src="/images/user/prelanding/download.svg"
                alt="star"
                width={40}
                height={20}
              />
              <p className="md:text-[28px] text-[22.73px] font-semibold flex flex-col gap-2">
                Download & Save
                <p className="font-medium md:[25px] text-[18.09px] text-[#00000066]">
                  Click “Download” to instantly save your ready-to-manufacture
                  DXF file to your device
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default hero
