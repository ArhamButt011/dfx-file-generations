import { loadStripe } from '@stripe/stripe-js'
// import { useState } from 'react'
import BilingModal from '@/components/UI/BilingModal'
import Image from 'next/image'
import axios from 'axios'
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)
import { useAuth } from '@/context/AuthContext'

type included = {
  id: number
  text: string
}

type DataItem = {
  id: number
  desc: string
  price_id: string
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
    price_id: '',
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
    price: '$20.00',
    price_id: 'price_1QwMSZLPfX4joK3zUDF3sbax',
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
    price: '$50.00/Month',
    price_id: 'price_1QwM6PLPfX4joK3zKgOIQBsp',
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
  isBilingOpen: boolean
  setIsBilingOpen: (open: boolean) => void
}

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
  //   const router = useRouter()
  const { userData } = useAuth()

  const onClose = () => {
    setIsBilingOpen(false)
  }

  const handleSubscribe = async (price_id: string) => {
    try {
      const res = await axios.post('/api/user/checkout', {
        price_id: price_id,
        user_id: userData?.id,
      })
      console.log('subscription reponse-> ', res)

      if (!res.data.sessionId) throw new Error('Missing sessionId from API')

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to initialize')

      await stripe.redirectToCheckout({ sessionId: res.data.sessionId })
    } catch (error) {
      console.error('Checkout Error:', error)
    }
  }

  return (
    // <div>
    <BilingModal
      isOpen={isBilingOpen}
      onClose={onClose}
      buttonContent={
        <p className="text-[#266CA8] font-semibold text-2xl">Skip</p>
      }
    >
      <div>
        <div className="text-center">
          <p className="font-semibold text-3xl">
            Choose Your Subscription Plan
          </p>
          <p className="font-medium text-xl text-[#00000080]">
            Choose a plan that fits your needs, and let&apos;s start designing
            together.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {bilingPlans.map((item) => (
            <div
              key={item.id}
              className="border p-4 w-full md:w-[48%] lg:max-w-[32%] rounded-2xl flex flex-col justify-between"
            >
              <div>
                <p className="font-medium text-base text-[#22222280]">
                  {item.desc}
                </p>
                <p className="font-semibold text-3xl">{item.title}</p>
                <p className="mt-6">
                  <span className="text-4xl font-semibold text-[#266CA8]">
                    {item.price.split('/')[0]}
                  </span>
                  <span className="text-base text-[#22222280] font-medium">
                    /{item.price.split('/')[1]}
                  </span>
                </p>
                <p className="font-semibold text-base mt-5">
                  What&apos;s Included
                </p>
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
              <button
                className="mt-4 bg-[#266CA8] text-white py-2 px-4 rounded-full"
                onClick={() => handleSubscribe(item.price_id)}
                // disabled={loadingId === item.id}
              >
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </BilingModal>
    // </div>
  )
}

export default Subscribe
