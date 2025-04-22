import Text from '@/components/UI/Text'
import Image from 'next/image'
import React from 'react'

const BestPractices = () => {
  return (
    <div className="mt-10 border-b border-[#000000]">
      <Text as="h4" className="mb-2">
        Best Practices
      </Text>
      <ul className="list-disc text-[#00000080] ml-6">
        <li>
          <Text as="p1">
            Ensure the camera is flat and centered above the objects to minimize
            distortion.
          </Text>
        </li>
        <li>
          <Text as="p1">Capture photos from a maximum distance of 4 feet.</Text>
        </li>
        <li>
          <Text as="p1">
            Be mindful of camera angle and the parallax effect. Contours are
            based on the photo&apos;s perspective—taller, off-center objects may
            appear distorted. For best accuracy, photograph tall objects
            individually from directly above.
          </Text>
        </li>
      </ul>
      <div className="w-full mt-7">
        <Image
          src={'/images/instructions/bestPractices.svg'}
          alt="boundary-contour"
          height={400}
          width={400}
          className="w-full h-auto object-contain"
        />
      </div>
      <ul className="list-disc text-[#00000080] ml-6 mt-7 pb-16">
        <li>
          <Text as="p1">
            Objects should be placed on a consistent, contrasting background for
            accurate detection.
          </Text>
        </li>
        <li>
          <Text as="p1">Use consistent lighting with minimal shadows.</Text>
        </li>
        <li>
          <Text as="p1">All objects must rest on the same flat surface.</Text>
        </li>
        <li>
          <Text as="p1">
            Include a quarter (US currency) visibly in the image for accurate
            scaling.
          </Text>
        </li>

        <li>
          <Text as="p1">
            Maintain at least a 0.25 inch margin between objects and between
            objects and the edges of the container. This ensures clean
            separation and reliable cutting.
          </Text>
        </li>

        <li>
          <Text as="p1">
            For foam inserts or other fitted layouts, make sure your arrangement
            fits within the physical limits of your container.
          </Text>
        </li>

        <li>
          <Text as="p1">
            For tool drawers, it is strongly recommended to remove the drawer,
            arrange the tools inside it, and photograph from above. This ensures
            the layout remains within the actual drawer dimensions.
          </Text>
        </li>
        <li>
          <Text as="p1">
            You can include as many objects in the image as you&apos;d like.
            Lumashape preserves their spatial layout, so the contours in the DXF
            match the positions in the original image.
          </Text>
        </li>
      </ul>
    </div>
  )
}

export default BestPractices
