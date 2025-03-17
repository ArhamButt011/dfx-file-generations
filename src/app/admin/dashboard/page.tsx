'use client'
import React from 'react'
import Dashboard from '@/components/admin/Dashboard'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
// import { useAuth } from '@/context/AuthContext'
// import { useRouter } from 'next/navigation'
import withAuth from '@/hoc/withAuth'

const Page = () => {
  // const { userData } = useAuth()
  // const router = useRouter()

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token == null) {
  //     router.push('/admin')
  //   } else if (userData?.role === 'user') {
  //     router.push('/Generate_DXF')
  //   }
  // }, [userData, router])

  return (
    <>
      {/* {userData?.role === 'admin' ? ( */}
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
      {/* ) : null} */}
    </>
  )
}
export default withAuth(Page, ['admin'])
