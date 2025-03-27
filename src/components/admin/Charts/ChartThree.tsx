import Text from '@/components/UI/Text'
import { ApexOptions } from 'apexcharts'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const ChartThree: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [subscriptionsPercentages, setSubscriptionsPercentages] = useState([])

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get('/api/admin/dashboard/subscriptions')
        setSubscriptions(res.data.subscriptions)
        setSubscriptionsPercentages(res.data.subscriptionsPercentage)
      } catch (error) {
        console.error('Error fetching subscriptions: ', error)
      }
    }
    fetchSubscriptions()
  }, [])

  const series = subscriptions

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#266CA8', '#F5704B', '#E6E6E6'],
    labels: ['Basic', 'Free', 'Premium'],
    legend: {
      show: false,
      position: 'bottom',
    },

    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'white',

          labels: {
            show: true,
            total: {
              show: true,
              label: 'Subscriptions\nAdded',
              fontSize: '16px',
              fontWeight: 600,
              color: '#000',
              formatter: function (w) {
                return `
                 
                 ${w.globals.seriesTotals.reduce(
                   (a: number, b: number) => a + b,
                   0,
                 )}`
              },
            },
          },
        },
      },
    },

    // Disable data labels for each slice in a donut chart
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 360,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  }
  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-bodydark px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <Text as="h5" className=" font-semibold text-black">
            Subscriptions
          </Text>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center gap-y-3 sm:gap-y-0 sm:flex-row sm:justify-between">
        <div className="w-full sm:w-auto flex items-center ml-5 mt-2">
          <span className="mr-2 block h-5 w-5 rounded-md bg-secondary"></span>
          <p className="flex items-center text-sm font-medium text-black dark:text-white">
            <span> Basic: </span>
            <span className="text-secondary ml-1">
              {subscriptionsPercentages?.[0] ?? 0}%
            </span>
          </p>
        </div>

        <div className="w-full sm:w-auto flex items-center ml-5 sm:ml-3 mt-2">
          <span className="mr-2 block h-5 w-5 rounded-md bg-[#F5704B]"></span>
          <p className="flex items-center text-sm font-medium text-black dark:text-white mr-2">
            <span> Free: </span>
            <span className="text-[#F5704B] ml-1">
              {subscriptionsPercentages?.[1] ?? 0}%
            </span>
          </p>
        </div>

        <div className="w-full sm:w-auto flex items-center ml-5 sm:mr-3 mt-2 mr-2">
          <span className="mr-2 block h-5 w-5 rounded-md bg-[#E6E6E6]"></span>
          <p className="flex items-center text-sm font-medium text-black">
            <span> Premium: </span>
            <span className="text-[#0000006E] ml-1">
              {subscriptionsPercentages?.[2] ?? 0}%
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChartThree
