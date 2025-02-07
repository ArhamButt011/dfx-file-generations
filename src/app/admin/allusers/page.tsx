import AllUsers from '@/components/admin/AllUsers'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'

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

export default page
