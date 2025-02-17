'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Image from 'next/image'
import noDownloads from '/public/images/admin/noDownloads.svg'
import { format } from 'date-fns'
import userImage from '/public/images/admin/emptyUser.svg'
import { ObjectId } from 'mongodb'
import { ClipLoader } from 'react-spinners'

interface Download {
  _id: ObjectId
  user_id: ObjectId
  user_name: string
  email: string
  downloaded_on: string
  file_name: string
}

const DXFDownloads = () => {
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [downloads, setDownloads] = useState<Download[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalDXFDownloads, setTotalDownloads] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const fetchDownloads = useCallback(async () => {
    try {
      setLoadingTable(true)

      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : ''
      const response = await fetch(
        `/api/admin/get-downloads/?page=${currentPage}${searchParam}`,
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setDownloads(data.allDownloads)
        setTotalPages(data.totalPages)
        setTotalDownloads(data.totalDownloads)
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
    fetchDownloads()
  }, [fetchDownloads])

  return (
    <div>
      <Breadcrumb
        pageName="DXF Downloads"
        totalContent={totalDXFDownloads}
        totalText="Total DXF Downloads"
        rightContent={
          <input
            type="text"
            placeholder="Search user..."
            className="px-4 py-2 rounded-lg border border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        }
        buttonContent={''}
      />
      {loadingTable ? (
        <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : downloads && downloads?.length > 0 ? (
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-6 border-b text-start font-medium">Sr No</th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                File Name
              </th>
              <th className="pb-6 px-4 border-b text-center font-medium">
                Downloaded By
              </th>
              <th className="pb-6 px-4 border-b text-center font-medium">
                Downloaded On
              </th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((data, index) => (
              <tr
                key={index}
                className="text-primary bg-[#F5F5F5] text-[16.45px]"
              >
                <td className="py-3 px-4 text-start font-medium rounded-l-xl">
                  #{(currentPage - 1) * 10 + (index + 1)}
                </td>
                <td className="py-3 px-4 text-start font-medium text-[19px] text-[#000000]">
                  {data.file_name}
                </td>
                <td className="py-3 px-4 font-medium">
                  <div className="flex justify-center items-center gap-3">
                    <div className="">
                      <span>
                        <Image
                          src={userImage}
                          alt="user"
                          width={200}
                          height={200}
                          priority
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </span>
                    </div>
                    <div className="flex flex-col gap-0 w-[100px]">
                      <span className="font-semibold text-gray-800 text-[17px]">
                        {data.user_name}
                      </span>
                      <span className="text-gray-500 text-[13px] font-medium">
                        {data.email}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4 text-center text-lg font-medium rounded-r-xl">
                  {format(new Date(data.downloaded_on), 'MMM dd, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center mt-20">
          <Image
            src={noDownloads}
            alt="No payment details found"
            width={200}
            height={200}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      )}
      {loadingTable || totalPages === 0 || downloads.length === 0 ? null : (
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

export default DXFDownloads
