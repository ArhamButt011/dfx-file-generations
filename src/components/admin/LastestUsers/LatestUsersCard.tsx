import Link from 'next/link'
import Image from 'next/image'
import userImage from '/public/images/admin/dashboard/user.svg'

export type LatestUsers = {
  id: number
  avatar: string
  name: string
  email: string
}

const chatData: LatestUsers[] = [
  {
    id: 1,
    avatar: userImage,
    name: 'Devid Heilo',
    email: 'test@gmail.com',
  },
  {
    id: 2,
    avatar: userImage,
    name: 'Henry Fisher',
    email: 'test@gmail.com',
  },
  {
    id: 3,
    avatar: userImage,
    name: 'Jhon Doe',
    email: 'test@gmail.com',
  },
  {
    id: 4,
    avatar: userImage,
    name: 'Jane Doe',
    email: 'test@gmail.com',
  },
  {
    id: 5,
    avatar: userImage,
    name: 'Jhon Doe',
    email: 'test@gmail.com',
  },
  {
    id: 6,
    avatar: userImage,
    name: 'Jhon Doe',
    email: 'test@gmail.com',
  },
]

const LastestUsersCard = () => {
  return (
    <div className="col-span-12 rounded-xl rounded-sm border border-stroke bg-bodydark py-6 xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Latest Added Users
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Image
                width={56}
                height={56}
                src={chat.avatar}
                alt="User"
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
              />
              {/* <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  chat.dot === 6 ? 'bg-meta-6' : `bg-meta-${chat.dot}`
                } `}
              ></span> */}
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  {chat.name}
                </h4>
                <p>
                  <span className="text-sm text-primary dark:text-white">
                    {chat.email}
                  </span>
                  {/* <span className="text-xs"> . {chat.time} min</span> */}
                </p>
              </div>
              {/* {chat.textCount !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {' '}
                    {chat.textCount}
                  </span>
                </div>
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LastestUsersCard
