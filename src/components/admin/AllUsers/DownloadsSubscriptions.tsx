import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import noSubscriptions from '/public/images/admin/allusers/noSubscriptions.svg'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import noDownloads from '/public/images/admin/allusers/nodownloads.svg'
import searchIcon from '/public/images/searchIcon.svg'
import Link from 'next/link'

interface Subscriptions {
  _id: string
  order_id: string
  plan_name: string
  duration: string
  added_on: string
  expiry_date: string
  expiry_on: string
  charges: number
  status: string
}
interface Downloads {
  _id: string
  order_id: string
  file_name: string
  downloaded_on: string
}

const DownloadsSubscriptions = () => {
  const [activeTab, setActiveTab] = useState<string>('Downloads')
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalSubscriptions, setTotalSubscriptions] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [downloadsSearchQuerry, setDownloadsSearchQuerry] = useState('')
  const [downloads, setDownloads] = useState<Downloads[]>([])
  const [downloadsCurrentPage, setDownloadsCurrentPage] = useState(1)
  const [totalDownloads, setTotalDownloads] = useState(0)
  const [totalDownloadsPages, setTotalDownloadsPages] = useState(1)

  const handleDownloadsPageChange = (newPage: number) => {
    setDownloadsCurrentPage(newPage)
  }

  const { id } = useParams()
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }
  const getStatus = (expiryDate: string, status: string): string => {
    if (status === 'canceled') {
      return 'Canceled'
    } else {
      const currentDate = new Date()
      const expiryDateObj = new Date(expiryDate)
      return currentDate < expiryDateObj ? 'Current' : 'Past'
    }
  }

  const fetchDownloads = useCallback(async () => {
    try {
      setLoadingTable(true)

      const searchParam = downloadsSearchQuerry
        ? `&search=${encodeURIComponent(downloadsSearchQuerry)}`
        : ''
      const response = await fetch(
        `/api/admin/get-dxf-downloads/${id}?page=${downloadsCurrentPage}${searchParam}`,
      )

      if (response.ok) {
        const data = await response.json()
        setDownloads(data.downloads)
        setTotalDownloadsPages(data.totalPages)
        setTotalDownloads(data.totalDxfDownloads)
      } else {
        console.log('Failed to fetch downloads')
      }
    } catch (error) {
      console.log('Error fetching downloads:', error)
    } finally {
      setLoadingTable(false)
    }
  }, [id, downloadsCurrentPage, downloadsSearchQuerry])

  useEffect(() => {
    fetchDownloads()
  }, [fetchDownloads])

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
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[27.42px] font-semibold text-[#000000]">
                DXF Downloads
              </h1>
              <p className="mt-2 font-medium text-[17.28px] text-primary">
                Total DXF Downloads: {totalDownloads && totalDownloads}
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
                  value={downloadsSearchQuerry || ''}
                  onChange={(e) => setDownloadsSearchQuerry(e.target.value)}
                />
              </div>
            </div>
          </div>
          {loadingTable ? (
            <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
              <ClipLoader color="#007bff" size={50} />
            </div>
          ) : downloads && downloads.length > 0 ? (
            <table className="min-w-full bg-white border-gray-300 text-[20.45px]">
              <thead>
                <tr className="text-md text-gray-600">
                  <th className="pb-4 border-b text-start font-medium">
                    Sr No
                  </th>
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    File Name
                  </th>
                  <th className="pb-4 px-4 border-b text-center font-medium">
                    Downloaded On
                  </th>
                  <th className="pb-4 px-4 border-b text-center font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {downloads.map((data: Downloads, index) => (
                  <tr key={index} className="text-[22px]">
                    <td className="py-5 px-4 border-b text-start font-medium text-[#00000066]">
                      #{index + 1}
                    </td>
                    <td className="py-3 px-4 border-b text-start font-medium text-[#000000]">
                      {data.file_name}
                    </td>
                    <td className="py-3 px-4 border-b text-center text-[20px] font-medium text-[#00000066]">
                      {format(new Date(data.downloaded_on), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-3 text-center text-lg font-medium text-[#266CA8] border-b">
                      <Link
                        href={`/admin/allusers/${id}/files-details/${data._id}/`}
                        className="border-b-blue-500 border-b font-semibold "
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center mt-20">
              <Image
                src={noDownloads}
                alt="No jobs found"
                width={200}
                height={200}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
          {loadingTable ||
          totalDownloadsPages === 0 ||
          downloads.length === 0 ? null : (
            <div className="mt-4 flex justify-end items-center gap-4 text-gray-800">
              <button
                onClick={() =>
                  handleDownloadsPageChange(downloadsCurrentPage - 1)
                }
                disabled={downloadsCurrentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  downloadsCurrentPage === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Previous
              </button>
              <span>
                Page {downloadsCurrentPage} of {totalDownloadsPages}
              </span>
              <button
                onClick={() =>
                  handleDownloadsPageChange(downloadsCurrentPage + 1)
                }
                disabled={downloadsCurrentPage === totalDownloadsPages}
                className={`px-4 py-2 rounded-md ${
                  downloadsCurrentPage === totalDownloadsPages
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Next
              </button>
            </div>
          )}
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
                  const status = getStatus(data?.expiry_on, data?.status)
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
                              ? 'text-[#266CA8] bg-[#E0E7ED] rounded-full px-5 py-2'
                              : status === 'Canceled'
                              ? 'bg-[#DB9E9E] text-[#D32F2F] px-3 py-2 rounded-full'
                              : 'bg-[#F9A0001A] text-[#F9A000] px-8 py-2 rounded-full'
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
