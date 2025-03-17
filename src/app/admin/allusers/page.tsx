'use client'
import AllUsers from '@/components/admin/AllUsers'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import withAuth from '@/hoc/withAuth'

import React from 'react'

const page = () => {
  return (
    <div>
      <DefaultLayout>
        <AllUsers />
      </DefaultLayout>
    </div>
  )
}

export default withAuth(page, ['admin'])
