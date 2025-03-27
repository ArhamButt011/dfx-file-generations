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
      const currentPath =
        typeof window !== 'undefined' ? window.location.pathname : ''

      if (!isAuthenticated() || !userData) {
        // Redirect unauthenticated users based on the route they are trying to access
        if (currentPath.startsWith('/admin')) {
          router.replace('/admin') // Redirect to admin login
        } else {
          router.replace('/user') // Redirect to user login
        }
        return
      }

      // Redirect logged-in users if they try to access the wrong section
      if (userData.role === 'user' && currentPath.startsWith('/admin')) {
        router.replace('/Generate_DXF') // User trying to access admin routes
      } else if (userData.role === 'admin' && !allowedRoles.includes('admin')) {
        router.replace('/admin/dashboard') // Admin trying to access user routes
      }
    }, [userData, isAuthenticated, router])

    // Prevent rendering if the user is not authorized
    if (
      !isAuthenticated() ||
      !userData ||
      !allowedRoles.includes(userData.role)
    ) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
