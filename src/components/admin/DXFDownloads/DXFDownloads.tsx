'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Image from 'next/image'
import noDownloads from '/public/images/admin/noDownloads.svg'
import { format } from 'date-fns'
import userImage from '/public/images/admin/emptyUser.svg'
import { ObjectId } from 'mongodb'
import { ClipLoader } from 'react-spinners'
import searchIcon from '/public/images/searchIcon.svg'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

interface Download {
  _id: string
  user_id: ObjectId
  user_name: string
  email: string
  downloaded_on: string
  file_name: string
  image: string
}

const DXFDownloads = () => {
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [downloads, setDownloads] = useState<Download[]>([])
  // const [currentPage, setCurrentPage] = useState(1)
  const [totalDXFDownloads, setTotalDownloads] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get('page')) || 1

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`?${params.toString()}`)
  }

  const fetchDownloads = useCallback(async () => {
    try {
      setLoadingTable(true)

      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : ''
      const response = await fetch(
        `/api/admin/get-downloads/?page=${page}${searchParam}`,
      )

      if (response.ok) {
        const data = await response.json()
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
  }, [page, searchQuery])

  useEffect(() => {
    fetchDownloads()
  }, [fetchDownloads])

  return (
    <div>
      <Breadcrumb
        pageName="Files History"
        totalContent={totalDXFDownloads}
        totalText="Total DXF Imported"
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
      ) : downloads && downloads?.length > 0 ? (
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-6 border-b text-start font-medium">Sr No</th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                File Name
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Downloaded By
              </th>
              <th className="pb-6 px-4 border-b text-center font-medium">
                Downloaded On
              </th>
              <th className="pb-6 px-4 border-b text-center font-medium">
                Action
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
                  #{(page - 1) * 10 + (index + 1)}
                </td>
                <td className="py-3 px-4 text-start font-medium text-[19px] text-[#000000]">
                  {data.file_name}
                </td>
                <td className="py-3 px-4 font-medium text-start">
                  <div className="flex justify-start items-center gap-3">
                    <div className="">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={data?.image ? data.image : userImage}
                          alt="userImage"
                          className="w-full h-full object-cover"
                          width={30}
                          height={30}
                          priority
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0 max-w-xl">
                      <span className="font-semibold text-gray-800 text-[17px]">
                        {data.user_name}
                      </span>
                      <span className="text-gray-500 text-[13px] font-medium">
                        {data.email}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4 text-center text-lg font-medium">
                  {format(new Date(data.downloaded_on), 'MMM dd, yyyy')}
                </td>
                <td className="py-3 px-4 text-center text-lg font-medium rounded-r-xl text-[#266CA8]">
                  <Link
                    href={{
                      pathname: `/admin/dxf-downloads/${data._id}`,
                      query: { source: 'allDxf', page: page },
                    }}
                    className="border-b-blue-500 border-b font-semibold"
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
            alt="No downloads found"
            width={200}
            height={200}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      )}
      {/* {loadingTable || totalPages === 0 || downloads.length === 0 ? null : (
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
      )} */}
      {loadingTable || totalPages === 0 || downloads.length === 0 ? null : (
        <div className="mt-4 flex justify-end items-center gap-4 text-gray-800">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${
              page === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md ${
              page === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {' '}
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default DXFDownloads
