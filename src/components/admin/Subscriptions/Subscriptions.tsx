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
import Text from '@/components/UI/Text'
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
  status: string
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

  // const getStatus = (expiryDate: string, status: string): string => {
  //   if (status === 'canceled') {
  //     return 'Canceled'
  //   } else {
  //     const currentDate = new Date()
  //     const expiryDateObj = new Date(expiryDate)
  //     return currentDate < expiryDateObj ? 'Current' : 'Past'
  //   }
  // }

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
              width={14}
              height={14}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-60"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-10 py-2 rounded-xl border text-gray-800 text-[18px] focus:outline-none focus:ring-2 focus:ring-[#005B97] placeholder:text-sm text-sm text-sm"
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
        <table className="min-w-full border-separate border-spacing-y-1">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-6 px-4 border-b text-start font-medium">
                Sr No
              </th>
              <th className="pb-6 pl-12 border-b text-start font-medium">
                Added By
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Plan name
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Duration
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
              <th className="pb-6 px-4 border-b text-center font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((user, index) => {
              // const status = getStatus(user?.expiry_on, user?.status)
              return (
                <tr
                  key={index}
                  className="text-primary bg-[#F5F5F5] text-[16.45px]"
                >
                  <td className="py-3 px-4 text-start font-medium rounded-l-xl">
                    #{(currentPage - 1) * 10 + (index + 1)}
                  </td>
                  <td className="py-3 px-4 text-start font-medium">
                    <div className="flex justify-start align-center gap-3">
                      <div>
                        <div className="w-10 h-10 rounded-full overflow-hidden">
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
                        <Text className="text-gray-800">{user.user_name}</Text>
                        <span className="text-[13px]">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-start font-medium text-[#000000]">
                    <Text>{user.plan_name}</Text>
                  </td>
                  <td className="py-3 px-4 text-start font-medium">
                    <Text>{user.duration}</Text>
                  </td>

                  <td className="py-3 px-4 text-start font-medium">
                    <Text>
                      {user?.added_on
                        ? format(new Date(user.added_on), 'MMM dd, yyyy')
                        : 'N/A'}
                    </Text>
                  </td>
                  <td className="py-3 px-4 text-start font-medium">
                    <Text>
                      {user?.expiry_on
                        ? format(new Date(user.expiry_on), 'MMM dd, yyyy')
                        : 'N/A'}
                    </Text>
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-[#266CA8]">
                    <Text>${user.charges}</Text>
                  </td>
                  <td
                    className={`py-5 pl-2 text-center font-medium rounded-r-xl`}
                  >
                    <span
                      className={`text-[12px] md:text-[14px] ${
                        user?.status === 'Current'
                          ? 'text-[#000000] bg-[#CBF0FF] rounded-full px-5 py-2'
                          : user?.status === 'Canceled'
                          ? 'bg-[#FED3D1] text-[#000000] px-3 py-2 rounded-full'
                          : 'bg-[#F9A0001A] text-[#000000] px-8 py-2 rounded-full'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              )
            })}
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
