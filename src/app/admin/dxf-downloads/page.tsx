import DXFDownloads from '@/components/admin/DXFDownloads/DXFDownloads'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'

import React from 'react'

const page = () => {
  return (
    <div>
      <DefaultLayout>
        <DXFDownloads />
      </DefaultLayout>
    </div>
  )
}

export default page
