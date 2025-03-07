import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import backImage from '/public/images/user/GenerateDFX/backImage.svg'
import Link from 'next/link'
import editImage from '/public/images/editImage.svg'
import { useParams } from 'next/navigation'
import Swal from 'sweetalert2'
import axios from 'axios'
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
          setOutline(previewBase64)
          setMask(maskBase64)
          setOverlay(overlayBase64)

          console.log('Fetched files data:', data)
        } else {
          console.error('Failed to fetch files data')
        }
      } catch (error) {
        console.error('Error fetching files data:', error)
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

      // Extract error message from Axios response
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Something went wrong'

      // Show error message
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
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div>
            <Link href="/downloaded-files">
              <Image src={backImage} height={27} width={27} alt="backImage" />
            </Link>
          </div>
          <div className="sm:text-[30px] text-[22px] font-semibold">
            Downloaded Files Details
          </div>
        </div>
        <div className="flex">
          <div>
            <Image src={editImage} alt="edit" />
          </div>
          <div className="font-medium text-[#266CA8] text-[15px]">Edit</div>
        </div>
      </div>
      <div className="bg-[#0000000D] py-10 mt-5 sm:px-0 px-5">
        <div className="flex justify-around flex-col sm:flex-row">
          <div className="">
            {overlayUrl !== '' && (
              <div className="flex items-center mb-3 gap-3">
                <div className="font-semibold text-[18px]">Overlay Image</div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleDelete(idString, 'overlayImage')}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 27 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8708 23.2932H13.5965C16.0934 23.2932 17.3418 23.2932 18.1535 22.48C18.9652 21.6667 19.0483 20.3327 19.2143 17.6646L19.4537 13.8202C19.5438 12.3726 19.5888 11.6488 19.1816 11.1901C18.7744 10.7314 18.0868 10.7314 16.7114 10.7314H9.75587C8.38055 10.7314 7.69289 10.7314 7.28568 11.1901C6.87847 11.6488 6.92353 12.3726 7.01365 13.8202L7.25297 17.6646C7.41906 20.3327 7.5021 21.6667 8.31381 22.48C9.12552 23.2932 10.3739 23.2932 12.8708 23.2932Z"
                      fill="#ED2A2A"
                    />
                    <path
                      d="M5.1582 9.08641C5.1582 8.67346 5.4681 8.33869 5.85038 8.33869L8.24093 8.33829C8.71591 8.32529 9.13493 7.99905 9.29655 7.5164C9.3008 7.50371 9.30569 7.48806 9.32321 7.43126L9.42622 7.09739C9.48925 6.89268 9.54417 6.71434 9.62101 6.55493C9.9246 5.92516 10.4863 5.48784 11.1354 5.37587C11.2997 5.34753 11.4736 5.34765 11.6734 5.34779H14.7941C14.9938 5.34765 15.1678 5.34753 15.3321 5.37587C15.9812 5.48784 16.5429 5.92516 16.8465 6.55493C16.9233 6.71434 16.9782 6.89268 17.0413 7.09739L17.1443 7.43126C17.1618 7.48806 17.1667 7.50371 17.1709 7.5164C17.3325 7.99905 17.8347 8.32569 18.3097 8.33869H20.6169C20.9992 8.33869 21.3091 8.67346 21.3091 9.08641C21.3091 9.49937 20.9992 9.83413 20.6169 9.83413H5.85038C5.4681 9.83413 5.1582 9.49937 5.1582 9.08641Z"
                      fill="#ED2A2A"
                    />
                  </svg>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleDownload(outline)}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6265 22.1069C17.4655 22.283 17.2379 22.3833 16.9992 22.3833C16.7606 22.3833 16.5329 22.283 16.3719 22.1069L11.8386 17.1486C11.5218 16.8021 11.5459 16.2644 11.8923 15.9477C12.2388 15.6309 12.7764 15.655 13.0932 16.0014L16.1492 19.344V6.8C16.1492 6.33056 16.5298 5.95 16.9992 5.95C17.4687 5.95 17.8492 6.33056 17.8492 6.8V19.344L20.9052 16.0014C21.222 15.655 21.7596 15.6309 22.1061 15.9477C22.4526 16.2644 22.4766 16.8021 22.1599 17.1486L17.6265 22.1069Z"
                      fill="#266CA8"
                    />
                    <path
                      d="M7.64922 20.4C7.64922 19.9306 7.26866 19.55 6.79922 19.55C6.32978 19.55 5.94922 19.9306 5.94922 20.4V20.4622C5.9492 22.0121 5.94918 23.2614 6.08128 24.244C6.21843 25.2641 6.51184 26.123 7.19402 26.8052C7.87619 27.4874 8.73511 27.7808 9.75524 27.9179C10.7378 28.05 11.9871 28.05 13.537 28.05H20.4614C22.0113 28.05 23.2606 28.05 24.2432 27.9179C25.2633 27.7808 26.1223 27.4874 26.8044 26.8052C27.4866 26.123 27.78 25.2641 27.9172 24.244C28.0493 23.2614 28.0492 22.0121 28.0492 20.4622V20.4C28.0492 19.9306 27.6687 19.55 27.1992 19.55C26.7298 19.55 26.3492 19.9306 26.3492 20.4C26.3492 22.0268 26.3474 23.1614 26.2323 24.0175C26.1205 24.8491 25.916 25.2895 25.6023 25.6031C25.2887 25.9168 24.8483 26.1213 24.0167 26.2331C23.1606 26.3482 22.026 26.35 20.3992 26.35H13.5992C11.9724 26.35 10.8378 26.3482 9.98176 26.2331C9.15014 26.1213 8.70976 25.9168 8.3961 25.6031C8.08243 25.2895 7.87793 24.8491 7.76612 24.0175C7.65103 23.1614 7.64922 22.0268 7.64922 20.4Z"
                      fill="#266CA8"
                    />
                  </svg>
                </div>
              </div>
            )}
            <div
              className="w-100"
              style={{
                // width: "400px",
                height: '400px',
                backgroundImage: `url(${outline})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
          <div>
            <div className="">
              {outlineUrl !== '' && (
                <div className="flex items-center mb-3 gap-3 mt-3 sm:mt-0">
                  <div className="font-semibold text-[18px]">
                    Outline Of Object
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDelete(idString, 'outlineImage')}
                  >
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 27 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8708 23.2932H13.5965C16.0934 23.2932 17.3418 23.2932 18.1535 22.48C18.9652 21.6667 19.0483 20.3327 19.2143 17.6646L19.4537 13.8202C19.5438 12.3726 19.5888 11.6488 19.1816 11.1901C18.7744 10.7314 18.0868 10.7314 16.7114 10.7314H9.75587C8.38055 10.7314 7.69289 10.7314 7.28568 11.1901C6.87847 11.6488 6.92353 12.3726 7.01365 13.8202L7.25297 17.6646C7.41906 20.3327 7.5021 21.6667 8.31381 22.48C9.12552 23.2932 10.3739 23.2932 12.8708 23.2932Z"
                        fill="#ED2A2A"
                      />
                      <path
                        d="M5.1582 9.08641C5.1582 8.67346 5.4681 8.33869 5.85038 8.33869L8.24093 8.33829C8.71591 8.32529 9.13493 7.99905 9.29655 7.5164C9.3008 7.50371 9.30569 7.48806 9.32321 7.43126L9.42622 7.09739C9.48925 6.89268 9.54417 6.71434 9.62101 6.55493C9.9246 5.92516 10.4863 5.48784 11.1354 5.37587C11.2997 5.34753 11.4736 5.34765 11.6734 5.34779H14.7941C14.9938 5.34765 15.1678 5.34753 15.3321 5.37587C15.9812 5.48784 16.5429 5.92516 16.8465 6.55493C16.9233 6.71434 16.9782 6.89268 17.0413 7.09739L17.1443 7.43126C17.1618 7.48806 17.1667 7.50371 17.1709 7.5164C17.3325 7.99905 17.8347 8.32569 18.3097 8.33869H20.6169C20.9992 8.33869 21.3091 8.67346 21.3091 9.08641C21.3091 9.49937 20.9992 9.83413 20.6169 9.83413H5.85038C5.4681 9.83413 5.1582 9.49937 5.1582 9.08641Z"
                        fill="#ED2A2A"
                      />
                    </svg>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDownload(overlay)}
                  >
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.6265 22.1069C17.4655 22.283 17.2379 22.3833 16.9992 22.3833C16.7606 22.3833 16.5329 22.283 16.3719 22.1069L11.8386 17.1486C11.5218 16.8021 11.5459 16.2644 11.8923 15.9477C12.2388 15.6309 12.7764 15.655 13.0932 16.0014L16.1492 19.344V6.8C16.1492 6.33056 16.5298 5.95 16.9992 5.95C17.4687 5.95 17.8492 6.33056 17.8492 6.8V19.344L20.9052 16.0014C21.222 15.655 21.7596 15.6309 22.1061 15.9477C22.4526 16.2644 22.4766 16.8021 22.1599 17.1486L17.6265 22.1069Z"
                        fill="#266CA8"
                      />
                      <path
                        d="M7.64922 20.4C7.64922 19.9306 7.26866 19.55 6.79922 19.55C6.32978 19.55 5.94922 19.9306 5.94922 20.4V20.4622C5.9492 22.0121 5.94918 23.2614 6.08128 24.244C6.21843 25.2641 6.51184 26.123 7.19402 26.8052C7.87619 27.4874 8.73511 27.7808 9.75524 27.9179C10.7378 28.05 11.9871 28.05 13.537 28.05H20.4614C22.0113 28.05 23.2606 28.05 24.2432 27.9179C25.2633 27.7808 26.1223 27.4874 26.8044 26.8052C27.4866 26.123 27.78 25.2641 27.9172 24.244C28.0493 23.2614 28.0492 22.0121 28.0492 20.4622V20.4C28.0492 19.9306 27.6687 19.55 27.1992 19.55C26.7298 19.55 26.3492 19.9306 26.3492 20.4C26.3492 22.0268 26.3474 23.1614 26.2323 24.0175C26.1205 24.8491 25.916 25.2895 25.6023 25.6031C25.2887 25.9168 24.8483 26.1213 24.0167 26.2331C23.1606 26.3482 22.026 26.35 20.3992 26.35H13.5992C11.9724 26.35 10.8378 26.3482 9.98176 26.2331C9.15014 26.1213 8.70976 25.9168 8.3961 25.6031C8.08243 25.2895 7.87793 24.8491 7.76612 24.0175C7.65103 23.1614 7.64922 22.0268 7.64922 20.4Z"
                        fill="#266CA8"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div
                className="w-100"
                style={{
                  // width: "400px",
                  height: '400px',
                  backgroundImage: `url(${overlay})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-7 flex-col sm:flex-row">
          <div className="">
            {maskUrl !== '' && (
              <div className="flex items-center mb-3 gap-3">
                <div className="font-semibold text-[18px]">Mask</div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleDelete(idString, 'maskImage')}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 27 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8708 23.2932H13.5965C16.0934 23.2932 17.3418 23.2932 18.1535 22.48C18.9652 21.6667 19.0483 20.3327 19.2143 17.6646L19.4537 13.8202C19.5438 12.3726 19.5888 11.6488 19.1816 11.1901C18.7744 10.7314 18.0868 10.7314 16.7114 10.7314H9.75587C8.38055 10.7314 7.69289 10.7314 7.28568 11.1901C6.87847 11.6488 6.92353 12.3726 7.01365 13.8202L7.25297 17.6646C7.41906 20.3327 7.5021 21.6667 8.31381 22.48C9.12552 23.2932 10.3739 23.2932 12.8708 23.2932Z"
                      fill="#ED2A2A"
                    />
                    <path
                      d="M5.1582 9.08641C5.1582 8.67346 5.4681 8.33869 5.85038 8.33869L8.24093 8.33829C8.71591 8.32529 9.13493 7.99905 9.29655 7.5164C9.3008 7.50371 9.30569 7.48806 9.32321 7.43126L9.42622 7.09739C9.48925 6.89268 9.54417 6.71434 9.62101 6.55493C9.9246 5.92516 10.4863 5.48784 11.1354 5.37587C11.2997 5.34753 11.4736 5.34765 11.6734 5.34779H14.7941C14.9938 5.34765 15.1678 5.34753 15.3321 5.37587C15.9812 5.48784 16.5429 5.92516 16.8465 6.55493C16.9233 6.71434 16.9782 6.89268 17.0413 7.09739L17.1443 7.43126C17.1618 7.48806 17.1667 7.50371 17.1709 7.5164C17.3325 7.99905 17.8347 8.32569 18.3097 8.33869H20.6169C20.9992 8.33869 21.3091 8.67346 21.3091 9.08641C21.3091 9.49937 20.9992 9.83413 20.6169 9.83413H5.85038C5.4681 9.83413 5.1582 9.49937 5.1582 9.08641Z"
                      fill="#ED2A2A"
                    />
                  </svg>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleDownload(mask)}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6265 22.1069C17.4655 22.283 17.2379 22.3833 16.9992 22.3833C16.7606 22.3833 16.5329 22.283 16.3719 22.1069L11.8386 17.1486C11.5218 16.8021 11.5459 16.2644 11.8923 15.9477C12.2388 15.6309 12.7764 15.655 13.0932 16.0014L16.1492 19.344V6.8C16.1492 6.33056 16.5298 5.95 16.9992 5.95C17.4687 5.95 17.8492 6.33056 17.8492 6.8V19.344L20.9052 16.0014C21.222 15.655 21.7596 15.6309 22.1061 15.9477C22.4526 16.2644 22.4766 16.8021 22.1599 17.1486L17.6265 22.1069Z"
                      fill="#266CA8"
                    />
                    <path
                      d="M7.64922 20.4C7.64922 19.9306 7.26866 19.55 6.79922 19.55C6.32978 19.55 5.94922 19.9306 5.94922 20.4V20.4622C5.9492 22.0121 5.94918 23.2614 6.08128 24.244C6.21843 25.2641 6.51184 26.123 7.19402 26.8052C7.87619 27.4874 8.73511 27.7808 9.75524 27.9179C10.7378 28.05 11.9871 28.05 13.537 28.05H20.4614C22.0113 28.05 23.2606 28.05 24.2432 27.9179C25.2633 27.7808 26.1223 27.4874 26.8044 26.8052C27.4866 26.123 27.78 25.2641 27.9172 24.244C28.0493 23.2614 28.0492 22.0121 28.0492 20.4622V20.4C28.0492 19.9306 27.6687 19.55 27.1992 19.55C26.7298 19.55 26.3492 19.9306 26.3492 20.4C26.3492 22.0268 26.3474 23.1614 26.2323 24.0175C26.1205 24.8491 25.916 25.2895 25.6023 25.6031C25.2887 25.9168 24.8483 26.1213 24.0167 26.2331C23.1606 26.3482 22.026 26.35 20.3992 26.35H13.5992C11.9724 26.35 10.8378 26.3482 9.98176 26.2331C9.15014 26.1213 8.70976 25.9168 8.3961 25.6031C8.08243 25.2895 7.87793 24.8491 7.76612 24.0175C7.65103 23.1614 7.64922 22.0268 7.64922 20.4Z"
                      fill="#266CA8"
                    />
                  </svg>
                </div>
              </div>
            )}
            <div
              className="w-100"
              style={{
                // width: "400px",
                height: '400px',
                backgroundImage: `url(${mask})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
          <div className="relative h-64 w-100 mt-3 sm:mt-0">
            <p className="font-semibold text-2xl mb-3">DXF File</p>
            <p className="bg-white py-3 px-7 rounded-full flex justify-between">
              <span>{dfxFile.split('/').pop()}</span>
              <span className="flex items-start gap-2 pr-3">
                <p className="font-medium text-lg"> {fileSize}kb</p>
                <Image
                  className="cursor-pointer"
                  src="/images/user/GenerateDFX/download.svg"
                  alt="download"
                  width={30}
                  height={10}
                  onClick={() => handleDownloadDXF(dfxFile)}
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileDetails
