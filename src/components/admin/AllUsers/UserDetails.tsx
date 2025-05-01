'use client'
import React, { useEffect, useState } from 'react'
import backImage from '/public/images/user/GenerateDFX/backImage.svg'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
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
import Link from 'next/link'
import Text from '@/components/UI/Text'
import Button from '@/components/UI/Button'

interface CardDetails {
  holder_name: string
  expiry_date: string
}

interface UserData {
  _id: ObjectId
  name: string
  lastName: string
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
  const searchParams = useSearchParams()
  const source = searchParams.get('source') || 'defaultSource'
  const page = searchParams.get('page') || '1'

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
      <Link
        href={{
          pathname: '/admin/allusers',
          query: { source, page },
        }}
      >
        <Image
          src={backImage}
          height={27}
          width={27}
          alt="Back"
          className="cursor-pointer mb-2"
        />
      </Link>
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
            <p className="mt-2 flex gap-2">
              <Text as="p1" className="text-primary">
                Added On:{' '}
              </Text>
              <Text as="p1" className="text-[#000000] font-normal">
                {userData &&
                  format(new Date(userData?.createdAt), 'MMM dd, yyyy')}
              </Text>
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
          <Text as="h3" className="text-[#000000] text-center flex-grow">
            Delete User?
          </Text>
          <Text className="font-medium text-primary text-[21px]">
            Are you sure you want to Delete This User??
          </Text>
          <div className="flex gap-10 mt-5 w-full max-w-sm">
            <Button variant="outlined" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (id) {
                  onDelete(id)
                }
                onClose()
              }}
            >
              Yes, I am
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UserDetails
