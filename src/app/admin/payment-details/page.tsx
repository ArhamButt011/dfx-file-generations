import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import PaymentDetails from '@/components/admin/PaymentDetails/PaymentDetails'

import React from 'react'

const page = () => {
  return (
    <div>
      <DefaultLayout>
        <PaymentDetails />
      </DefaultLayout>
    </div>
  )
}

export default page
