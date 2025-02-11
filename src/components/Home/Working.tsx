import Image from 'next/image';
import React from 'react'

type DataItem = {
    id: number;
    title?: string;
    description?: string;
    image?: string;
};

const data: { left: DataItem[]; right: DataItem[] } = {
    left: [
        {
            id: 1,
            image: "/images/user/home/upload.svg"
        },
        {
            id: 3,
            title: "Preview Your DXF File",
            description: "Once uploaded, our AI processes your design and generates a high-quality DXF preview."
        },
        {
            id: 5,
            image: "/images/user/home/save.svg"
        },
    ],
    right: [
        {
            id: 2,
            title: "Upload Your Image",
            description: "Start by uploading your design file in a supported format. Simply drag and drop the file into the upload area or use the “Upload File” Button"
        },
        {
            id: 4,
            image: "/images/user/home/preview.svg"
        },
        {
            id: 6, // Changed to 6 to avoid duplicate IDs
            title: "Download and Save",
            description: "Click “Download” to save your DXF file to your device. Your file is instantly accessible and ready to be used for CNC machining, laser cutting, or other applications."
        },
    ],
};

const desiredOrder = [1, 2, 4, 3, 5, 6];

const combinedArray = [...data.left, ...data.right].sort(
  (a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id)
);

function Working() {
    return (
        <div className='max-w-[90%] mx-auto my-20 md:py-0 py-20 ' id='working'>
            <p className='font-bold md:text-[55px] text-[40px] text-center max-w-[80%] mx-auto'><span className='text-[#266CAB]'>How </span>It Works</p>
            <p className='text-center text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium max-w-[90%]'>Our DXF Generator simplifies the file creation process, offering an intuitive and user-friendly experience powered by advanced AI</p>
            <div className="md:flex gap-[10px] justify-center mx-auto mt-10 hidden">
                {/* left */}
                <div>
                    {data.left.map((item, index) => (
                        <div
                            key={item.id}
                            className={`relative w-full ${index > 0 ? 'mt-56' : ''} `}

                        >
                            {item.image ? (
                                <div className="flex justify-end">
                                    <Image
                                        className="w-10/12"
                                        src={item.image}
                                        alt={index + ""}
                                        width={300}
                                        height={100}
                                    />
                                </div>
                            ) : (
                                <div className='flex flex-col justify-end '>
                                    <p className='font-semibold text-4xl'>{item.title}</p>
                                    <p className='font-medium text-2xl text-[#00000066] max-w-[500px]'>{item.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* center */}
                <div className="relative z-0 flex flex-col justify-center items-center">
                    <Image
                        className="z-10 h-full w-2/3 -mb-10"
                        src="/images/user/home/one.svg"
                        alt="one"
                        width={35}
                        height={100}
                    />
                    <Image
                        className="z-0 h-fit opacity-60"
                        src="/images/user/home/line.svg"
                        alt="centerline"
                        width={5}
                        height={100}
                    />
                    <Image
                        className="z-10 h-full w-2/3 -my-10"
                        src="/images/user/home/two.svg"
                        alt="two"
                        width={35}
                        height={100}
                    />
                    <Image
                        className="z-0 h-full opacity-60"
                        src="/images/user/home/line.svg"
                        alt="centerline"
                        width={5}
                        height={100}
                    />
                    <Image
                        className="z-10 h-full w-2/3 -mt-10"
                        src="/images/user/home/three.svg"
                        alt="three"
                        width={35}
                        height={100}
                    />
                </div>

                {/* right */}
                <div>
                    {data.right.map((item, index) => (
                        <div
                            key={item.id}
                            className={`relative w-full ${index > 0 ? 'mt-56' : ''}`}


                        >
                            {item.image ? (
                                <Image
                                    className="w-9/12"
                                    src={item.image}
                                    alt={index + ""}
                                    width={300}
                                    height={100}
                                />
                            ) : (
                                <>
                                    <p className='font-semibold text-4xl'>{item.title}</p>
                                    <p className='font-medium text-2xl text-[#00000066] max-w-[500px]'>{item.description}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-[10px] justify-center mx-auto mt-10 md:hidden">
                {/* line */}
                <div className="relative z-0 flex flex-col justify-center items-center">
                    <Image
                        className="z-10 h-full -mb-10"
                        src="/images/user/home/one.svg"
                        alt="one"
                        width={120}
                        height={100}
                    />
                    <Image
                        className="z-0 h-fit opacity-60"
                        src="/images/user/home/line.svg"
                        alt="centerline"
                        width={5}
                        height={100}
                    />
                    <Image
                        className="z-10 h-full -my-10"
                        src="/images/user/home/two.svg"
                        alt="two"
                        width={120}
                        height={100}
                    />
                    <Image
                        className="z-0 h-full opacity-60"
                        src="/images/user/home/line.svg"
                        alt="centerline"
                        width={5}
                        height={100}
                    />
                    <Image
                        className="z-10 h-full -mt-10"
                        src="/images/user/home/three.svg"
                        alt="three"
                        width={120}
                        height={100}
                    />
                </div>
                {/* data */}
                <div>
                    {combinedArray.map((item,index) => (
                        <div key={item.id}>
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt="image"
                                    width={300}
                                    height={100}
                                    className={`${index > 1 ? "mt-16" : ""}`}
                                />
                            )}
                            {item.title && (
                                <div className='my-5'>
                                    <p className='font-semibold text-xl'>{item.title}</p>
                                    <p className='font-medium text-sm text-[#00000066] max-w-[500px]'>{item.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

               
            </div>

        </div>
    )
}

export default Working
