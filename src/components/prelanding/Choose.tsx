import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

function Choose() {
  return (
    <div className=" max-w-[1328px] mx-auto" id="benefits">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        <p className="font-bold md:text-[55px] text-[40px] text-center">
          Why <span className="text-[#266CAB]">Choose</span> Our DXF Generator?
        </p>
        <p className="text-center text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium max-w-[90%]">
          Simplify the creation of DXF files with precision and ease. Designed
          for both hobbyists and professionals, our software eliminates tedious
          manual design work, delivers accurate files ready for manufacturing
          custom tool drawer inserts, and saves you time and effort. Choose a
          fast, reliable, and cost-effective solution that streamlines your
          workflow and puts you in control.
        </p>
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
          <p className="font-bold text-[30px] text-center md:w-[70%] w-[50%] mt-5">
            AI-Powered Precision
          </p>
          <p className="text-center text-[#00000066] text-[21px] mx-auto font-medium max-w-[80%]">
            Our advanced AI detects and converts tool contours into accurate DXF
            files — no manual tracing or CAD work needed.
          </p>
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
            src="/images/user/home/access.svg"
            alt=""
            className=""
            width={120}
            height={100}
          />
          <p className="font-bold text-[30px] text-center w-[80%] mt-5">
            Production-Ready Outputs
          </p>
          <p className="text-center text-[#00000066] text-[21px] mx-auto font-medium max-w-[80%]">
            Generate ready-to-cut DXF files of the exact tool layout shown in
            the input image, perfectly sized to fit specified drawer dimensions.
            Or scan individual tools to import into CAD and create custom
            layouts.
          </p>
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
            src="/images/user/home/fast.svg"
            alt=""
            className=""
            width={120}
            height={100}
          />
          <p className="font-bold text-[30px] text-center w-[80%] mt-5">
            Customer Support
          </p>
          <p className="text-center text-[#00000066] text-[21px] mx-auto font-medium max-w-[80%]">
            Support comes directly from the developers behind the software,
            ensuring fast, expert assistance.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Choose
