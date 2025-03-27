'use client'
import React from 'react'
import FileDetails from '@/components/admin/AllUsers/FileDetails'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import withAuth from '@/hoc/withAuth'

const FileDetailsPage = () => {
  return (
    <div>
      <DefaultLayout>
        <FileDetails />
      </DefaultLayout>
    </div>
  )
}

export default withAuth(FileDetailsPage, ['admin'])
