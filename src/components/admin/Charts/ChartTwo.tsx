import { ApexOptions } from 'apexcharts'
import React from 'react'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options: ApexOptions = {
  colors: ['#266CA8'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 3,
      columnWidth: '35%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
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
  },
  yaxis: {
    labels: {
      show: false,
    },
    tickAmount: 5,
  },
  grid: {
    show: true,
    strokeDashArray: 4,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: {
      size: 10,
      strokeWidth: 1,
      fillColors: ['#3C50E0'],
    },
  },
  fill: {
    opacity: 1,
  },
}

const ChartTwo: React.FC = () => {
  const series = [
    {
      name: 'DXF Downloads',
      data: [44, 55, 41, 67, 22, 43, 65, 55, 70, 80, 90, 25],
    },
  ]

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-bodydark p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-8">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            DXF Downloads
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartTwo
