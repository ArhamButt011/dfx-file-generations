import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Subscribe from '../Subscription/Subscribe'

interface UserPlan {
  plan_name: string
  duration: number
  user_id: string
  added_on: string
  expiry_on: string
  charges: number
  added_date: string
  expiry_date: string
}

function Title() {
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null)
  const [isBilingOpen, setIsBilingOpen] = useState(false) // Use the correct spelling

  const { userData } = useAuth()
  const userId = userData?.id

  useEffect(() => {
    async function fetchUserPlan() {
      try {
        const response = await fetch('/api/user/get-user-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        })

        const data = await response.json()
        if (data?.subscription) {
          setUserPlan(data.subscription)
        }
      } catch (error) {
        console.error('Error fetching user plan:', error)
      }
    }

    if (userId) {
      fetchUserPlan()
    }
  }, [userId])

  const isTrialExpired = userPlan && new Date(userPlan.expiry_date) < new Date()

  return (
    <div>
      {/* Show active trial message if the trial is still valid */}
      {userPlan && userPlan.charges === 0 && !isTrialExpired && (
        <div className="bg-[#F2F2F2] p-4 sm:p-6 rounded-2xl">
          <p className="text-[#266CA8] font-medium text-xl sm:text-2xl text-left">
            Free Trial Active
          </p>
          <p className="font-medium text-lg sm:text-xl text-[#00000080] text-left mt-2">
            You have successfully activated your free trial on{' '}
            <span className="text-black font-medium">{userPlan.added_on}</span>{' '}
            and it will end on{' '}
            <span className="text-black font-medium">{userPlan.expiry_on}</span>
            .
          </p>
        </div>
      )}

      {/* Show expired message if the trial has ended */}
      {userPlan && userPlan.charges === 0 && isTrialExpired && (
        <div className="bg-[#F2F2F2] p-4 sm:p-6 rounded-2xl">
          <div>
            <p className="text-[#D9534F] font-medium text-xl sm:text-2xl text-center sm:text-left">
              Your Free Trial Has Expired
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="font-medium text-lg sm:text-xl text-[#00000080] text-center sm:text-left mt-2 sm:mt-0">
              To continue using our services, please upgrade to a paid plan.
            </p>
            <button
              onClick={() => setIsBilingOpen(true)} // Open the modal when clicked
              className="mt-2 sm:mt-0 bg-[#266CA8] text-white px-5 sm:px-6 py-3 rounded-3xl font-medium hover:bg-[#1E5A8A] transition"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      <p className="font-semibold text-2xl sm:text-3xl mt-6 text-center sm:text-left">
        Generate DXF
      </p>

      {/* Render the subscription modal when needed */}
      {isBilingOpen && (
        <Subscribe
          isBilingOpen={isBilingOpen}
          setIsBilingOpen={setIsBilingOpen}
        />
      )}
    </div>
  )
}

export default Title
