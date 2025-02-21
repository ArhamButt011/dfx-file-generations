import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import clsx from "clsx";
import { motion } from 'framer-motion';
type included = {
    id: number
    text: string
}

type DataItem = {
    id: number
    desc: string
    title: string
    price: string
    include: included[]
    buttonText: string
    height: number
    backgroundColor: string
    textColor: string
    buttonColor: string
    buttonTextColor: string
    priceColor: string
    smallTextColor: string
    icon: string
}

const bilingPlans: DataItem[] = [
    {
        id: 1,
        desc: '',
        title: 'Free Trial',
        price: 'Free',
        include: [
            {
                id: 1,
                text: 'Unlimited DXF file downloads for 7 days.',
            },
            {
                id: 2,
                text: 'No payment required',
            },
        ],
        buttonText: '',
        height: 70,
        backgroundColor: "white",
        textColor: "black",
        buttonColor: "",
        buttonTextColor: "",
        priceColor: "#266CA8",
        smallTextColor: "#22222280",
        icon: "/images/user/AuthScreens/Check Circle.svg"
    },
    {
        id: 2,
        desc: 'Pay Per Download',
        title: 'Basic',
        price: '$20/Download',
        include: [
            {
                id: 1,
                text: 'Free upload and preview',
            },
            {
                id: 2,
                text: 'Purchase DXF files individually for $20 per download.',
            },
            {
                id: 3,
                text: 'No commitment or subscription',
            },
            {
                id: 4,
                text: 'Secure payment processing',
            },
        ],
        buttonText: 'Get Started',
        height: 80,
        backgroundColor: "#266CA8",
        textColor: "white",
        buttonColor: "white",
        buttonTextColor: "#266CA8",
        priceColor: "white",
        smallTextColor: "#FFFFFFB2",
        icon: "/images/user/AuthScreens/White Check Circle.svg"
    },
    {
        id: 3,
        desc: 'Unlimited Plan',
        title: 'Premium',
        price: '$50/Month',
        include: [
            {
                id: 1,
                text: 'Unlimited DXF downloads',
            },
            {
                id: 2,
                text: 'Exclusive customer support ',
            },
            {
                id: 3,
                text: 'Cancel or modify anytime',
            },
            {
                id: 4,
                text: 'Secure payment processing',
            },
        ],
        buttonText: 'Get Started',
        height: 70,
        backgroundColor: "white",
        textColor: "black",
        buttonColor: "#266CA8",
        buttonTextColor: "white",
        priceColor: "#266CA8",
        smallTextColor: "#22222280",
        icon: "/images/user/AuthScreens/Check Circle.svg"
    },
]

function Pricing() {
    return (
        <div className='max-w-[90%] mx-auto md:py-20' id='pricing'>
            <motion.div
                className='w-full'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: false }}
            >
                <p className='font-bold md:text-[55px] text-[40px] text-center md:max-w-[80%] mx-auto'><span className='text-[#266CAB]'>Our </span> Pricing Plans</p>
                <p className='text-center text-[#00000066] md:text-[29px] text-[23px] mx-auto font-medium md:max-w-[90%]'>Choose a plan that fits your needs, and let&apos;s start designing together.</p>
            </motion.div>
            <div>

                <div className="flex md:flex-row flex-col justify-center md:justify-between xl:justify-center gap-4 mt-10 items-center">
                    {bilingPlans.map((item) => (
                        <motion.div
                            key={item.id}
                            // Set the initial animation state based on the item id
                            initial={
                                item.id === 1
                                    ? { opacity: 0, x: -50 }   // coming in from the left
                                    : item.id === 2
                                        ? { opacity: 0, y: 50 }    // coming in from the bottom
                                        : item.id === 3
                                            ? { opacity: 0, x: 50 }    // coming in from the right
                                            : { opacity: 0 }
                            }
                            // When in view, animate to these properties
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className={clsx(
                                "border p-4 w-4/5 rounded-3xl flex flex-col justify-between",
                                item.id === 1 && "h-[490px] lg:h-[540px] xl:h-[540px] md:w-1/3 xl:w-1/4 2xl:w-1/5",
                                item.id === 2 && "h-[550px] lg:h-[600px] xl:h-[600px] md:w-1/2 xl:w-1/3 2xl:w-1/4",
                                item.id === 3 && "h-[490px] lg:h-[540px] xl:h-[540px] md:w-1/3 xl:w-1/4 2xl:w-1/5"
                            )}
                            style={{ background: item.backgroundColor, color: item.textColor }}
                        >



                            <div>
                                <p className="font-medium text-base " style={{ color: `${item.smallTextColor}` }}>
                                    {item.desc}
                                </p>
                                <p className="font-semibold text-3xl">{item.title}</p>
                                <p className="mt-6">
                                    <span className="text-4xl font-semibold" style={{ color: item.priceColor }}>
                                        {item.price.includes("/") ? item.price.split("/")[0] : item.price}
                                    </span>
                                    {item.price.includes("/") && (
                                        <span className="text-base font-medium" style={{ color: item.smallTextColor }}>
                                            /{item.price.split("/")[1]}
                                        </span>
                                    )}
                                </p>

                                <p className="font-semibold text-base mt-5 mb-2">What&apos;s Included</p>
                                {item.include.map((inc) => (
                                    <div key={inc.id} className="flex items-start pb-2">
                                        <Image
                                            src={item.icon}
                                            alt=""
                                            width={24}
                                            height={24}
                                            className="flex-shrink-0"
                                        />
                                        <p className="font-medium text-base" style={{ color: `${item.smallTextColor}` }}>
                                            {inc.text}
                                        </p>
                                    </div>

                                ))}
                            </div>
                            <Link href="/user" className="mt-4 py-2 px-4 rounded-full text-center" style={{ color: `${item.buttonTextColor}`, background: `${item.buttonColor}` }}>
                                {item.buttonText}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Pricing
