import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import SubscribedEmails from '@/components/admin/SubscribedEmails'
import React from 'react'

const page = () => {
  return (
    <DefaultLayout>
      <SubscribedEmails />
    </DefaultLayout>
  )
}

export default page
