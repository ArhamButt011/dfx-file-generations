'use client'
import React, { useEffect, useState } from 'react'
import userImage from '/public/images/userImage.svg'
import email from '/public/images/admin/email.jpg'
import Image from 'next/image'
import backImage from '/public/images/user/GenerateDFX/backImage.svg'
import Link from 'next/link'

interface UserData {
  _id: string
  name: string
  lastName: string
  email: string
  createdAt: string
  image: string
}
interface UserDetailsProps {
  userId: string
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/admin/get-card-details/${userId}`)
        if (response.ok) {
          const data: UserData = await response.json()
          setUserData(data)
          console.log('Fetched user data:', data)
        } else {
          console.error('Failed to fetch user data')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (userId) fetchUserData()
  }, [userId])

  return (
    <>
      <div className="flex items-center gap-2">
        <Link href="/admin/dxf-downloads">
          <Image
            src={backImage}
            height={27}
            width={27}
            alt="Back"
            className="cursor-pointer"
          />
        </Link>
        <h2 className="text-lg sm:text-2xl font-semibold">
          Downloaded Files Details
        </h2>
      </div>
      <div className="flex justify-between p-5 flex-col md:flex-row">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="">
            <Image
              src={userData?.image ? userData?.image : userImage}
              alt="useravatar"
              height={175}
              width={178}
              className="rounded-3xl"
            />
          </div>
          <div className="flex justify-center flex-col">
            <h1 className="text-[32.6px] font-semibold text-[#000000]">
              {userData?.name} {userData?.lastName}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span>
                <Image src={email} alt="email" width={23} height={18} />
              </span>
              <span className="text-primary text-[18.84px] font-medium">
                {userData?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails
