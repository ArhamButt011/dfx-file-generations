import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import noDownloads from '/public/images/admin/noDownloads.svg'
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
  return (
    <div className="mt-14">
      <p className="font-semibold text-3xl mb-10">Subscription History</p>
      {loadingTable ? (
        <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : subscriptions.length > 0 ? (
        <table className="min-w-full rounded-3xl">
          <thead className="bg-[#266CA8] rounded-3xl">
            <tr className="text-[18.45px] text-white">
              <th className="p-3 border-b text-start font-medium rounded-tl-3xl">
                Sr No
              </th>
              <th className="p3 border-b text-center font-medium">Plan</th>
              <th className="p3 border-b text-center font-medium">Duration</th>
              <th className="p3 border-b text-center font-medium">Charges</th>
              <th className="p3 border-b text-center font-medium">
                Biling Date
              </th>
              <th className="p3 border-b text-center font-medium rounded-tr-3xl">
                Expiry Date
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((data: Subscription, index: number) => (
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
                  Monthly
                </td>
                <td className="py-4 px-4 text-center text-lg font-medium text-[#266CA8]">
                  ${data.charges}
                </td>
                <td className="py-4 px-4 text-center text-lg font-medium">
                  {data.added_on
                    ? format(parseISO(data.added_on), 'MMM dd, yyyy')
                    : 'N/A'}
                </td>
                <td
                  className={`py-4 px-4 text-center text-lg font-medium ${
                    index === subscriptions.length - 1
                      ? 'rounded-br-3xl border-0'
                      : 'border-r'
                  }`}
                >
                  {data.expiry_on
                    ? format(parseISO(data.expiry_on), 'MMM dd, yyyy')
                    : 'N/A'}
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

export default SubscriptionTable
