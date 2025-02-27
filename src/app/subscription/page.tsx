'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Index from '@/components/user/Subscription'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import DefaultLayout from '@/components/user/Layout/DefaultLayout'
import SubscriptionTable from '@/components/user/Subscription/SubscriptionTable'

interface Subscriptions {
  order_id: string
  plan_name: string
  duration: string
  added_on: string
  expiry_date: string
  expiry_on: string
  charges: number
  status: string
}
function Page() {
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([])

  const { logout, userData } = useAuth()
  const router = useRouter()
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        logout()
        router.push('/user')
        return
      }
      try {
        await axios.post('/api/auth/verifyToken', { token })
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.log('Token expired or invalid. Logging out...')
          logout()
          router.push('/user')
        }
      }
    }
    verifyToken()
  }, [token, router])

  const fetchSubscriptions = useCallback(async () => {
    if (!userData?.id) return

    try {
      setLoadingTable(true)
      const response = await fetch(
        `/api/admin/get-subscriptions/${userData.id}`,
      )

      if (response.ok) {
        const data = await response.json()
        console.log('subscriptions-> ', data)
        setSubscriptions(data.subscriptions)
      } else {
        console.log('Failed to fetch users')
      }
    } catch (error) {
      console.log('Error fetching users:', error)
    } finally {
      setLoadingTable(false)
    }
  }, [userData?.id])

  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])

  return (
    <DefaultLayout>
      <Index subscriptions={subscriptions} />
      <SubscriptionTable
        subscriptions={subscriptions}
        loadingTable={loadingTable}
      />
    </DefaultLayout>
  )
}

export default Page
