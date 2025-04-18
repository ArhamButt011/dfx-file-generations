'use client'
import Text from '@/components/UI/Text'
import React from 'react'

function Instructions() {
  return (
    <div className="">
      <div className="">
        <ol className="list-decimal md:pl-5 mt-5 md:mx-10 mx-5 [&>li::marker]:font-bold [&>li::marker]:text-[26px]">
          <li>
            <Text as="h3">Introduction</Text>
            <ul className="list-none mb-4 mt-1">
              <li className="font-medium">
                <Text>
                  Lumashape intelligently extracts and scales the outer contour
                  of objects from images, using AI to detect and vectorize each
                  shape into a single continuous, fully closed contour. It
                  supports detailed customization for creating tool control
                  inserts, modular 3D printed organizers, and various other
                  custom solutions.
                </Text>
              </li>
            </ul>
          </li>
          <li>
            <Text as="h3" className="mt-10">
              Overview
            </Text>
            <ul className="list-none mb-4 mt-1">
              <li className="font-medium">
                <Text>
                  Lumashape is designed to make physical tool layout
                  digitization fast and simple. All it requires is a clear
                  overhead photo with a visible US quarter (USD currency) for
                  scaling. There&apos;s no tracing or CAD work involved. Once
                  the image is uploaded, Lumashape does the rest: detecting each
                  object&apos;s shape, scaling it accurately, and preserving its
                  position in the layout. The result is a cut-ready DXF that
                  reflects your original arrangement, with options to fine-tune
                  fit, add clearance cuts, define boundaries, and label drawers.
                </Text>
              </li>
            </ul>
          </li>
          <li>
            <Text as="h3" className="mt-10">
              How it Works
            </Text>
            <ul className="list-decimal mb-4 mt-1">
              <li className="font-medium">
                <Text>
                  Capture Image: Arrange objects clearly in a photo, and make
                  sure to include a visible US quarter (USD currency) for
                  accurate scaling.
                </Text>
              </li>
              <li>
                <Text>
                  Upload & Scale: Lumashape detects and scales objects
                  automatically.
                </Text>
              </li>
              <li>
                <Text>
                  Customize: Set offsets, finger clearances, boundaries, and
                  annotations.
                </Text>
              </li>
              <li>
                <Text>Generate DXF: Download your ready-to-cut DXF file.</Text>
              </li>
            </ul>
          </li>
          <li>
            <Text as="h3" className="mt-10">
              Custom Inputs
            </Text>
            <ul className="list-none mb-4 mt-1 space-y-6 text-[16px] sm:text-[20px] font-medium">
              <li>
                <span className="underline">Finger Clearance</span>
                <ul className="list-disc pl-6 font-normal text-[15px] sm:text-[18px]">
                  <li>
                    Enable or disable optional cutouts to simplify object
                    removal.
                  </li>
                </ul>
              </li>
              <li>
                <span className="underline">Contour Offset</span>
                <ul className="list-disc pl-6 font-normal text-[15px] sm:text-[18px]">
                  <li>
                    Adds a constant clearance around each tool contour to adjust
                    tool fitment.
                  </li>
                  <li>
                    Useful for tightening or loosening fit depending on your
                    application.
                  </li>
                  <li>Units selectable (mm/inches).</li>
                </ul>
              </li>
              <li>
                <span className="underline">Boundary Contour</span>
                <ul className="list-disc pl-6 font-normal text-[15px] sm:text-[18px]">
                  <li>Optional: defines a boundary around your layout.</li>
                  <li>Units selectable (mm/inches).</li>
                  <li>
                    Lumashape calculates the centerpoint of your layout by
                    finding the maximum horizontal and vertical span of all
                    detected objects. It then centers the tool contours within
                    the defined boundary dimensions.
                  </li>
                  <li>
                    A minimum margin of 0.25 inches is required between the tool
                    layout and the entered boundary dimensions. If the layout
                    exceeds the boundary limits, the software will display an
                    error.
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Account Termination
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                We may terminate accounts if
              </li>
              <ul>
                <li className="sm:text-[20px] text-[16px] font-medium">
                  - A user violates our terms (e.g., fraudulent activity, abuse
                  of services)
                </li>
                <li className="sm:text-[20px] text-[16px] font-medium">
                  - Non-payment of subscription fees.
                </li>
                <li className="sm:text-[20px] text-[16px] font-medium">
                  - Engaging in activities that harm the platform or other
                  users.
                </li>
              </ul>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Limitation of Liability
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                Lumashape is not liable for any direct or indirect damages
                resulting from the use of our services. Users are responsible
                for verifying DXF file accuracy before manufacturing.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Changes to Terms
            </h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                We may update this agreement as needed. Continued use of our
                services implies acceptance of the updated terms.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">Governing Law</h2>
            <ul className="list-none mb-4 mt-1">
              <li className="sm:text-[20px] text-[16px] font-medium">
                This agreement is governed by the laws of the State of
                Minnesota, USA, without regard to its conflict of law
                principles. Federal law may apply in certain cases where
                relevant.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-[26px] font-semibold mt-10">
              Contact Information
            </h2>
            <ul className="list-none sm:text-[20px] text-[16px] mb-4 font-medium mt-3 mb-24">
              <li className="sm:text-[20px] text-[16px] font-medium">
                For questions, contact:{' '}
                <span className="underline text-[#266CA8]">
                  sam.peterson@lumashape.com
                </span>
              </li>
            </ul>
          </li>
        </ol>
        <hr />
        <div className="pt-5 mx-5">
          <div className="mt-5 font-normal pt-4 sm:text-[16px] text-[12px] text-[#266CA8] flex gap-4">
            <a
              href="/privacy-policy"
              className="border-b border-[#266CA8] md:h-5 h-4"
            >
              Privacy Policy
            </a>
            <a
              href="/Terms&Condition"
              className="border-b border-[#266CA8] md:h-5 h-4"
            >
              Terms and Conditions
            </a>
            <a
              href="/Contact_Us"
              className="border-b border-[#266CA8] md:h-5 h-4"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructions
