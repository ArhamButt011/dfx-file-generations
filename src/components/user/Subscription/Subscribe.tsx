import { loadStripe } from '@stripe/stripe-js'
// import { useState } from 'react'
import BilingModal from '@/components/UI/BilingModal'
import Image from 'next/image'
import axios from 'axios'
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import Swal from 'sweetalert2'

type included = {
  id: number
  text: string
}

type DataItem = {
  id: number
  desc: string
  price_id: string
  plan_name: string
  price: string
  include: included[]
  buttonText: string
}

const bilingPlans: DataItem[] = [
  {
    id: 1,
    desc: '',
    plan_name: 'Free',
    price: 'Free',
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
    desc: 'For Small Teams',
    plan_name: 'Basic',
    price: '$50/Month',
    price_id: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
    include: [
      {
        id: 1,
        text: 'Unlimited DXF downloads',
      },
      {
        id: 2,
        text: 'Full access to DXF customization tools',
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
  {
    id: 3,
    desc: 'For Professionals',
    plan_name: 'Coming Soon...',
    price: '$100/Month',
    price_id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
    include: [
      {
        id: 1,
        text: 'Unlimited DXF downloads',
      },
      {
        id: 2,
        text: 'Full access to DXF customization tools',
      },
      {
        id: 3,
        text: 'Batch image processing (up to 4 images per batch)',
      },
      {
        id: 4,
        text: 'Advanced file management (organize, rename, and tag DXF files)',
      },
      {
        id: 5,
        text: 'Automated cloud backup C sync',
      },
      {
        id: 6,
        text: 'Customer Support',
      },
      {
        id: 7,
        text: 'Cancel or modify anytime',
      },
      {
        id: 8,
        text: 'Secure payment processing',
      },
    ],
    buttonText: 'Get Started',
  },
]
type SubscribeProps = {
  isBilingOpen: boolean
  setIsBilingOpen: (open: boolean) => void
  // planName: string
}

function Subscribe({
  isBilingOpen,
  setIsBilingOpen,
}: // planName,
SubscribeProps) {
  // const [isBilingOpen, setIsBilingOpen] = useState<boolean>(false);
  //   const router = useRouter()
  const { userData, setUserData } = useAuth()
  const [processingPlanId, setProcessingPlanId] = useState<number | null>(null)

  const onClose = () => {
    setIsBilingOpen(false)
  }

  const handleSubscribe = async (
    price_id: string,
    plan_name: string,
    planId: number,
  ) => {
    if (!userData?.id) return
    setProcessingPlanId(planId)
    const data = {
      plan_name: 'Free',
      duration: '7 Days',
      user_id: userData?.id,
      added_on: new Date().toISOString(),
      expiry_on: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      charges: 0,
      status: 'Current',
      added_date: Date.now(),
      expiry_date: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }
    try {
      if (plan_name === 'Free') {
        const res = await axios.post('/api/user/subscription', data)
        if (res.status === 201) {
          setUserData((prev) =>
            prev ? { ...prev, subscription: 'Free' } : prev,
          )
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Free Trial started successfully',
            timer: undefined,
            showConfirmButton: false,
            // confirmButtonText: 'Close',
            showCloseButton: true,
            didOpen: () => {
              const swalContainer = document.querySelector(
                '.swal2-container',
              ) as HTMLElement
              if (swalContainer) {
                swalContainer.style.setProperty(
                  'z-index',
                  '100000',
                  'important',
                )
              }
            },
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Failed to start free trial',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
            didOpen: () => {
              const swalContainer = document.querySelector(
                '.swal2-container',
              ) as HTMLElement
              if (swalContainer) {
                swalContainer.style.setProperty(
                  'z-index',
                  '100000',
                  'important',
                )
              }
            },
          })
        }
      } else {
        // Proceed with regular subscription flow
        const res = await axios.post('/api/user/checkout', {
          price_id: price_id,
          user_id: userData.id,
          plan_name: plan_name,
        })

        if (!res.data.sessionId) throw new Error('Missing sessionId from API')

        const stripe = await stripePromise
        if (!stripe) throw new Error('Stripe failed to initialize')

        await stripe.redirectToCheckout({ sessionId: res.data.sessionId })
      }
    } catch (error) {
      console.error('Checkout Error:', error)
    } finally {
      setProcessingPlanId(null)
    }
  }

  return (
    // <div>
    <>
      <BilingModal
        isOpen={isBilingOpen}
        onClose={onClose}
        buttonContent={
          <p className="text-[#266CA8] font-semibold text-2xl">Skip</p>
        }
      >
        <div>
          <div className="md:text-center">
            <p className="font-semibold md:text-3xl text-2xl sm:w-full w-[50%]">
              Choose Your Subscription Plan
            </p>
            <p className="font-medium md:text-xl text-lg text-[#00000080]">
              Choose a plan that fits your needs, and let&apos;s start designing
              together.
            </p>
          </div>
          <div className="flex sm:flex-row flex-col justify-center gap-4 mt-10">
            {bilingPlans.map((item) => (
              <div
                key={item.id}
                className="border p-4 w-full md:w-[48%] lg:max-w-[32%] rounded-2xl flex flex-col justify-between h-[590px] sm:h-auto"
              >
                <div>
                  <p className="font-medium text-base text-[#22222280]">
                    {item.desc}
                  </p>
                  <p className="font-semibold text-3xl">{item.plan_name}</p>
                  <p className="mt-6">
                    <span className="text-4xl font-semibold text-[#266CA8]">
                      {item.price.split('/')[0]}
                    </span>
                    <span className="text-base text-[#22222280] font-medium">
                      {item.price !== 'Free' && '/'}
                      {item.price.split('/')[1]}
                    </span>
                  </p>
                  <p className="font-semibold text-base mt-5">
                    What&apos;s Included
                  </p>
                  {item.include.map((inc) => (
                    <div key={inc.id} className="flex items-start gap-2">
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
                {
                  <button
                    className={`mt-4 py-2 px-4 rounded-full ${
                      item.plan_name === userData?.subscription ||
                      processingPlanId === item.id ||
                      item.plan_name === 'Coming Soon...'
                        ? 'bg-[#266CA8] text-white cursor-not-allowed opacity-70'
                        : 'bg-[#266CA8] text-white cursor-pointer'
                    }`}
                    onClick={() =>
                      handleSubscribe(item.price_id, item.plan_name, item.id)
                    }
                    disabled={
                      item.plan_name === userData?.subscription ||
                      processingPlanId === item.id ||
                      item.plan_name === 'Coming Soon...'
                    }
                  >
                    {processingPlanId === item.id
                      ? 'Processing...'
                      : item.buttonText}
                  </button>
                }
              </div>
            ))}
          </div>
        </div>
      </BilingModal>
    </>

    // </div>
  )
}

export default Subscribe
