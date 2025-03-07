import Image from 'next/image'
import React from 'react'


function hero() {
    return (
        <div>
            <div className=" border-b-2 border-[#0000001A] ">
                <div className='max-w-[1400px] flex justify-start py-4  mx-auto'>
                    <Image
                        className="w-[259.2px] h-[56px]  z-50 pl-5"
                        src="/images/user/home/user_login.svg"
                        alt=" Logo"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div className="flex justify-center px-5 ">
                <div className="w-full max-w-[1328px] relative md:my-20 my-10 min-h-[500px] overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-20 items-start justify-center  z-10 ">
                        <div className="flex-col relative z-10 h-full">
                            <h1 className="md:text-6xl text-4xl font-bold  md:max-w-[559px] w-full md:leading-[67.2px] ">
                                AI-Powered Tool Organization Made Simple
                            </h1>
                            <p className='font-medium md:text-xl text-lg text-[#00000066]  max-w-[559px] my-5'>Automatically generate precise DXF files from photos of your tool layouts with AI-driven image processing. Create custom foam drawer inserts and keep your workspace organized — no manual tracing or CAD work required.</p>
                            <p className='font-semibold md:text-3xl text-2xl'>How It Works:</p>

                            <div className="flex items-start mt-3 gap-2">
                                <Image src="/images/user/prelanding/plus.svg" alt="star" width={40} height={20} />
                                <p className="md:text-2xl text-xl font-semibold   ">
                                    Upload Your Image
                                    <p className="font-medium md:text-xl text-lg text-[#00000066] max-w-[559px] ">
                                        Upload an image of your desired tool layout to get started
                                    </p>
                                </p>
                            </div>

                            <div className="flex items-start my-3 gap-2 ">
                                <Image src="/images/user/prelanding/bolt.svg" alt="star" width={40} height={20} />
                                <p className="text-2xl font-semibold">
                                    Preview DXF File
                                    <p className="font-medium text-xl text-[#00000066]  max-w-[559px]">
                                        Our AI extracts and scales contours to generate a high-precision DXF file, with customization options for finger clearance holes, text labels, boundary contours, and adjustable contour offset parameter
                                    </p>
                                </p>

                            </div>


                            <div className="flex items-start gap-2">
                                <Image src="/images/user/prelanding/download.svg" alt="star" width={40} height={20} />
                                <p className="md:text-2xl text-xl font-semibold">
                                    Download & Save
                                    <p className="font-medium md:text-xl text-lg text-[#00000066]  max-w-[539px]">
                                        Click “Download” to instantly save your ready-to-manufacture DXF file to your device
                                    </p>
                                </p>
                            </div>

                        </div>
                        <div className=" flex justify-center md:w-1/3">
                            <Image
                                src="/images/user/prelanding/video.svg"
                                alt="video"
                                priority
                                width={100}
                                height={100}
                                className="object-contain w-full "
                            />
                        </div>


                    </div>
                    <div className='mt-10 max-w-[1028px] mx-auto'>
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

                        
                    </div>
                     
                </div>

            </div>

        </div>
    )
}

export default hero
