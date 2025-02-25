// 'use client'
// import React, { useState } from 'react'

// import Sidebar from '@/components/user/UserSideBar'
// import Header from '@/components/user/Header/index'

// export default function DefaultLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   return (
//     <>
//       {/* <!-- ===== Page Wrapper Start ===== --> */}
//       <div className="flex">
//         {/* <!-- ===== Sidebar Start ===== --> */}
//         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         {/* <!-- ===== Sidebar End ===== --> */}

//         {/* <!-- ===== Content Area Start ===== --> */}
//         <div className="relative flex flex-1 flex-col lg:ml-72.5">
//           {/* <!-- ===== Header Start ===== --> */}
//           <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//           {/* <!-- ===== Header End ===== --> */}

//           {/* <!-- ===== Main Content Start ===== --> */}
//           <main>
//             <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#FFFFFF]">
//               {children}
//             </div>
//           </main>
//           {/* <!-- ===== Main Content End ===== --> */}
//         </div>
//         {/* <!-- ===== Content Area End ===== --> */}
//       </div>
//       {/* <!-- ===== Page Wrapper End ===== --> */}
//     </>
//   )
// }

'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/user/UserSideBar'
import Header from '@/components/user/Header/index'
import Subscribe from '../Subscription/Subscribe'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isBilingOpen, setIsBilingOpen] = useState(false) // New state for Subscribe modal

  return (
    <>
      {/* Page Wrapper */}
      <div className="flex">
        {/* Sidebar */}

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setIsBilingOpen={setIsBilingOpen}
        />

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Main Content */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#FFFFFF]">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Subscribe Modal */}
      {isBilingOpen && (
        <Subscribe
          isBilingOpen={isBilingOpen}
          setIsBilingOpen={setIsBilingOpen}
        />
      )}
    </>
  )
}
