import React from 'react'

function index() {
    return (
        <div>
            <p className='font-semibold text-3xl'>Subscription Plan</p>
            <p className='font-medium text-lg text-[#00000080]'>Manage your subscription and payment details </p>
            <div className="flex">
                {/* left */}
                <div>
                    <div className="flex">
                        <div>
                            <p>Basic plan</p>
                            <p>Our most popular plan for small teams.</p>
                        </div>
                        <div>
                        $100/month
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
