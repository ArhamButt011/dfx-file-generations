'use client'
import Image from 'next/image';
import React, { useState } from 'react'

type AccordionItem = {
    id: number;
    question: string;
    answer: string;
};

function FAQ() {
    const accordionData: AccordionItem[] = [
        {
            id: 1,
            question: "What image formats are supported?",
            answer: "We support .jpg, .png, and .tiff formats. For accurate analysis, please upload high-resolution images.",
        },
        {
            id: 2,
            question: "How long does it take to analyze an image?",
            answer: "We support .jpg, .png, and .tiff formats. For accurate analysis, please upload high-resolution images.",
        },
        {
            id: 3,
            question: "Is my data secure?",
            answer: "We support .jpg, .png, and .tiff formats. For accurate analysis, please upload high-resolution images.",
        },
        {
            id: 4,
            question: "Can I use my own AI model?",
            answer: "We support .jpg, .png, and .tiff formats. For accurate analysis, please upload high-resolution images.",
        },
        {
            id: 5,
            question: "What types of images can DXF Contour?",
            answer: "We support .jpg, .png, and .tiff formats. For accurate analysis, please upload high-resolution images.",
        },
        {
            id: 6,
            question: "How do I interpret the results?",
            answer: "We support .jpg, .png, and .tiff formats. For accurate analysis, please upload high-resolution images.",
        },
    ];
    const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
    const toggleAccordion = (id: number) => {
        setOpenAccordionId(openAccordionId === id ? null : id); // Toggle the active accordion
    };
    return (
        <div className='max-w-[90%] mx-auto mt-20' id='faqs'>
            <p className='font-bold md:text-[55px] text-[40px] text-center md:max-w-[80%] mx-auto'><span className='text-[#266CAB]'>Frequently </span>Asked Questions</p>
            {/* <p className='text-center text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium max-w-[90%]'>Everything you need to know about DXF image generator with spaces and how it works? Here are all of your answers</p> */}

            {/* questions */}
            <div className="space-y-4 mt-20">
                {accordionData.map(({ id, question, answer }) => (
                    <div key={id} className=" bg-[#F2F2F299] md:px-10 px-5 rounded-lg">
                        <button
                            onClick={() => toggleAccordion(id)}
                            className="w-full flex justify-between items-center py-5 text-slate-800"
                        >
                            <span className='font-semibold md:text-[40px] text-sm text-left'>{question}</span>
                            <span
                                className={`text-slate-800 transition-transform duration-300 ${openAccordionId === id ? "rotate-90" : "rotate-0"
                                    }`}
                            >
                               <Image src="/images/user/home/arrow.svg" alt='arrow' width={50} height={10} className='w-10 h-10'/>
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordionId === id ? "max-h-40" : "max-h-0"
                                }`}
                        >
                            <div className="pb-5 md:text-3xl text-xs text-[#0000004D]">{answer}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQ
