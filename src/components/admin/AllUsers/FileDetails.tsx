import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import backImage from '/public/images/user/GenerateDFX/backImage.svg'
import noDownloads from '/public/images/admin/noDownloads.svg'
import Image from 'next/image'
import Link from 'next/link'
import { ClipLoader } from 'react-spinners'

interface FilesData {
  user_id: string
  file_name: string
  file_url: string
  mask_url: string
  outline_url: string
  overlay_url: string
}

const FileDetails = () => {
  const { fileId } = useParams()

  const [loading, setLoading] = useState<boolean>(false)
  const [mask, setMask] = useState('')
  const [maskUrl, setMaskUrl] = useState('')
  const [overlayUrl, setOverlayUrl] = useState('')
  const [outlineUrl, setOutlineUrl] = useState('')
  const [overlay, setOverlay] = useState('')
  const [userId, setuserId] = useState('')
  const [outline, setOutline] = useState('')

  useEffect(() => {
    const fetchFilesData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/user/get-file-details/${fileId}`)
        if (response.ok) {
          const data: FilesData = await response.json()
          setMaskUrl(data?.mask_url)
          setOverlayUrl(data?.overlay_url)
          setOutlineUrl(data?.outline_url)
          setuserId(data?.user_id)

          const convertToBase64 = async (url: string): Promise<string> => {
            const response = await fetch(url)
            const blob = await response.blob()
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result as string) // Explicitly cast to string
              reader.readAsDataURL(blob)
            })
          }
          const [maskBase64, overlayBase64, previewBase64] = await Promise.all([
            convertToBase64(data?.mask_url),
            convertToBase64(data?.outline_url),
            convertToBase64(data?.overlay_url),
          ])
          setOutline(overlayBase64)
          setMask(maskBase64)
          setOverlay(previewBase64)

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

    if (fileId) fetchFilesData()
  }, [fileId])

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link href={`/admin/allusers/${userId}/`}>
          <Image
            src={backImage}
            height={27}
            width={27}
            alt="Back"
            className="cursor-pointer"
          />
        </Link>
        <h2 className="text-lg sm:text-2xl font-semibold">
          Downloaded Files Details
        </h2>
      </div>
      {loading ? (
        <div className="flex items-center justify-center bg-opacity-50 z-[1000] mt-20 h-[50vh]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : overlayUrl !== '' || maskUrl !== '' || outlineUrl !== '' ? (
        <div className="bg-gray-100 py-6 sm:py-10 mt-5 w-full rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            {/* Overlay Image */}
            {overlayUrl && (
              <div className="text-center mx-auto">
                <div className="flex items-center justify-start gap-2 mb-2">
                  <h3 className="font-semibold text-lg">Overlay Image</h3>
                </div>
                <div
                  className="md:w-75 md:h-75 xl:w-75 xl:h-75 w-65 h-65 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                  style={{
                    backgroundImage: `url(${overlay})`,
                  }}
                />
              </div>
            )}

            {/* Outline Image */}
            {outlineUrl && (
              <div className="text-center mx-auto">
                <div className="flex items-center justify-start gap-2 mb-2">
                  <h3 className="font-semibold text-lg">Outline Of Object</h3>
                </div>
                <div
                  className="md:w-75 md:h-75 xl:w-75 xl:h-75 w-65 h-65 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                  style={{
                    backgroundImage: `url(${outline})`,
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
            {/* Mask Image */}
            {maskUrl && (
              <div className="text-center mx-auto">
                <div className="flex items-center justify-start gap-2 mb-2">
                  <h3 className="font-semibold text-lg">Mask</h3>
                </div>
                <div
                  className="md:w-75 md:h-75 xl:w-75 xl:h-75 w-65 h-65 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                  style={{
                    backgroundImage: `url(${mask})`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20 h-[50vh]">
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
    </div>
  )
}

export default FileDetails
