import React from 'react'

function signup() {
    return (
        <>
            <h1 className="text-[32px] text-center font-foghe font-normal text-graish">
                Get Updated Or Support New Ideas!!
            </h1>
            <p className="text-[16px] text-center font-sofiapro font-normal text-[#888888] mob:px-4">
                Stay in the loop as we get ready to launch Lumashape! Sign up with your email below for exclusive updates and early access.
            </p>
            <div className="flex justify-center gap-[8px] mt-8 mb-12">
                <input
                    className="w-full max-w-[239px] h-[40px] px-3 border-[1px] outline-none  rounded-xl  placeholder:text-[14px] placeholder:font-foghe"
                    type="text"
                    placeholder="Enter your email address"
                />
                <button className="bg-[#266CA8] text-white w-[98px] h-[41.2px] font-normal text-[14px] rounded-xl">
                    Sign up
                </button>
            </div>
        </>
    )
}

export default signup
