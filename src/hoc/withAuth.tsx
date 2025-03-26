import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const withAuth = <P extends object>(
  WrappedComponent: React.FC<P>,
  allowedRoles: string[],
) => {
  return function ProtectedRoute(props: P) {
    const { userData, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated || !userData) {
        if (window.location.pathname.startsWith('/admin')) {
          router.replace('/admin') // Redirect unauthenticated users to admin login
        } else {
          router.replace('/user') // Redirect unauthenticated users to user login
        }
        return
      }

      // Block users from accessing any /admin routes
      if (
        userData.role === 'user' &&
        window.location.pathname.startsWith('/admin')
      ) {
        router.replace('/Generate_DXF') // Redirect users trying to access admin routes
      }

      // Block admins from accessing user routes
      if (userData.role === 'admin' && !allowedRoles.includes('admin')) {
        router.replace('/admin/dashboard') // Redirect admins trying to access user routes
      }
    }, [userData, isAuthenticated, router])

    if (
      !isAuthenticated ||
      !userData ||
      !allowedRoles.includes(userData.role)
    ) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
