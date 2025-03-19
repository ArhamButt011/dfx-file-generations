'use client'
import React, { useEffect, useState } from 'react'
import userImage from '/public/images/userImage.svg'
import email from '/public/images/admin/email.jpg'
import Image from 'next/image'
import backImage from '/public/images/user/GenerateDFX/backImage.svg'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Text from '@/components/UI/Text'

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
  const searchParams = useSearchParams()
  const source = searchParams.get('source') || 'defaultSource'
  const page = searchParams.get('page') || '1'

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
        <Link
          href={{
            pathname: '/admin/dxf-downloads',
            query: { source, page },
          }}
        >
          <Image
            src={backImage}
            height={27}
            width={27}
            alt="Back"
            className="cursor-pointer"
          />
        </Link>
        <Text as="h3" className="font-semibold">
          Downloaded Files Details
        </Text>
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
            <Text as="h3" className="font-semibold text-[#000000]">
              {userData?.name} {userData?.lastName}
            </Text>
            <div className="flex items-center gap-2 mt-2">
              <span>
                <Image src={email} alt="email" width={20} height={17} />
              </span>
              <Text as="p1" className="text-primary font-medium">
                {userData?.email}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails
