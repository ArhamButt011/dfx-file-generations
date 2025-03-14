import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

import 'aos/dist/aos.css'
import Text from '../UI/Text'
function Hero() {
  return (
    <div className="xl:max-w-[1200px] max-w-[90%] flex flex-col items-center justify-center mx-auto">
      <motion.div
        className="md:pt-36 md:pb-20 pt-32 pb-10 "
        id="home"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <Text as="h1" className="text-center  md:leading-none leading-[45px]">
          Effortless DXF File Creation with AI Precision
        </Text>
        <Text
          as="p1"
          className="text-center text-[#00000066] mx-auto font-medium md:max-w-[90%] mt-5"
        >
          Effortlessly create precise DXF files for manufacturing custom tool
          drawer inserts with AI-powered automation. Simplify your workflow and
          take tool organization to the next level. Start your free trial today!
        </Text>
        <div className="my-10 flex justify-center">
          <Link
            href="/user"
            className="bg-[#266CA8] text-white rounded-full mt-2 flex justify-center sm:w-[240px] w-[170px] h-[10%] px-3 py-4 text-center p-5 font-medium md:text-xl text-sm"
          >
            Try LumaShape Now
          </Link>
        </div>
        <div className="w-full mx-auto">
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
      </motion.div>
      {/* why choose */}
      <div className=" " id="benefits">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <Text as="h2" className="text-center mb-3">
            Why <span className="text-[#266CAB]">Choose</span> Our DXF
            Generator?
          </Text>
          <Text
            as="p1"
            className="text-center text-[#00000066] mx-auto font-medium max-w-[90%]"
          >
            Simplify the creation of DXF files with precision and ease. Designed
            for both hobbyists and professionals, our software eliminates
            tedious manual design work, delivers accurate files ready for
            manufacturing custom tool drawer inserts, and saves you time and
            effort. Choose a fast, reliable, and cost-effective solution that
            streamlines your workflow and puts you in control.
          </Text>
        </motion.div>
        <div className="flex md:flex-row flex-col pt-20 justify-between items-start ">
          {/* AI powered */}
          <motion.div
            className="flex flex-col items-center md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            <Image
              src="/images/user/home/AI.svg"
              alt=""
              className=""
              width={120}
              height={100}
            />
            <Text as="h3" className="text-center md:w-[70%] w-[50%] mt-5 mb-2">
              AI-Powered Precision
            </Text>
            <Text
              as="p1"
              className="text-center text-[#00000066] mx-auto font-medium max-w-[80%]"
            >
              Our advanced AI detects and converts tool contours into accurate
              DXF files — no manual tracing or CAD work needed.
            </Text>
          </motion.div>

          {/* custom offset */}
          <motion.div
            className="flex flex-col items-center md:mt-0 mt-10 md:w-1/3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            <Image
              src="/images/user/home/fast.svg"
              alt=""
              className=""
              width={120}
              height={100}
            />
            <Text as="h3" className="font-bold text-center w-[80%] mt-5 mb-2">
              Production-Ready Outputs
            </Text>
            <Text
              as="p1"
              className="text-center text-[#00000066] mx-auto max-w-[70%]"
            >
              Generate ready-to-cut DXF files of the exact tool layout shown in
              the input image, perfectly sized to fit specified drawer
              dimensions. Or scan individual tools to import into CAD and create
              custom layouts
            </Text>
          </motion.div>
          {/* access Anytime */}
          <motion.div
            className="flex flex-col items-center md:mt-0 mt-10 md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            <Image
              src="/images/user/home/access.svg"
              alt=""
              className=""
              width={120}
              height={100}
            />
            <Text
              as="h3"
              className="font-bold text-[30px] text-center w-[80%] mt-5 mb-2"
            >
              Customer Support
            </Text>
            <Text
              as="p1"
              className="text-center text-[#00000066] text-[21px] mx-auto font-medium max-w-[80%]"
            >
              Support comes directly from the developers behind the software,
              ensuring fast, expert assistance.
            </Text>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
