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
      if (userData) {
        if (userData.role === 'admin' && !allowedRoles.includes('admin')) {
          router.push('/admin/dashboard') // Redirect Admin if accessing user pages
        } else if (userData.role === 'user' && !allowedRoles.includes('user')) {
          router.push('/Generate_DXF') // Redirect User if accessing admin pages
        }
      }
    }, [userData, isAuthenticated, router])

    return userData && allowedRoles.includes(userData.role) ? (
      <WrappedComponent {...props} />
    ) : null
  }
}

export default withAuth
