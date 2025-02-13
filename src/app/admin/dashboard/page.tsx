'use client'
import React from 'react'
import Dashboard from '@/components/admin/Dashboard'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { userData } = useAuth()
  const token = localStorage.getItem('token')

  const router = useRouter()
  if (token == null) {
    router.push('/admin')
  }
  if (userData?.role === 'user') {
    router.push('/Generate_DXF')
  }

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
