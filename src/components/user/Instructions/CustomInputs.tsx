import Text from '@/components/UI/Text'
import Image from 'next/image'
import React from 'react'

const CustomInputs = () => {
  return (
    <div className="mt-10">
      <Text as="h3" className="mb-4">
        Custom Inputs
      </Text>
      <Text as="h4" className="mb-2">
        Finger Clearance
      </Text>
      <Text as="p1" className="text-[#00000080]">
        Enable or disable optional cutouts to simplify object removal.
      </Text>
      <Text as="h4" className="mt-5 mb-2">
        Contour Offset
      </Text>
      <ul className="list-disc text-[#00000080] ml-6">
        <li>
          Adds a constant clearance around each tool contour to adjust tool
          fitment.
        </li>
        <li>
          Useful for tightening or loosening fit depending on your application.
        </li>
        <li>Units selectable (mm/inches).</li>
      </ul>
      <Text as="h4" className="mt-5 mb-2">
        Boundary Contour
      </Text>
      <ul className="list-disc text-[#00000080] ml-6">
        <li>Optional: defines a boundary around your layout.</li>
        <li>Units selectable (mm/inches).</li>
        <li>
          Lumashape calculates the centerpoint of your layout by finding the
          maximum horizontal and vertical span of all detected objects. It then
          centers the tool contours within the defined boundary dimensions.
        </li>
        <li>
          A minimum margin of 0.25 inches is required between the tool layout
          and the entered boundary dimensions. If the layout exceeds the
          boundary limits, the software will display an error.
        </li>
      </ul>
      <div className="w-full mt-7">
        <Image
          src={'/images/instructions/boundaryContour.svg'}
          alt="boundary-contour"
          height={400}
          width={400}
          className="w-full h-auto object-contain"
        />
      </div>
      <Text as="h4" className="mt-7 mb-2">
        Boundary Dimension
      </Text>
      <Text as="p1" className="text-[#00000080]">
        Specify the Length and Width of your layout or container if using a
        boundary contour.
      </Text>
      <div className="w-full mt-7">
        <Image
          src={'/images/instructions/boundaryDimension.svg'}
          alt="boundary-dimesion"
          height={400}
          width={400}
          className="w-full h-auto object-contain"
        />
      </div>
      <Text as="h4" className="mt-7 mb-2">
        Drawer ID
      </Text>
      <ul className="list-disc text-[#00000080] ml-6">
        <li>Requires boundary contour to be enabled.</li>
        <li>Centered horizontally within the width of the boundary contour.</li>
        <li>
          Inserts customizable text labels within a 1-inch margin above the
          bottom boundary.
        </li>
        <li>
          A minimum 0.25 inch margin is required between the text and the left,
          right, and topmost tool contours.
        </li>
        <li>
          There must be at least a 1 inch margin between the lowest tool contour
          and the bottom boundary to allow space for the annotation. If this
          margin is not met, the software will display an error.
        </li>
      </ul>
      <div className="w-full mt-7">
        <Image
          src={'/images/instructions/drawerID.svg'}
          alt="boundary-dimesion"
          height={400}
          width={400}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  )
}

export default CustomInputs
