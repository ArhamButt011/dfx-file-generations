'use client'
import DXFDownloads from '@/components/admin/DXFDownloads/DXFDownloads'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import withAuth from '@/hoc/withAuth'

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

export default withAuth(page, ['admin'])
