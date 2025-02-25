'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface NotificationContextType {
  isActive: boolean
  toggleNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
)

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/admin/get-enable-notification')
        const data = await response.json()

        if (response.ok) {
          setIsActive(data.isActive)
        }
      } catch (error) {
        console.error('Error fetching notification status:', error)
      }
    }

    fetchStatus()
  }, [])

  const toggleNotifications = async () => {
    const newStatus = !isActive
    setIsActive(newStatus)

    try {
      const response = await fetch('/api/admin/enable-notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update notification status')
      }
    } catch (error) {
      console.error('Error updating notification status:', error)
      setIsActive(!newStatus) // Revert UI if request fails
    }
  }

  return (
    <NotificationContext.Provider value={{ isActive, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    )
  }
  return context
}
