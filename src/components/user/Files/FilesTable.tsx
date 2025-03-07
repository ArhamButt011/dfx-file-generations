import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'
import noDownloads from '/public/images/admin/noDownloads.svg'
import searchIcon from '/public/images/searchIcon.svg'
import { useAuth } from '@/context/AuthContext'
// import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import Subscribe from '../Subscription/Subscribe'
import Link from 'next/link'

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
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState<boolean>(false)
  // const [userPlan, setUserPlan] = useState<UserPlan | null>(null)
  const [isBilingOpen, setIsBilingOpen] = useState(false) // New state for Subscribe modal

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    console.log(currentPage)
  }
  const { userData } = useAuth()
  const userId = userData?.id
  const fetchDownloads = useCallback(async () => {
    console.log(searchQuery)

    if (!userData) {
      console.log('userData', userData)
      return
    }
    setLoading(true)
    try {
      // setLoadingTable(true)

      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : ''
      const response = await fetch(
        `/api/admin/get-dxf-downloads/${userData?.id}?page=${currentPage}${searchParam}`,
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
  }, [userData?.id, searchQuery, currentPage])

  useEffect(() => {
    fetchDownloads()
  }, [userData?.id, currentPage, searchQuery])
  // useEffect(()=>{
  //     console.log(searchQuery)
  // },[searchQuery])

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

  // const handleDelete = async (id: string) => {
  //   console.log(id)
  //   try {
  //     const res = await fetch('/api/user/DFX_Downloads/Delete_File', {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ id }),
  //     })

  //     if (!res.ok) {
  //       const data = await res.json()

  //       throw new Error(data.message)
  //     }

  //     fetchDownloads()
  //   } catch (err) {
  //     Swal.fire({
  //       title: 'Error!',
  //       text: err instanceof Error ? err.message : String(err),
  //       icon: 'error',
  //       showConfirmButton: false,
  //       timer: 2000,
  //       didOpen: () => {
  //         const swalContainer = document.querySelector(
  //           '.swal2-container',
  //         ) as HTMLElement
  //         if (swalContainer) {
  //           swalContainer.style.setProperty('z-index', '100000', 'important')
  //         }
  //       },
  //     })
  //   }
  // }

  // const handleDownloadDXF = async (url: string) => {
  //   if (!url) {
  //     console.error('No DXF file URL provided for download.')
  //     return
  //   }

  //   // Check if user's plan is expired
  //   if (userPlan && new Date(userPlan.expiry_date) < new Date()) {
  //     setIsBilingOpen(true)
  //     return
  //   }

  //   try {
  //     const response = await fetch(url)
  //     if (!response.ok)
  //       throw new Error(`Failed to download file. Status: ${response.status}`)
  //     const file_name = url.split('/').pop() || 'downloaded_file.dxf'
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.download = file_name
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)

  //     console.log('File info saved successfully')
  //   } catch (err) {
  //     Swal.fire({
  //       title: 'Error',
  //       text: err instanceof Error ? err.message : String(err),
  //       icon: 'error',
  //       showConfirmButton: false,
  //       timer: 2000,
  //       didOpen: () => {
  //         const swalContainer = document.querySelector(
  //           '.swal2-container',
  //         ) as HTMLElement
  //         if (swalContainer) {
  //           swalContainer.style.setProperty('z-index', '100000', 'important')
  //         }
  //       },
  //     })
  //   }
  // }

  return (
    <div className="mt-1">
      <div className="mb-6 flex justify-between items-center lg:flex-row flex-col gap-2">
        <span>
          <p className="font-medium text-3xl">Downloaded Files</p>
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
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto">
            <thead className="bg-[#266CA8]">
              <tr className="text-[18.45px] text-white">
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
              {downloads.map((data: Downloads, index) => (
                <tr key={index} className="text-[22px]">
                  <td className="py-5 px-4 border-b text-start font-medium text-[#00000066]">
                    #{(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="py-3 border-b text-center font-medium text-[#000000]">
                    {data.file_name}
                  </td>
                  <td className="py-3 px-4 border-b text-center text-[20px] font-medium text-[#00000066]">
                    {format(new Date(data.downloaded_on), 'MMM dd, yyyy')}
                  </td>
                  <td
                    className={`py-3 px-4 text-center text-lg font-medium ${
                      index === downloads.length - 1
                        ? 'rounded-br-3xl border-0'
                        : 'border-r'
                    }`}
                  >
                    <Link
                      href={`/downloaded-files/${data._id}`}
                      className="font-meduim text-[16px] text-[#266CA8]"
                    >
                      View Detail
                    </Link>
                    {/* <div className="flex justify-center items-center gap-3">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleDelete(data._id)}
                      >
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 27 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.8708 23.2932H13.5965C16.0934 23.2932 17.3418 23.2932 18.1535 22.48C18.9652 21.6667 19.0483 20.3327 19.2143 17.6646L19.4537 13.8202C19.5438 12.3726 19.5888 11.6488 19.1816 11.1901C18.7744 10.7314 18.0868 10.7314 16.7114 10.7314H9.75587C8.38055 10.7314 7.69289 10.7314 7.28568 11.1901C6.87847 11.6488 6.92353 12.3726 7.01365 13.8202L7.25297 17.6646C7.41906 20.3327 7.5021 21.6667 8.31381 22.48C9.12552 23.2932 10.3739 23.2932 12.8708 23.2932Z"
                            fill="#ED2A2A"
                          />
                          <path
                            d="M5.1582 9.08641C5.1582 8.67346 5.4681 8.33869 5.85038 8.33869L8.24093 8.33829C8.71591 8.32529 9.13493 7.99905 9.29655 7.5164C9.3008 7.50371 9.30569 7.48806 9.32321 7.43126L9.42622 7.09739C9.48925 6.89268 9.54417 6.71434 9.62101 6.55493C9.9246 5.92516 10.4863 5.48784 11.1354 5.37587C11.2997 5.34753 11.4736 5.34765 11.6734 5.34779H14.7941C14.9938 5.34765 15.1678 5.34753 15.3321 5.37587C15.9812 5.48784 16.5429 5.92516 16.8465 6.55493C16.9233 6.71434 16.9782 6.89268 17.0413 7.09739L17.1443 7.43126C17.1618 7.48806 17.1667 7.50371 17.1709 7.5164C17.3325 7.99905 17.8347 8.32569 18.3097 8.33869H20.6169C20.9992 8.33869 21.3091 8.67346 21.3091 9.08641C21.3091 9.49937 20.9992 9.83413 20.6169 9.83413H5.85038C5.4681 9.83413 5.1582 9.49937 5.1582 9.08641Z"
                            fill="#ED2A2A"
                          />
                        </svg>
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleDownloadDXF(data.file_url)}
                      >
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.6265 22.1069C17.4655 22.283 17.2379 22.3833 16.9992 22.3833C16.7606 22.3833 16.5329 22.283 16.3719 22.1069L11.8386 17.1486C11.5218 16.8021 11.5459 16.2644 11.8923 15.9477C12.2388 15.6309 12.7764 15.655 13.0932 16.0014L16.1492 19.344V6.8C16.1492 6.33056 16.5298 5.95 16.9992 5.95C17.4687 5.95 17.8492 6.33056 17.8492 6.8V19.344L20.9052 16.0014C21.222 15.655 21.7596 15.6309 22.1061 15.9477C22.4526 16.2644 22.4766 16.8021 22.1599 17.1486L17.6265 22.1069Z"
                            fill="#266CA8"
                          />
                          <path
                            d="M7.64922 20.4C7.64922 19.9306 7.26866 19.55 6.79922 19.55C6.32978 19.55 5.94922 19.9306 5.94922 20.4V20.4622C5.9492 22.0121 5.94918 23.2614 6.08128 24.244C6.21843 25.2641 6.51184 26.123 7.19402 26.8052C7.87619 27.4874 8.73511 27.7808 9.75524 27.9179C10.7378 28.05 11.9871 28.05 13.537 28.05H20.4614C22.0113 28.05 23.2606 28.05 24.2432 27.9179C25.2633 27.7808 26.1223 27.4874 26.8044 26.8052C27.4866 26.123 27.78 25.2641 27.9172 24.244C28.0493 23.2614 28.0492 22.0121 28.0492 20.4622V20.4C28.0492 19.9306 27.6687 19.55 27.1992 19.55C26.7298 19.55 26.3492 19.9306 26.3492 20.4C26.3492 22.0268 26.3474 23.1614 26.2323 24.0175C26.1205 24.8491 25.916 25.2895 25.6023 25.6031C25.2887 25.9168 24.8483 26.1213 24.0167 26.2331C23.1606 26.3482 22.026 26.35 20.3992 26.35H13.5992C11.9724 26.35 10.8378 26.3482 9.98176 26.2331C9.15014 26.1213 8.70976 25.9168 8.3961 25.6031C8.08243 25.2895 7.87793 24.8491 7.76612 24.0175C7.65103 23.1614 7.64922 22.0268 7.64922 20.4Z"
                            fill="#266CA8"
                          />
                        </svg>
                      </span>
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {loading || totalPages === 0 || downloads.length === 0 ? null : (
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
      {isBilingOpen && (
        <Subscribe
          isBilingOpen={isBilingOpen}
          setIsBilingOpen={setIsBilingOpen}
        />
      )}
    </div>
  )
}

export default FilesTable
