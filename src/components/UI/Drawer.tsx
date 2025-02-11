"use client";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";

// import Text from "@/ui/Text";
// import { AiOutlineCloseCircle } from "react-icons/ai";
// import closeIcon from "/public/icons/close-icon.svg";

type DrawerProps = {
  isOpen: boolean;
  // onClose?: () => void;
  className?: string;
  children: React.ReactNode;
  drawerTitle?: string;
};

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  // onClose,
  className,
  // drawerTitle,
  children,
}) => {
  const handleEscapeKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // onClose();
      }
    },
    []
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleEscapeKeyPress);
    } else {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscapeKeyPress);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [isOpen, handleEscapeKeyPress]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      //   onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed  right-0 top-0 z-[100] h-full w-full  "
          onClick={handleOverlayClick}
        >
          {/* open */}
        </div>
      )}
      <div
        className={twMerge(
          `fixed right-0 top-0 z-[999] h-full   w-[705px] ] mob:w-full transform overflow-x-hidden text-white  drawerbg transition-transform duration-300 bg-black ease-in-out ${isOpen
            ? "transition-transform duration-700 ease-in-out translate-x-0"
            : "transition-transform duration-700 ease-in-out  translate-x-full"
          // isOpen ? "h-[100%] w-full translate-y-[10%]" : "translate-y-full"
          }`,
          className
        )}
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add desired box shadow
        }}
      >
        {/* Drawer Close Button */}
        {/* <div className="mt-[20px]  px-[60px] mob:px-[25px] flex justify-end items-center">
          <button
            // onClick={toggleMenu}
            type="button"
            className="relative z-20 flex flex-col items-center justify-center w-10 h-10 rounded-md focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={onClose}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-[4px]" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white mt-1.5 transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
            ></span>
          </button>
        </div> */}

        {/* Drawer content */}
        {/* Conditionally render the children based on 'isOpen' */}
        {isOpen && <div className="]">{children}</div>}
      </div>
    </>
  );
};

export default Drawer;