'use client'
import DownloadedFilesDetails from '@/components/admin/DXFDownloads/DownloadedFilesDetails'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import withAuth from '@/hoc/withAuth'
import React from 'react'

const Page = () => {
  return (
    <div>
      <DefaultLayout>
        <DownloadedFilesDetails />
      </DefaultLayout>
    </div>
  )
}

export default withAuth(Page, ['admin'])
