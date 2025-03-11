'use client'
import React, { useEffect, useState } from 'react'
import UserDetails from './UserDetail'
import { useParams } from 'next/navigation'
import noDownloads from '/public/images/admin/noDownloads.svg'
import Image from 'next/image'
import { ClipLoader } from 'react-spinners'

interface FilesData {
  user_id: string
  file_name: string
  file_url: string
  mask_url: string
  outline_url: string
  overlay_url: string
}

const DownloadedFilesDetails = () => {
  const [loading, setLoading] = useState<boolean>(false)
  console.log(loading)
  const { id } = useParams<{ id: string }>()
  // const [mask, setMask] = useState('')
  const [maskUrl, setMaskUrl] = useState('')
  const [overlayUrl, setOverlayUrl] = useState('')
  const [outlineUrl, setOutlineUrl] = useState('')
  // const [overlay, setOverlay] = useState('')
  // const [outline, setOutline] = useState('')
  const [userId, setuserId] = useState('')

  useEffect(() => {
    const fetchFilesData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/user/get-file-details/${id}`)
        if (response.ok) {
          const data: FilesData = await response.json()
          setuserId(data?.user_id)
          setMaskUrl(data?.mask_url)
          setOverlayUrl(data?.overlay_url)
          setOutlineUrl(data?.outline_url)
          // const convertToBase64 = async (url: string): Promise<string> => {
          //   const response = await fetch(url)
          //   const blob = await response.blob()
          //   return new Promise((resolve) => {
          //     const reader = new FileReader()
          //     reader.onloadend = () => resolve(reader.result as string) // Explicitly cast to string
          //     reader.readAsDataURL(blob)
          //   })
          // }
          // const [maskBase64, overlayBase64, previewBase64] = await Promise.all([
          //   convertToBase64(data?.mask_url),
          //   convertToBase64(data?.outline_url),
          //   convertToBase64(data?.overlay_url),
          // ])
          // setOutline(overlayBase64)
          // setMask(maskBase64)
          // setOverlay(previewBase64)

          console.log('Fetched files data:', data)
        } else {
          console.error('Failed to fetch files data')
        }
      } catch (error) {
        console.error('Error fetching files data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchFilesData()
  }, [id])

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-50">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : (
        <>
          <UserDetails userId={userId} />

          {overlayUrl !== '' || maskUrl !== '' || outlineUrl !== '' ? (
            <div className="bg-gray-100 py-6 sm:py-10 mt-5 w-full rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {/* Overlay Image */}
                {overlayUrl && (
                  <div className="text-center mx-auto">
                    <div className="flex items-center justify-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg">Overlay Image</h3>
                    </div>
                    <div
                      className="md:w-55 md:h-55 xl:w-65 xl:h-65 w-65 h-65 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                      style={{
                        backgroundImage: `url(${overlayUrl})`,
                      }}
                    />
                  </div>
                )}

                {/* Outline Image */}
                {outlineUrl && (
                  <div className="text-center mx-auto">
                    <div className="flex items-center justify-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg">
                        Outline Of Object
                      </h3>
                    </div>
                    <div
                      className="md:w-55 md:h-55 xl:w-65 xl:h-65 w-65 h-65 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                      style={{
                        backgroundImage: `url(${outlineUrl})`,
                      }}
                    />
                  </div>
                )}

                {/* Mask Image */}
                {maskUrl && (
                  <div className="text-center mx-auto">
                    <div className="flex items-center justify-start gap-2 mb-2">
                      <h3 className="font-semibold text-lg">Mask</h3>
                    </div>
                    <div
                      className="md:w-55 md:h-55 xl:w-65 xl:h-65 w-65 h-65 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                      style={{
                        backgroundImage: `url(${maskUrl})`,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-20">
              <Image
                src={noDownloads}
                alt="No downloads found"
                width={200}
                height={200}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DownloadedFilesDetails
