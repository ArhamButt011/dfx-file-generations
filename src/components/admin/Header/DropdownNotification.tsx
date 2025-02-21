import { useEffect, useState } from 'react'
import Link from 'next/link'
import ClickOutside from '../ClickOutside'
import notification from '/public/images/admin/notification.svg'
import Image from 'next/image'
import axios from 'axios'
import userImage from '/public/images/userImage.svg'
import '@/components/admin/Header/DropdownNotifications.css'
import { formatDistanceToNowStrict } from 'date-fns'

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
  const [notifying, setNotifying] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/api/admin/get-notifications')
        console.log(res.data.allNotifications)
        setNotifications(res.data.allNotifications || [])
        setNotifying(res.data.allNotifications[0].isReadable)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }
    fetchNotifications()
  }, [])

  const handleNotificationsClick = async () => {
    if (!notifying) {
      setNotifying(true)
    }
    setDropdownOpen(!dropdownOpen)
    try {
      await axios.put('/api/admin/update-notifications')
    } catch (error) {
      console.error('Error updating notifications:', error)
    }
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={handleNotificationsClick}
          href="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full"
        >
          <span
            className={`absolute -top-0.5 right-[4px] z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === true ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
          <Image src={notification} alt="notifications" />
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-10 mt-5 flex h-[90vh] w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:-right-11 sm:w-[470px]`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-[27.94px] font-semibold text-[#000000]">
                Notifications
              </h5>
            </div>
            <ul className="flex h-auto flex-col overflow-y-auto modal-body-custom">
              {notifications?.map((data, index) => (
                <li key={index}>
                  <div className="flex flex-col gap-2.5 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
                    <div className="flex gap-4">
                      <span className="h-15 w-15 overflow-hidden rounded-full">
                        <Image
                          src={data?.image ? data.image : userImage}
                          width={60}
                          height={50}
                          alt="userImage"
                          className="rounded-full mt-1"
                        />
                      </span>
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
