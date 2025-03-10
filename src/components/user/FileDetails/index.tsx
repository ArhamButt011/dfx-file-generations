import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import backImage from '/public/images/user/GenerateDFX/backImage.svg'
import Link from 'next/link'
import dltImage from '/public/images/user/delete.svg'
import downloadImg from '/public/images/user/download.svg'
import { useParams } from 'next/navigation'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

interface FilesData {
  file_name: string
  file_url: string
  mask_url: string
  outline_url: string
  overlay_url: string
}

const FileDetails = () => {
  const { id } = useParams()
  const idString = Array.isArray(id) ? id[0] : id ?? ''
  const [loading, setLoading] = useState<boolean>(false)
  const [mask, setMask] = useState('')
  const [maskUrl, setMaskUrl] = useState('')
  const [overlayUrl, setOverlayUrl] = useState('')
  const [outlineUrl, setOutlineUrl] = useState('')
  const [overlay, setOverlay] = useState('')
  const [dfxFile, setDfxFile] = useState('')
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [outline, setOutline] = useState('')

  useEffect(() => {
    const fetchFilesData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/user/get-file-details/${id}`)
        if (response.ok) {
          const data: FilesData = await response.json()
          setMaskUrl(data?.mask_url)
          setOverlayUrl(data?.overlay_url)
          setOutlineUrl(data?.outline_url)
          setDfxFile(data?.file_url)
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

    if (id) fetchFilesData()
  }, [id])

  const getFileSize = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' }) // Fetch only headers
      const size = response.headers.get('Content-Length') // Get file size in bytes
      return size ? parseInt(size, 10) / 1024 : 0 // Convert bytes to KB
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

      console.log('Image downloaded successfully')
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

  useEffect(() => {
    if (dfxFile) {
      getFileSize(dfxFile).then((size) => setFileSize(Number(size.toFixed(2))))
    }
  }, [dfxFile])

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

  const handleDelete = async (fileId: string, text: string) => {
    if (!fileId) {
      console.error('File ID is missing')
      return
    }
    console.log(text, 'text')
    try {
      const response = await axios.put('/api/user/update-downloads', {
        id: fileId,
        text,
      })

      if (response.data.success)
        if (text === 'overlayImage') {
          setOverlay('')
          setOverlayUrl('')
        } else if (text === 'outlineImage') {
          setOutline('')
          setOutlineUrl('')
        } else {
          setMask('')
          setMaskUrl('')
        }

      await Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted successfully.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      })
    } catch (error) {
      console.error('Error deleting file:', error)

      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Something went wrong'

      await Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
    } finally {
    }
  }

  return (
    <div className="w-full">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Link href="/downloaded-files">
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
          </div>

          {/* Content Section */}
          <div className="bg-gray-100 py-6 sm:py-10 mt-5 w-full rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
              {/* Overlay Image */}
              {overlayUrl && (
                <div className="text-center mx-auto">
                  <div className="flex items-center justify-start gap-2 mb-2">
                    <h3 className="font-semibold text-lg">Overlay Image</h3>
                    <Image
                      src={dltImage}
                      alt="Delete"
                      className="cursor-pointer w-7 h-7"
                      onClick={() => handleDelete(idString, 'overlayImage')}
                    />
                    <Image
                      src={downloadImg}
                      alt="Download"
                      className="cursor-pointer w-5 h-5"
                      onClick={() => handleDownload(overlay)}
                    />
                  </div>
                  <div
                    className="w-full bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                    style={{
                      backgroundImage: `url(${overlay})`,
                      height: '20rem',
                      width: '20rem',
                    }}
                  />
                </div>
              )}

              {/* Outline Image */}
              {outlineUrl && (
                <div className="text-center mx-auto">
                  <div className="flex items-center justify-start gap-2 mb-2">
                    <h3 className="font-semibold text-lg">Outline Of Object</h3>
                    <Image
                      src={dltImage}
                      alt="Delete"
                      className="cursor-pointer  w-7 h-7"
                      onClick={() => handleDelete(idString, 'outlineImage')}
                    />
                    <Image
                      src={downloadImg}
                      alt="Download"
                      className="cursor-pointer w-5 h-5"
                      onClick={() => handleDownload(outline)}
                    />
                  </div>
                  <div
                    className="w-64 h-64 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                    style={{
                      backgroundImage: `url(${outline})`,
                      height: '20rem',
                      width: '20rem',
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
                    <Image
                      src={dltImage}
                      alt="Delete"
                      className="cursor-pointer  w-7 h-7"
                      onClick={() => handleDelete(idString, 'maskImage')}
                    />
                    <Image
                      src={downloadImg}
                      alt="Download"
                      className="cursor-pointer w-5 h-5"
                      onClick={() => handleDownload(mask)}
                    />
                  </div>
                  <div
                    className="w-full h-64 bg-center bg-contain bg-no-repeat rounded-xl overflow-hidden border mx-auto"
                    style={{
                      backgroundImage: `url(${mask})`,
                      height: '20rem',
                      width: '20rem',
                    }}
                  />
                </div>
              )}

              {/* DXF File */}
              {dfxFile && (
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg mb-3 self-center w-full max-w-xs">
                    DXF File
                  </h3>
                  <div className="flex items-center w-full max-w-xs bg-white px-8 py-3 rounded-full self-center">
                    <span className="truncate text-sm">
                      {dfxFile.split('/').pop()}
                    </span>
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
        </>
      )}
    </div>
  )
}

export default FileDetails
