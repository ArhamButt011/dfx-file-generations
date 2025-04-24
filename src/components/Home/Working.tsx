import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Text from '../UI/Text'
type DataItem = {
  id: number
  title?: string
  description?: string
  image?: string
}

const data: { left: DataItem[]; right: DataItem[] } = {
  left: [
    {
      id: 1,
      image: '/images/user/home/upload.svg',
    },
    {
      id: 3,
      title: 'Preview Your DXF File',
      description:
        'Our AI will process your image, automatically scale the contours, and generate a high quality DXF preview for your review.',
    },
    {
      id: 5,
      image: '/images/user/home/save.svg',
    },
  ],
  right: [
    {
      id: 2,
      title: 'Upload Your Image',
      description: `Start by uploading a photo of your tool layout. Then, select any optional customizations you'd like to apply.`,
    },
    {
      id: 4,
      image: '/images/user/home/preview.svg',
    },
    {
      id: 6, // Changed to 6 to avoid duplicate IDs
      title: 'Download and Save',
      description: `Click "Download" to save your DXF file to your device. Your file is instantly accessible and ready for use.`,
    },
  ],
}

const desiredOrder = [1, 2, 4, 3, 5, 6]

const combinedArray = [...data.left, ...data.right].sort(
  (a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id),
)
const stepImages = ['one', 'two', 'three']
function Working() {
  return (
    <div
      className="xl:max-w-[1200px] max-w-[90%] mx-auto  md:py-0 pb-2 mt-16"
      id="working"
    >
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        <Text as="h2" className="text-center max-w-[80%] mx-auto mb-1">
          <span className="text-[#266CAB]">How </span>It Works
        </Text>
        <Text
          as="p1"
          className="text-center text-[#00000066] mx-auto md:max-w-[90%]"
        >
          Lumashape simplifies the file creation process, offering an intuitive
          and user-friendly experience powered by advanced AI.
        </Text>
      </motion.div>
      <div className="relative hidden md:grid [grid-template-columns:2fr_auto_2fr] gap-10 mt-16 items-start ">
        {/* Continuous vertical line that spans from just below image 1 to just above image 3 */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 lg:bottom-[28%] md:bottom-[20%] bg-[#0000001A] "
          style={{ top: '96px', width: '3px' }}
        ></div>

        {data.left.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* Left Section */}
            <motion.div
              className="flex justify-end items-center relative z-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              {item.image ? (
                <Image
                  className="w-full"
                  src={item.image}
                  alt={`left-${index}`}
                  width={300}
                  height={100}
                />
              ) : (
                <div className="text-left w-full">
                  <Text as="h4" className="font-semibold mb-1">
                    {item.title}
                  </Text>
                  <Text as="p1" className="font-medium text-[#00000066]">
                    {item.description}
                  </Text>
                </div>
              )}
            </motion.div>

            {/* Center Section (Step Images) */}
            <motion.div
              className="flex flex-col justify-center relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false }}
            >
              <Image
                className="w-24 h-24"
                src={`/images/user/home/${stepImages[index]}.svg`}
                alt={`step-${stepImages[index]}`}
                width={96}
                height={96}
              />
              {/* Removed the per-row line */}
            </motion.div>

            {/* Right Section */}
            <motion.div
              className="flex justify-start items-start relative z-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              {data.right[index]?.image ? (
                <Image
                  className="w-full"
                  src={data.right[index].image}
                  alt={`right-${index}`}
                  width={300}
                  height={100}
                />
              ) : (
                <div className="text-left w-full">
                  <Text as="h4" className="font-semibold mb-1">
                    {data.right[index]?.title}
                  </Text>
                  <Text as="p1" className="font-medium text-[#00000066]">
                    {data.right[index]?.description}
                  </Text>
                </div>
              )}
            </motion.div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex gap-[10px] justify-center mx-auto mt-10 md:hidden">
        {/* line */}
        <div className="flex flex-col -ml-5">
          {[
            { img: '/images/user/home/one.svg', indices: [1, 2] },
            { img: '/images/user/home/two.svg', indices: [3, 4] },
            { img: '/images/user/home/three.svg', indices: [5, 6] },
          ].map(({ img, indices }, i) => (
            <div key={i} className="flex items-start">
              {/* Image */}
              <div className="flex flex-col items-center">
                <Image
                  className="z-10 h-full w-2/3 mx-auto"
                  src={img}
                  alt={`step-${i + 1}`}
                  width={35}
                  height={100}
                />
                {/* Line except for last */}
                {i < 2 && (
                  <Image
                    className="z-0 h-full opacity-60 mx-auto"
                    src="/images/user/home/line.svg"
                    alt="centerline"
                    width={5}
                    height={80}
                  />
                )}
              </div>

              {/* Data */}
              <div className="">
                {combinedArray
                  .filter((_, index) => indices.includes(index + 1)) // Matching indices
                  .map((item) => (
                    <div key={item.id} className="mb-5">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt="image"
                          width={300}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      )}
                      {item.title && (
                        <div className="my-3">
                          <Text as="h4" className="font-semibold mb-1">
                            {item.title}
                          </Text>
                          <Text
                            as="p1"
                            className="font-medium text-base text-[#00000066] max-w-[500px]"
                          >
                            {item.description}
                          </Text>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Working
