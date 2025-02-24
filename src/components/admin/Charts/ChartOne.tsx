'use client'
import { ApexOptions } from 'apexcharts'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const ChartOne: React.FC = () => {
  const [paymentSubscriptions, setPaymentSubscriptions] = useState([])
  const [months, setMonths] = useState([])
  const [totalPayment, setTotalPayment] = useState()
  const [currMonthAvg, setCurrMonthAvg] = useState<number>(0)
  const [prevMonthAvg, setPrevMonthAvg] = useState<number>(0)

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await fetch(
          '/api/admin/dashboard/subscription-payments',
        )
        const data = await response.json()

        if (data.success) {
          setPaymentSubscriptions(data.payments)
          setMonths(data.months)
          setTotalPayment(data.totalCharges)
          setCurrMonthAvg(data.currentMonthAvg)
          setPrevMonthAvg(data.previousMonthAvg)
        }
      } catch (error) {
        console.error('Error fetching subscriptions payments:', error)
      }
    }

    fetchDownloads()
  }, [])

  const series = [
    {
      name: 'Subscription Payment',
      data: paymentSubscriptions,
    },
  ]

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#F5704B'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#F5704B33',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'smooth',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    // markers: {
    //   size: 4,
    //   colors: '#fff',
    //   strokeColors: ['#3056D3', '#80CAEE'],
    //   strokeWidth: 3,
    //   strokeOpacity: 0.9,
    //   strokeDashArray: 0,
    //   fillOpacity: 1,
    //   discrete: [],
    //   hover: {
    //     size: undefined,
    //     sizeOffset: 5,
    //   },
    // },
    xaxis: {
      type: 'category',
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      tickAmount: 5,
      labels: {
        formatter: function (value) {
          if (value < 1000) {
            return '$' + value.toFixed(0) // Show normal numbers below 1K
          } else {
            return '$' + (value / 1000).toFixed(0) + 'K' // Show in 'K' for 1000+
          }
        },
      },
    },
  }

  const formatNumber = (num?: number) => {
    if (!num) return '0'
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-bodydark px-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 h-[450px]">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className="font-semibold text-black text-[26px]">
                Subscription Payment
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md gap-5 bg-whiter p-1.5 dark:bg-meta-4">
            <p className="font-semibold text-[33.56px] text-black text-2xl">
              ${formatNumber(totalPayment)}
            </p>
            <p
              className={`rounded-lg p-2 text-[16.07px] font-medium ${
                currMonthAvg > prevMonthAvg
                  ? 'text-[#F5704B] bg-[#F5704B1A]'
                  : 'text-[#D7890C] bg-[#F5704B1A]'
              }`}
            >
              {currMonthAvg > prevMonthAvg ? '+' : '-'}
              {formatNumber(
                currMonthAvg > prevMonthAvg ? currMonthAvg : prevMonthAvg,
              )}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartOne
