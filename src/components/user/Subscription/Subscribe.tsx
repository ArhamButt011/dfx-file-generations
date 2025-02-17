import BilingModal from '@/components/UI/BilingModal'
import Image from 'next/image'
import React from 'react'
// import {useAuth} from "@/context/AuthContext"

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
}

const bilingPlans: DataItem[] = [
    {
        id: 1,
        desc: 'Free Plan',
        title: 'Free Trial',
        price: '$0.00/month',
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
        buttonText: 'Start Free Trial',
    },
    {
        id: 2,
        desc: 'Pay Per Download',
        title: 'Basic',
        price: '$10.00/File',
        include: [
            {
                id: 1,
                text: 'Free upload and preview',
            },
            {
                id: 2,
                text: 'Purchase DXF files individually for $10 per download.',
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
    },
    {
        id: 3,
        desc: 'Unlimited Plan',
        title: 'Premium',
        price: '$100.00/Month',
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
    },
]
type SubscribeProps = {
    isBilingOpen: boolean;
    setIsBilingOpen: (open: boolean) => void;
};

// function handleSkiporFree(item: DataItem) {
//     const { userData } = useAuth();
//     const bilingDate= new Date();

//     const subscriptionData = {
//         userid: userData?._id,
//         plan: item.title,
//         charges:  item.price.split("/")[0],
//         duration: item.price.split("/")[1],
//         bilingDate,
//         ExpiryDate: bilingDate.getDate() + 7,
       
//     };

//     console.log(subscriptionData);
// }


function Subscribe({ isBilingOpen, setIsBilingOpen }: SubscribeProps) {
    // const [isBilingOpen, setIsBilingOpen] = useState<boolean>(false);
    const onClose = () => {
        setIsBilingOpen(false);
    }
    return (
        <div>
            <BilingModal isOpen={isBilingOpen} onClose={onClose} buttonContent={<p className='text-[#266CA8] font-semibold text-2xl'>Skip</p>}>
                <div>
                    <div className="text-center">
                        <p className="font-semibold text-3xl cursor-pointer">
                            Choose Your Subscription Plan
                        </p>
                        <p className="font-medium text-xl text-[#00000080]">
                            Choose a plan that fits your needs, and let&apos;s start designing
                            together.
                        </p>
                    </div>

                    <div className="flex justify-between mt-10">
                        {bilingPlans.map((item) => (
                            <div
                                key={item.id}
                                className="border p-4 flex-1 max-w-[30%] rounded-2xl flex flex-col justify-between"
                            >
                                <div>
                                    <p className="font-medium text-base text-[#22222280]">
                                        {item.desc}
                                    </p>
                                    <p className="font-semibold text-3xl">{item.title}</p>
                                    <p className="mt-10">
                                        <span className="text-4xl font-semibold text-[#266CA8]">
                                            {item.price.split('/')[0]}
                                        </span>
                                        <span className="text-base text-[#22222280] font-medium">
                                            /{item.price.split('/')[1]}
                                        </span>
                                    </p>
                                    <p className="font-semibold text-base mt-5">Whats Included</p>
                                    {item.include.map((inc) => (
                                        <div key={inc.id} className="flex items-center gap-2">
                                            <Image
                                                src="/images/user/AuthScreens/Check Circle.svg"
                                                alt=""
                                                width={24}
                                                height={24}
                                                className="flex-shrink-0"
                                            />
                                            <p className="font-medium text-base text-[#22222280]">
                                                {inc.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-4 bg-[#266CA8] text-white py-2 px-4 rounded-full">
                                    {item.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </BilingModal>
        </div>
    )
}

export default Subscribe
