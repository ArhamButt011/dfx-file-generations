import React, { useState } from 'react'
// import { useParams } from 'next/navigation'
import userImage from '/public/images/admin/avatar.jpg'
import email from '/public/images/admin/email.jpg'
import Image from 'next/image'
import cardImage from '/public/images/admin/card.jpg'
import dltCircle from '/public/images/admin/allusers/dltCircle.svg'

import DownloadsSubscriptions from './DownloadsSubscriptions'
import Modal from '@/components/UI/Modal'

// interface User {
//   id: string
//   name: string
//   email: string
//   addedOn: string
//   downloads: number
// }
const UserDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClose = () => {
    setIsOpen(false)
  }
  // const { id } = useParams()
  // const users: User[] = [
  //   {
  //     id: '1',
  //     name: 'john',
  //     email: 'john@gmial.com',
  //     addedOn: '12/2/2024',
  //     downloads: 20,
  //   },
  //   {
  //     id: '2',
  //     name: 'john',
  //     email: 'john@gmial.com',
  //     addedOn: '12/2/2024',
  //     downloads: 20,
  //   },
  // ]

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
            <h1 className="text-lg font-semibold">Emily Johnsons</h1>
            <div className="flex items-center gap-2">
              <span>
                <Image src={email} alt="useravatar" />
              </span>
              <span className="text-primary text-md">
                emilyjohnsons123@gmail.com
              </span>
            </div>
            <p className="mt-5">
              <span className="text-primary text-md">Added On: </span>
              <span className="text-md">Apr 10, 2024</span>
            </p>
            <div className="flex gap-2 bg-white rounded-lg px-2 py-2 mt-4">
              <div>
                <Image src={cardImage} alt="cardimage" />
              </div>
              <div>
                <p className="text-md">021*************021</p>
                <p className="text-md text-primary">Alex handai</p>
                <p className="text-md">
                  <span className="text-md text-primary">Expiry Date: </span>
                  <span>06/2025</span>
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
