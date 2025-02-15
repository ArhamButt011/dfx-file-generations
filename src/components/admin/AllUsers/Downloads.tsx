import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import noDownloads from '/public/images/admin/allusers/nodownloads.svg'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

interface Downloads {
  order_id: string
  file_name: string
  downloaded_on: string
}
const Downloads = () => {
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [downloads, setDownloads] = useState<Downloads[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalDownloads, setTotalDownloads] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { id } = useParams()
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
        `/api/admin/get-dxf-downloads/${id}?page=${currentPage}${searchParam}`,
      )

      if (response.ok) {
        const data = await response.json()
        setDownloads(data.downloads)
        setTotalPages(data.totalPages)
        setTotalDownloads(data.totalDxfDownloads)
      } else {
        console.log('Failed to fetch downloads')
      }
    } catch (error) {
      console.log('Error fetching downloads:', error)
    } finally {
      setLoadingTable(false)
    }
  }, [id, currentPage, searchQuery])

  useEffect(() => {
    fetchDownloads()
  }, [fetchDownloads])

  return (
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
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg border border-gray-300"
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              <th className="pb-4 border-b text-start font-medium">Order ID</th>
              <th className="pb-4 px-4 border-b text-start font-medium">
                File Name
              </th>
              <th className="pb-4 px-4 border-b text-right font-medium">
                Downloaded On
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
                <td className="py-3 px-4 border-b text-right text-[20px] font-medium text-[#00000066]">
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
            alt="No jobs found"
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

export default Downloads
