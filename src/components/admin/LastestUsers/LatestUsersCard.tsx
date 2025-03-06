import Link from 'next/link'
import Image from 'next/image'
import userImage from '/public/images/admin/dashboard/user.svg'
import '@/components/admin/LastestUsers/LatestUsers.css'
import { useEffect, useState } from 'react'

export type LatestUser = {
  _id: number
  image?: string
  name: string
  lastName: string
  email: string
}
const LastestUsersCard = () => {
  const [latestUsers, setLatestUsers] = useState<LatestUser[]>([])

  useEffect(() => {
    const fetchLatestUsers = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/latest-users')
        const data = await response.json()
        if (data.success) {
          setLatestUsers(data.data)
        }
      } catch (error) {
        console.error('Error fetching summary:', error)
      }
    }

    fetchLatestUsers()
  }, [])

  return (
    <div className="col-span-12 rounded-xl border border-stroke pt-5 bg-bodydark xl:col-span-4 h-[450px]">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Latest Added Users
      </h4>

      {/* Scrollable container for user list */}
      <div className="modal-body-custom h-[375px] overflow-y-auto">
        {latestUsers.map((user, key) => (
          <Link
            href={`/admin/allusers/${user._id}`}
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <Image
                src={user?.image ? user.image : userImage}
                width={56}
                height={56}
                alt="userImage"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  {`${user.name} ${user.lastName}`}
                </h4>
                <p>
                  <span className="text-sm text-primary dark:text-white">
                    {user.email}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LastestUsersCard
