'use client'
import React from 'react'
import DefaultLayout from '@/components/user/Layout/DefaultLayout'
import withAuth from '@/hoc/withAuth'

function Page() {
  return (
    <DefaultLayout>
      <div>Instructions</div>
    </DefaultLayout>
  )
}

export default withAuth(Page, ['user'])
