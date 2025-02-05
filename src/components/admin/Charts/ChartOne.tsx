'use client'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

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
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
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
    max: 200000,
    tickAmount: 5,

    labels: {
      formatter: function (value) {
        return '$' + (value / 1000).toFixed(0) + 'K'
      },
    },
  },
}

// interface ChartOneState {
//   series: {
//     name: string
//     data: number[]
//   }[]
// }

const ChartOne: React.FC = () => {
  const series = [
    {
      name: 'Product One',
      data: [70000, 100, 57674, 60095, 13, 22, 37, 21, 44, 90022, 30, 45],
    },
  ]

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-bodydark px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className="font-semibold text-black text-2xl">
                Subscription Payment
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <p className="font-semibold text-black text-2xl">$120K</p>
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
