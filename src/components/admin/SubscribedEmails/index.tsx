'use client'
import Button from '@/components/UI/Button'
import Text from '@/components/UI/Text'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import noEmails from '/public/images/admin/noEmails.svg'
import downloadIcon from '/public/images/admin/downloadIcon.svg'
import { ObjectId } from 'mongodb'
import { ClipLoader } from 'react-spinners'
import { format } from 'date-fns'
import Swal from 'sweetalert2'

interface Emails {
  _id: ObjectId
  email: string
  createdAt: string
}

const SubscribedEmails = () => {
  const [loadingTable, setLoadingTable] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalEmails, setTotalEmails] = useState(0)
  const [emails, setEmails] = useState<Emails[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [selectedEmails, setSelectedEmails] = useState<
    { email: string; createdAt: string }[]
  >([])
  const [selectAll, setSelectAll] = useState(false)

  const fetchEmails = useCallback(async () => {
    try {
      setLoadingTable(true)
      const response = await fetch(
        `/api/admin/subscribed-emails/?page=${currentPage}`,
      )

      if (response.ok) {
        const data = await response.json()
        setEmails(data.emails)
        setTotalPages(data.totalPages)
        setTotalEmails(data.totalEmails)

        if (selectAll) {
          setSelectedEmails((prev) => [
            ...new Set([
              ...prev,
              ...data.emails.map((email: Emails) => ({
                email: email.email,
                createdAt: email.createdAt,
              })),
            ]),
          ])
        }
      } else {
        console.log('Failed to fetch emails')
      }
    } catch (error) {
      console.log('Error fetching emails:', error)
    } finally {
      setLoadingTable(false)
    }
  }, [currentPage, selectAll])

  useEffect(() => {
    fetchEmails()
  }, [fetchEmails])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleSelectEmail = (email: string, createdAt: string) => {
    setSelectedEmails((prev) => {
      const exists = prev.some((e) => e.email === email)
      if (exists) {
        return prev.filter((e) => e.email !== email) // Remove if already selected
      } else {
        return [...prev, { email, createdAt }] // Add new selection
      }
    })
  }

  const exportToCSV = () => {
    if (selectedEmails.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Please select at least one email to export.',
        icon: 'error',
        showConfirmButton: false,
        showCloseButton: true,
        timer: undefined,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })

      return
    }

    const csvHeader = 'Email,Subscribed On\n'
    const csvRows = selectedEmails.map(({ email, createdAt }) => {
      return `${email},="${format(
        new Date(createdAt),
        'yyyy-MM-dd | HH:mm a',
      )}"`
    })

    const csvContent = csvHeader + csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'subscribers.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([])
    } else {
      setSelectedEmails(
        emails.map((email) => ({
          email: email.email,
          createdAt: email.createdAt,
        })),
      )
    }
    setSelectAll(!selectAll)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text as="h3" className="font-semibold text-[#000000]">
            Subscribed Users Emails
          </Text>
          <Text className="mt-2 font-medium text-primary">
            Total Subscribed Users: {totalEmails}
          </Text>
        </div>
        <div>
          <Button className="rounded-md sm:py-2" onClick={exportToCSV}>
            <div className="flex gap-2">
              <Image src={downloadIcon} alt="download" width={15} height={15} />
              Download CSV
            </div>
          </Button>
        </div>
      </div>
      {loadingTable ? (
        <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : emails && emails.length > 0 ? (
        <table className="min-w-full border-separate border-spacing-y-1">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-6 px-4 border-b text-start font-medium pl-5">
                <div className="flex gap-2">
                  <input
                    className="accent-[#266CA8]"
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  Email Address
                </div>
              </th>
              <th className="pb-6 border-b text-end font-medium pr-16">
                Subscribed On
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <tr
                key={index}
                className="text-primary bg-[#F5F5F5] text-[16.45px]"
              >
                <td className="py-3 text-start font-medium rounded-l-xl pl-5">
                  <div className="flex gap-2">
                    <input
                      className="accent-[#266CA8]"
                      type="checkbox"
                      checked={selectedEmails.some(
                        (e) => e.email === email.email,
                      )}
                      onChange={() =>
                        handleSelectEmail(email.email, email.createdAt)
                      }
                    />

                    <Text>{email.email}</Text>
                  </div>
                </td>
                <td className="py-3 px-4 text-end font-medium rounded-r-xl pr-10">
                  <Text>
                    {email?.createdAt
                      ? format(
                          new Date(email.createdAt),
                          'MMM dd, yyyy | hh:mm a',
                        )
                      : 'N/A'}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center mt-20">
          <Image
            src={noEmails}
            alt="No Emails Found"
            width={200}
            height={200}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      )}
      {loadingTable || totalPages === 0 || emails.length === 0 ? null : (
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

export default SubscribedEmails
