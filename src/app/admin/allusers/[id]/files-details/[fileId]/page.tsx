'use client'
import React from 'react'
import FileDetails from '@/components/admin/AllUsers/FileDetails'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'

const FileDetailsPage = () => {
  return (
    <div>
      <DefaultLayout>
        <FileDetails />
      </DefaultLayout>
    </div>
  )
}

export default FileDetailsPage
