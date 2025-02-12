import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import Subscriptions from '@/components/admin/Subscriptions/Subscriptions'

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

export default page
