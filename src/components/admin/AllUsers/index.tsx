'use client'
import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { ClipLoader } from 'react-spinners'
import Image from 'next/image'
import Link from 'next/link'
import userImage from '/public/images/admin/emptyUser.svg'
import searchIcon from '/public/images/searchIcon.svg'
import { useSearchParams, useRouter } from 'next/navigation'

interface User {
  _id: string
  name: string
  email: string
  lastName: string
  createdAt: string
  image: string
  downloadsCount: number
}

const AllUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [loadingTable, setLoadingTable] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  // const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
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

  const fetchUsers = useCallback(async () => {
    try {
      setLoadingTable(true)

      const searchParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : ''
      const response = await fetch(
        `/api/admin/get-users/?page=${page}${searchParam}`,
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setUsers(data.users)
        setTotalPages(data.totalPages)
        setTotalUsers(data.totalUsers)
      } else {
        console.log('Failed to fetch users')
      }
    } catch (error) {
      console.log('Error fetching users:', error)
    } finally {
      setLoadingTable(false)
    }
  }, [page, searchQuery])

  useEffect(() => {
    fetchUsers()
  }, [page, fetchUsers, searchQuery])

  return (
    <div>
      <Breadcrumb
        pageName="All Users"
        totalContent={totalUsers}
        totalText="Total Users"
        rightContent={
          <div className="relative">
            <Image
              src={searchIcon}
              alt="searchIcon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search user..."
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
      ) : users && users.length > 0 ? (
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-4 px-4 border-b text-start font-medium">
                Name
              </th>
              <th className="pb-4 px-4 border-b text-center font-medium">
                Email Address
              </th>
              <th className="pb-4 px-4 border-b text-center font-medium">
                Added On
              </th>
              <th className="pb-4 px-4 border-b text-center font-medium">
                No Of Downloads
              </th>
              <th className="pb-4 px-4 border-b text-center font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="text-primary bg-[#F5F5F5] text-[16.45px]"
              >
                <td className="py-3 px-4 text-start text-lg font-medium rounded-l-xl">
                  <div className="flex justify-start items-center gap-3">
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
                    <div>
                      <span className="font-semibold text-gray-800 text-[22px]">
                        {user.name} {user.lastName}
                      </span>
                      {/* <span className="text-gray-500 text-[14.3px]">
                        #{index + 1}
                      </span> */}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center text-lg font-medium">
                  {user.email}
                </td>
                <td className="py-3 pr-4 pl-8 text-center text-lg font-medium">
                  {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                </td>

                <td className="py-3 px-4 text-center text-lg font-medium ">
                  {user.downloadsCount}
                </td>
                <td className="py-3 px-4 text-center text-lg font-medium rounded-r-xl text-[#266CA8]">
                  <Link
                    href={{
                      pathname: `/admin/allusers/${user._id}`,
                      query: { source: 'allUsers', page: page },
                    }}
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
            src="/images/admin/noUser.svg"
            alt="No jobs found"
            width={200}
            height={200}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      )}

      {/* {loadingTable || totalPages === 0 || users.length === 0 ? null : (
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
      {loadingTable || totalPages === 0 || users.length === 0 ? null : (
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
    </div>
  )
}

export default AllUsers
