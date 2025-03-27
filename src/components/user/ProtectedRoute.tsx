'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/Generate_DXF') // Redirect to landing or dashboard page
    }
  }, [isAuthenticated, router])

  return <>{!isAuthenticated() && children}</>
}

export default ProtectedRoute
