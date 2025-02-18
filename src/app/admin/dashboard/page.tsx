'use client'
import React, { useEffect } from 'react'
import Dashboard from '@/components/admin/Dashboard'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { userData } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token == null) {
      router.push('/admin')
    } else if (userData?.role === 'user') {
      router.push('/Generate_DXF')
    }
  }, [userData, router])

  return (
    <>
      {userData?.role === 'admin' ? (
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
      ) : null}
    </>
  )
}

export default Page
