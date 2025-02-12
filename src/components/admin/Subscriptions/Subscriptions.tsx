import React from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Image from 'next/image'
import noSubscriptions from '/public/images/admin/allusers/noSubscriptions.svg'

import { format } from 'date-fns'
interface Subscriptions {
  _id: string
  plan_name: string
  email: string
  user_name: string
  duration: string
  expiry_date: string
  added_on: string
  charges: string
}

const Subscriptions = () => {
  const subscriptions: Subscriptions[] = [
    {
      _id: '1',
      plan_name: 'Basic',
      email: 'test@example.com',
      user_name: 'test123',
      duration: 'Monthly',
      expiry_date: '02-12-2025',
      added_on: '02-12-2025',
      charges: '100',
    },
    {
      _id: '2',
      plan_name: 'Basic',
      email: 'test@example.com',
      user_name: 'test123',
      duration: 'Yearly',
      expiry_date: '02-12-2025',
      added_on: '02-12-2025',
      charges: '100',
    },
    {
      _id: '3',
      plan_name: 'Basic',
      email: 'test@example.com',
      user_name: 'test123',
      duration: 'Monthly',
      expiry_date: '02-12-2025',
      added_on: '02-12-2025',
      charges: '100',
    },
  ]
  return (
    <div>
      <Breadcrumb
        pageName="Subscriptions"
        totalContent={subscriptions.length}
        totalText="Total subscriptions added"
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
      {subscriptions && subscriptions.length > 0 ? (
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-6 px-4 border-b text-start font-medium">
                Order ID
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Plan name
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Duration
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Added By
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Added On
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Expiry Date
              </th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Charges
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((user) => (
              <tr
                key={user._id}
                className="text-primary bg-[#F5F5F5] text-[16.45px]"
              >
                <td className="py-3 px-4 text-start font-medium rounded-l-xl">
                  #{user._id}
                </td>
                <td className="py-3 px-4 text-start text-[19px] font-medium text-[#000000]">
                  {user.plan_name}
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  {user.duration}
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  <div className="flex justify-start align-center gap-3">
                    <div>
                      <span>
                        <Image
                          src="/images/admin/emptyUser.svg"
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
                        {user.user_name}
                      </span>
                      <span className="text-gray-500 text-[13px] font-medium">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  {format(new Date(user.added_on), 'MMM dd, yyyy')}
                </td>
                <td className="py-3 px-4 text-start font-medium">
                  {format(new Date(user.expiry_date), 'MMM dd, yyyy')}
                </td>
                <td className="py-3 px-4 text-start text-[21px] font-medium rounded-r-xl text-[#266CA8]">
                  ${user.charges}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center mt-20">
          <Image
            src={noSubscriptions}
            alt="No subscriptions found"
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

export default Subscriptions
