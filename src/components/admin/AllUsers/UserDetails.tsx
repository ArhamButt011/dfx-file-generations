'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import userImage from '/public/images/userImage.svg'
import email from '/public/images/admin/email.jpg'
// import cardImage from '/public/images/admin/card.jpg'
import dltCircle from '/public/images/admin/allusers/dltCircle.svg'
import DownloadsSubscriptions from './DownloadsSubscriptions'
import Modal from '@/components/UI/Modal'
import { format } from 'date-fns'
import { ObjectId } from 'mongodb'
import Swal from 'sweetalert2'

interface CardDetails {
  holder_name: string
  expiry_date: string
}

interface UserData {
  _id: ObjectId
  name: string
  email: string
  createdAt: string
  cards: CardDetails[]
  image: string
}

const UserDetails: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const onClose = () => {
    setIsOpen(false)
  }

  const onDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/delete-user/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'User Deleted',
          text: 'The user has been deleted successfully.',
          timer: 2000,
          didOpen: () => {
            const swalContainer = document.querySelector(
              '.swal2-container',
            ) as HTMLElement
            if (swalContainer) {
              swalContainer.style.setProperty('z-index', '100000', 'important')
            }
          },
          showConfirmButton: false,
        })
        router.push('/admin/allusers')
      } else {
        const data = await response.json()
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: data.error || 'Something went wrong while deleting the user.',
        })
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: 'An error occurred while deleting the user. Please try again.',
      })
    }
  }

  const handleDelete = (id: string) => {
    console.log(id)
    setIsOpen(true)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/admin/get-card-details/${id}`)
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

    if (id) fetchUserData()
  }, [id])

  return (
    <>
      <div className="flex justify-between bg-[#F5F5F5] rounded-2xl p-5 flex-col md:flex-row">
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
              {userData?.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span>
                <Image src={email} alt="email" width={23} height={18} />
              </span>
              <span className="text-primary text-[18.84px] font-medium">
                {userData?.email}
              </span>
            </div>
            <p className="mt-2">
              <span className="text-primary text-[18.27px] font-medium">
                Added On:{' '}
              </span>
              <span className="text-[#000000] text-[18.27px] font-normal">
                {userData &&
                  format(new Date(userData?.createdAt), 'MMM dd, yyyy')}
              </span>
            </p>
            {/* {userData && userData?.cards.length > 0 ? (
              <div className="flex gap-2 bg-white rounded-lg px-2 py-2 mt-4">
                <div>
                  <Image src={cardImage} alt="cardimage" />
                </div>
                <div>
                  <p className="text-[18.11px] font-sembold text-[#000000]">
                    021*************021
                  </p>
                  <p className="text-[15.88px] text-primary font-medium">
                    {userData?.cards?.[0]?.holder_name}
                  </p>
                  <p className="text-md">
                    <span className="text-[15.88px] text-primary font-medium">
                      Expiry Date:{' '}
                    </span>
                    <span className="text-[15.88px] text-[#000000] font-medium">
                      {userData?.cards?.[0]?.expiry_date &&
                        format(
                          new Date(userData.cards[0].expiry_date),
                          'MMM dd, yyyy',
                        )}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex bg-white rounded-lg justify-between items-center h-20 px-4 mt-4 text-primary">
                No Payment Method Added!!
              </div>
            )} */}
          </div>
        </div>
        <div>
          <button
            className="bg-[#FA3D43] text-white py-2 px-4 rounded-md mt-5 md:mt-0"
            onClick={() => handleDelete(id)}
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
            <button
              className="font-normal text-white text-[22.48px] bg-[#266CA8] rounded-full px-16 py-3"
              onClick={() => {
                if (id) {
                  onDelete(id)
                }
                onClose()
              }}
            >
              Yes, I am
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UserDetails
