import React from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Image from 'next/image'
import noDownloads from '/public/images/admin/noDownloads.svg'
import { format } from 'date-fns'
import userImage from '/public/images/admin/emptyUser.svg'

interface Payments {
  _id: string
  user_name: string
  email: string
  downloaded_on: string
  file_name: string
}

const DXFDownloads = () => {
  const downloads: Payments[] = [
    {
      _id: '1',
      user_name: 'ali',
      email: 'test@example.com',
      file_name: 'downlaod.dxf',
      downloaded_on: '02-12-2025',
    },
    {
      _id: '2',
      user_name: 'ali',
      email: 'test@example.com',
      file_name: 'downlaod.dxf',
      downloaded_on: '02-12-2025',
    },
    {
      _id: '3',
      user_name: 'ali',
      email: 'test@example.com',
      file_name: 'downlaod.dxf',
      downloaded_on: '02-12-2025',
    },
  ]
  return (
    <div>
      <Breadcrumb
        pageName="DXF Downloads"
        totalContent={downloads.length}
        totalText="Total DXF Dowboads"
        rightContent={
          <input
            type="text"
            placeholder="Search user..."
            className="px-4 py-2 rounded-lg border border-gray-300"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        }
        buttonContent={''}
      />
      {downloads && downloads.length > 0 ? (
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-6 border-b text-start font-medium">Order ID</th>
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
                  #{data._id}
                </td>
                <td className="py-3 px-4 text-start font-medium text-[19px] text-[#000000]">
                  {data.file_name}
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  <div className="flex justify-center align-center gap-3">
                    <div>
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
                    <div className="flex flex-col gap-0">
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
    </div>
  )
}

export default DXFDownloads
