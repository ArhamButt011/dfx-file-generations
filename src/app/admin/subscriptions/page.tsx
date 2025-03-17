'use client'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import Subscriptions from '@/components/admin/Subscriptions/Subscriptions'
import withAuth from '@/hoc/withAuth'

import React from 'react'

const page = () => {
  return (
    <div>
      <DefaultLayout>
        <Subscriptions />
      </DefaultLayout>
    </div>
  )
}

export default withAuth(page, ['admin'])
