'use client'
import Forgot from '@/components/auth/Forgot'
import withAuth from '@/hoc/withAuth'
import React from 'react'

const Page: React.FC = () => {
  const title = 'Forgot Password'
  const content =
    'Enter your email address so we can send you OTP to reset your password'
  return (
    <div>
      <Forgot title={title} content={content} />
    </div>
  )
}

export default withAuth(Page, ['admin'])
