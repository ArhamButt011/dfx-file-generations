import Text from '@/components/UI/Text'
import Image from 'next/image'
import React from 'react'

const Examples = () => {
  return (
    <div>
      <div className="flex items-center mt-4 gap-1">
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
          <table className="w-full rounded-3xl whitespace-nowrap">
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
            {/* <tbody>
              {downloads.map((data, index) => (
                <tr
                  key={index}
                  className={`text-primary text-[14px] md:text-[16px] ${
                    index % 2 !== 0 ? 'bg-[#F2F2F2]' : 'bg-white'
                  }`}
                >
                  <td
                    className={`py-4 px-4 text-start font-medium ${
                      index === downloads.length - 1
                        ? 'rounded-bl-3xl border-0'
                        : 'border-l'
                    }`}
                  >
                    #{(page - 1) * 10 + index + 1}
                  </td>
                  <td className="py-4 px-4 text-center font-medium text-[14px] md:text-[16px] text-[#000000]">
                    <span>{data.file_name.replace(/\.dxf$/, '')}.dxf</span>

                    {/* <div className="flex items-center justify-center gap-2">
                        <span>{data.file_name}</span>
                        <Image
                          src={editImage}
                          alt="edit"
                          className="cursor-pointer"
                          onClick={() => {
                            setEditingFileId(data._id)
                            setIsEditOpen(true)
                          }}
                        />
                      </div> 
                  </td>
                  <td className="py-4 px-4 text-center text-[14px] md:text-[16px] font-medium">
                    {format(new Date(data.downloaded_on), 'MMM dd, yyyy')}
                  </td>
                  <td
                    className={`py-4 px-4 text-center text-[14px] md:text-[16px] font-medium relative ${
                      index === downloads.length - 1
                        ? 'rounded-br-3xl border-0'
                        : 'border-r'
                    }`}
                  >
                 
                    <div className="flex justify-center pl-3 gap-2 items-end">
                      <div>
                        <Link
                          className="border-b-blue-500 border-b font-semibold text-[#266CA8]"
                          href={{
                            pathname: `/downloaded-files/${data._id}`,
                            query: { source: 'downloads', page: page },
                          }}
                        >
                          Detail
                        </Link>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setEditingFileId(data._id)
                          setIsEditOpen(true)
                        }}
                      >
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.22266 10.73C3.22266 10.5642 3.35713 10.4297 3.52301 10.4297H9.9306C10.0965 10.4297 10.231 10.5642 10.231 10.73C10.231 10.8959 10.0965 11.0304 9.9306 11.0304H3.52301C3.35713 11.0304 3.22266 10.8959 3.22266 10.73Z"
                            fill="#266CA8"
                          />
                          <path
                            d="M6.53503 7.89842L6.53504 7.89841L8.90452 5.52893C8.58203 5.39471 8.20007 5.17423 7.83884 4.813C7.47755 4.45171 7.25706 4.06969 7.12284 3.74717L4.75332 6.11669L4.75331 6.1167C4.56841 6.3016 4.47595 6.39406 4.39644 6.496C4.30264 6.61626 4.22223 6.74637 4.15662 6.88404C4.101 7.00075 4.05965 7.12479 3.97695 7.37288L3.54088 8.68109C3.50019 8.80318 3.53196 8.93778 3.62296 9.02877C3.71395 9.11977 3.84855 9.15154 3.97064 9.11085L5.27885 8.67478C5.52694 8.59208 5.65098 8.55073 5.76769 8.49511C5.90536 8.4295 6.03547 8.34909 6.15573 8.25529C6.25767 8.17578 6.35013 8.08332 6.53503 7.89842Z"
                            fill="#266CA8"
                          />
                          <path
                            d="M9.56202 4.87143C10.054 4.37942 10.054 3.58172 9.56202 3.08971C9.07001 2.5977 8.27231 2.5977 7.7803 3.08971L7.49611 3.3739L7.50823 3.40963C7.61239 3.70987 7.80893 4.10346 8.17865 4.47319C8.54838 4.84291 8.94197 5.03945 9.24221 5.14361L9.27778 5.15567L9.56202 4.87143Z"
                            fill="#266CA8"
                          />
                        </svg>
                      </div>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Examples
