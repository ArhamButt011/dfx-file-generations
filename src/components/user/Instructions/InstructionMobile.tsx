import Text from '@/components/UI/Text'
import React, { useEffect, useRef, useState } from 'react'
import CustomInputs from './CustomInputs'
import BestPractices from './BestPractices'

function InstructionMobile() {
  const introRef = useRef<HTMLLIElement | null>(null)
  const overviewRef = useRef<HTMLLIElement | null>(null)
  const howItWorksRef = useRef<HTMLLIElement | null>(null)
  const customInputsRef = useRef<HTMLDivElement | null>(null)
  const bestPracticesRef = useRef<HTMLDivElement | null>(null)
  const fingerClearanceRef = useRef<HTMLDivElement | null>(null)
  const contourOffsetRef = useRef<HTMLDivElement | null>(null)
  const boundaryContourRef = useRef<HTMLDivElement | null>(null)
  const boundaryDimensionRef = useRef<HTMLDivElement | null>(null)
  const drawerIdRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const [activeSection, setActiveSection] = useState('introduction')
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    const target = ref?.current

    if (!target) return

    if (isSmallScreen) {
      // Scroll using window.scrollTo for small screens
      const targetTop = target.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    } else {
      // Scroll using scrollContainerRef for large screens
      const container = scrollContainerRef.current
      if (container) {
        const containerTop = container.getBoundingClientRect().top
        const targetTop = target.getBoundingClientRect().top
        const scrollOffset = targetTop - containerTop + container.scrollTop
        container.scrollTo({ top: scrollOffset, behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }

    // Initialize the screen size detection
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const refs = [
        { ref: introRef, id: 'introduction' },
        { ref: overviewRef, id: 'overview' },
        { ref: howItWorksRef, id: 'howitworks' },
        { ref: customInputsRef, id: 'custominputs' },
        { ref: bestPracticesRef, id: 'bestpractice' },
        { ref: fingerClearanceRef, id: 'fingerClearance' },
        { ref: contourOffsetRef, id: 'contourOffset' },
        { ref: boundaryContourRef, id: 'boundaryContour' },
        { ref: boundaryDimensionRef, id: 'boundaryDimension' },
        { ref: drawerIdRef, id: 'drawerId' },
      ]

      const current = refs.find(({ ref }) => {
        const rect = ref.current?.getBoundingClientRect()
        return rect && rect.top < window.innerHeight && rect.bottom > 0
      })

      if (current) {
        setActiveSection(current.id)
      }
    }

    if (isSmallScreen) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    } else {
      const container = scrollContainerRef.current
      if (container) {
        container.addEventListener('scroll', handleScroll, { passive: true })
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      const container = scrollContainerRef.current
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isSmallScreen])

  const getLinkClass = (section: string) => {
    return `cursor-pointer ${
      activeSection === section
        ? 'text-[#266CA8] font-semibold sm:border-r sm:border-[#266CA8] sm:border-r-[3px]'
        : 'text-[#00000066]'
    }`
  }
  return (
    <div className="bg-[#F2F2F2] rounded-2xl flex flex-col md:flex-row gap-1 sm:gap-8 sm:hidden">
      {/* Sidebar */}
      <div className="md:w-[250px] w-full md:border-r md:border-[#ddd] pl-3 md:pl-10 mt-3 sm:mt-10 sticky top-18 bg-[#F2F2F2] z-10">
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

          <li
            className={getLinkClass('fingerclearance')}
            onClick={() => scrollToSection(fingerClearanceRef)}
          >
            Finger Clearance
          </li>
          <li
            className={getLinkClass('contouroffset')}
            onClick={() => scrollToSection(contourOffsetRef)}
          >
            Contour Offset
          </li>
          <li
            className={getLinkClass('boundarycontour')}
            onClick={() => scrollToSection(boundaryContourRef)}
          >
            Boundary Contour
          </li>
          <li
            className={getLinkClass('boundarydimension')}
            onClick={() => scrollToSection(boundaryDimensionRef)}
          >
            Boundary Dimension
          </li>
          <li
            className={getLinkClass('drawerid')}
            onClick={() => scrollToSection(drawerIdRef)}
          >
            Drawer ID
          </li>

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
          className="sm:overflow-y-auto sm:max-h-[calc(100vh-5rem)] sm:scrollbar-thin sm: scrollbar-thumb-gray-400 sm: scrollbar-track-gray-100"
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
            <CustomInputs
              ref={customInputsRef}
              fingerClearanceRef={fingerClearanceRef}
              contourOffsetRef={contourOffsetRef}
              boundaryContourRef={boundaryContourRef}
              boundaryDimensionRef={boundaryDimensionRef}
              drawerIdRef={drawerIdRef}
            />
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

export default InstructionMobile
