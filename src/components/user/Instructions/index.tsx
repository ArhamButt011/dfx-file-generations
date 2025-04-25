'use client'
import Text from '@/components/UI/Text'
import React, { useEffect, useRef, useState } from 'react'
import CustomInputs from './CustomInputs'
import BestPractices from './BestPractices'

function Instructions() {
  const introRef = useRef<HTMLLIElement | null>(null)
  const overviewRef = useRef<HTMLLIElement | null>(null)
  const howItWorksRef = useRef<HTMLLIElement | null>(null)
  const customInputsRef = useRef<HTMLDivElement | null>(null)
  const bestPracticesRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [activeSection, setActiveSection] = useState('introduction')

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    const container = scrollContainerRef.current
    const target = ref?.current

    if (container && target) {
      const containerTop = container.getBoundingClientRect().top
      const targetTop = target.getBoundingClientRect().top
      const scrollOffset = targetTop - containerTop + container.scrollTop

      container.scrollTo({ top: scrollOffset, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const refs = [
        { ref: introRef, id: 'introduction' },
        { ref: overviewRef, id: 'overview' },
        { ref: howItWorksRef, id: 'howitworks' },
        { ref: customInputsRef, id: 'custominputs' },
        { ref: bestPracticesRef, id: 'bestpractice' },
      ]

      const current = refs.find(({ ref }) => {
        const rect = ref.current?.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        return (
          rect &&
          rect.top < containerRect.bottom - 100 && // Allow partial visibility
          rect.bottom > containerRect.top + 100 // Allow partial visibility
        )
      })

      if (current) {
        setActiveSection(current.id)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const getLinkClass = (section: string) =>
    `cursor-pointer ${
      activeSection === section
        ? 'text-[#266CA8] font-semibold sm:border-r sm:border-[#266CA8] sm:border-r-[3px]'
        : 'text-[#00000066]'
    }`

  return (
    <div className="bg-[#F2F2F2] rounded-2xl flex flex-col md:flex-row gap-1 sm:gap-8">
      {/* Sidebar */}
      <div className="md:w-[250px] w-full md:border-r md:border-[#ddd] pl-3 md:pl-10 mt-3 sm:mt-10">
        <Text
          className="sm:text-[26px] text-[20px] font-semibold sm:hidden sm:mb-0 mb-3"
          as="h3"
        >
          LumaShape Guide
        </Text>
        <ul className="text-sm space-y-0 sm:space-y-3">
          <li
            className={getLinkClass('introduction')}
            onClick={() => scrollToSection(introRef)}
          >
            <Text className="flex items-center gap-2">
              <span className="text-2xl">•</span> Introduction
            </Text>
          </li>
          <li
            className={getLinkClass('overview')}
            onClick={() => scrollToSection(overviewRef)}
          >
            <Text className="flex items-center gap-2">
              <span className="text-2xl">•</span> Overview
            </Text>
          </li>
          <li
            className={getLinkClass('howitworks')}
            onClick={() => scrollToSection(howItWorksRef)}
          >
            <Text className="flex items-center gap-2">
              <span className="text-2xl">•</span> How It Works
            </Text>
          </li>
          <li
            className={getLinkClass('custominputs')}
            onClick={() => scrollToSection(customInputsRef)}
          >
            <Text className="flex items-center gap-2">
              <span className="text-2xl">•</span>Custom Inputs
            </Text>
          </li>
          <ul className="ml-4 text-[#00000066] space-y-1 text-[13px]">
            <li>Finger Clearance</li>
            <li>Contour Offset</li>
            <li>Boundary Contour</li>
            <li>Boundary Dimension</li>
            <li>Drawer ID</li>
          </ul>
          <li
            className={getLinkClass('bestpractice')}
            onClick={() => scrollToSection(bestPracticesRef)}
          >
            <Text className="flex items-center gap-2">
              <span className="text-2xl">•</span> Best Practices
            </Text>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 sm:pt-10 pb-3 px-5 sm:px-0">
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto max-h-[calc(100vh-5rem)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 "
        >
          <div className="pr-4 md:pr-10">
            <Text
              className="sm:text-[26px] text-[20px] font-semibold hidden sm:block"
              as="h3"
            >
              LumaShape Guide
            </Text>
            <ul className="mt-7">
              <li ref={introRef}>
                <Text as="h3" className="mb-2">
                  Introduction
                </Text>
                <ul className="list-none mb-4 mt-1">
                  <li className="font-medium">
                    <Text as="p1" className="text-[#00000080]">
                      Lumashape intelligently extracts and scales the outer
                      contour of objects from images, using AI to detect and
                      vectorize each shape into a single continuous, fully
                      closed contour. It supports detailed customization for
                      creating tool control inserts, modular 3D printed
                      organizers, and various other custom solutions.
                    </Text>
                  </li>
                </ul>
              </li>

              <li ref={overviewRef}>
                <Text as="h3" className="mt-10 mb-2">
                  Overview
                </Text>
                <ul className="list-none mb-4 mt-1">
                  <li className="font-medium">
                    <Text as="p1" className="text-[#00000080]">
                      Lumashape is designed to make physical tool layout
                      digitization fast and simple. All it requires is a clear
                      overhead photo with a visible US quarter (USD currency)
                      for scaling. There&apos;s no tracing or CAD work involved.
                    </Text>
                    <Text as="p1" className="mt-5 text-[#00000080]">
                      Once the image is uploaded, Lumashape does the rest:
                      detecting each object&apos;s shape, scaling it accurately,
                      and preserving its position in the layout. The result is a
                      cut-ready DXF that reflects your original arrangement,
                      with options to fine-tune fit, add clearance cuts, define
                      boundaries, and label drawers.
                    </Text>
                  </li>
                </ul>
              </li>

              <li ref={howItWorksRef}>
                <Text as="h3" className="mt-10 mb-2">
                  How it Works
                </Text>
                <ul className="list-decimal mb-4 mt-1 ml-6">
                  <li className="font-semibold">
                    <Text as="p1" className="text-[#00000080]">
                      <span className="font-semibold text-[#000000]">
                        Capture Image:
                      </span>{' '}
                      Arrange objects clearly in a photo, and make sure to
                      include a visible US quarter (USD currency) for accurate
                      scaling.
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
                      <span className="font-semibold text-[#000000]">
                        Customize:
                      </span>{' '}
                      Set offsets, finger clearances, boundaries, and
                      annotations.
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
            <CustomInputs ref={customInputsRef} />
            <BestPractices ref={bestPracticesRef} />
            <Text
              as="p1"
              className="font-semibold text-[18px] md:text-[21px] mt-4"
            >
              Use this guide to efficiently leverage Lumashape for various
              customized organizational solutions.
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructions
