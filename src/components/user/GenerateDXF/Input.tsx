// import BilingModal from '@/components/UI/BilingModal';
'use client'
import Modal from '@/components/UI/Modal'
import Image from 'next/image'
import React, { useState, FormEvent, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '@/context/AuthContext'
import Subscribe from '../Subscription/Subscribe'
import { PulseLoader } from 'react-spinners'
import Text from '@/components/UI/Text'
// import { useSearchParams } from 'next/navigation'
interface UserPlan {
  plan_name: string
  duration: number
  user_id: string
  added_on: string
  expiry_on: string
  charges: number
  added_date: string
  expiry_date: string
}

function Input() {
  const [image, setImage] = useState<string>(
    () => sessionStorage.getItem('image') || '',
  )
  const { userData } = useAuth()
  const [contour, setContour] = useState<string>(
    () => sessionStorage.getItem('contour') || '',
  )
  const [boundaryLength, setBoundaryLength] = useState<number>(() => {
    const storedValue = sessionStorage.getItem('boundaryLength')
    return storedValue ? parseFloat(storedValue) : 0
  })

  const [drawerId, setDrawerId] = useState<string>(
    () => sessionStorage.getItem('drawerId') || '',
  )

  const [boundaryWidth, setBoundaryWidth] = useState<number>(() => {
    const storedValue = sessionStorage.getItem('boundaryWidth')
    return storedValue ? parseFloat(storedValue) : 0
  })

  const [dragging, setDragging] = useState<boolean>(false)
  const [isProcessingOpen, setisProcessingOpen] = useState<boolean>(false)
  const [fingerCut, setFingerCut] = useState('No')
  const [boundaryContour, setBoundaryContour] = useState('No')
  const [includeDrawerId, setIncludeDrawerId] = useState('No')
  const [unit, setUnit] = useState<string>(
    () => sessionStorage.getItem('unit') || 'mm',
  )
  const [isProcessed, setIsProcessed] = useState<boolean>(
    JSON.parse(sessionStorage.getItem('isProcessed') || 'false'),
  )
  const [base64, setBase64] = useState<string>('')
  const [overlayUrl, setOverlayUrl] = useState<string>(
    () => sessionStorage.getItem('overlayUrl') || '',
  )
  const [maskUrl, setMaskUrl] = useState<string>(
    () => sessionStorage.getItem('maskUrl') || '',
  )
  const [outlineUrl, setOutlineUrl] = useState<string>(
    () => sessionStorage.getItem('outlineUrl') || '',
  )

  const [overlay, setOverlay] = useState<string>(
    () => sessionStorage.getItem('overlay') || '',
  )
  const [mask, setMask] = useState<string>(
    () => sessionStorage.getItem('mask') || '',
  )
  const [preview, setPreview] = useState<string>(
    () => sessionStorage.getItem('preview') || '',
  )
  const [dfxFile, setDfxFile] = useState<string>(
    () => sessionStorage.getItem('dxf_file') || '',
  )
  const [fileSize, setFileSize] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const lensRef = useRef<HTMLImageElement>(null)
  // const [status, setStatus] = useState('loading')
  // const [customerEmail, setCustomerEmail] = useState('')
  // const searchParams = useSearchParams()
  // const sessionId = searchParams.get('session_id')

  // const [lensPos, setLensPos] = useState({ x: 0, y: 0, visible: false });
  const [isMagnifierActive, setIsMagnifierActive] = useState(false)
  const [isBilingOpen, setIsBilingOpen] = useState(false) // New state for Subscribe modal
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null)
  const userId = userData?.id
  const [clicked, setClicked] = useState(false)
  const zoom = 3,
    lensSize = 150
  useEffect(() => {
    async function fetchUserPlan() {
      try {
        const response = await fetch('/api/user/get-user-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        })

        const data = await response.json()
        if (data?.subscription) {
          setUserPlan(data.subscription)
        }
      } catch (error) {
        console.error('Error fetching user plan:', error)
      }
    }

    if (userId) {
      fetchUserPlan()
    }
  }, [userId])

  useEffect(() => {
    if (!isMagnifierActive || !image) return // Only attach event listeners if magnifier is active

    const img = imgRef.current
    const lens = lensRef.current
    if (!img || !lens) return // Check if refs are available

    // Set up the background for the lens using the source image
    lens.style.backgroundImage = `url('${image}')`
    lens.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`

    const moveLens = (e: MouseEvent) => {
      e.preventDefault()
      const pos = getCursorPos(e)
      let x = pos.x - lensSize / 2
      let y = pos.y - lensSize / 2

      // Prevent the lens from going outside the image
      if (x > img.width - lensSize) x = img.width - lensSize
      if (x < 0) x = 0
      if (y > img.height - lensSize) y = img.height - lensSize
      if (y < 0) y = 0

      // Move the lens to the correct position
      lens.style.left = `${x}px`
      lens.style.top = `${y}px`

      // Correct background positioning
      const bgX = -pos.x * zoom + lensSize / 2
      const bgY = -pos.y * zoom + lensSize / 2

      lens.style.backgroundPosition = `${bgX}px ${bgY}px`
    }

    const getCursorPos = (e: MouseEvent) => {
      const rect = img.getBoundingClientRect()
      const x = e.pageX - rect.left - window.pageXOffset
      const y = e.pageY - rect.top - window.pageYOffset
      return { x, y }
    }

    // Attach event listeners only when active
    img.addEventListener('mousemove', moveLens)
    lens.addEventListener('mousemove', moveLens)

    // Clean up event listeners on unmount or when deactivated
    return () => {
      img.removeEventListener('mousemove', moveLens)
      lens.removeEventListener('mousemove', moveLens)
    }
  }, [isMagnifierActive])

  useEffect(() => {
    if (includeDrawerId === 'No') {
      setDrawerId('')
    }
    if (boundaryContour === 'No') {
      setBoundaryLength(0)
      setBoundaryWidth(0)
    }
  }, [includeDrawerId, boundaryContour])

  useEffect(() => {
    const isBillingTriggered = sessionStorage.getItem('billingTriggered')

    if (
      isBillingTriggered != 'true' &&
      userPlan &&
      new Date(userPlan.expiry_date) < new Date()
    ) {
      setIsBilingOpen(true)
      sessionStorage.setItem('billingTriggered', 'true') // Mark that the effect has run
    }
  }, [userPlan])

  useEffect(() => {
    sessionStorage.setItem('overlay', overlay)
    sessionStorage.setItem('mask', mask)
    sessionStorage.setItem('preview', preview)
    sessionStorage.setItem('dxf_file', dfxFile)
    sessionStorage.setItem('image', image)
    sessionStorage.setItem('contour', contour)
    sessionStorage.setItem('boundaryLength', boundaryLength.toString())
    sessionStorage.setItem('boundaryWidth', boundaryWidth.toString())
    sessionStorage.setItem('drawerId', drawerId)
    sessionStorage.setItem('overlayUrl', overlayUrl)
    sessionStorage.setItem('maskUrl', maskUrl)
    sessionStorage.setItem('outlineUrl', outlineUrl)
    sessionStorage.setItem('isProcessed', JSON.stringify(isProcessed))
    sessionStorage.setItem('unit', unit)
  }, [overlay, image, contour, boundaryLength, boundaryWidth, drawerId, unit])

  useEffect(() => {
    console.log('image', sessionStorage.getItem('contour'))
    setOverlayUrl(sessionStorage.getItem('overlayUrl') ?? '')
    setOutlineUrl(sessionStorage.getItem('outlineUrl') ?? '')
    setMaskUrl(sessionStorage.getItem('maskUrl') ?? '')
    setOverlay(sessionStorage.getItem('overlay') ?? '')
    setMask(sessionStorage.getItem('mask') ?? '')
    setPreview(sessionStorage.getItem('preview') ?? '')
    setDfxFile(sessionStorage.getItem('dxf_file') ?? '')
    setImage(sessionStorage.getItem('image') ?? '')
    setContour(sessionStorage.getItem('contour') ?? '')
    setBoundaryLength(
      parseFloat(sessionStorage.getItem('boundaryLength') ?? '0'),
    )
    setDrawerId(sessionStorage.getItem('drawerId') ?? '')
    setBoundaryWidth(parseFloat(sessionStorage.getItem('boundaryWidth') ?? '0'))
    setUnit(sessionStorage.getItem('unit') ?? '')
    setIsProcessed(JSON.parse(sessionStorage.getItem('isProcessed') || 'false'))
  }, [])

  const onClose = () => {
    setisProcessingOpen(false)
    setIsProcessed(false)
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]

      // Validate file type
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = (event) => {
          if (event.target?.result) {
            const result = event.target.result as string
            setImage(result)

            const cleanBase64 = result.replace(
              /^data:image\/[a-zA-Z]+;base64,/,
              '',
            )
            setBase64(cleanBase64)
            console.log(cleanBase64)
          }
        }

        reader.readAsDataURL(file)
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Please upload an image file',
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
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        if (typeof reader.result === 'string') {
          const base64Data = reader.result.split(',')[1]
          setBase64(base64Data)
        }
      }
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = {
      plan_name: 'Free',
      duration: '7 Days',
      user_id: userData?.id,
      added_on: new Date().toISOString(),
      expiry_on: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      charges: 0,
      status: 'active',
      added_date: Date.now(),
      expiry_date: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }
    setisProcessingOpen(true)
    if (!userPlan) {
      const res = await fetch('/api/user/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('Failed to create subscription')
      }
    }
    if (!image || contour === undefined || contour === null) {
      Swal.fire({
        title: 'Error!',
        text: 'Please give both image and contour offset',
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
      setisProcessingOpen(false)
      return
    }

    try {
      const res = await fetch('https://dxf.lumashape.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_path_or_base64: base64,
          offset_value: contour,
          finger_clearance: fingerCut,
          add_boundary: boundaryContour,
          boundary_length: boundaryLength,
          boundary_width: boundaryWidth,
          annotation_text: drawerId,
          offset_unit: unit,
        }),
      })

      if (!res.ok) {
        console.log(res)
        const data = await res.json()
        throw new Error(
          data.detail + ' or Invalid Image' || 'An error occurred',
        )
      }

      const {
        output_image_url,
        outlines_url,
        dxf_file,
        mask_url,
      } = await res.json()
      setOverlayUrl(output_image_url)
      setOutlineUrl(outlines_url)
      setMaskUrl(mask_url)

      // Function to convert image URL to Base64
      const convertToBase64 = async (url: string): Promise<string> => {
        const response = await fetch(url)
        const blob = await response.blob()
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string) // Explicitly cast to string
          reader.readAsDataURL(blob)
        })
      }

      // Convert images to base64
      const [maskBase64, overlayBase64, previewBase64] = await Promise.all([
        convertToBase64(mask_url),
        convertToBase64(output_image_url),
        convertToBase64(outlines_url),
      ])

      // Save the base64 images
      setMask(maskBase64)
      setDfxFile(dxf_file)
      setPreview(previewBase64)
      setOverlay(overlayBase64)
      setIsProcessed(true)
    } catch (err) {
      // Catch any error in the try block and log it
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
    } finally {
      setisProcessingOpen(false)
    }
  }

  const handleDownload = async (url: string) => {
    if (!url) {
      console.error('No image URL provided for download.')
      return
    }

    // Check if user's plan is expired
    if (userPlan && new Date(userPlan.expiry_date) < new Date()) {
      setIsBilingOpen(true)
      return
    }

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

  const handleDownloadDXF = async (url: string) => {
    if (!url) {
      console.error('No DXF file URL provided for download.')
      return
    }

    // Check if user's plan is expired
    if (userPlan && new Date(userPlan.expiry_date) < new Date()) {
      setIsBilingOpen(true)
      return
    }

    try {
      const response = await fetch(url)
      if (!response.ok)
        throw new Error(`Failed to download file. Status: ${response.status}`)
      const file_name = url.split('/').pop() || 'downloaded_file.dxf'
      const link = document.createElement('a')
      link.href = url
      link.download = file_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log(
        'filename-> ',
        file_name,
        'url-> ',
        url,
        'maskUrl-> ',
        maskUrl,
        'overlayUrl-> ',
        overlayUrl,
        'outlineUrl-> ',
        outlineUrl,
      )

      // Send API request after file is downloaded
      const res = await fetch('/api/user/DFX_Downloads/Add_File', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_name,
          url,
          userId,
          mask_url: maskUrl,
          overlay_url: overlayUrl,
          outline_url: outlineUrl,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to save file info. Status: ${res.status}`)
      }

      console.log('File info saved successfully')
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

  const handleFullScreen = (url: string) => {
    if (!url) {
      console.error('No image URL provided.')
      return
    }

    if (userPlan && new Date(userPlan.expiry_date) < new Date()) {
      setIsBilingOpen(true)
      return
    }

    const newTab = window.open()
    if (newTab) {
      newTab.document.body.innerHTML = `<img src="${url}" style="width:100%; height:auto;" />`
    } else {
      console.error('Popup blocked! Please allow popups for this site.')
    }
  }

  useEffect(() => {
    if (dfxFile) {
      getFileSize(dfxFile).then((size) => setFileSize(Number(size.toFixed(2))))
    }
  }, [dfxFile])

  const handlePasteImage = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      const firstItem = clipboardItems[0] // Get only the first item

      if (firstItem && firstItem.types[0].startsWith('image')) {
        const blob = await firstItem.getType(firstItem.types[0])
        const file = new File([blob], 'pasted-image.png', { type: blob.type })

        // Convert to preview URL
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = (event) => {
          setImage(event.target?.result as string)
          if (typeof reader.result === 'string') {
            const base64Data = reader.result.split(',')[1]
            setBase64(base64Data)
            console.log(base64Data)
          }
        }
        // Mimic file input behavior
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        if (fileInputRef.current) {
          fileInputRef.current.files = dataTransfer.files
          const event = new Event('change', { bubbles: true })
          fileInputRef.current.dispatchEvent(event)
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No image found in clipboard. Copy an image first!',
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

  return (
    <>
      <div className="mt-5">
        <div className="flex md:flex-row flex-col gap-10">
          {/* left */}
          <div className="bg-[#F2F2F2] md:w-1/2 rounded-b-2xl rounded-t-2xl">
            <div className="bg-[#C6C9CB] py-3 rounded-t-2xl">
              <p className="text-[#000000] text-center font-medium text-[16px] sm:text-[20px] text-[#000000]">
                Input Data
              </p>
            </div>
            <div className="p-5">
              {/* <p className="font-semibold text-2xl mb-5">Input Image</p> */}
              <form action="" onSubmit={handleSubmit}>
                <div className="border border-dashed border-[#0000004D] rounded-3xl">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`bg-[#F2F2F2]  rounded-t-3xl relative flex flex-col justify-center items-center 
    ${dragging ? 'border-blue-500' : 'border-gray-300'} 
    border-dashed rounded-2xl  text-center`}
                    style={{
                      minHeight: image ? '100px' : '400px',
                      padding: image ? '0' : '10px',
                      minWidth: image ? '100px' : '',
                    }}
                  >
                    {image ? (
                      <div className="relative  flex justify-center items-center w-full md:h-[450px] h-[300px]">
                        <Image
                          src={image}
                          alt="Uploaded Preview"
                          className="rounded-t-3xl object-contain"
                          fill
                          ref={imgRef}
                        />
                        <div
                          ref={lensRef}
                          style={{
                            display: isMagnifierActive ? 'block' : 'none',
                            position: 'absolute',
                            border: '3px solid #000',
                            width: lensSize,
                            height: lensSize,
                            opacity: 1,
                            pointerEvents: 'none',
                          }}
                        />

                        <div className="absolute top-0 right-0 bg-white text-white w-20 h-10 flex items-center justify-around text-sm cursor-pointer rounded-tr-3xl">
                          <div
                            onClick={() => handleFullScreen(image)}
                            className="cursor-pointer"
                          >
                            <Image
                              src="/images/user/GenerateDFX/Full Screen.svg"
                              alt="fullscreen"
                              width={24}
                              height={24}
                            />
                          </div>

                          <Image
                            src="/images/user/GenerateDFX/cross.svg"
                            alt="cross"
                            width={14}
                            height={14}
                            onClick={() => {
                              setImage('')
                              setClicked(false)
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                          id="fileInput"
                          ref={fileInputRef}
                        />
                        <label
                          htmlFor="fileInput"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <Image
                            src="/images/user/GenerateDFX/Upload.svg"
                            alt="upload"
                            width={44}
                            height={44}
                          />
                          <p className="font-semibold text-[14px] sm:text-[16px] text-center">
                            Drag & drop the image or{' '}
                            <span className="text-[#266CA8] underline cursor-pointer">
                              click
                            </span>{' '}
                            to upload
                          </p>
                        </label>
                      </>
                    )}
                  </div>
                  <div className="flex justify-center rounded-b-3xl bg-white">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      {/* <Image
                        src="/images/user/GenerateDFX/Upload.svg"
                        alt="upload"
                        width={44}
                        height={44}
                      /> */}
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 66 66"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-[#00000066] hover:text-[#266CA8] cursor-pointer transition-colors duration-300"
                      >
                        <path
                          d="M34.1893 12.032C33.8782 11.6917 33.4383 11.4978 32.9771 11.4978C32.5159 11.4978 32.076 11.6917 31.7649 12.032L23.0046 21.6135C22.3925 22.283 22.439 23.322 23.1085 23.9341C23.778 24.5462 24.817 24.4997 25.4291 23.8302L31.3346 17.3711V41.6111C31.3346 42.5183 32.0699 43.2537 32.9771 43.2537C33.8843 43.2537 34.6196 42.5183 34.6196 41.6111V17.3711L40.5251 23.8302C41.1372 24.4997 42.1762 24.5462 42.8457 23.9341C43.5152 23.322 43.5617 22.283 42.9496 21.6135L34.1893 12.032Z"
                          fill="currentColor"
                        />
                        <path
                          d="M14.9091 39.421C14.9091 38.5139 14.1737 37.7785 13.2666 37.7785C12.3594 37.7785 11.624 38.5139 11.624 39.421V39.5412C11.624 42.5363 11.6239 44.9505 11.8792 46.8492C12.1443 48.8205 12.7112 50.4803 14.0295 51.7985C15.3477 53.1167 17.0075 53.6837 18.9788 53.9487C20.8775 54.204 23.2916 54.204 26.2868 54.2039H39.6674C42.6625 54.204 45.0767 54.204 46.9754 53.9487C48.9467 53.6837 50.6065 53.1167 51.9247 51.7985C53.243 50.4803 53.8099 48.8205 54.075 46.8492C54.3302 44.9505 54.3302 42.5363 54.3302 39.5412V39.421C54.3302 38.5139 53.5948 37.7785 52.6876 37.7785C51.7805 37.7785 51.0451 38.5139 51.0451 39.421C51.0451 42.5647 51.0416 44.7572 50.8192 46.4114C50.6031 48.0185 50.2079 48.8695 49.6018 49.4756C48.9957 50.0817 48.1447 50.4769 46.5377 50.693C44.8834 50.9154 42.6909 50.9189 39.5473 50.9189H26.4069C23.2633 50.9189 21.0708 50.9154 19.4165 50.693C17.8095 50.4769 16.9585 50.0817 16.3524 49.4756C15.7463 48.8695 15.3511 48.0185 15.135 46.4114C14.9126 44.7572 14.9091 42.5647 14.9091 39.421Z"
                          fill="currentColor"
                        />
                      </svg>
                    </label>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-10 h-10 cursor-pointer transition-colors duration-300 
        ${
          clicked ? 'text-[#266CA8]' : 'text-[#00000066] hover:text-[#266CA8]'
        }`}
                      onClick={() => {
                        setClicked(!clicked)
                        setIsMagnifierActive(!isMagnifierActive)
                      }} // Change color permanently on click
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 18C6 18.4624 6.37483 18.8372 6.83721 18.8372H9.1085C9.50493 23.1011 12.899 26.4951 17.1628 26.8915V29.1628C17.1628 29.6252 17.5376 30 18 30C18.4624 30 18.8372 29.6252 18.8372 29.1628V26.8915C23.101 26.4951 26.4951 23.1011 26.8915 18.8372H29.1628C29.6252 18.8372 30 18.4624 30 18C30 17.5377 29.6252 17.1628 29.1628 17.1628H26.8915C26.4951 12.899 23.101 9.50496 18.8372 9.10853V6.83724C18.8372 6.37486 18.4624 6.00003 18 6.00003C17.5376 6.00003 17.1628 6.37486 17.1628 6.83724V9.10853C12.899 9.50496 9.50493 12.899 9.1085 17.1628H6.83721C6.37483 17.1628 6 17.5377 6 18ZM13.814 18C13.814 15.6881 15.6881 13.814 18 13.814C20.3119 13.814 22.186 15.6881 22.186 18C22.186 20.3119 20.3119 22.1861 18 22.1861C15.6881 22.1861 13.814 20.3119 13.814 18Z"
                        fill="currentColor"
                      />
                      <path
                        d="M15.4884 18C15.4884 16.6129 16.6129 15.4884 18 15.4884C19.3871 15.4884 20.5116 16.6129 20.5116 18C20.5116 19.3872 19.3871 20.5117 18 20.5117C16.6129 20.5117 15.4884 19.3872 15.4884 18Z"
                        fill="currentColor"
                      />
                    </svg>

                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-[#00000066] hover:text-[#266CA8] cursor-pointer transition-colors duration-300"
                      onClick={handlePasteImage}
                    >
                      <g clipPath="url(#clip0_26_1616)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.3151 7.51046C12.4596 6.15545 13.6065 5.10001 14.9998 5.10001H20.9998C22.3932 5.10001 23.54 6.15545 23.6845 7.51046C24.6003 7.5291 25.3921 7.57647 26.0682 7.70066C26.9778 7.86774 27.7519 8.18602 28.3818 8.81594C29.1041 9.53824 29.4148 10.4477 29.56 11.5278C29.6999 12.5682 29.6998 13.891 29.6998 15.5321V22.8638C29.6998 24.5049 29.6999 25.8277 29.56 26.868C29.4148 27.9482 29.1041 28.8576 28.3818 29.5799C27.6595 30.3022 26.75 30.6129 25.6699 30.7581C24.6295 30.898 23.3068 30.8979 21.6656 30.8979H14.334C12.6929 30.8979 11.3701 30.898 10.3297 30.7581C9.24957 30.6129 8.34013 30.3022 7.61783 29.5799C6.89553 28.8576 6.58485 27.9482 6.43963 26.868C6.29976 25.8277 6.29978 24.5049 6.29981 22.8638V15.5321C6.29978 13.891 6.29976 12.5682 6.43963 11.5278C6.58485 10.4477 6.89553 9.53824 7.61783 8.81594C8.24774 8.18602 9.02183 7.86774 9.93143 7.70066C10.6075 7.57647 11.3994 7.5291 12.3151 7.51046ZM12.3175 9.31096C11.4558 9.32937 10.7918 9.37273 10.2566 9.47104C9.57645 9.59597 9.18276 9.79659 8.89062 10.0887C8.5585 10.4208 8.34197 10.8871 8.22358 11.7677C8.10172 12.6741 8.09981 13.8754 8.09981 15.5979V22.7979C8.09981 24.5204 8.10172 25.7218 8.22358 26.6282C8.34197 27.5087 8.5585 27.975 8.89062 28.3071C9.22273 28.6392 9.68902 28.8558 10.5696 28.9741C11.476 29.096 12.6773 29.0979 14.3998 29.0979H21.5998C23.3223 29.0979 24.5236 29.096 25.4301 28.9741C26.3106 28.8558 26.7769 28.6392 27.109 28.3071C27.4411 27.975 27.6576 27.5087 27.776 26.6282C27.8979 25.7218 27.8998 24.5204 27.8998 22.7979V15.5979C27.8998 13.8754 27.8979 12.6741 27.776 11.7677C27.6576 10.8871 27.4411 10.4208 27.109 10.0887C26.8169 9.79659 26.4232 9.59597 25.743 9.47104C25.2078 9.37273 24.5438 9.32937 23.6821 9.31096C23.5279 10.6557 22.3858 11.7 20.9998 11.7H14.9998C13.6138 11.7 12.4717 10.6557 12.3175 9.31096ZM14.9998 6.90001C14.5027 6.90001 14.0998 7.30295 14.0998 7.80001V9.00001C14.0998 9.49706 14.5027 9.90001 14.9998 9.90001H20.9998C21.4969 9.90001 21.8998 9.49706 21.8998 9.00001V7.80001C21.8998 7.30295 21.4969 6.90001 20.9998 6.90001H14.9998Z"
                          fill="currentColor"
                        />
                        <rect
                          width="13.2"
                          height="13.2"
                          transform="translate(20.4004 18)"
                          fill="white"
                        />
                        <path
                          d="M33.1379 22.4961C33.2 23.2025 33.2 24.0831 33.2 25.2C33.2 27.5148 33.2 28.8147 32.647 29.6527L29.3142 26.3199L33.1379 22.4961Z"
                          fill="currentColor"
                        />
                        <path
                          d="M32.0531 30.2467L28.7202 26.9138L24.8961 30.7379C25.6026 30.8 26.4832 30.8 27.6 30.8C29.9152 30.8 31.2152 30.8 32.0531 30.2467Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M27.6 19.6C30.2399 19.6 31.5598 19.6 32.3799 20.4201C32.6621 20.7022 32.8471 21.0436 32.9686 21.4775L23.8775 30.5685C23.4436 30.4471 23.1023 30.262 22.8201 29.9799C22 29.1598 22 27.8398 22 25.2C22 22.5601 22 21.2402 22.8201 20.4201C23.6402 19.6 24.9601 19.6 27.6 19.6ZM23.96 23.3841C23.96 24.3836 24.5856 25.55 25.5616 25.9671C25.7891 26.0643 26.0509 26.0643 26.2784 25.9671C27.2544 25.55 27.88 24.3836 27.88 23.3841C27.88 22.3767 27.0025 21.56 25.92 21.56C24.8375 21.56 23.96 22.3767 23.96 23.3841Z"
                          fill="currentColor"
                        />
                        <path
                          d="M26.76 23.52C26.76 23.9839 26.3839 24.36 25.92 24.36C25.4561 24.36 25.08 23.9839 25.08 23.52C25.08 23.0561 25.4561 22.68 25.92 22.68C26.3839 22.68 26.76 23.0561 26.76 23.52Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_26_1616">
                          <rect width="36" height="36" rx="6" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                {/* contour */}
                <div className="mt-10 ">
                  <div className="flex items-center justify-between mb-5">
                    <Text className="font-semibold">Contour Dimension</Text>
                    <div className="flex gap-8">
                      <label className="flex items-center space-x-1 cursor-pointer">
                        <input
                          type="radio"
                          name="dimension"
                          value="mm"
                          checked={unit === 'mm'}
                          onChange={() => setUnit('mm')}
                          className="hidden"
                        />
                        <span
                          className={`w-5 h-5 flex items-center justify-center border rounded-full ${
                            unit === 'mm'
                              ? 'border-[#266CA8]'
                              : 'border-gray-400'
                          }`}
                        >
                          {unit === 'mm' && (
                            <span className="w-3 h-3 bg-[#266CA8] rounded-full"></span>
                          )}
                        </span>
                        <span className="text-gray-700">mm</span>
                      </label>

                      <label className="flex items-center space-x-1 cursor-pointer">
                        <input
                          type="radio"
                          name="dimension"
                          value="inch"
                          checked={unit === 'inch'}
                          onChange={() => setUnit('inch')}
                          className="hidden"
                        />
                        <span
                          className={`w-5 h-5 flex items-center justify-center border rounded-full ${
                            unit === 'inch'
                              ? 'border-[#266CA8]'
                              : 'border-gray-400'
                          }`}
                        >
                          {unit === 'inch' && (
                            <span className="w-3 h-3 bg-[#266CA8] rounded-full"></span>
                          )}
                        </span>
                        <span className="text-gray-700">Inch</span>
                      </label>
                    </div>
                  </div>
                  <Text className="font-semibold">
                    Contour Offset Parameter{' '}
                    <span className="font-medium text-[14px] sm:text-[16px] text-[#00000080]">
                      {unit === 'mm' ? '(mm)' : '(inches)'}
                    </span>
                  </Text>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="border rounded-full w-full p-3 my-5 bg-[#F2F2F2] placeholder:text-sm text-sm"
                    placeholder="0"
                    value={contour}
                    required
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d*\.?\d{0,4}$/.test(value)) {
                        setContour(value)
                      }
                    }}
                    onBlur={() => {
                      if (contour !== '') {
                        const parsed = parseFloat(contour)
                        if (!isNaN(parsed)) {
                          setContour(parsed.toString())
                        }
                      }
                    }}
                  />
                  <div className="space-y-4 max-w-sm">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={fingerCut === 'Yes'}
                        onChange={() =>
                          setFingerCut(fingerCut === 'Yes' ? 'No' : 'Yes')
                        }
                        className="peer hidden"
                      />
                      <div className="w-5 h-5 border border-[#266CA8] rounded cursor-pointer flex items-center justify-center peer-checked:bg-[#266CA8] peer-checked:border-transparent">
                        {fingerCut === 'Yes' ? (
                          <span className="text-white">✔</span>
                        ) : (
                          ''
                        )}
                      </div>
                      <Text className="">Include Finger clearance cut</Text>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={boundaryContour === 'Yes'}
                        onChange={() =>
                          setBoundaryContour(
                            boundaryContour === 'Yes' ? 'No' : 'Yes',
                          )
                        }
                        className="peer hidden"
                      />
                      <div className="w-5 h-5 border border-[#266CA8] rounded cursor-pointer flex items-center justify-center peer-checked:bg-[#266CA8] peer-checked:border-transparent">
                        {boundaryContour === 'Yes' ? (
                          <span className="text-white">✔</span>
                        ) : (
                          ''
                        )}
                      </div>

                      <Text>
                        Include Boundary Contour{' '}
                        <span className="font-medium text-[14px] sm:text-[16px] text-[#00000080]">
                          {unit === 'mm' ? '(mm)' : '(inches)'}
                        </span>
                      </Text>
                    </label>
                  </div>

                  {boundaryContour === 'Yes' ? (
                    <div className="flex gap-4">
                      <div className="relative w-full">
                        <input
                          type="text"
                          inputMode="decimal"
                          className="border rounded-full w-full p-3 mt-5 bg-[#F2F2F2] placeholder:text-sm text-sm"
                          placeholder="Length"
                          value={boundaryLength === 0 ? '' : boundaryLength}
                          required={boundaryContour === 'Yes'}
                          onChange={(e) => {
                            const value = e.target.value
                            if (/^\d*\.?\d{0,4}$/.test(value)) {
                              setBoundaryLength(
                                value === '' ? 0 : parseFloat(value),
                              )
                            }
                          }}
                          onBlur={() => {
                            if (boundaryLength !== 0) {
                              setBoundaryLength(
                                parseFloat(boundaryLength.toFixed(4)),
                              )
                            }
                          }}
                        />

                        <span className="absolute right-4 top-1/2 transform text-sm">
                          {unit === 'mm' ? 'mm' : 'inches'}
                        </span>
                      </div>
                      <div className="relative w-full">
                        <input
                          type="text"
                          inputMode="decimal"
                          className="border rounded-full w-full p-3 pr-10 mt-5 bg-[#F2F2F2] placeholder:text-sm text-sm"
                          placeholder="Width"
                          value={boundaryWidth === 0 ? '' : boundaryWidth}
                          required={boundaryContour === 'Yes'}
                          onChange={(e) => {
                            const value = e.target.value
                            if (/^\d*\.?\d{0,4}$/.test(value)) {
                              setBoundaryWidth(
                                value === '' ? 0 : parseFloat(value),
                              )
                            }
                          }}
                          onBlur={() => {
                            if (boundaryWidth !== 0) {
                              setBoundaryWidth(
                                parseFloat(boundaryWidth.toFixed(4)),
                              )
                            }
                          }}
                        />
                        <span className="absolute right-4 top-1/2 transform text-sm">
                          {unit === 'mm' ? 'mm' : 'inches'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="mt-4 max-w-sm">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={includeDrawerId === 'Yes'}
                        onChange={() =>
                          setIncludeDrawerId(
                            includeDrawerId === 'Yes' ? 'No' : 'Yes',
                          )
                        }
                        className="peer hidden"
                      />
                      <div className="w-5 h-5 border border-[#266CA8] rounded cursor-pointer flex items-center justify-center peer-checked:bg-[#266CA8] peer-checked:border-transparent">
                        {includeDrawerId === 'Yes' ? (
                          <span className="text-white">✔</span>
                        ) : (
                          ''
                        )}
                      </div>
                      <Text className="">Include Drawer ID</Text>
                    </label>
                  </div>

                  {includeDrawerId === 'Yes' ? (
                    <div className="mt-3">
                      <input
                        type="text"
                        inputMode="decimal"
                        className="border rounded-full w-full p-3 mt-1 bg-[#F2F2F2] placeholder:text-sm text-sm"
                        placeholder="Enter Drawer id"
                        value={drawerId}
                        maxLength={20}
                        required={includeDrawerId === 'Yes'}
                        onChange={(e) => {
                          setDrawerId(e.target.value)
                        }}
                      />
                    </div>
                  ) : (
                    ''
                  )}

                  <div className="flex justify-between gap-4 my-8">
                    <button
                      type="reset"
                      className="w-1/2 bg-white p-3 rounded-full text-[#00000080] font-medium xl:text-[18px] text-[14px]"
                      onClick={() => {
                        setContour('')
                        setBoundaryWidth(0)
                        setBoundaryLength(0)
                        setImage('')
                        setOverlay('')
                        setMask('')
                        setPreview('')
                        setDfxFile('')
                        setIsProcessed(false)
                        setFingerCut('No')
                        setBoundaryContour('No')
                        setUnit('mm')
                        setDrawerId('')
                      }}
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 bg-[#266CA8] p-3 rounded-full text-white font-medium xl:text-[18px] text-[14px]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* right */}
          <div className="bg-[#F2F2F2] md:w-1/2 rounded-b-2xl rounded-t-2xl">
            <div className="bg-[#C6C9CB] py-3 rounded-t-2xl text-[#000000]">
              <p className="text-[#000000] text-center font-medium text-[16px] sm:text-[20px]">
                Output Data
              </p>
            </div>
            {!isProcessed ? (
              <div className="p-5 flex justify-center items-center h-full">
                <Image
                  src="/images/user/GenerateDFX/noOutput.svg"
                  alt="Uploaded Preview"
                  className="rounded-t-3xl "
                  width={400}
                  height={200}
                  ref={imgRef}
                />
              </div>
            ) : (
              <div className="p-5 h-[900px] overflow-y-auto">
                <div className="flex flex-col gap-6">
                  <div className="relative">
                    <p className="font-semibold text-2xl mb-5">Overlay Image</p>
                    <div className="relative flex justify-center items-center">
                      {/* <Image
                        src={overlay}
                        alt="overlay Image"
                        className="w-full rounded-3xl border"
                        width={350}
                        height={100}
                      /> */}
                      <div
                        className="w-full h-full rounded-3xl border"
                        style={{
                          // width: "400px",
                          height: '400px',
                          backgroundImage: `url(${overlay})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                      <div className="absolute top-0 right-0 bg-white border-r border-t rounded-tr-3xl text-white w-20 h-10 flex items-center justify-around text-sm cursor-pointer">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleFullScreen(overlay)}
                        >
                          <Image
                            src="/images/user/GenerateDFX/Full Screen.svg"
                            alt="fullscreen"
                            width={24}
                            height={24}
                          />
                        </div>
                        {/* <Image src="/images/user/GenerateDFX/Share.svg" alt="share" width={24} height={24} /> */}
                        <Image
                          src="/images/user/GenerateDFX/download.svg"
                          alt="download"
                          width={24}
                          height={24}
                          onClick={() => handleDownload(overlay)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <p className="font-semibold text-2xl mb-5">
                      Outline Of Object
                    </p>
                    <div className="relative flex justify-center items-center">
                      {/* <Image
                        src={preview}
                        alt="preview Image"
                        width={350}
                        height={100}
                        className="w-full border rounded-3xl"
                      /> */}
                      <div
                        className="w-full h-full rounded-3xl border"
                        style={{
                          // width: "400px",
                          height: '400px',
                          backgroundImage: `url(${preview})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                      <div className="absolute shadow-card top-0 right-0 bg-white border-r border-t rounded-tr-3xl text-white w-20 h-10 flex items-center justify-around text-sm cursor-pointer">
                        <div className="cursor-pointer">
                          <Image
                            src="/images/user/GenerateDFX/Full Screen.svg"
                            alt="fullscreen"
                            width={24}
                            height={24}
                            onClick={() => handleFullScreen(preview)}
                          />
                        </div>
                        {/* <Image src="/images/user/GenerateDFX/Share.svg" alt="share" width={24} height={24} /> */}
                        <Image
                          src="/images/user/GenerateDFX/download.svg"
                          alt="download"
                          width={24}
                          height={24}
                          onClick={() => handleDownload(preview)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                  <div className="relative">
                    <p className="font-semibold text-2xl mb-5">Mask</p>
                    <div className="relative flex justify-center items-center rounded-3xl">
                      {/* <Image
                        src={mask}
                        alt="mask Image"
                        width={350}
                        height={100}
                        className="w-full rounded-3xl border"
                      /> */}
                      <div
                        className="w-full h-full rounded-3xl border"
                        style={{
                          // width: "400px",
                          height: '400px',
                          backgroundImage: `url(${mask})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                      <div className="absolute top-0 right-0 bg-white border-r border-t rounded-tr-3xl text-white w-20 h-10 flex items-center justify-around text-sm cursor-pointer">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleFullScreen(mask)}
                        >
                          <Image
                            src="/images/user/GenerateDFX/Full Screen.svg"
                            alt="fullscreen"
                            width={24}
                            height={24}
                          />
                        </div>
                        {/* <Image src="/images/user/GenerateDFX/Share.svg" alt="share" width={24} height={24} /> */}
                        <Image
                          src="/images/user/GenerateDFX/download.svg"
                          alt="download"
                          width={24}
                          height={24}
                          onClick={() => handleDownload(mask)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative h-64">
                    <p className="font-semibold text-2xl mb-5">DXF File</p>
                    <p className="bg-white p-3 rounded-full flex justify-between">
                      <span>{dfxFile.split('/').pop()}</span>
                      <span className="flex">
                        <p className="font-medium text-lg"> {fileSize}kb</p>
                        <Image
                          className="cursor-pointer"
                          src="/images/user/GenerateDFX/download.svg"
                          alt="download"
                          width={30}
                          height={30}
                          onClick={() => handleDownloadDXF(dfxFile)}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* processing */}
      <Modal isOpen={isProcessingOpen} onClose={onClose} buttonContent="">
        <>
          <div className="flex flex-col justify-center items-center p-10">
            <Image
              src="/images/user/GenerateDFX/processing.svg"
              alt="fullscreen"
              width={200}
              height={200}
            />

            <p className="font-semibold text-2xl mt-5 flex items-center">
              Processing <PulseLoader color="black" />
            </p>
            <p className="text-center text-[#00000066] font-medium text-lg">
              Please wait while we detect contours and generate your DXF file.
              Usually takes 1-3 minutes.
            </p>
          </div>
        </>
      </Modal>

      {isBilingOpen && (
        <Subscribe
          isBilingOpen={isBilingOpen}
          setIsBilingOpen={setIsBilingOpen}
        />
      )}
    </>
  )
}

export default Input
