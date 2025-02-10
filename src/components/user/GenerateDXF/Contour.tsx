import React from 'react'

function Contour() {
    
    return (
        <div className='mt-5'>
            <p className='font-semibold text-2xl'>Contour Offset Parameter <span className='font-medium text-xl text-[#00000080]'>(inches)</span></p>
            <form action="">
                <input type="number" name="" id="" className='border rounded-full w-full p-3 my-5' />

                <div className="flex justify-between gap-4">
                    <button type='reset' className='w-1/2 bg-[#F2F2F2] p-3 rounded-full text-[#00000080] font-medium text-2xl'>Clear</button>
                    <button type="submit" className='w-1/2 bg-[#266CA8] p-3 rounded-full text-white font-medium text-2xl'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Contour
