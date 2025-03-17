import React from 'react'
import UserLogin from '@/components/userAuth/UserLogin'
import ProtectedRoute from '@/components/user/ProtectedRoute'

function Login() {
  return (
    <>
      <ProtectedRoute>
        <UserLogin />
      </ProtectedRoute>
    </>
  )
}

export default Login
