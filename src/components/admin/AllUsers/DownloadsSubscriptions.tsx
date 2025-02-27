import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import noSubscriptions from '/public/images/admin/allusers/noSubscriptions.svg'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import Downloads from './Downloads'
import searchIcon from '/public/images/searchIcon.svg'

interface Subscriptions {
  order_id: string
  plan_name: string
  duration: string
  added_on: string
  expiry_date: string
  expiry_on: string
  charges: number
  status: string
}

const DownloadsSubscriptions = () => {
  const [activeTab, setActiveTab] = useState<string>('Downloads')
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalSubscriptions, setTotalSubscriptions] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const { id } = useParams()
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }
  const getStatus = (expiryDate: string): string => {
    const currentDate = new Date()
    const expiryDateObj = new Date(expiryDate)
    return currentDate < expiryDateObj ? 'Current' : 'Past'
  }

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoadingTable(true)

      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : ''
      const response = await fetch(
        `/api/admin/get-subscriptions/${id}?page=${currentPage}${searchParam}`,
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setSubscriptions(data.subscriptions)
        setTotalPages(data.totalPages)
        setTotalSubscriptions(data.totalSubscriptions)
      } else {
        console.log('Failed to fetch users')
      }
    } catch (error) {
      console.log('Error fetching users:', error)
    } finally {
      setLoadingTable(false)
    }
  }, [id, currentPage, searchQuery])

  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])

  return (
    <>
      <div className="flex gap-20 mt-7 border-b pl-10 mb-7">
        <h1
          className={`text-xl font-medium cursor-pointer pb-3 relative ${
            activeTab === 'Downloads'
              ? 'text-[#266CA8] after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-28 after:bg-[#266CA8]'
              : 'text-[#00000066]'
          }`}
          onClick={() => setActiveTab('Downloads')}
        >
          Downloaded Files
        </h1>

        <h1
          className={`text-xl font-medium cursor-pointer pb-3 relative ${
            activeTab === 'Subscriptions'
              ? 'text-[#266CA8] after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-28 after:bg-[#266CA8]'
              : 'text-[#00000066]'
          }`}
          onClick={() => setActiveTab('Subscriptions')}
        >
          Subscription
        </h1>
      </div>
      {activeTab == 'Downloads' ? (
        <div>
          <Downloads />
        </div>
      ) : activeTab == 'Subscriptions' ? (
        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[27.42px] font-semibold text-[#000000]">
                Subscriptions
              </h1>
              <p className="mt-2 font-medium text-[17.28px] text-primary">
                Total subscriptions added: {totalSubscriptions}
              </p>
            </div>
            <div>
              <div className="relative">
                <Image
                  src={searchIcon}
                  alt="searchIcon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-10 py-2 rounded-xl border text-gray-800 text-[18px] focus:outline-none focus:ring-2 focus:ring-[#005B97]"
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav> */}
          </div>
          {loadingTable ? (
            <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
              <ClipLoader color="#007bff" size={50} />
            </div>
          ) : subscriptions && subscriptions.length > 0 ? (
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-md text-gray-600 text-[18.45px]">
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    Sr No
                  </th>
                  <th className="pb-4 px-4 border-b text-center font-medium">
                    Plan name
                  </th>
                  <th className="pb-4 px-4 border-b text-center font-medium">
                    Duration
                  </th>
                  <th className="pb-4 px-4 border-b text-center font-medium">
                    Added On
                  </th>
                  <th className="pb-4 px-4 border-b text-center font-medium">
                    Expiry Date
                  </th>
                  <th className="pb-4 px-4 border-b text-center font-medium">
                    Charges
                  </th>
                  <th className="pb-4 pl-7 border-b text-center font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((data, index) => {
                  const status = getStatus(data?.expiry_on)
                  return (
                    <tr
                      key={index}
                      className="text-primary bg-[#F5F5F5] text-[16px]"
                    >
                      <td className="py-5 px-4 text-start font-medium rounded-l-xl">
                        #{index + 1}
                      </td>
                      <td className="py-5 px-4 text-center font-medium text-black text-[19px]">
                        {data?.plan_name}
                      </td>
                      <td className="py-5 px-4 text-center font-medium">
                        {data?.duration}
                      </td>
                      <td className="py-5 px-4 text-center font-medium ">
                        {format(new Date(data?.added_on), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-5 px-4 text-center font-medium ">
                        {format(new Date(data?.expiry_on), 'MMM dd, yyyy')}
                      </td>

                      <td className="py-5 px-4 text-center text-[19px] font-medium text-[#266CA8]">
                        ${data?.charges}
                      </td>
                      <td
                        className={`py-5 pl-10 text-center font-medium rounded-r-xl`}
                      >
                        <span
                          className={`${
                            status === 'Current'
                              ? 'text-[#266CA8] bg-[#E0E7ED] rounded-full px-4 py-2'
                              : 'text-[#F9A000] bg-[#F5EDDD] px-8 py-2 rounded-full'
                          }`}
                        >
                          {status}
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
                alt="No jobs found"
                width={200}
                height={200}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
          {loadingTable ||
          totalPages === 0 ||
          subscriptions.length === 0 ? null : (
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
      ) : null}
    </>
  )
}

export default DownloadsSubscriptions
