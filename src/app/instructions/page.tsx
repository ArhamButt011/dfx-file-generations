'use client'
import React from 'react'
import DefaultLayout from '@/components/user/Layout/DefaultLayout'
import withAuth from '@/hoc/withAuth'
import Instructions from '@/components/user/Instructions'

function Page() {
  return (
    <DefaultLayout>
      <Instructions />
    </DefaultLayout>
  )
}

export default withAuth(Page, ['user'])
