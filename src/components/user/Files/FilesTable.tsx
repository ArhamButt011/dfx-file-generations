import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'
import noDownloads from '/public/images/admin/noDownloads.svg'
import searchIcon from '/public/images/searchIcon.svg'
import blackCross from '/public/images/blackCross.svg'
import { useAuth } from '@/context/AuthContext'
// import editImage from '/public/images/editImage.svg'
// import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import Subscribe from '../Subscription/Subscribe'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'
import Modal from '@/components/UI/Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import Text from '@/components/UI/Text'
import Label from '@/components/UI/Label'
import Button from '@/components/UI/Button'

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
          <p className="font-semibold text-[22px] sm:text-[24px] mt-6 text-center sm:text-left">
            Files History
          </p>
        </span>
        <div>
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
                <tr className="md:text-[16px] text-[14px] text-black">
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
                    className={`text-primary text-[14px] md:text-[16px] ${
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
                    <td className="py-4 px-4 text-center font-medium text-[14px] md:text-[16px] text-[#000000]">
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
                    <td className="py-4 px-4 text-center text-[14px] md:text-[16px] font-medium">
                      {format(new Date(data.downloaded_on), 'MMM dd, yyyy')}
                    </td>
                    <td
                      className={`py-4 px-4 text-center text-[14px] md:text-[16px] font-medium relative ${
                        index === downloads.length - 1
                          ? 'rounded-br-3xl border-0'
                          : 'border-r'
                      }`}
                    >
                      {/* Dropdown Menu */}
                      <div className="flex justify-center pl-3 gap-2 items-end">
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
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setEditingFileId(data._id)
                            setIsEditOpen(true)
                          }}
                        >
                          <svg
                            width="23"
                            height="23"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.22266 10.73C3.22266 10.5642 3.35713 10.4297 3.52301 10.4297H9.9306C10.0965 10.4297 10.231 10.5642 10.231 10.73C10.231 10.8959 10.0965 11.0304 9.9306 11.0304H3.52301C3.35713 11.0304 3.22266 10.8959 3.22266 10.73Z"
                              fill="#266CA8"
                            />
                            <path
                              d="M6.53503 7.89842L6.53504 7.89841L8.90452 5.52893C8.58203 5.39471 8.20007 5.17423 7.83884 4.813C7.47755 4.45171 7.25706 4.06969 7.12284 3.74717L4.75332 6.11669L4.75331 6.1167C4.56841 6.3016 4.47595 6.39406 4.39644 6.496C4.30264 6.61626 4.22223 6.74637 4.15662 6.88404C4.101 7.00075 4.05965 7.12479 3.97695 7.37288L3.54088 8.68109C3.50019 8.80318 3.53196 8.93778 3.62296 9.02877C3.71395 9.11977 3.84855 9.15154 3.97064 9.11085L5.27885 8.67478C5.52694 8.59208 5.65098 8.55073 5.76769 8.49511C5.90536 8.4295 6.03547 8.34909 6.15573 8.25529C6.25767 8.17578 6.35013 8.08332 6.53503 7.89842Z"
                              fill="#266CA8"
                            />
                            <path
                              d="M9.56202 4.87143C10.054 4.37942 10.054 3.58172 9.56202 3.08971C9.07001 2.5977 8.27231 2.5977 7.7803 3.08971L7.49611 3.3739L7.50823 3.40963C7.61239 3.70987 7.80893 4.10346 8.17865 4.47319C8.54838 4.84291 8.94197 5.03945 9.24221 5.14361L9.27778 5.15567L9.56202 4.87143Z"
                              fill="#266CA8"
                            />
                          </svg>
                        </div>

                        {/* <Image
                          src={editImage}
                          alt="edit"
                          width={25}
                          height={25}
                          className="cursor-pointer"
                        /> */}
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
              <Text
                as="h3"
                className="text-[#000000] font-semibold text-center flex-grow"
              >
                Edit File Name
              </Text>
              <div>
                <Image
                  className="cursor-pointer sm:w-[30px] sm:h-[30px]  w-[25px] h-[25px]"
                  src={blackCross}
                  alt="cross"
                  width={30}
                  height={30}
                  onClick={onEditClose}
                />
              </div>
            </div>

            <div className="w-full">
              <Label>File Name</Label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter File Name"
                  value={fileName}
                  onChange={handleFileNameChange}
                  className="w-full px-4 sm:text-sm text-xs sm:py-3 py-2 mt-1 pr-10 border text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005B97] rounded-full placeholder:text-sm placeholder:text-xs"
                  required
                />
                {/* Non-editable .dxf extension at the right */}
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 mt-[3px] text-gray-500">
                  .dxf
                </span>
              </div>
            </div>

            <div className="w-full flex justify-between gap-10 mt-8">
              <Button onClick={onEditClose} variant="outlined" className="">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default FilesTable
