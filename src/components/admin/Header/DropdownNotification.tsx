import { useEffect, useState } from 'react'
import Link from 'next/link'
import ClickOutside from '../ClickOutside'
import notification from '/public/images/admin/notification.svg'
import Image from 'next/image'
import axios from 'axios'
import userImage from '/public/images/userImage.svg'
import '@/components/admin/Header/DropdownNotifications.css'
import { formatDistanceToNowStrict } from 'date-fns'
import { database, ref, onValue, update } from '@/firebase'
import { useNotification } from '@/context/NotificationContext'

interface Notification {
  message: string
  user_name?: string
  email?: string
  image?: string | null
  type?: string
  isReadable?: boolean
  createdAt?: string
}

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifying, setNotifying] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { isActive } = useNotification()

  useEffect(() => {
    const notificationRef = ref(database, 'notifications')

    const unsubscribe = onValue(notificationRef, (snapshot) => {
      if (snapshot.exists()) {
        setNotifying(snapshot.val().isNewNotification || false)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/api/admin/get-notifications')
        setNotifications(res.data.allNotifications || [])
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchNotifications()
  }, [notifying])

  const handleNotificationsClick = async () => {
    setDropdownOpen(!dropdownOpen)

    if (notifying) {
      try {
        const notificationRef = ref(database, 'notifications')
        await update(notificationRef, { isNewNotification: false })

        console.log('Updated isNewNotification to false in Firebase')
        setNotifying(false)
      } catch (error) {
        console.error('Error updating isNewNotification:', error)
      }
    }
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)}>
      <li className="relative">
        <Link
          onClick={handleNotificationsClick}
          href="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full"
        >
          {isActive && notifying && (
            <span className="absolute -top-0.5 right-[4px] z-1 h-2 w-2 rounded-full bg-meta-1">
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
            </span>
          )}
          <Image src={notification} alt="notifications" />
        </Link>
        {dropdownOpen && (
          <div className="absolute -right-4  lg:-right-6.4 xl:-right-7 2xl:-right-11 mt-5 flex h-[92.2vh] w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:-right-5 sm:w-[470px]">
            <div className="px-4.5 py-3">
              <h5 className="text-[27.94px] font-semibold text-[#000000]">
                Notifications
              </h5>
            </div>
            <ul className="flex h-auto flex-col overflow-y-auto modal-body-custom pb-7">
              {notifications?.map((data, index) => (
                <li key={index}>
                  <div className="flex flex-col gap-2.5 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={data?.image ? data.image : userImage}
                          width={60}
                          height={60}
                          alt="userImage"
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex flex-col">
                        <p
                          className="font-medium text-[21.94px]"
                          dangerouslySetInnerHTML={{ __html: data.message }}
                        />
                        <span className="text-[17.94px] text-[#00000066]">
                          {data.createdAt
                            ? formatDistanceToNowStrict(
                                new Date(data.createdAt),
                                { addSuffix: true },
                              )
                            : 'Unknown time'}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  )
}

export default DropdownNotification
