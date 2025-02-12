import React from 'react'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import Image from 'next/image'
import noPaymentDetails from '/public/images/admin/noPaymentDetails.svg'
import { format } from 'date-fns'

interface Payments {
  _id: string
  user_name: string
  email: string
  card_no: string
  expiry_date: string
  added_on: string
}

const PaymentDetails = () => {
  const paymentDetails: Payments[] = [
    {
      _id: '1',
      user_name: 'ali',
      email: 'test@example.com',
      card_no: '29292923333',
      expiry_date: '02-12-2025',
      added_on: '02-12-2025',
    },
    {
      _id: '2',
      user_name: 'abrar',
      email: 'test@example.com',
      card_no: '29292923333',
      expiry_date: '02-12-2025',
      added_on: '02-12-2025',
    },
    {
      _id: '3',
      user_name: 'akbar',
      email: 'test@example.com',
      card_no: '29292923333',
      expiry_date: '02-12-2025',
      added_on: '02-12-2025',
    },
  ]
  return (
    <div>
      <Breadcrumb
        pageName="Payment Details Added"
        totalContent={paymentDetails.length}
        totalText="TotalPayment Details Added"
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
      {paymentDetails && paymentDetails.length > 0 ? (
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[18.45px] text-gray-600">
              <th className="pb-6 border-b text-start font-medium">Added By</th>
              <th className="pb-6 px-4 border-b text-start font-medium">
                Card Number
              </th>
              <th className="pb-6 px-4 border-b text-center font-medium">
                Expiry Date
              </th>
              <th className="pb-6 px-4 border-b text-center font-medium">
                Added On
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((user) => (
              <tr
                key={user._id}
                className="text-primary bg-[#F5F5F5] text-[16.45px]"
              >
                <td className="py-3 px-4 text-start text-lg font-medium rounded-l-xl">
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
                <td className="py-3 px-4 text-start text-lg font-medium">
                  {user.card_no}
                </td>
                <td className="py-3 px-4 text-center text-lg font-medium">
                  {format(new Date(user.expiry_date), 'MMM dd, yyyy')}
                </td>

                <td className="py-3 px-4 text-center text-lg font-medium">
                  {format(new Date(user.added_on), 'MMM dd, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center mt-20">
          <Image
            src={noPaymentDetails}
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

export default PaymentDetails
