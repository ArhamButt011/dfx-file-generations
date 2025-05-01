'use client'
import React, { useEffect, useState } from 'react'
import UserDetails from './UserDetail'
import { useParams } from 'next/navigation'
import noDownloads from '/public/images/admin/noDownloads.svg'
import Image from 'next/image'
import downloadImg from '/public/images/user/download.svg'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'

interface FilesData {
  user_id: string
  file_name: string
  file_url: string
  admin_mask_url: string
  admin_outline_url: string
  admin_overlay_url: string
}

const DownloadedFilesDetails = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const [mask, setMask] = useState('')
  const [maskUrl, setMaskUrl] = useState('')
  const [overlayUrl, setOverlayUrl] = useState('')
  const [outlineUrl, setOutlineUrl] = useState('')
  const [overlay, setOverlay] = useState('')
  const [outline, setOutline] = useState('')
  const [userId, setuserId] = useState('')
  const [dfxFile, setDfxFile] = useState('')
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    const fetchFilesData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/user/get-file-details/${id}`)
        if (response.ok) {
          const data: FilesData = await response.json()
          setuserId(data?.user_id)
          setMaskUrl(data?.admin_mask_url)
          setOverlayUrl(data?.admin_overlay_url)
          setOutlineUrl(data?.admin_outline_url)
          setDfxFile(data?.file_url)
          setFileName(data.file_name)
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
            convertToBase64(data?.admin_mask_url),
            convertToBase64(data?.admin_outline_url),
            convertToBase64(data?.admin_overlay_url),
          ])
          setOutline(overlayBase64)
          setMask(maskBase64)
          setOverlay(previewBase64)
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

  const handleDownload = async (url: string) => {
    if (!url) {
      console.error('No image URL provided for download.')
      return
    }

    // Check if user's plan is expired
    // if (userPlan && new Date(userPlan.expiry_date) < new Date()) {
    //   setIsBilingOpen(true)
    //   return
    // }

    try {
      // Fetch the image and convert it to a blob
      const response = await fetch(url)
      if (!response.ok)
        throw new Error(`Failed to download image. Status: ${response.status}`)

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      // Create a download link
      const file_name = url.split('/').pop() || 'downloaded_image.jpg'
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = file_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up memory
      URL.revokeObjectURL(blobUrl)
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
    }
  }

  const handleDownloadDXF = async (url: string) => {
    if (!url) {
      console.error('No DXF file URL provided for download.')
      return
    }
    // Check if user's plan is expired
    // if (userPlan && new Date(userPlan.expiry_date) < new Date()) {
    //   setIsBilingOpen(true)
    //   return
    // }
    const file_name = url.split('/').pop() || 'downloaded_file.dxf'
    const link = document.createElement('a')
    link.href = url
    link.download = file_name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getFileSize = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      const size = response.headers.get('Content-Length')
      return size ? parseInt(size, 10) / 1024 : 0
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err instanceof Error ? err.message : String(err),
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          const swalContainer = document.querySelector(
            '.swal2-container',
          ) as HTMLElement
          if (swalContainer) {
            swalContainer.style.setProperty('z-index', '100000', 'important')
          }
        },
      })
      return 0
    }
  }
  useEffect(() => {
    if (dfxFile) {
      getFileSize(dfxFile).then((size) => setFileSize(Number(size.toFixed(2))))
    }
  }, [dfxFile])

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
                {/* Overlay Image */}
                {overlayUrl && (
                  <div className="text-center mx-auto">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg">Overlay Image</h3>
                      <Image
                        src={downloadImg}
                        alt="Download"
                        className="cursor-pointer w-5 h-5"
                        onClick={() => handleDownload(overlay)}
                      />
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
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg">
                        Outline Of Object
                      </h3>
                      <Image
                        src={downloadImg}
                        alt="Download"
                        className="cursor-pointer w-5 h-5"
                        onClick={() => handleDownload(outline)}
                      />
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
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg">Mask</h3>
                      <Image
                        src={downloadImg}
                        alt="Download"
                        className="cursor-pointer w-5 h-5"
                        onClick={() => handleDownload(mask)}
                      />
                    </div>
                    <div
                      className="md:w-75 md:h-75 xl:w-75 xl:h-75 w-65 h-65 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                      style={{
                        backgroundImage: `url(${mask})`,
                      }}
                    />
                  </div>
                )}
                {dfxFile && (
                  <div className="flex flex-col px-7 md:px-0">
                    <h3 className="font-semibold text-lg mb-3 self-center w-full max-w-xs xl:pl-1">
                      DXF File
                    </h3>
                    <div className="flex items-center justify-between w-full max-w-xs bg-white px-8 py-3 rounded-full self-center">
                      <span className="truncate text-sm">{fileName}</span>
                      <span className="flex items-center gap-2">
                        <p className="font-medium text-sm">{fileSize}kb</p>
                        <Image
                          src="/images/user/GenerateDFX/download.svg"
                          alt="Download"
                          width={30}
                          height={20}
                          className="cursor-pointer"
                          onClick={() => handleDownloadDXF(dfxFile)}
                        />
                      </span>
                    </div>
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
