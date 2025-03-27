'use client'
import axios from 'axios'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'

interface UserData {
  id: string
  name: string
  email: string
  role: string
  [key: string]: string
}

interface AuthContextType {
  userData: UserData | null
  login: (token: string) => void
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
  logout: () => void
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    const fetchUserData = async () => {
      if (!storedToken) return

      const formData = {
        token: storedToken,
      }

      try {
        const response = await axios.post<UserData>(
          '/api/auth/verifyToken',
          formData,
        )
        console.log('Data from API:', response.data)
        setUserData(response.data)
      } catch (error) {
        console.error('API Error:', error)

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          logout()
          setTimeout(() => {
            router.push('/user')
          }, 0)
        }
      }
    }

    fetchUserData()
  }, [isLoggedIn, router])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('selectedMenu')
    sessionStorage.removeItem('billingTriggered')
    sessionStorage.clear()
    setUserData(null)
    setIsLoggedIn(false)
  }

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token')
  }

  return (
    <AuthContext.Provider
      value={{ userData, login, logout, isAuthenticated, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
