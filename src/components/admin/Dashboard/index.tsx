'use client'
import dynamic from 'next/dynamic'
import React from 'react'
import ChartOne from '../Charts/ChartOne'
import ChartTwo from '../Charts/ChartTwo'
import CardDataStats from '../CardDataStats'
import LastestUsersCard from '../LastestUsers/LatestUsersCard'
import contours from '/public/images/admin/dashboard/contours.svg'
import subscriptions from '/public/images/admin/dashboard/subscriptions.svg'
import downloads from '/public/images/admin/dashboard/Download.svg'
import Image from 'next/image'
import { ApexOptions } from 'apexcharts'

const ChartThree = dynamic(() => import('../Charts/ChartThree'), {
  ssr: false,
})

// const MapOne = dynamic(() => import('@/components/Maps/MapOne'), {
//   ssr: false,
// })

const chartData1: ApexOptions = {
  series: [
    {
      name: 'total users',
      color: '',
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ],
  chart: {
    id: 'total-users-1',
    type: 'area',
    height: 70,
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

const chartData2: ApexOptions = {
  series: [
    {
      name: 'total contours',
      color: '',
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ],
  chart: {
    id: 'total-contours-2', // Unique id for the second chart
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

const chartData3: ApexOptions = {
  series: [
    {
      name: 'total downloads',
      color: '',
      data: [25, 26, 100, 0, 12, 58, 20],
    },
  ],
  chart: {
    id: 'total-downloads-3', // Unique id for the third chart
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
      color: '',
      data: [25, 66, 20, 40, 12, 58, 20],
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

const Dashboard: React.FC = () => {
  return (
    <>
      <h1 className="text-[35.45px] font-semibold mb-3">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Users"
          total="6025"
          rate="0.43%"
          duration="Since Last Month"
          levelUp
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
        <CardDataStats
          title="Total Contours"
          total="120"
          rate="4.35%"
          duration="Since Last Month"
          levelUp
          chartData={chartData2}
        >
          <div className="bg-white rounded-full p-[6px]">
            <Image src={contours} alt="contours" />
          </div>
          {/* <svg
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
          </svg> */}
        </CardDataStats>
        <CardDataStats
          title="Total Downloads"
          total="112"
          rate="2.59%"
          duration="Since Last Month"
          levelUp
          chartData={chartData3}
        >
          <div className="bg-white rounded-full p-[6px]">
            <Image src={downloads} alt="download" />
          </div>
          {/* <svg
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
          </svg> */}
        </CardDataStats>
        <CardDataStats
          title="Total Subscriptions"
          total="28"
          rate="0.95%"
          duration="Since Last Month"
          levelDown
          chartData={chartData4}
        >
          <div className="bg-white rounded-full p-[6px]">
            <Image src={subscriptions} alt="subscriptions" />
          </div>
          {/* <svg
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
          </svg> */}
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
