'use client'
import React, { ReactNode, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { useAuth } from '@/context/AuthContext'
import { UserPlanProvider } from '@/context/PlanContext'

interface MyProviderProps {
  children: ReactNode
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const { userData } = useAuth()

  useEffect(() => {
    AOS.init({ once: false })
  }, [])

  return (
    <UserPlanProvider userId={userData?.id || null}>
      {children}
    </UserPlanProvider>
  )
}

export default MyProvider
