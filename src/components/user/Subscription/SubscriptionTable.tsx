import Image from 'next/image'
import React from 'react'
import { format } from 'date-fns'
// import userImage from '/public/images/admin/emptyUser.svg'
import noDownloads from '/public/images/admin/noDownloads.svg'

interface Payment {
    card: string,
    name: string,
    date: string,
}

interface biling {
    _id: string
    plan: string
    paymentwith: Payment
    charges: number
    bilingDate: string
    expiryDate: string
}

const Biling: biling[] = [
    {
        _id: '1',
        plan: 'Basic',
        paymentwith: {
            card: "021***********021",
            name: "Alex Handai",
            date: "06/2025"

        },
        charges: 100,
        bilingDate: new Date().toLocaleDateString(),
        expiryDate: new Date().toLocaleDateString(),
    },
    {
        _id: '2',
        plan: 'Basic',
        paymentwith: {
            card: "021***********021",
            name: "Alex Handai",
            date: "06/2025"

        },
        charges: 100,
        bilingDate: new Date().toLocaleDateString(),
        expiryDate: new Date().toLocaleDateString(),
    },
    {
        _id: '3',
        plan: 'Basic',
        paymentwith: {
            card: "021***********021",
            name: "Alex Handai",
            date: "06/2025"

        },
        charges: 100,
        bilingDate: new Date().toLocaleDateString(),
        expiryDate: new Date().toLocaleDateString(),
    },
]
function SubscriptionTable() {
    return (
        <div className='mt-14'>
            <p className='font-semibold text-3xl mb-10'>Subscription History</p>
            {Biling && Biling.length > 0 ? (
                <table className=" min-w-full border rounded-3xl">
                    <thead className='bg-[#266CA8] rounded-3xl'>
                        <tr className="text-[18.45px] text-white">
                            <th className="p-3 border-b text-start font-medium">Sr No</th>
                            <th className="p3 border-b text-center font-medium">
                                Plan
                            </th>
                            <th className="p3 border-b text-center font-medium">
                                Payment With
                            </th>
                            <th className="p3 border-b text-center font-medium">
                                Charges
                            </th>
                            <th className="p3 border-b text-center font-medium">
                                Biling Date
                            </th>
                            <th className="p3 border-b text-center font-medium">
                                Expiry Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Biling.map((data, index) => (
                            <tr
                                key={index}
                                className={`text-primary text-[16.45px] ${index % 2 != 0 ? 'bg-[#F2F2F2]' : 'bg-white'}`}
                            >
                                <td className="py-3 px-4 text-start font-medium ">
                                    #{data._id}
                                </td>
                                <td className="py-3 px-4   text-center font-medium text-[19px] text-[#000000]">
                                    {data.plan}
                                </td>
                                <td className="py-3 px-4 text-start font-medium">
                                    <div className="flex justify-center align-center gap-3">
                                        <div>
                                            <p className='text-lg text-black-2 font-medium'>{data.paymentwith.card}</p>
                                            <div className='text-base font-medium text-[#00000080]'>
                                                <p>{data.paymentwith.name}</p>
                                                <p>Expiray Date: <span className='text-black'>{data.paymentwith.date}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="py-3 px-4 text-center text-lg font-medium  text-[#266CA8]">
                                    ${data.charges}
                                </td>
                                <td className="py-3 px-4 text-center text-lg font-medium ">
                                    {format(new Date(data.bilingDate), 'MMM dd, yyyy')}
                                </td>
                                <td className="py-3 px-4 text-center text-lg font-medium ">
                                    {format(new Date(data.expiryDate), 'MMM dd, yyyy')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex flex-col items-center mt-20">
                    <Image
                        src={noDownloads}
                        alt="No payment details found"
                        width={200}
                        height={200}
                        priority
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </div>
            )}
        </div>
    )
}

export default SubscriptionTable
