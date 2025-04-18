'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Text from '../UI/Text'

type AccordionItem = {
  id: number
  question: string
  answer: string | React.ReactNode
}

function FAQ() {
  const accordionData: AccordionItem[] = [
    {
      id: 1,
      question: 'What kind of photo do I need to upload?',
      answer:
        'A clear overhead photo of your layout, taken with the camera flat and centered above the objects. All items must rest on the same flat surface, and a visible US quarter (USD currency) must be included for accurate scaling.',
    },
    {
      id: 2,
      question: 'Do I need to use CAD or manually trace my layout?',
      answer:
        'No. Lumashape automatically detects, scales, and vectorizes the outer contour of each object in the image—no manual tracing or CAD work is required.',
    },
    {
      id: 3,
      question: 'Can I include multiple tools or objects in one photo?',
      answer:
        'Yes. Lumashape supports as many objects as needed in one image. Their positions in the DXF output will match their positions in the photo.',
    },
    {
      id: 4,
      question: 'What if I want to cut foam inserts that fit inside a drawer?',
      answer:
        'We recommend removing the drawer, arranging your tools inside it, and photographing the layout from above. This ensures your layout stays within the drawer’s physical dimensions.',
    },
    {
      id: 5,
      question: 'Why is the quarter required?',
      answer:
        'The US quarter acts as a reference object for accurate scaling. Without it, Lumashape cannot generate correctly scaled contours.',
    },
    {
      id: 6,
      question: 'What is the Contour Offset Parameter for?',
      answer:
        'It adds a customizable clearance around each tool’s contour to adjust fitment. Use it to control how tight or loose each cutout will be.',
    },
    {
      id: 7,
      question: 'What is a Boundary Contour and why would I use it?',
      answer: `The boundary contour defines the outer edges of your layout. It's optional, but required when you're cutting a tool control insert from a larger piece of raw material. It informs the machine where to cut the outer shape of the insert.`,
    },
    {
      id: 8,
      question: 'How do I add labels to my layout?',
      answer:
        'Enable the boundary contour and enter a Drawer ID. This adds a text label near the bottom of the layout, horizontally centered. There must be at least 1 inch of margin between the lowest tool and the bottom boundary to allow space for the text.',
    },
    {
      id: 9,
      question: 'What causes errors during DXF generation?',
      answer: (
        <div>
          <p className="mb-2">Most commonly:</p>
          <ul className="list-disc pl-5">
            <li>Missing or unclear US quarter</li>
            <li>Poor lighting or strong shadows</li>
            <li>Inconsistent or low-contrast background</li>
            <li>Tool layout exceeding boundary dimensions</li>
            <li>Any margin violations</li>
          </ul>
        </div>
      ),
    },

    {
      id: 10,
      question: 'Can Lumashape be used for things other than foam inserts?',
      answer:
        'Yes. Lumashape is also ideal for creating modular 3D printed organizers, custom trays, and other layout-based solutions that require precise outer contours.',
    },
  ]

  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null)

  const toggleAccordion = (id: number) => {
    setOpenAccordionId(openAccordionId === id ? null : id) // Toggle the active accordion
  }

  return (
    <div
      className="xl:max-w-[1200px] max-w-[90%] mx-auto mt-10 md:mt-0"
      id="faqs"
    >
      <Text
        as="h2"
        className="text-center md:max-w-[80%] mx-auto mb-5 leading-[45px] md:leading-[56.69px]"
        data-aos="fade-up"
      >
        <span className="text-[#266CAB]">Frequently </span>
        Asked Questions
      </Text>

      <div className="space-y-4 md:mt-20">
        {accordionData.map(({ id, question, answer }) => (
          <div
            key={id}
            className="bg-[#F2F2F299] md:px-10 px-5 rounded-lg"
            data-aos="fade-up"
          >
            <button
              onClick={() => toggleAccordion(id)}
              className="w-full flex justify-between items-center py-5 text-slate-800"
            >
              <Text as="h5" className="font-semibold text-left flex-1">
                {question}
              </Text>
              <span
                className={`text-slate-800 transition-transform duration-300 flex-shrink-0 ${
                  openAccordionId === id ? 'rotate-90' : 'rotate-0'
                }`}
              >
                <Image
                  src="/images/user/home/arrow.svg"
                  alt="arrow"
                  width={50}
                  height={10}
                  className="md:w-9 md:h-9 h-7 w-7"
                />
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openAccordionId === id ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="pb-5 text-slate-800">{answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
