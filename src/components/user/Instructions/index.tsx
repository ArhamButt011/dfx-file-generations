'use client'
import Text from '@/components/UI/Text'
import React from 'react'
import CustomInputs from './CustomInputs'
import BestPractices from './BestPractices'

function Instructions() {
  return (
    <div className="bg-[#F2F2F2] px-4 md:px-10 rounded-2xl pt-5 pb-10">
      <Text className="sm:text-[26px] text-[20px] font-semibold" as="h3">
        LumaShape Guide
      </Text>
      <ul className="mt-7">
        <li>
          <Text as="h3" className="mb-2">
            Introduction
          </Text>
          <ul className="list-none mb-4 mt-1">
            <li className="font-medium">
              <Text as="p1" className="text-[#00000080]">
                Lumashape intelligently extracts and scales the outer contour of
                objects from images, using AI to detect and vectorize each shape
                into a single continuous, fully closed contour. It supports
                detailed customization for creating tool control inserts,
                modular 3D printed organizers, and various other custom
                solutions.
              </Text>
            </li>
          </ul>
        </li>
        <li>
          <Text as="h3" className="mt-10 mb-2">
            Overview
          </Text>
          <ul className="list-none mb-4 mt-1">
            <li className="font-medium">
              <Text as="p1" className="text-[#00000080]">
                Lumashape is designed to make physical tool layout digitization
                fast and simple. All it requires is a clear overhead photo with
                a visible US quarter (USD currency) for scaling. There&apos;s no
                tracing or CAD work involved.
              </Text>
              <Text as="p1" className="mt-5 text-[#00000080]">
                Once the image is uploaded, Lumashape does the rest: detecting
                each object&apos;s shape, scaling it accurately, and preserving
                its position in the layout. The result is a cut-ready DXF that
                reflects your original arrangement, with options to fine-tune
                fit, add clearance cuts, define boundaries, and label drawers.
              </Text>
            </li>
          </ul>
        </li>
        <li>
          <Text as="h3" className="mt-10 mb-2">
            How it Works
          </Text>
          <ul className="list-decimal mb-4 mt-1 ml-6">
            <li className="font-semibold">
              <Text as="p1" className="text-[#00000080]">
                <span className="font-semibold text-[#000000]">
                  Capture Image:
                </span>{' '}
                Arrange objects clearly in a photo, and make sure to include a
                visible US quarter (USD currency) for accurate scaling.
              </Text>
            </li>
            <li className="font-semibold">
              <Text as="p1" className="text-[#00000080]">
                <span className="font-semibold text-[#000000]">
                  Upload & Scale:
                </span>{' '}
                Lumashape detects and scales objects automatically.
              </Text>
            </li>
            <li className="font-semibold">
              <Text as="p1" className="text-[#00000080]">
                <span className="font-semibold text-[#000000]">Customize:</span>{' '}
                Set offsets, finger clearances, boundaries, and annotations.
              </Text>
            </li>
            <li className="font-semibold">
              <Text as="p1" className="text-[#00000080]">
                <span className="font-semibold text-[#000000]">
                  Generate DXF:
                </span>{' '}
                Download your ready-to-cut DXF file.
              </Text>
            </li>
          </ul>
        </li>
      </ul>
      <CustomInputs />
      <BestPractices />
      <Text as="p1" className="font-semibold text-[18px] md:text-[21px] mt-4">
        Use this guide to efficiently leverage Lumashape for various customized
        organizational solutions.
      </Text>
    </div>
  )
}

export default Instructions
