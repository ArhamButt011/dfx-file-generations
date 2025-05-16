import Text from '@/components/UI/Text'

import Image from 'next/image'
interface ExamplesProps {
  setImage: (image: string) => void
  setMask: (mask: string) => void
  setOverlay: (overlay: string) => void
  setDrawerId: (drawerId: string) => void
  setPreview: (preview: string) => void
  setDfxFile: (dfxfile: string) => void
  setIsProcessed: (isprocess: boolean) => void
  setSelectedFile: (file: File) => void
  setBoundaryLength: (length: string) => void
  setBoundaryContour: (contour: string) => void
  setBoundaryWidth: (width: string) => void
  setisProcessingOpen: (isOpen: boolean) => void
  setFingerCut: (cut: string) => void
  setContourOffset: (offset: string) => void
  setContour: (contour: string) => void
  setUnit: (unit: string) => void
  setMaskUrl: (mask: string) => void
  setOvelayUrl: (overlay: string) => void
  setOutlineUrl: (outline: string) => void
}

const Examples: React.FC<ExamplesProps> = (props) => {
  const examples = [
    {
      id: 1,
      image: '/images/user/GenerateDFX/dxf1.svg',
      actualImage: '/images/user/GenerateDFX/img1.jpg',
      valueForMask: '0.016',
      offsetUnit: 'inches',
      fingerClearence: 'Yes',
      rectangularBoundary: 'Yes',
      boundaryLength: '300',
      boundaryWidth: '300',
      text: 'TEXT',

      overlayUrl:
        'https://dxf.lumashape.com/outputs/a302ce29-695f-4fe9-822c-5f748e7273fb/Overlay_Image.jpg',
      outlineUrl:
        'https://dxf.lumashape.com/outputs/a302ce29-695f-4fe9-822c-5f748e7273fb/DXF_Preview.jpg',
      maskUrl:
        'https://dxf.lumashape.com/outputs/a302ce29-695f-4fe9-822c-5f748e7273fb/mask.jpg',
      dxf_file:
        'https://dxf.lumashape.com/outputs/a302ce29-695f-4fe9-822c-5f748e7273fb/DXF_29-04-2025_offset-0.0160.dxf',
    },

    {
      id: 2,
      image: '/images/user/GenerateDFX/dxf2.svg',
      actualImage: '/images/user/GenerateDFX/img2.png',
      valueForMask: '0.075',
      offsetUnit: 'inches',
      fingerClearence: 'Yes',
      rectangularBoundary: 'Yes',
      boundaryLength: '50',
      boundaryWidth: '50',
      text: 'TEXT',
      overlayUrl:
        'https://dxf.lumashape.com/outputs/6d16d4af-d466-4b88-8305-02c6a91490d6/Overlay_Image.jpg',
      outlineUrl:
        'https://dxf.lumashape.com/outputs/6d16d4af-d466-4b88-8305-02c6a91490d6/DXF_Preview.jpg',
      maskUrl:
        'https://dxf.lumashape.com/outputs/6d16d4af-d466-4b88-8305-02c6a91490d6/mask.jpg',
      dxf_file:
        'https://dxf.lumashape.com/outputs/6d16d4af-d466-4b88-8305-02c6a91490d6/DXF_29-04-2025_offset-0.0750.dxf',
    },
    {
      id: 3,
      image: '/images/user/GenerateDFX/dxf3.svg',
      actualImage: '/images/user/GenerateDFX/img3.png',
      valueForMask: '0.025',
      offsetUnit: 'mm',
      fingerClearence: 'Yes',
      rectangularBoundary: 'Yes',
      boundaryLength: '500',
      boundaryWidth: '500',
      text: 'ANNOTATION',
      overlayUrl:
        'https://dxf.lumashape.com/outputs/199097db-c333-4122-8978-b2a4e3d9a899/Overlay_Image.jpg',
      outlineUrl:
        'https://dxf.lumashape.com/outputs/199097db-c333-4122-8978-b2a4e3d9a899/DXF_Preview.jpg',
      maskUrl:
        'https://dxf.lumashape.com/outputs/199097db-c333-4122-8978-b2a4e3d9a899/mask.jpg',
      dxf_file:
        'https://dxf.lumashape.com/outputs/199097db-c333-4122-8978-b2a4e3d9a899/DXF_29-04-2025_offset-0.0250.dxf',
    },
    {
      id: 4,
      image: '/images/user/GenerateDFX/dxf4.svg',
      actualImage: '/images/user/GenerateDFX/img4.jpg',
      valueForMask: '0.045',
      offsetUnit: 'mm',
      fingerClearence: 'Yes',
      rectangularBoundary: 'No',
      boundaryLength: '--',
      boundaryWidth: '--',
      text: '--',
      overlayUrl:
        'https://dxf.lumashape.com/outputs/e8c6c864-7593-4718-9da0-89fb5152f8b3/Overlay_Image.jpg',
      outlineUrl:
        'https://dxf.lumashape.com/outputs/e8c6c864-7593-4718-9da0-89fb5152f8b3/DXF_Preview.jpg',
      maskUrl:
        'https://dxf.lumashape.com/outputs/e8c6c864-7593-4718-9da0-89fb5152f8b3/mask.jpg',
      dxf_file:
        'https://dxf.lumashape.com/outputs/e8c6c864-7593-4718-9da0-89fb5152f8b3/DXF_29-04-2025_offset-0.0450.dxf',
    },
  ]

  const handleRowClick = async (id: number) => {
    const example = examples.filter((data) => data.id === id)
    const actualImage = example[0].actualImage
    const boundaryLength = example[0].boundaryLength
    const boundaryWidth = example[0].boundaryWidth

    props.setDfxFile(example[0].dxf_file)
    props.setOvelayUrl(example[0].overlayUrl)
    props.setOutlineUrl(example[0].outlineUrl)
    props.setMaskUrl(example[0].maskUrl)

    // props.setIsProcessed(true)

    // const fetchBase64Images = async () => {
    //   const convertToBase64 = async (url: string): Promise<string> => {
    //     const response = await fetch(url)
    //     const blob = await response.blob()
    //     return new Promise((resolve) => {
    //       const reader = new FileReader()
    //       reader.onloadend = () => resolve(reader.result as string)
    //       reader.readAsDataURL(blob)
    //     })
    //   }

    //   try {
    //     const [maskBase64, overlayBase64, previewBase64] = await Promise.all([
    //       convertToBase64(example[0].maskUrl),
    //       convertToBase64(example[0].overlayUrl),
    //       convertToBase64(example[0].outlineUrl),
    //     ])

    //     props.setMask(maskBase64)
    //     props.setOverlay(overlayBase64)
    //     props.setPreview(previewBase64)
    //   } catch (error) {
    //     console.error('Error fetching base64 images:', error)
    //   }
    // }
    // fetchBase64Images()

    if (actualImage) {
      try {
        const response = await fetch(actualImage)
        const blob = await response.blob()

        const file = new File(
          [blob],
          actualImage.split('/').pop() || 'default.png',
          {
            type: blob.type,
          },
        )

        const boundaryLengthValue =
          boundaryLength === '--' ? '0' : boundaryLength
        const boundaryWidthVal = boundaryWidth === '--' ? '0' : boundaryWidth

        props.setContour(example[0].valueForMask)
        props.setImage(actualImage)
        props.setSelectedFile(file)
        props.setBoundaryLength(boundaryLengthValue)
        props.setFingerCut(example[0].fingerClearence)
        props.setBoundaryContour(example[0].rectangularBoundary)
        props.setContourOffset('Yes')
        props.setUnit(example[0].offsetUnit)
        props.setBoundaryWidth(boundaryWidthVal)
        props.setDrawerId(example[0].text)
      } catch (error) {
        console.error('Failed to load the image:', error)
      }
    } else {
      console.error('Image not found')
    }
  }

  return (
    <div>
      <div className="flex items-center mt-4 gap-1 mb-4">
        <div className="">
          <Image
            src={'/images/user/GenerateDFX/examples.svg'}
            alt="eamples"
            height={30}
            width={30}
          />
        </div>
        <Text as="h4" className="font-semibold">
          Examples
        </Text>
      </div>

      <div className="w-full overflow-x-auto grid grid-cols-1 relative mx-auto">
        <div className="w-full sm:max-w-full">
          <table className="w-full rounded-3xl overflow-hidden border border-[#C6C9CB]">
            <thead className="bg-[#C6C9CB] rounded-3xl">
              <tr className="md:text-[16px] text-[14px] text-black">
                <th className="p-3 border-b text-start font-medium rounded-tl-3xl">
                  Input Image
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Offset Value
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Offset Unit
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Finger Clearance
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Rectangular Boundary
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Boundary Length
                </th>
                <th className="p-3 border-b text-center font-medium">
                  Boundary Width
                </th>
                <th className="p-3 border-b text-center font-medium rounded-tr-3xl">
                  Drawer ID
                </th>
              </tr>
            </thead>
            <tbody>
              {examples.map((data, index) => {
                const isLastRow = index === examples.length - 1
                return (
                  <tr
                    key={index}
                    className={`text-primary text-[14px] md:text-[16px] hover:cursor-pointer ${
                      index % 2 !== 0 ? 'bg-[#F2F2F2]' : 'bg-white'
                    }`}
                    onClick={() => handleRowClick(data.id)}
                  >
                    <td
                      className={`py-4 px-4 text-center font-medium border border-[#C6C9CB] ${
                        isLastRow ? 'rounded-bl-3xl' : ''
                      }`}
                    >
                      <Image
                        src={data.image}
                        alt="dxfimage"
                        height={100}
                        width={75}
                      />
                    </td>

                    <td className="py-4 px-4 text-center font-medium border border-[#C6C9CB]">
                      {data.valueForMask}
                    </td>
                    <td className="py-4 px-4 text-center font-medium border border-[#C6C9CB]">
                      {data.offsetUnit}
                    </td>
                    <td className="py-4 px-4 text-center font-medium border border-[#C6C9CB]">
                      {data.fingerClearence}
                    </td>
                    <td className="py-4 px-4 text-center font-medium border border-[#C6C9CB]">
                      {data.rectangularBoundary}
                    </td>
                    <td
                      className={`py-4 px-4 text-center font-medium border border-[#C6C9CB] `}
                    >
                      {data.boundaryLength}
                    </td>
                    <td
                      className={`py-4 px-4 text-center font-medium border border-[#C6C9CB] `}
                    >
                      {data.boundaryWidth}
                    </td>
                    <td
                      className={`py-4 px-4 text-center font-medium border border-[#C6C9CB] ${
                        isLastRow ? 'rounded-br-3xl' : ''
                      }`}
                    >
                      {data.text}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Examples
