import React from 'react'

function index() {
    
    return (
        <div>
            <p className='font-semibold text-3xl'>Subscription Plan</p>
            <p className='font-medium text-lg text-[#00000080]'>Manage your subscription and payment details </p>
            <div className="flex mt-5">
                {/* left */}
                <div className='border rounded-2xl p-5'>
                    <div className="flex">
                        <div>
                            <p className='font-semibold text-xl'>Basic plan <span className='font-medium text-xs bg-[#266CA81A] text-[#266CA8] px-2 py-1 rounded-full'>Monthly</span></p>
                            <p className='text-[#00000080] font-medium text-xs mt-2'>Our most popular plan for small teams.</p>
                        </div>
                        <div>
                        <p>$100/month</p>
                        </div>
                    </div>
                    <p>Next Renewal Date: Apr 10, 2025</p>
                </div>
                {/* right */}
            </div>
        </div>
    )
}

export default index
