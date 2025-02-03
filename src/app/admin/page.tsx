import Login from '@/components/auth/Login'
import React from 'react'

// Defining types for the page component
const Page: React.FC = () => {
  const title = 'Sign In'
  const content =
    'Sign in With your email and password and continue to LumaShape'
  return (
    <div>
      <Login title={title} content={content} />
    </div>
  )
}

export default Page
