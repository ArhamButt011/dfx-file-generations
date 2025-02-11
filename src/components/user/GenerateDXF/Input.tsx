import Modal from '@/components/UI/Modal';
import Image from 'next/image'
import React, { useState, FormEvent } from 'react'
import Swal from 'sweetalert2';


function Input() {
  const [image, setImage] = useState<string | null>(null);
  const [contour, setContour] = useState<number>();
  const [dragging, setDragging] = useState<boolean>(false);
  const [isProcessingOpen, setisProcessingOpen] = useState<boolean>(false);
  const [isOutputOpen, setisOutputOpen] = useState<boolean>(false);
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
        reader.onload = (event) => {
          setImage(event.target?.result as string);
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
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    setTimeout(() => {
      onClose();
      setisOutputOpen(true);
    }, 5000);

    // setisOutputOpen(true);
  }

  return (
    <>
      <div className='mt-5'>
        <p className='font-semibold text-2xl'>Input Image</p>
        <form action="" onSubmit={handleSubmit} >
          <div className='border border-dashed rounded-3xl'>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`bg-[#F2F2F2] p-5 rounded-t-3xl relative flex flex-col justify-center items-center 
    ${dragging ? "border-blue-500" : "border-gray-300"} 
    border-dashed rounded-2xl p-10 text-center`}
              style={{ minHeight: image ? "auto" : "400px", padding: image ? "0" : "10px", minWidth: image ? "auto" : "" }}

            >
              {image ? (
                <div className="relative w-full flex justify-center items-center">
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    className="w-full object-cover rounded-md"
                  />
                  <div
                    className="absolute top-0 right-0 bg-white text-white w-20 h-10 flex items-center justify-around text-sm cursor-pointer"
                  >
                    <div
                      onClick={() => {

                        window.open(image, '_blank');
                      }}
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
              <Image
                src="/images/user/GenerateDFX/Upload.svg"
                alt="upload"
                width={40}
                height={40}
              />
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
      <Modal isOpen={isOutputOpen} onClose={onClose} buttonContent={<Image src="/images/user/cross.svg" alt="cross" width={20} height={20} />}>
        <div className='flex gap-6'>

          <div className="relative w-1/2 h-64">
            <p>Overlay Iage</p>
            <Image
              src="/images/user/home/sample/overlay.svg"
              alt="Input Image"
              fill
              className='mt-5'
            />
          </div>

          <div className="relative w-1/2 h-64">
            <p>DXF Preview</p>
            <Image
              src="/images/user/home/sample/preview.svg"
              alt="Input Image"
              fill
              className='mt-5'
            />
          </div>

        </div>
        <div className='flex gap-6 mt-5'>

          <div className="relative w-1/2 h-64">
            <p>Mask</p>
            <Image
              src="/images/user/home/sample/overlay.svg"
              alt="Input Image"
              fill
              className='mt-5'
            />
          </div>

          <div className="relative w-1/2 h-64">
            <p>DXF File</p>
            <Image
              src="/images/user/home/sample/preview.svg"
              alt="Input Image"
              fill
              className='mt-5'
            />
          </div>

        </div>
      </Modal>
    </>
  )
}

export default Input
