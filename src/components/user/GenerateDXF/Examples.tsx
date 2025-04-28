import Text from '@/components/UI/Text'
import Image from 'next/image'
import React from 'react'

const Examples = () => {
  const examples = [
    {
      image: '/images/user/GenerateDFX/dxf1.jpg',
      valueForMask: 0.075,
      offsetUnit: 'inches',
      fingerClearence: 'Yes',
      rectangularBoundary: 'No',
      boundaryLength: 400,
    },
    {
      image: '/images/user/GenerateDFX/dxf2.png',
      valueForMask: 0,
      offsetUnit: 'inches',
      fingerClearence: 'Yes',
      rectangularBoundary: 'Yes',
      boundaryLength: 300,
    },
    {
      image: '/images/user/GenerateDFX/dxf3.svg',
      valueForMask: 0.075,
      offsetUnit: 'mm',
      fingerClearence: 'Yes',
      rectangularBoundary: 'No',
      boundaryLength: 300,
    },
    {
      image: '/images/user/GenerateDFX/dxf4.svg',
      valueForMask: 0.075,
      offsetUnit: 'inches',
      fingerClearence: 'Yes',
      rectangularBoundary: 'No',
      boundaryLength: 300,
    },
  ]
  return (
    <div>
      <div className="flex items-center mt-4 gap-1 mb-4">
        <div className="">
          <Image
            src={'/images/user/GenerateDFX/examples.svg'}
            alt="eamples"
            height={30}
            width={30}
          />
        </div>
        <Text as="h4" className="font-semibold">
          Examples
        </Text>
      </div>

      <div className="w-full overflow-x-auto grid grid-cols-1">
        <div className="w-full  sm:max-w-full">
          <table className="w-full rounded-3xl overflow-hidden border border-[#C6C9CB]">
            <thead className="bg-[#C6C9CB] rounded-3xl">
              <tr className="md:text-[16px] text-[14px] text-black">
                <th className="p-3 border-b text-start font-medium rounded-tl-3xl">
                  Input Image
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Offset Value For Mask
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Offset Unit
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Add Finger Clearance?
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Add Rectangular Boundary?
                </th>
                <th className="p-3 border-b text-center font-medium rounded-tr-3xl">
                  Boundary Length
                </th>
              </tr>
            </thead>
            <tbody>
              {examples.map((data, index) => {
                const isLastRow = index === examples.length - 1
                return (
                  <tr
                    key={index}
                    className={`text-primary text-[14px] md:text-[16px] ${
                      index % 2 !== 0 ? 'bg-[#F2F2F2]' : 'bg-white'
                    }`}
                  >
                    <td
                      className={`py-4 px-4 text-center font-medium border border-[#C6C9CB] ${
                        isLastRow ? 'rounded-bl-3xl' : ''
                      }`}
                    >
                      <Image
                        src={data.image}
                        alt="dxfimage"
                        height={100}
                        width={75}
                      />
                    </td>

                    <td className="py-4 px-4 text-center font-medium border border-[#C6C9CB]">
                      {data.valueForMask}
                    </td>
                    <td className="py-4 px-4 text-center font-medium border border-[#C6C9CB]">
                      {data.offsetUnit}
                    </td>
                    <td className="py-4 px-4 text-center font-medium border border-[#C6C9CB]">
                      {data.fingerClearence}
                    </td>
                    <td className="py-4 px-4 text-center font-medium border border-[#C6C9CB]">
                      {data.rectangularBoundary}
                    </td>
                    <td
                      className={`py-4 px-4 text-center font-medium border border-[#C6C9CB] ${
                        isLastRow ? 'rounded-br-3xl' : ''
                      }`}
                    >
                      {data.boundaryLength}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Examples
