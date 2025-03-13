import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'
import noDownloads from '/public/images/admin/noDownloads.svg'
import searchIcon from '/public/images/searchIcon.svg'
import blackCross from '/public/images/blackCross.svg'
import { useAuth } from '@/context/AuthContext'
import editImage from '/public/images/editImage.svg'
// import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import Subscribe from '../Subscription/Subscribe'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'
import Modal from '@/components/UI/Modal'
import { useRouter, useSearchParams } from 'next/navigation'

interface Downloads {
  _id: string
  file_name: string
  downloaded_on: string
  file_url: string
}

// interface UserPlan {
//   plan_name: string
//   duration: number
//   user_id: string
//   added_on: string
//   expiry_on: string
//   charges: number
//   added_date: string
//   expiry_date: string
// }

function FilesTable() {
  // const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [downloads, setDownloads] = useState<Downloads[]>([])
  // const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState<boolean>(false)
  // const [userPlan, setUserPlan] = useState<UserPlan | null>(null)
  const [isBilingOpen, setIsBilingOpen] = useState(false)
  const [editingFileId, setEditingFileId] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState(false)
  const { userData } = useAuth()
  const userId = userData?.id
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get('page')) || 1

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage)
  // }
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`?${params.toString()}`)
  }

  const fetchDownloads = useCallback(async () => {
    console.log(searchQuery)

    if (!userData) {
      return
    }
    setLoading(true)
    try {
      // setLoadingTable(true)

      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : ''
      const response = await fetch(
        `/api/admin/get-dxf-downloads/${userData?.id}?page=${page}${searchParam}`,
      )
      if (response.ok) {
        const data = await response.json()
        setDownloads(data.downloads)
        setTotalPages(data.totalPages)
      } else {
        console.log('Failed to fetch downloads')
      }
    } catch (error) {
      console.log('Error fetching downloads:', error)
    } finally {
      setLoading(false)
    }
  }, [userData?.id, searchQuery, page])

  useEffect(() => {
    fetchDownloads()
  }, [userData?.id, page, searchQuery])

  useEffect(() => {
    async function fetchUserPlan() {
      try {
        const response = await fetch('/api/user/get-user-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        })

        const data = await response.json()
        if (data?.subscription) {
          // setUserPlan(data.subscription)
        }
      } catch (error) {
        console.error('Error fetching user plan:', error)
      }
    }

    if (userId) {
      fetchUserPlan()
    }
  }, [userId])

  const handleEditFile = async (text: string) => {
    if (!editingFileId) {
      console.error('File ID is missing')
      return
    }
    setEditLoading(true)
    try {
      const response = await axios.put('/api/user/update-downloads', {
        id: editingFileId,
        text,
        fileName: fileName,
      })

      if (response.data.success) {
        setDownloads((prevDownloads) =>
          prevDownloads.map((item) =>
            item._id === editingFileId
              ? { ...item, file_name: fileName }
              : item,
          ),
        )

        await Swal.fire({
          title: 'Updated!',
          text: 'File updated successfully.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            const swalContainer = document.querySelector(
              '.swal2-container',
            ) as HTMLElement
            if (swalContainer) {
              swalContainer.style.setProperty('z-index', '1000000', 'important')
            }
          },
        })
      }
    } catch (error) {
      console.error('Error updating file:', error)

      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Something went wrong'

      await Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '1000000', 'important')
          }
        },
      })
    } finally {
      setIsEditOpen(false)
      setEditingFileId(null)
      setEditLoading(false)
    }
  }

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value.replace(/\.dxf$/, '')
    setFileName(updatedName)
  }

  // Set initial file name based on the selected file
  useEffect(() => {
    const fileData = downloads.find((item) => item._id === editingFileId)
    if (fileData) {
      setFileName(fileData.file_name.replace(/\.dxf$/, ''))
    }
  }, [editingFileId, downloads])

  const onEditClose = () => {
    setIsEditOpen(false)
  }
  return (
    <div className="mt-1">
      <div className="mb-6 flex justify-between items-center lg:flex-row flex-col gap-2">
        <span>
          <p className="font-medium text-3xl">Files History</p>
        </span>
        <div>
          <div className="relative">
            <Image
              src={searchIcon}
              alt="searchIcon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-60"
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

      {loading ? (
        <div className="flex items-center justify-center bg-opacity-50 z-[1000] ">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : downloads.length > 0 ? (
        <div className="w-full overflow-x-auto grid grid-cols-1">
          <div className="w-full  sm:max-w-full">
            <table className="w-full rounded-3xl whitespace-nowrap">
              <thead className="bg-[#C6C9CB] rounded-3xl">
                <tr className="text-[18.45px] text-black">
                  <th className="p-3 border-b text-start font-medium rounded-tl-3xl">
                    Sr No
                  </th>
                  <th className="p-3 border-b text-center font-medium">
                    File Name
                  </th>
                  <th className="p-3 border-b text-center font-medium">
                    Downloaded On
                  </th>
                  <th className="p-3 border-b text-center font-medium rounded-tr-3xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {downloads.map((data, index) => (
                  <tr
                    key={index}
                    className={`text-primary text-[16.45px] ${
                      index % 2 !== 0 ? 'bg-[#F2F2F2]' : 'bg-white'
                    }`}
                  >
                    <td
                      className={`py-4 px-4 text-start font-medium ${
                        index === downloads.length - 1
                          ? 'rounded-bl-3xl border-0'
                          : 'border-l'
                      }`}
                    >
                      #{(page - 1) * 10 + index + 1}
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-[19px] text-[#000000]">
                      <span>{data.file_name.replace(/\.dxf$/, '')}.dxf</span>

                      {/* <div className="flex items-center justify-center gap-2">
                        <span>{data.file_name}</span>
                        <Image
                          src={editImage}
                          alt="edit"
                          className="cursor-pointer"
                          onClick={() => {
                            setEditingFileId(data._id)
                            setIsEditOpen(true)
                          }}
                        />
                      </div> */}
                    </td>
                    <td className="py-4 px-4 text-center text-lg font-medium">
                      {format(new Date(data.downloaded_on), 'MMM dd, yyyy')}
                    </td>
                    <td
                      className={`py-4 px-4 text-center text-lg font-medium relative ${
                        index === downloads.length - 1
                          ? 'rounded-br-3xl border-0'
                          : 'border-r'
                      }`}
                    >
                      {/* Dropdown Menu */}
                      <div className="flex justify-center pl-3 gap-2">
                        <div>
                          <Link
                            className="border-b-blue-500 border-b font-semibold text-[#266CA8]"
                            href={{
                              pathname: `/downloaded-files/${data._id}`,
                              query: { source: 'downloads', page: page },
                            }}
                          >
                            Detail
                          </Link>
                        </div>
                        <Image
                          src={editImage}
                          alt="edit"
                          width={25}
                          height={25}
                          className="cursor-pointer"
                          onClick={() => {
                            setEditingFileId(data._id)
                            setIsEditOpen(true)
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh] w-full">
          <Image
            src={noDownloads}
            alt="No downloads found"
            width={345}
            height={100}
            priority
            className="object-contain"
          />
        </div>
      )}

      {/* {loading || totalPages === 0 || downloads.length === 0 ? null : (
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
      {loading || totalPages === 0 || downloads.length === 0 ? null : (
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
            Next
          </button>
        </div>
      )}
      {isBilingOpen && (
        <Subscribe
          isBilingOpen={isBilingOpen}
          setIsBilingOpen={setIsBilingOpen}
        />
      )}

      <Modal isOpen={isEditOpen} onClose={onEditClose} buttonContent="">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleEditFile('fileName')
          }}
        >
          {editLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
              <ClipLoader color="#007bff" size={50} />
            </div>
          )}
          <div className="flex items-center flex-col gap-3">
            <div className="flex justify-between items-center w-full mb-7">
              <div className="text-[#000000] text-[22px] sm:text-[30px] font-semibold text-center flex-grow">
                Edit File Name
              </div>
              <div>
                <Image
                  className="cursor-pointer"
                  src={blackCross}
                  alt="cross"
                  width={30}
                  height={30}
                  onClick={onEditClose}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-[#000000] font-semibold mb-2 text-[21.37px]">
                File Name
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter File Name"
                  value={fileName}
                  onChange={handleFileNameChange}
                  className="w-full px-4 py-4 mt-1 pr-16 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full"
                  required
                />
                {/* Non-editable .dxf extension at the right */}
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  .dxf
                </span>
              </div>
            </div>

            <div className="w-full flex justify-between gap-10 mt-8">
              <button
                onClick={onEditClose}
                className="font-normal text-[#266CA8] border border-[#266CA8] text-[16px] sm:text-[24.56px] bg-white rounded-full px-5 py-3 w-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-normal text-white text-[16px] sm:text-[24.56px] bg-[#266CA8] rounded-full px-5 w-full"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default FilesTable
