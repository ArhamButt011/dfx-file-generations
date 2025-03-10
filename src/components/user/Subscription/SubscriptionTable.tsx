import Image from 'next/image'
import { format } from 'date-fns'
import noDownloads from '/public/images/user/subscription/noSubscription.svg'
import { ClipLoader } from 'react-spinners'
interface Subscription {
  order_id: string
  plan_name: string
  duration: string
  added_on: string
  expiry_date: string
  expiry_on: string
  charges: number
  status: string
}
interface SubscriptionTableProps {
  subscriptions: Subscription[]
  loadingTable: boolean
}

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  subscriptions,
  loadingTable,
}) => {
  const getStatus = (expiryDate: string, status: string): string => {
    if (status === 'canceled') {
      return 'Canceled'
    } else {
      const currentDate = new Date()
      const expiryDateObj = new Date(expiryDate)
      return currentDate < expiryDateObj ? 'Current' : 'Past'
    }
  }
  console.log(subscriptions)
  return (
    <div className="mt-14">
      <p className="font-semibold text-3xl mb-10">Subscription History</p>
      {loadingTable ? (
        <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : subscriptions.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <div className="w-full max-w-[200px] sm:max-w-full">
            {' '}
            {/* Ensures the table has a minimum width */}
            <table className="w-full rounded-3xl whitespace-nowrap">
              <thead className="bg-[#266CA8] rounded-3xl">
                <tr className="text-[18.45px] text-white">
                  <th className="p-3 border-b text-start font-medium rounded-tl-3xl">
                    Sr No
                  </th>
                  <th className="p-3 border-b text-center font-medium">Plan</th>
                  <th className="p-3 border-b text-center font-medium">
                    Duration
                  </th>
                  <th className="p-3 border-b text-center font-medium">
                    Charges
                  </th>
                  <th className="p-3 border-b text-center font-medium">
                    Billing Date
                  </th>
                  <th className="p-3 border-b text-center font-medium">
                    Expiry Date
                  </th>
                  <th className="p-3 border-b text-center font-medium rounded-tr-3xl">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((data: Subscription, index: number) => {
                  const status = getStatus(data?.expiry_on, data?.status)
                  return (
                    <tr
                      key={index}
                      className={`text-primary text-[16.45px] ${
                        index % 2 !== 0 ? 'bg-[#F2F2F2]' : 'bg-white'
                      }`}
                    >
                      <td
                        className={`py-4 px-4 text-start font-medium ${
                          index === subscriptions.length - 1
                            ? 'rounded-bl-3xl border-0'
                            : 'border-l'
                        }`}
                      >
                        #{index + 1}
                      </td>
                      <td className="py-4 px-4 text-center font-medium text-[19px] text-[#000000]">
                        {data.plan_name}
                      </td>
                      <td className="py-4 px-4 text-center text-lg font-medium">
                        {data.duration}
                      </td>
                      <td className="py-4 px-4 text-center text-lg font-medium text-[#266CA8]">
                        ${data.charges}
                      </td>
                      <td className="py-4 px-4 text-center text-lg font-medium">
                        {data.added_on
                          ? format(new Date(data.added_on), 'MMM dd, yyyy')
                          : 'N/A'}
                      </td>
                      <td
                        className={`py-4 px-4 text-center text-lg font-medium
                       `}
                      >
                        {data.expiry_on
                          ? format(new Date(data.expiry_on), 'MMM dd, yyyy')
                          : 'N/A'}
                      </td>
                      <td
                        className={`py-4 px-4 text-center text-lg font-medium ${
                          index === subscriptions.length - 1
                            ? 'rounded-br-3xl border-0'
                            : 'border-r'
                        }`}
                      >
                        <span
                          className={`${
                            status === 'Current'
                              ? 'text-[#266CA8] bg-[#E0E7ED] rounded-full px-4 py-2'
                              : status === 'Canceled'
                              ? 'bg-[#DB9E9E] text-[#D32F2F] px-3 py-2 rounded-full'
                              : 'bg-[#F9A0001A] text-[#F9A000] px-8 py-2 rounded-full'
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
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

export default SubscriptionTable
