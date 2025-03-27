// import Image from 'next/image'
// import React, { useCallback, useEffect, useState } from 'react'
// import noDownloads from '/public/images/admin/allusers/nodownloads.svg'
// import { format } from 'date-fns'
// import { useParams } from 'next/navigation'
// import { ClipLoader } from 'react-spinners'
// import searchIcon from '/public/images/searchIcon.svg'

// interface Downloads {
//   order_id: string
//   file_name: string
//   downloaded_on: string
// }
// const Downloads = () => {
//   const [loadingTable, setLoadingTable] = useState<boolean>(false)
//   const [downloadsSearchQuerry, setDownloadsSearchQuerry] = useState('')
//   const [downloads, setDownloads] = useState<Downloads[]>([])
//   const [downloadsCurrentPage, setDownloadsCurrentPage] = useState(1)
//   const [totalDownloads, setTotalDownloads] = useState(0)
//   const [totalDownloadsPages, setTotalDownloadsPages] = useState(1)

//   const handleDownloadsPageChange = (newPage: number) => {
//     setDownloadsCurrentPage(newPage)
//   }

//   const fetchDownloads = useCallback(async () => {
//     try {
//       setLoadingTable(true)

//       const searchParam = downloadsSearchQuerry
//         ? `&search=${encodeURIComponent(downloadsSearchQuerry)}`
//         : ''
//       const response = await fetch(
//         `/api/admin/get-dxf-downloads/${id}?page=${downloadsCurrentPage}${searchParam}`,
//       )

//       if (response.ok) {
//         const data = await response.json()
//         setDownloads(data.downloads)
//         setTotalDownloadsPages(data.totalPages)
//         setTotalDownloads(data.totalDxfDownloads)
//       } else {
//         console.log('Failed to fetch downloads')
//       }
//     } catch (error) {
//       console.log('Error fetching downloads:', error)
//     } finally {
//       setLoadingTable(false)
//     }
//   }, [id, downloadsCurrentPage, downloadsSearchQuerry])

//   useEffect(() => {
//     fetchDownloads()
//   }, [fetchDownloads])

//   return (
//     <div>
//       <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-[27.42px] font-semibold text-[#000000]">
//             DXF Downloads
//           </h1>
//           <p className="mt-2 font-medium text-[17.28px] text-primary">
//             Total DXF Downloads: {totalDownloads && totalDownloads}
//           </p>
//         </div>
//         <div>
//           <div className="relative">
//             <Image
//               src={searchIcon}
//               alt="searchIcon"
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-10 py-2 rounded-xl border text-gray-800 text-[18px] focus:outline-none focus:ring-2 focus:ring-[#005B97]"
//               value={downloadsSearchQuerry || ''}
//               onChange={(e) => setDownloadsSearchQuerry(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//       {loadingTable ? (
//         <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
//           <ClipLoader color="#007bff" size={50} />
//         </div>
//       ) : downloads && downloads.length > 0 ? (
//         <table className="min-w-full bg-white border-gray-300 text-[20.45px]">
//           <thead>
//             <tr className="text-md text-gray-600">
//               <th className="pb-4 border-b text-start font-medium">Sr No</th>
//               <th className="pb-4 px-4 border-b text-start font-medium">
//                 File Name
//               </th>
//               <th className="pb-4 px-4 border-b text-right font-medium">
//                 Downloaded On
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {downloads.map((data: Downloads, index) => (
//               <tr key={index} className="text-[22px]">
//                 <td className="py-5 px-4 border-b text-start font-medium text-[#00000066]">
//                   #{index + 1}
//                 </td>
//                 <td className="py-3 px-4 border-b text-start font-medium text-[#000000]">
//                   {data.file_name}
//                 </td>
//                 <td className="py-3 px-4 border-b text-right text-[20px] font-medium text-[#00000066]">
//                   {format(new Date(data.downloaded_on), 'MMM dd, yyyy')}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="flex flex-col items-center mt-20">
//           <Image
//             src={noDownloads}
//             alt="No jobs found"
//             width={200}
//             height={200}
//             priority
//             style={{ width: 'auto', height: 'auto' }}
//           />
//         </div>
//       )}
//       {loadingTable ||
//       totalDownloadsPages === 0 ||
//       downloads.length === 0 ? null : (
//         <div className="mt-4 flex justify-end items-center gap-4 text-gray-800">
//           <button
//             onClick={() => handleDownloadsPageChange(downloadsCurrentPage - 1)}
//             disabled={downloadsCurrentPage === 1}
//             className={`px-4 py-2 rounded-md ${
//               downloadsCurrentPage === 1
//                 ? 'bg-gray-300 cursor-not-allowed'
//                 : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             Previous
//           </button>
//           <span>
//             Page {downloadsCurrentPage} of {totalDownloadsPages}
//           </span>
//           <button
//             onClick={() => handleDownloadsPageChange(downloadsCurrentPage + 1)}
//             disabled={downloadsCurrentPage === totalDownloadsPages}
//             className={`px-4 py-2 rounded-md ${
//               downloadsCurrentPage === totalDownloadsPages
//                 ? 'bg-gray-300 cursor-not-allowed'
//                 : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Downloads
