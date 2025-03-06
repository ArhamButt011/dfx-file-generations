'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import userImage from '/public/images/admin/emptyUser.svg'
import Image from 'next/image'
import noSubscriptions from '/public/images/admin/allusers/noSubscriptions.svg'
import { ObjectId } from 'mongodb'
import searchIcon from '/public/images/searchIcon.svg'
import { format } from 'date-fns'
import { ClipLoader } from 'react-spinners'
interface Subscriptions {
  _id: ObjectId
  user_id: ObjectId
  plan_name: string
  email: string
  user_name: string
  duration: string
  expiry_on: string
  added_on: string
  charges: string
  image: string
}

const Subscriptions = () => {
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalSubscription, setTotalSubscription] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoadingTable(true)

      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : ''
      const response = await fetch(
        `/api/admin/get-all-subscriptions/?page=${currentPage}${searchParam}`,
      )

      if (response.ok) {
        const data = await response.json()
        console.log('subscriptions-> ', data)
        setSubscriptions(data.allSubscriptions)
        setTotalPages(data.totalPages)
        setTotalSubscription(data.totalSubscriptions)
      } else {
        console.log('Failed to fetch downloads')
      }
    } catch (error) {
      console.log('Error fetching downloads:', error)
    } finally {
      setLoadingTable(false)
    }
  }, [currentPage, searchQuery])

  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])

  return (
    <div>
      <Breadcrumb
        pageName="Subscriptions"
        totalContent={totalSubscription}
        totalText="Total subscriptions added"
        rightContent={
          <div className="relative">
            <Image
              src={searchIcon}
              alt="searchIcon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-10 py-3 rounded-xl border text-gray-800 text-[18px] focus:outline-none focus:ring-2 focus:ring-[#005B97]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        }
        buttonContent={''}
      />
      {loadingTable ? (
        <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : subscriptions && subscriptions.length > 0 ? (
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-6 px-4 border-b text-start font-medium">
                Sr No
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Plan name
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Duration
              </th>
              <th className="pb-6 pl-20 border-b text-start font-medium">
                Added By
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Added On
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Expiry Date
              </th>
              <th className="pb-6 px-4 border-b text-center font-medium">
                Charges
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((user, index) => (
              <tr
                key={index}
                className="text-primary bg-[#F5F5F5] text-[16.45px]"
              >
                <td className="py-3 px-4 text-start font-medium rounded-l-xl">
                  #{(currentPage - 1) * 10 + (index + 1)}
                </td>
                <td className="py-3 px-4 text-start text-[19px] font-medium text-[#000000]">
                  {user.plan_name}
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  {user.duration}
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  <div className="flex justify-start align-center gap-3">
                    <div>
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={user?.image ? user.image : userImage}
                          alt="userImage"
                          className="w-full h-full object-cover"
                          width={30}
                          height={30}
                          priority
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0">
                      <span className="font-semibold text-gray-800 text-[17px]">
                        {user.user_name}
                      </span>
                      <span className="text-gray-500 text-[13px] font-medium">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  {user?.added_on
                    ? format(new Date(user.added_on), 'MMM dd, yyyy')
                    : 'N/A'}
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  {user?.expiry_on
                    ? format(new Date(user.expiry_on), 'MMM dd, yyyy')
                    : 'N/A'}
                </td>
                <td className="py-3 px-4 text-center text-[21px] font-medium rounded-r-xl text-[#266CA8]">
                  ${user.charges}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center mt-20">
          <Image
            src={noSubscriptions}
            alt="No subscriptions found"
            width={200}
            height={200}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      )}
      {loadingTable || totalPages === 0 || subscriptions.length === 0 ? null : (
        <div className="mt-4 flex justify-end items-center gap-4 text-gray-800">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Subscriptions
