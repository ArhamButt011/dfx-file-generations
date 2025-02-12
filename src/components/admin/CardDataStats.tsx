import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { ApexOptions } from 'apexcharts'
import Image from 'next/image'
import levelUpImage from '/public/images/admin/levelUp.svg'
import levelDownImage from '/public/images/admin/levelDown.svg'

interface CardDataStatsProps {
  title: string
  total: string
  rate: string
  levelUp?: boolean
  levelDown?: boolean
  duration: string
  chartData: ApexOptions
  children: ReactNode
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  duration,
  chartData,
  children,
}) => {
  return (
    <div className="border border-stroke bg-bodydark px-3 py-2 rounded-xl">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full dark:bg-meta-4">
        {children}
      </div>

      <div className="flex items-end justify-between">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-[#000000B2]">{title}</div>
            <div className="">
              <Chart
                options={chartData}
                series={chartData.series}
                type="area"
                height="30px"
                width="25%"
              />
            </div>
          </div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-primary mt-2">
              {duration}
            </span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                levelUp && 'text-[#266CA8]'
              } ${levelDown && 'text-[#D7890C]'} `}
            >
              {rate}

              {levelUp && <Image src={levelUpImage} alt="levelup" />}
              {levelDown && <Image src={levelDownImage} alt="levelDown" />}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDataStats
