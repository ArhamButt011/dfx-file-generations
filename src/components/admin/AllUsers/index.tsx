import React from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'

interface User {
  id: string
  name: string
  email: string
  addedOn: string
  downloads: number
}

const AllUsers = () => {
  const users: User[] = [
    {
      id: '1',
      name: 'john',
      email: 'john@gmial.com',
      addedOn: '12/2/2024',
      downloads: 20,
    },
    {
      id: '2',
      name: 'john',
      email: 'john@gmial.com',
      addedOn: '12/2/2024',
      downloads: 20,
    },
  ]

  return (
    <div>
      <Breadcrumb pageName="All Users" />
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-md text-gray-600">
            <th className="pb-4 px-4 border-b text-start font-medium">
              User Name
            </th>
            <th className="pb-4 px-4 border-b text-start font-medium">
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
            <tr key={user.id} className="text-primary bg-[#F5F5F5]">
              <td className="py-3 px-4 text-start text-lg font-medium">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {user.name}
                  </span>
                  <span className=" text-gray-500">#{user.id}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-start text-lg font-medium">
                {user.email}
              </td>
              <td className="py-3 px-4 text-center text-lg font-medium">
                {user.addedOn}
              </td>
              <td className="py-3 px-4 text-center text-lg font-medium">
                {user.downloads}
              </td>
              <td className="py-3 px-4 text-center text-lg font-medium">
                View Details
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
