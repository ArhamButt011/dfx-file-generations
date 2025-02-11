import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import userImage from '/public/images/admin/avatar.jpg'
import email from '/public/images/admin/email.jpg'
import cardImage from '/public/images/admin/card.jpg'
import dltCircle from '/public/images/admin/allusers/dltCircle.svg'
import DownloadsSubscriptions from './DownloadsSubscriptions'
import Modal from '@/components/UI/Modal'
import { format } from 'date-fns'

interface CardDetails {
  holder_name: string
  expiry_date: string
}

interface UserData {
  name: string
  email: string
  createdAt: string
  cards: CardDetails[]
}

const UserDetails: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const { id } = useParams<{ id: string }>()

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/admin/get-card-details/${id}`)
        if (response.ok) {
          const data: UserData = await response.json() // Ensure to parse the response
          setUserData(data)
          console.log('Fetched user data:', data)
        } else {
          console.error('Failed to fetch user data')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (id) fetchUserData()
  }, [id])

  const handleDelete = (id: number) => {
    console.log(id)
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex justify-between bg-[#F5F5F5] rounded-2xl p-5 flex-col md:flex-row">
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <Image src={userImage} alt="useravatar" className="rounded-3xl" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">{userData?.name}</h1>
            <div className="flex items-center gap-2">
              <span>
                <Image src={email} alt="email" />
              </span>
              <span className="text-primary text-md">{userData?.email}</span>
            </div>
            <p className="mt-5">
              <span className="text-primary text-md">Added On: </span>
              {userData &&
                format(new Date(userData?.createdAt), 'MMM dd, yyyy')}
            </p>
            <div className="flex gap-2 bg-white rounded-lg px-2 py-2 mt-4">
              <div>
                <Image src={cardImage} alt="cardimage" />
              </div>
              <div>
                <p className="text-md">021*************021</p>
                <p className="text-md text-primary">
                  {userData?.cards?.[0]?.holder_name}
                </p>
                <p className="text-md">
                  <span className="text-md text-primary">Expiry Date: </span>
                  <span>
                    {userData?.cards?.[0]?.expiry_date &&
                      format(
                        new Date(userData.cards[0].expiry_date),
                        'MMM dd, yyyy',
                      )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-[#FA3D43] text-white py-2 px-4 rounded-md mt-5 md:mt-0"
            onClick={() => handleDelete(1)}
          >
            Delete User
          </button>
        </div>
      </div>
      <DownloadsSubscriptions />
      <Modal isOpen={isOpen} onClose={onClose} buttonContent="">
        <div className="flex items-center flex-col">
          <Image src={dltCircle} alt="dltCircle" className="" />
          <p className="text-[#000000] text-[29px] font-medium">Delete User?</p>
          <p className="font-medium text-primary text-[21px]">
            Are you sure you want to Delete This User??
          </p>
          <div className="flex gap-10 mt-5">
            <button
              className="font-normal text-[22.48px] rounded-full text-[#266CA8] border border-[#266CA8] px-16 py-3"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button className="font-normal text-white text-[22.48px] bg-[#266CA8] rounded-full px-16 py-3">
              Yes, I am
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UserDetails
