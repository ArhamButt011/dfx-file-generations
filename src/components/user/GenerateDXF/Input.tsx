import Image from 'next/image'
import React, { useState } from 'react'


function Input() {
  const [image, setImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

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

  return (
    <div className='mt-5'>
      <p className='font-semibold text-2xl'>Input Image</p>
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

    </div>
  )
}

export default Input
