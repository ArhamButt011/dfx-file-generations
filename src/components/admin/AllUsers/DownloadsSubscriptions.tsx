import Image from 'next/image'
import React, { useState } from 'react'
import noDownloads from '/public/images/admin/allusers/nodownloads.svg'
import noSubscriptions from '/public/images/admin/allusers/noSubscriptions.svg'
import { format } from 'date-fns'

interface Downloads {
  order_id: string
  file_name: string
  downloaded_on: string
}

interface Subscriptions {
  order_id: string
  plan_name: string
  duration: string
  added_on: string
  expiry_on: string
  charges: number
  status: string
}

const DownloadsSubscriptions = () => {
  const [activeTab, setActiveTab] = useState<string>('Downloads')
  //   const[loadingTable,setLoadingTable]= useState<boolean>(false)
  const downloadsData: Downloads[] = [
    {
      order_id: '1',
      file_name: 'project_dxf_01.dxf',
      downloaded_on: '2024-02-01',
    },
    {
      order_id: '2',
      file_name: 'blueprint_2024.dxf',
      downloaded_on: '2024-02-15',
    },
    {
      order_id: '3',
      file_name: 'site_plan_v2.dxf',
      downloaded_on: '2024-03-05',
    },
    {
      order_id: '4',
      file_name: 'design_drawing.dxf',
      downloaded_on: '2024-03-20',
    },
    {
      order_id: '5',
      file_name: 'construction_model.dxf',
      downloaded_on: '2024-04-10',
    },
  ]

  const subscriptions: Subscriptions[] = [
    {
      order_id: '1',
      plan_name: 'Basic',
      duration: 'Monthly',
      added_on: 'Apr 10, 2024',
      expiry_on: 'Apr 10, 2024',
      charges: 100,
      status: 'Current',
    },
    {
      order_id: '2',
      plan_name: 'Premium',
      duration: 'Yearly',
      added_on: 'Apr 10, 2024',
      expiry_on: 'Apr 10, 2024',
      charges: 100,
      status: 'Past',
    },
  ]

  return (
    <>
      <div className="flex gap-20 mt-7 border-b pl-10 mb-7">
        <h1
          className={`text-xl font-medium cursor-pointer pb-3 relative ${
            activeTab === 'Downloads'
              ? 'text-[#266CA8] after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-28 after:bg-[#266CA8]'
              : 'text-[#00000066]'
          }`}
          onClick={() => setActiveTab('Downloads')}
        >
          Downloaded Files
        </h1>

        <h1
          className={`text-xl font-medium cursor-pointer pb-3 relative ${
            activeTab === 'Subscriptions'
              ? 'text-[#266CA8] after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-28 after:bg-[#266CA8]'
              : 'text-[#00000066]'
          }`}
          onClick={() => setActiveTab('Subscriptions')}
        >
          Subscription
        </h1>
      </div>
      {activeTab == 'Downloads' ? (
        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[27.42px] font-semibold text-[#000000]">
                DXF Downloads
              </h1>
              <p className="mt-2 font-medium text-[17.28px] text-primary">
                Total DXF Downloads: {downloadsData.length}
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-lg border border-gray-300"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav> */}
          </div>
          {downloadsData && downloadsData.length > 0 ? (
            <table className="min-w-full bg-white border-gray-300 text-[20.45px]">
              <thead>
                <tr className="text-md text-gray-600">
                  <th className="pb-4 border-b text-start font-medium">
                    Order ID
                  </th>
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    File Name
                  </th>
                  <th className="pb-4 px-4 border-b text-right font-medium">
                    Downloaded On
                  </th>
                </tr>
              </thead>
              <tbody>
                {downloadsData.map((data: Downloads) => (
                  <tr key={data.order_id} className="text-[22px]">
                    <td className="py-5 px-4 border-b text-start font-medium text-[#00000066]">
                      #{data.order_id}
                    </td>
                    <td className="py-3 px-4 border-b text-start font-medium text-[#000000]">
                      {data.file_name}
                    </td>
                    <td className="py-3 px-4 border-b text-right text-[20px] font-medium text-[#00000066]">
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
                alt="No jobs found"
                width={200}
                height={200}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
        </div>
      ) : activeTab == 'Subscriptions' ? (
        <div>
          {subscriptions && subscriptions.length > 0 ? (
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-md text-gray-600 text-[18.45px]">
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    Order ID
                  </th>
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    Plan name
                  </th>
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    Duration
                  </th>
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    Added On
                  </th>
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    Expiry Date
                  </th>
                  <th className="pb-4 px-4 border-b text-start font-medium">
                    Charges
                  </th>
                  <th className="pb-4 pl-7 border-b text-start font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((data, index) => (
                  <tr
                    key={index}
                    className="text-primary bg-[#F5F5F5] text-[16px]"
                  >
                    <td className="py-5 px-4 text-start font-medium rounded-l-xl">
                      #{data.order_id}
                    </td>
                    <td className="py-5 px-4 text-start font-medium text-black text-[19px]">
                      {data.plan_name}
                    </td>
                    <td className="py-5 px-4 text-start font-medium">
                      {data.duration}
                    </td>
                    <td className="py-5 px-4 text-start font-medium ">
                      {format(new Date(data.expiry_on), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-5 px-4 text-start font-medium ">
                      {format(new Date(data.added_on), 'MMM dd, yyyy')}
                    </td>

                    <td className="py-5 px-4 text-start text-[19px] font-medium text-[#266CA8]">
                      ${data.charges}
                    </td>
                    <td
                      className={`py-5 px-4 text-start font-medium rounded-r-xl`}
                    >
                      <span
                        className={`${
                          data.status === 'Current'
                            ? 'text-[#266CA8] bg-[#E0E7ED] rounded-full px-4 py-2'
                            : 'text-[#F9A000] bg-[#F5EDDD] px-8 py-2 rounded-full'
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center mt-20">
              <Image
                src={noSubscriptions}
                alt="No jobs found"
                width={200}
                height={200}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

export default DownloadsSubscriptions
