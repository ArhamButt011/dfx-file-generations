'use client'
import React from 'react'
import UserDetails from '@/components/admin/AllUsers/UserDetails'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'

// interface User {
//   id: string
//   name: string
//   email: string
//   addedOn: string
//   downloads: number
// }
const page = () => {
  return (
    <div>
      <DefaultLayout>
        <UserDetails />
      </DefaultLayout>
    </div>
  )
}

export default page
