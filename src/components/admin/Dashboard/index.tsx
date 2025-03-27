'use client'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import ChartOne from '../Charts/ChartOne'
import ChartTwo from '../Charts/ChartTwo'
import CardDataStats from '../CardDataStats'
import LastestUsersCard from '../LastestUsers/LatestUsersCard'
import subscriptions from '/public/images/admin/dashboard/subscriptions.svg'
import downloads from '/public/images/admin/dashboard/Download.svg'
import Image from 'next/image'
import { ApexOptions } from 'apexcharts'
import Text from '@/components/UI/Text'

const ChartThree = dynamic(() => import('../Charts/ChartThree'), {
  ssr: false,
})

interface Summary {
  totalUsers: number
  // totalContours?: number
  totalDownloads?: number
  totalSubscriptions?: number
  currentMonthAvg: {
    downloads: number
    contours: number
    subscriptions: number
    users: number
  }
  lastMonthAvg: {
    downloads: number
    contours: number
    subscriptions: number
    users: number
  }
}

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [monthlyUsers, setMonthlyUsers] = useState([])
  // const [monthlyContours, setMonthlyContours] = useState([])
  const [monthlySubscriptions, setMonthlySubscriptions] = useState([])
  const [monthlyDownloads, setMonthlyDownloads] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/summary')
        const data = await response.json()
        if (data.success) {
          setSummary(data.data)
          setMonthlyUsers(data.data.monthlyUsers)
          // setMonthlyContours(data.data.monthlyContours)
          setMonthlySubscriptions(data.data.monthlySubscriptions)
          setMonthlyDownloads(data.data.monthlyDownloads)
        }
      } catch (error) {
        console.error('Error fetching summary:', error)
      }
    }

    fetchData()
  }, [])
  const chartData1: ApexOptions = {
    series: [
      {
        name: 'total users',
        color:
          (summary?.currentMonthAvg?.users ?? 0) >
          (summary?.lastMonthAvg?.users ?? 0)
            ? '#266CA8'
            : '#D7890C',
        data: monthlyUsers,
      },
    ],
    chart: {
      id: 'total-users-1',
      type: 'area',
      height: 70,
      width: 40,

      sparkline: {
        enabled: true,
      },
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [20, 180],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: false,
      },
    },
  }
  // const chartData2: ApexOptions = {
  //   series: [
  //     {
  //       name: 'total contours',
  //       color: '#266CA8',
  //       data: monthlyContours,
  //     },
  //   ],
  //   chart: {
  //     id: 'total-contours-2',
  //     type: 'area',
  //     height: 70,
  //     sparkline: {
  //       enabled: true,
  //     },

  //     fontFamily: 'inherit',
  //   },
  //   stroke: {
  //     curve: 'straight',
  //     width: 2,
  //   },
  //   fill: {
  //     type: 'gradient',
  //     gradient: {
  //       shadeIntensity: 0,
  //       inverseColors: false,
  //       opacityFrom: 0,
  //       opacityTo: 0,
  //       stops: [20, 180],
  //     },
  //   },

  //   markers: {
  //     size: 0,
  //   },
  //   tooltip: {
  //     theme: 'dark',
  //     fixed: {
  //       enabled: true,
  //       position: 'right',
  //     },
  //     x: {
  //       show: false,
  //     },
  //   },
  // }
  const chartData3: ApexOptions = {
    series: [
      {
        name: 'total downloads',
        color:
          (summary?.currentMonthAvg?.downloads ?? 0) >
          (summary?.lastMonthAvg?.downloads ?? 0)
            ? '#266CA8'
            : '#D7890C',
        data: monthlyDownloads,
      },
    ],
    chart: {
      id: 'total-downloads-3',
      type: 'area',
      height: 70,
      sparkline: {
        enabled: true,
      },
      fontFamily: 'inherit',
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [20, 180],
      },
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: false,
      },
    },
  }
  const chartData4: ApexOptions = {
    series: [
      {
        name: 'total subscriptions',
        color:
          (summary?.currentMonthAvg?.subscriptions ?? 0) >
          (summary?.lastMonthAvg?.subscriptions ?? 0)
            ? '#266CA8'
            : '#D7890C',

        data: monthlySubscriptions,
      },
    ],
    chart: {
      id: 'total-subscriptions-4',
      type: 'area',
      height: 70,
      sparkline: {
        enabled: true,
      },
      fontFamily: 'inherit',
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [20, 180],
      },
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: false,
      },
    },
  }

  return (
    <>
      <Text as="h3" className="font-semibold mb-3">
        Dashboard
      </Text>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats
          title="Total Users"
          total={summary?.totalUsers ?? 0}
          rate={summary?.currentMonthAvg?.users ?? 0}
          duration="Since Last Month"
          currentAvg={summary?.currentMonthAvg?.users}
          lastMonthAvg={summary?.lastMonthAvg?.users}
          chartData={chartData1}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="white" />
            <path
              d="M23.5 15.5C23.5 17.433 21.933 19 20 19C18.067 19 16.5 17.433 16.5 15.5C16.5 13.567 18.067 12 20 12C21.933 12 23.5 13.567 23.5 15.5Z"
              fill="#266CA8"
            />
            <path
              d="M26 24.5C26 26.433 23.3137 28 20 28C16.6863 28 14 26.433 14 24.5C14 22.567 16.6863 21 20 21C23.3137 21 26 22.567 26 24.5Z"
              fill="#266CA8"
            />
            <path
              d="M15.122 13C15.2995 13 15.4728 13.0174 15.6401 13.0506C15.2325 13.7745 15 14.6101 15 15.5C15 16.3683 15.2213 17.1848 15.6106 17.8964C15.4524 17.9258 15.2891 17.9413 15.122 17.9413C13.7076 17.9413 12.561 16.8351 12.561 15.4706C12.561 14.1061 13.7076 13 15.122 13Z"
              fill="#266CA8"
            />
            <path
              d="M13.4473 26.986C12.8794 26.3071 12.5 25.474 12.5 24.5C12.5 23.5558 12.8566 22.744 13.3958 22.0767C11.4911 22.2245 10 23.2662 10 24.5294C10 25.8044 11.5173 26.8538 13.4473 26.986Z"
              fill="#266CA8"
            />
            <path
              d="M24.9999 15.5C24.9999 16.3683 24.7786 17.1848 24.3893 17.8964C24.5475 17.9258 24.7108 17.9413 24.8779 17.9413C26.2923 17.9413 27.4389 16.8351 27.4389 15.4706C27.4389 14.1061 26.2923 13 24.8779 13C24.7004 13 24.5272 13.0174 24.3599 13.0506C24.7674 13.7745 24.9999 14.6101 24.9999 15.5Z"
              fill="#266CA8"
            />
            <path
              d="M26.5526 26.986C28.4826 26.8538 29.9999 25.8044 29.9999 24.5294C29.9999 23.2662 28.5088 22.2245 26.6041 22.0767C27.1433 22.744 27.4999 23.5558 27.4999 24.5C27.4999 25.474 27.1205 26.3071 26.5526 26.986Z"
              fill="#266CA8"
            />
          </svg>
        </CardDataStats>
        {/* <CardDataStats
          title="Total Contours"
          total={summary?.totalContours ?? 0}
          rate={summary?.currentMonthAvg?.contours ?? 0}
          duration="Since Last Month"
          currentAvg={summary?.currentMonthAvg?.contours}
          lastMonthAvg={summary?.lastMonthAvg?.contours}
          chartData={chartData2}
        >
          <div className="bg-white rounded-full p-[6px]">
            <Image src={contours} alt="contours" />
          </div>
        </CardDataStats> */}
        <CardDataStats
          title="Total Downloads"
          total={summary?.totalDownloads ?? 0}
          rate={summary?.currentMonthAvg?.downloads ?? 0}
          duration="Since Last Month"
          currentAvg={summary?.currentMonthAvg?.downloads}
          lastMonthAvg={summary?.lastMonthAvg?.downloads}
          chartData={chartData3}
        >
          <div className="bg-white rounded-full p-[6px]">
            <Image src={downloads} alt="download" />
          </div>
        </CardDataStats>
        <CardDataStats
          title="Total Subscriptions"
          total={summary?.totalSubscriptions ?? 0}
          rate={summary?.currentMonthAvg?.subscriptions ?? 0}
          duration="Since Last Month"
          currentAvg={summary?.currentMonthAvg?.subscriptions}
          lastMonthAvg={summary?.lastMonthAvg?.subscriptions}
          chartData={chartData4}
        >
          <div className="bg-white rounded-full p-[6px]">
            <Image src={subscriptions} alt="subscriptions" />
          </div>
        </CardDataStats>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <ChartThree />
        <LastestUsersCard />
        <ChartOne />
      </div>
    </>
  )
}

export default Dashboard
