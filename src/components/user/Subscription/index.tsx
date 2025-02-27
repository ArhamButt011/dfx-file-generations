import Image from 'next/image'
import React, { useState } from 'react'
import Subscribe from './Subscribe'

interface Subscription {
  order_id: string
  plan_name: string
  duration: string
  added_on: string
  expiry_date: string
  expiry_on: string
  charges: number
  status: string
}

interface SubscriptionProps {
  subscriptions: Subscription[]
}

const Index: React.FC<SubscriptionProps> = ({ subscriptions }) => {
  const [isBilingOpen, setIsBilingOpen] = useState(false)
  console.log(subscriptions)
  return (
    <div>
      <p className="font-semibold text-4xl">Subscription Plan</p>
      <p className="font-medium text-lg text-[#00000080] mt-1">
        Manage your subscription and payment details{' '}
      </p>
      <div className="flex mt-5 w-full justify-between gap-10">
        {/* left */}
        <div className="border rounded-2xl p-5 w-full">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-xl">
                Basic plan{' '}
                <span className="font-medium text-xs bg-[#266CA81A] text-[#266CA8] px-2 py-1 rounded-full">
                  Monthly
                </span>
              </p>
              <p className="text-[#00000080] font-medium text-xs mt-2">
                Our most popular plan for small teams.
              </p>
            </div>
            <div>
              <p className="font-medium">
                <span className="text-4xl">$100</span>{' '}
                <span className="text-base text-[#00000066]">/month</span>
              </p>
            </div>
          </div>
          <p className="font-medium text-base text-[#00000080] mt-10">
            Next Renewal Date: <span className="text-black">Apr 10, 2025</span>
          </p>
          <div className="-mx-5 border-t border-[#0000001A] my-5"></div>
          <div className="flex justify-center mt-5">
            <p
              className="font-semibold text-base text-[#266CA8] underline text-center cursor-pointer"
              onClick={() => setIsBilingOpen(true)}
            >
              Upgrade Plan
            </p>
            <Image
              src="/images/user/subscription/diagonalArrow.svg"
              alt="arrow"
              width={25}
              height={25}
            />
          </div>
        </div>
        {/* right */}
        {/* <div className='border rounded-2xl p-5 w-1/2'>
                    <div className="flex justify-between">
                        <div>
                            <p className='font-semibold text-xl'>Payment Method </p>
                            <p className='text-[#00000080] font-medium text-xs mt-2'>Change How you pay for your plan</p>
                        </div>

                    </div>

                    <div className='border rounded-2xl p-3 mt-5 flex justify-between'>
                        <div className="flex">
                            <div className='me-5'>
                                <Image
                                    src="/images/user/subscription/card.svg"
                                    alt='arrow'
                                    width={40}
                                    height={25}
                                />
                            </div>
                            <div>
                                <p className='text-sm font-medium'>021*********021</p>
                                <div className='text-xs font-medium text-[#00000080]'>
                                    <p>Alex Handai</p>
                                    <p className='mt-3'>Expiray Date: <span className='text-black'>06/2025</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-start'>
                            <Image
                                src="/images/user/delete.svg"
                                alt='arrow'
                                width={30}
                                height={25}
                            />
                            <Image
                                src="/images/user/edit.svg"
                                alt='arrow'
                                width={30}
                                height={25}
                            />
                        </div>
                    </div>

                </div> */}
      </div>
      {/* Subscribe Modal */}
      {isBilingOpen && (
        <Subscribe
          isBilingOpen={isBilingOpen}
          setIsBilingOpen={setIsBilingOpen}
        />
      )}
    </div>
  )
}

export default Index
