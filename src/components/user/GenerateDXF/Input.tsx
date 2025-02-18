import BilingModal from '@/components/UI/BilingModal';
import Modal from '@/components/UI/Modal';
import Image from 'next/image'
import React, { useState, FormEvent, useEffect, useRef } from 'react'
import Swal from 'sweetalert2';


function Input() {
  const [image, setImage] = useState<string | null>(null);
  const [contour, setContour] = useState<number>();
  const [dragging, setDragging] = useState<boolean>(false);
  const [isProcessingOpen, setisProcessingOpen] = useState<boolean>(false);
  const [isOutputOpen, setisOutputOpen] = useState<boolean>(false);
  const [base64, setBase64] = useState<string>("");
  const [overlay, setOverlay] = useState<string>("");
  const [mask, setMask] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [dfxFile, setDfxFile] = useState<string>("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x < 0 || y < 0 || x > width || y > height) {
      setLensPos({ ...lensPos, visible: false });
      return;
    }

    setLensPos({ x, y, visible: true });
  };

  const onClose = () => {
    setisProcessingOpen(false);
    setisOutputOpen(false);
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      // Validate file type
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          setImage(event.target?.result as string);
          if (typeof reader.result === "string") {
            setBase64(reader.result);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload an image file");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        if (typeof reader.result === "string") {
          const base64Data = reader.result.split(",")[1];
          setBase64(base64Data);
        }
      }
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!image || !contour) {
      Swal.fire({
        title: 'Error!',
        text: 'Please give both image and contour offset',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      })
      return;
    }
    //pass data to AI api

    setisProcessingOpen(true);
    try {
      const res = await fetch('https://046f-192-241-155-184.ngrok-free.app/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_path_or_base64: base64, offset_inches: contour }),
      });

      if (!res.ok) {
        // If the response is not OK, throw an error with the message from the server response

        const data = await res.json();
        throw new Error(data.message || 'An error occurred');
      }

      // If the response is OK, parse the JSON data
      // , scaling_factor
      const { output_image_url, outlines_url, dxf_file, mask_url } = await res.json();
      setMask(mask_url);
      setDfxFile(dxf_file);
      setPreview(outlines_url);
      setOverlay(output_image_url);
      setisOutputOpen(true);
    } catch (err) {
      // Catch any error in the try block and log it
      Swal.fire({
        title: "Error",
        text: err instanceof Error ? err.message : String(err),
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      })
    }
    finally {
      setisProcessingOpen(false);

    }


    // setisProcessingOpen(true);
    // setTimeout(() => {
    //   onClose();
    //   setisOutputOpen(true);
    // }, 5000);

    // setisOutputOpen(true);
  }


  const handleDownload = (url: string) => {
    if (!url) {
      console.error("No image URL provided for download.");
      return;
    }

    fetch(url)
      .then(response => response.blob()) // Convert image URL to a blob
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = url.split("/").pop() || "downloaded_image"; // Extract filename or fallback
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl); // Clean up memory
      })
      .catch(error => console.error("Error downloading the image:", error));
  };

  const getFileSize = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" }); // Fetch only headers
      const size = response.headers.get("Content-Length"); // Get file size in bytes
      return size ? parseInt(size, 10) / 1024 : 0; // Convert bytes to KB
    } catch (error) {
      console.error("Error fetching file size:", error);
      return 0;
    }
  };

  const handleFullScreen = (url: string) => {
    if (!url) {
      console.error("No image URL provided.");
      return;
    }

    const newTab = window.open();
    if (newTab) {
      newTab.document.body.innerHTML = `<img src="${url}" style="width:100%; height:auto;" />`;
    } else {
      console.error("Popup blocked! Please allow popups for this site.");
    }
  }

  useEffect(() => {
    if (dfxFile) {
      getFileSize(dfxFile).then(size => setFileSize(Number(size.toFixed(2))));
    }
  }, [dfxFile]);

  const handlePasteImage = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      const firstItem = clipboardItems[0]; // Get only the first item

      if (firstItem && firstItem.types[0].startsWith("image")) {
        const blob = await firstItem.getType(firstItem.types[0]);
        const file = new File([blob], "pasted-image.png", { type: blob.type });

        // Convert to preview URL
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target?.result as string);
        reader.readAsDataURL(file);

        // Mimic file input behavior
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        if (fileInputRef.current) {
          fileInputRef.current.files = dataTransfer.files;
          const event = new Event("change", { bubbles: true });
          fileInputRef.current.dispatchEvent(event);
        }
      } else {
        alert("No image found in clipboard. Copy an image first!");
      }
    } catch (error) {
      console.error("Failed to paste image:", error);
      alert("Clipboard access failed. Make sure you have copied an image.");
    }
  };


  return (
    <>
      <div className='mt-5'>
        <p className='font-semibold text-2xl mb-5'>Input Image</p>
        <form action="" onSubmit={handleSubmit} >
          <div className='border border-dashed rounded-3xl'>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`bg-[#F2F2F2] p-5 rounded-t-3xl relative flex flex-col justify-center items-center 
    ${dragging ? "border-blue-500" : "border-gray-300"} 
    border-dashed rounded-2xl p-10 text-center`}
              style={{ minHeight: image ? "100px" : "400px", padding: image ? "0" : "10px", minWidth: image ? "100px" : "" }}

            >
              {image ? (
                <div
                  className="relative  flex justify-center items-center"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setLensPos({ ...lensPos, visible: false })}>
                  <Image
                    src={image}
                    alt="Uploaded Preview"
                    className=" w-full h-100 rounded-3xl"
                    width={100}
                    height={100}
                    ref={imgRef}
                  />
                  {lensPos.visible && (
                    <div
                      className="absolute w-24 h-24 border-2 border-gray-400 rounded-full overflow-hidden pointer-events-none"
                      style={{
                        left: lensPos.x - 48,
                        top: lensPos.y - 48,
                        backgroundImage: `url(${image})`,
                        backgroundSize: `${7 * 100}%`,
                        backgroundPosition: `-${lensPos.x * 7- 48}px -${lensPos.y * 7 - 48}px`,
                      }}
                    />
                  )}

                  <div
                    className="absolute top-0 right-0 bg-white text-white w-20 h-10 flex items-center justify-around text-sm cursor-pointer"
                  >
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
                      onClick={() => setImage(null)}
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
                  <label htmlFor="fileInput" className="flex flex-col items-center cursor-pointer">
                    <Image
                      src="/images/user/GenerateDFX/Upload.svg"
                      alt="upload"
                      width={44}
                      height={44}
                    />
                    <p className="font-semibold text-xl text-center">
                      Drag & drop the image or{" "}
                      <span className="text-[#266CA8] underline cursor-pointer">
                        click
                      </span>{" "}
                      to upload
                    </p>
                  </label>
                </>
              )}
            </div>

            <div className="flex justify-center my-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="flex flex-col items-center cursor-pointer">
                <Image
                  src="/images/user/GenerateDFX/Upload.svg"
                  alt="upload"
                  width={44}
                  height={44}
                />
              </label>
              <Image
                src="/images/user/GenerateDFX/GPS.svg"
                alt="upload"
                width={40}
                height={40}
              />
              <Image
                src="/images/user/GenerateDFX/Clipboard.svg"
                alt="upload"
                width={40}
                height={40}
                className='cursor-pointer'
                onClick={handlePasteImage}
              />
            </div>
          </div>
          {/* contour */}
          <div className='mt-10'>
            <p className='font-semibold text-2xl'>Contour Offset Parameter <span className='font-medium text-xl text-[#00000080]'>(inches)</span></p>

            <input
              type="number"
              className="border rounded-full w-full p-3 my-5"
              value={contour ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setContour(value !== "" ? parseFloat(value) : undefined);
              }}
            />


            <div className="flex justify-between gap-4">
              <button type='reset' className='w-1/2 bg-[#F2F2F2] p-3 rounded-full text-[#00000080] font-medium text-2xl'>Clear</button>
              <button type="submit" className='w-1/2 bg-[#266CA8] p-3 rounded-full text-white font-medium text-2xl'>Submit</button>
            </div>

          </div>
        </form>
      </div >
      {/* processing */}
      <Modal isOpen={isProcessingOpen} onClose={onClose} buttonContent=''>
        <>
          <div className='flex flex-col justify-center items-center p-10'>
            <Image
              src="/images/user/GenerateDFX/processing.svg"
              alt="fullscreen"
              width={200}
              height={200}
            />

            <p className='font-semibold text-2xl mt-5'>Processing..</p>
            <p className='text-center text-[#00000066] font-medium text-lg'>Please wait while we detect contours and generate your DXF file. Usually takes 1-3 minutes.</p>
          </div>
        </>
      </Modal>

      {/* output */}
      <BilingModal isOpen={isOutputOpen} onClose={onClose} buttonContent={<Image src="/images/user/cross.svg" alt="cross" width={20} height={20} />}>
        <div className=''>
          <p className='font-semibold text-3xl'>Output Data</p>
          <div className='flex gap-6 mt-5'>

            <div className="relative w-1/2">
              <p className="font-semibold text-xl mb-5">Overlay Image</p>
              <div className='relative  flex justify-center items-center'>
                <Image
                  src={overlay}
                  alt="overlay Image"
                  className="w-full rounded-3xl border"
                  width={350}
                  height={100}
                />
                <div
                  className="absolute top-0 right-0 bg-white border-r border-t rounded-tr-3xl text-white w-25 h-10 flex items-center justify-around text-sm cursor-pointer"
                >
                  <div

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
                    src="/images/user/GenerateDFX/Share.svg"
                    alt="cross"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/images/user/GenerateDFX/download.svg"
                    alt="cross"
                    width={24}
                    height={24}
                    onClick={() => handleDownload(overlay)}
                  />
                </div>
              </div>
            </div>

            <div className="relative w-1/2 ">
              <p className='font-semibold text-xl mb-5'>DXF Preview</p>
              <div className='relative  flex justify-center items-center'>
                <Image
                  src={preview}
                  alt="preview Image"
                  width={350}
                  height={100}
                  className='w-full  border  rounded-3xl'
                />
                <div
                  className="absolute shadow-card top-0 right-0 bg-white border-r border-t rounded-tr-3xl text-white w-25 h-10 flex items-center justify-around text-sm cursor-pointer"
                >
                  <div
                    className="cursor-pointer "
                  >
                    <Image
                      src="/images/user/GenerateDFX/Full Screen.svg"
                      alt="fullscreen"
                      width={24}
                      height={24}
                    />
                  </div>

                  <Image
                    src="/images/user/GenerateDFX/Share.svg"
                    alt="cross"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/images/user/GenerateDFX/download.svg"
                    alt="cross"
                    width={24}
                    height={24}
                    onClick={() => handleDownload(preview)}
                  />
                </div>
              </div>
            </div>

          </div>
          <div className='flex gap-6 mt-10'>

            <div className="relative w-1/2">
              <p className='font-semibold text-xl mb-5'>Mask</p>
              <div className='relative  flex justify-center items-center rounded-3xl'>
                <Image
                  src={mask}
                  alt="mask Image"
                  width={350}
                  height={100}
                  className='w-full rounded-3xl border'
                />
                <div
                  className="absolute top-0 right-0 bg-white border-r border-t rounded-tr-3xl text-white w-25 h-10 flex items-center justify-around text-sm cursor-pointer"
                >
                  <div

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
                    src="/images/user/GenerateDFX/Share.svg"
                    alt="cross"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/images/user/GenerateDFX/download.svg"
                    alt="cross"
                    width={24}
                    height={24}
                    onClick={() => handleDownload(mask)}
                  />
                </div>
              </div>
            </div>

            <div className="relative w-1/2 h-64">
              <p className='font-semibold text-xl mb-5'>DXF File</p>
              <p className='bg-[#F2F2F2] p-3 rounded-full flex justify-between'>
                <span>{dfxFile.split("/").pop()}</span>
                <span className='flex'>
                  {fileSize}kb
                  <Image
                    src="/images/user/GenerateDFX/download.svg"
                    alt="cross"
                    width={24}
                    height={24}
                    onClick={() => handleDownload(dfxFile)}
                  />
                </span>

              </p>
              <p></p>
            </div>

          </div>
        </div>
      </BilingModal>

    </>
  )
}

export default Input
