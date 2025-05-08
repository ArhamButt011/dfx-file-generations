'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

interface UserPlan {
  plan_name: string
  duration: number
  user_id: string
  added_on: string
  expiry_on: string
  charges: number
  added_date: string
  expiry_date: string
  isLifeTimeAccess?: boolean
}

interface UserPlanContextType {
  userPlan: UserPlan | null
  setUserPlan: React.Dispatch<React.SetStateAction<UserPlan | null>>
  fetchUserPlan: (userId: string) => Promise<void>
}

const UserPlanContext = createContext<UserPlanContextType | undefined>(
  undefined,
)

export const useUserPlan = (): UserPlanContextType => {
  const context = useContext(UserPlanContext)
  if (!context) {
    throw new Error('useUserPlan must be used within a UserPlanProvider')
  }
  return context
}

interface UserPlanProviderProps {
  userId: string | null
  children: ReactNode
}

export const UserPlanProvider: React.FC<UserPlanProviderProps> = ({
  userId,
  children,
}) => {
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null)

  const fetchUserPlan = async (userId: string) => {
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

  useEffect(() => {
    if (userId) {
      fetchUserPlan(userId)
    }
  }, [userId])

  return (
    <UserPlanContext.Provider value={{ userPlan, setUserPlan, fetchUserPlan }}>
      {children}
    </UserPlanContext.Provider>
  )
}
