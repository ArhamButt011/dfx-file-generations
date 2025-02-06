import ResetPassword from '@/components/auth/ResetPassword'
import React from 'react'

// Defining types for the page component
const Page: React.FC = () => {
  const title = 'Reset Password'
  const content =
    'Enter your new password so that you can access back to your account'
  return (
    <div>
      <ResetPassword title={title} content={content} />
    </div>
  )
}

export default Page
