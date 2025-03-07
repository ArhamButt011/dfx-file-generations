'use client'
import React from 'react'
import DefaultLayout from '@/components/user/Layout/DefaultLayout'
// import { useAuth } from '@/context/AuthContext'
import FileDetails from '@/components/user/FileDetails'

const page = () => {
  // const { userData } = useAuth()
  return (
    <div>
      {/* {userData?.role === 'user' && ( */}
      <DefaultLayout>
        <FileDetails />
      </DefaultLayout>
      {/* )} */}
    </div>
  )
}

export default page
