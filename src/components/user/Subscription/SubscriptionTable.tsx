import Image from 'next/image'
import React from 'react'
import { format, parseISO } from 'date-fns'
import noDownloads from '/public/images/admin/noDownloads.svg'

interface Biling {
    _id: string
    plan: string
    charges: number
    bilingDate: string
    expiryDate: string
}

const Biling: Biling[] = [
    {
        _id: '1',
        plan: 'Basic',
        charges: 100,
        bilingDate: new Date().toISOString(), // Store as ISO string
        expiryDate: new Date().toISOString(),
    },
    {
        _id: '2',
        plan: 'Basic',
        charges: 100,
        bilingDate: new Date().toISOString(),
        expiryDate: new Date().toISOString(),
    },
    {
        _id: '3',
        plan: 'Basic',
        charges: 100,
        bilingDate: new Date().toISOString(),
        expiryDate: new Date().toISOString(),
    },
    {
        _id: '4',
        plan: 'Basic',
        charges: 100,
        bilingDate: new Date().toISOString(),
        expiryDate: new Date().toISOString(),
    },
]

function SubscriptionTable() {
    return (
        <div className='mt-14'>
            <p className='font-semibold text-3xl mb-10'>Subscription History</p>
            {Biling && Biling.length > 0 ? (
                <table className="min-w-full rounded-3xl">
                    <thead className='bg-[#266CA8] rounded-3xl'>
                        <tr className="text-[18.45px] text-white">
                            <th className="p-3 border-b text-start font-medium rounded-tl-3xl">Sr No</th>
                            <th className="p3 border-b text-center font-medium">Plan</th>
                            <th className="p3 border-b text-center font-medium">Duration</th>
                            <th className="p3 border-b text-center font-medium">Charges</th>
                            <th className="p3 border-b text-center font-medium">Biling Date</th>
                            <th className="p3 border-b text-center font-medium rounded-tr-3xl">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Biling.map((data, index) => (
                            <tr key={index} className={`text-primary text-[16.45px] ${index % 2 !== 0 ? 'bg-[#F2F2F2]' : 'bg-white'}`}>
                                <td className={`py-4 px-4 text-start font-medium ${index === Biling.length - 1 ? 'rounded-bl-3xl border-0' : 'border-l'}`}>
                                    #{data._id}
                                </td>
                                <td className="py-4 px-4 text-center font-medium text-[19px] text-[#000000]">
                                    {data.plan}
                                </td>
                                <td className="py-4 px-4 text-center text-lg font-medium">Monthly</td>
                                <td className="py-4 px-4 text-center text-lg font-medium text-[#266CA8]">
                                    ${data.charges}
                                </td>
                                <td className="py-4 px-4 text-center text-lg font-medium">
                                    {format(parseISO(data.bilingDate), 'MMM dd, yyyy')}
                                </td>
                                <td className={`py-4 px-4 text-center text-lg font-medium ${index === Biling.length - 1 ? 'rounded-br-3xl border-0' : 'border-r'}`}>
                                    {format(parseISO(data.expiryDate), 'MMM dd, yyyy')}
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
