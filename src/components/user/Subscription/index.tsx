import Image from 'next/image'
import React, { useState } from 'react'
import Subscribe from './Subscribe'
import { format } from 'date-fns'
import Modal from '@/components/UI/Modal'
import dltCircle from '/public/images/admin/allusers/dltCircle.svg'
import Swal from 'sweetalert2'
import { useAuth } from '@/context/AuthContext'
import upgradeImage from '/public/images/upgrade.svg'
import Text from '@/components/UI/Text'
import Button from '@/components/UI/Button'

interface Subscription {
  order_id: string
  plan_name: string
  duration: string
  added_on: string
  expiry_date: string
  expiry_on: string
  charges: number
  status: string
  subscription_id: string
}

interface SubscriptionProps {
  subscriptions: Subscription[]
  loadingTable: boolean
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>
}
const Index: React.FC<SubscriptionProps> = ({
  subscriptions,
  setSubscriptions,
  loadingTable,
}) => {
  const [isBilingOpen, setIsBilingOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { setUserData } = useAuth()
  const [loading, setLoading] = useState(false)

  async function cancelSubscription(subscriptionId: string) {
    setLoading(true)
    try {
      const response = await fetch('/api/user/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription_id: subscriptionId }),
      })

      const data = await response.json()

      if (data.message === 'Subscription canceled') {
        Swal.fire({
          icon: 'success',
          title: 'Subscription canceled',
          text: 'Subscription canceled successfully',
          showConfirmButton: false,
          timer: 2000,
        })
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.map((subscription) =>
            subscription.subscription_id === subscriptionId &&
            subscription.status === 'Current'
              ? {
                  ...subscription,
                  status: 'Canceled',
                  expiry_on: new Date().toISOString(),
                }
              : subscription,
          ),
        )
        setUserData((prevData) => ({
          ...prevData,
          id: prevData?.id || '',
          name: prevData?.name || '',
          email: prevData?.email || '',
          role: prevData?.role || '',
          username: prevData?.name || '',
          image: prevData?.image || '',
          subscription: '',
        }))
      } else {
        console.error('Error canceling subscription:', data)
        Swal.fire({
          icon: 'error',
          title: 'Cancellation Failed',
          text: 'Error canceling subscription.',
          showConfirmButton: false,
          timer: 2000,
        })
      }
      setIsOpen(false)
    } catch (error) {
      console.error('Error canceling subscription:', error)
      Swal.fire({
        icon: 'error',
        title: 'Cancellation Failed',
        text: 'Error canceling subscription.',
      })
    } finally {
      setLoading(false)
    }
  }
  const onClose = () => {
    setIsOpen(false)
  }

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === 'Current',
  )
  const subscription_id = activeSubscriptions[0]?.subscription_id ?? null

  return (
    <div>
      <p className="font-semibold text-[22px] sm:text-[26px] mt-6 text-left">
        Subscription Plan
      </p>
      <p className="font-medium sm:text-[16px] text-[14px] text-[#00000080] mt-1">
        Manage your subscription and payment details
      </p>
      <div className="flex mt-5 w-full justify-between gap-10">
        {/* left */}
        <div className="border rounded-2xl sm:p-5 px-4 py-5 w-full">
          {subscriptions[0]?.status === 'Current' &&
          subscriptions[0]?.plan_name !== 'Free' ? (
            <>
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-[19px] sm:text-[24px] flex items-center md:gap-2 gap-1">
                    <div>{subscriptions[0]?.plan_name} Plan </div>

                    <div className="font-medium text-[12px] sm:text-[16px] bg-[#266CA81A] text-[#266CA8] px-2 py-[2px] rounded-full">
                      Monthly
                    </div>
                  </p>
                  <p className="text-[14px] sm:text-[16px] text-[#00000080] font-medium mt-1">
                    {subscriptions[0]?.plan_name === 'Basic'
                      ? 'Our most popular plan for small teams.'
                      : ''}
                  </p>
                </div>
                <div>
                  <p className="flex items-end">
                    <span className="text-[19px] sm:text-[24px] font-medium">
                      ${subscriptions[0]?.charges}
                    </span>{' '}
                    <span className="text-[#00000066] sm:text-[16px] text-[13px] mb-[1px] sm:mb-[0px]">
                      /Month
                    </span>
                  </p>
                </div>
              </div>
              <p className="font-medium sm:text-[16px] text-[14px] text-[#00000080] mt-10">
                Next Renewal Date:{' '}
                <span className="text-black">
                  {subscriptions[0]?.expiry_on
                    ? format(
                        new Date(subscriptions[0]?.expiry_on),
                        'MMM dd, yyyy',
                      )
                    : 'N/A'}
                </span>
              </p>
            </>
          ) : subscriptions[0]?.status === 'Current' &&
            subscriptions[0]?.plan_name === 'Free' ? (
            <div className="font-semibold sm:text-[16px] text-[14px]">
              Free Trial Activated.
            </div>
          ) : (
            <div className="font-semibold sm:text-[16px] text-[14px]">
              No subcription added yet
            </div>
          )}
          <div className="-mx-5 border-t border-[#0000001A] my-5"></div>
          <div className="flex items-center justify-end gap-4">
            {subscriptions.some(
              (sub) => sub.status === 'Current' && sub.plan_name !== 'Free',
            ) && (
              <div className="flex justify-center items-center">
                <p
                  className="font-semibold text-[#266CA8] sm:text-[16px] text-[14px] underline cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  Cancel Subscription
                </p>
                <img
                  src="/images/user/subscription/diagonalArrow.svg"
                  alt="arrow"
                  className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px]"
                />
              </div>
            )}

            {!loadingTable && (
              <div>
                <button
                  className="font-medium text-[13px] sm:text-[17.94px]  text-[#FFFFFF] bg-[#266CA8] px-3 py-1 rounded-full"
                  onClick={() => setIsBilingOpen(true)}
                >
                  <div className="flex gap-1 sm:gap-2 items-center sm:text-[16px] text-[14px]">
                    <Image
                      src={upgradeImage}
                      alt="upgrade"
                      width={18}
                      height={17}
                      className="sm:h-[17px] sm:w-[18px] h-[12px] w-[15px]"
                    />
                    Upgrade Plan
                  </div>
                </button>
              </div>
            )}
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
      <Modal isOpen={isOpen} onClose={onClose} buttonContent="">
        <div className="flex items-center flex-col">
          <Image src={dltCircle} alt="dltCircle" className="" />
          <Text as="h3" className=" font-medium">
            Cancel Subscription?
          </Text>
          <Text className="text-primary text-center mt-1">
            Are you sure you want to Cancel This Subscription??
          </Text>
          <div className="w-full flex gap-10 mt-5 max-w-sm">
            <Button variant="outlined" onClick={() => onClose()}>
              No
            </Button>
            <Button
              onClick={() => cancelSubscription(subscription_id)}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Yes'}
            </Button>
          </div>
        </div>
      </Modal>
      {/* Subscribe Modal */}
      {isBilingOpen && (
        <Subscribe
          isBilingOpen={isBilingOpen}
          setIsBilingOpen={setIsBilingOpen}
          // planName={subscriptions[0]?.plan_name}
        />
      )}
    </div>
  )
}

export default Index
