"use client"
// components/MyProvider.tsx
import React, { ReactNode, useEffect } from 'react';

import "aos/dist/aos.css"; // Import AOS CSS
import AOS from "aos";
interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  // You can add any state or functionality you need here
  useEffect(() => {
    AOS.init({ once: false });
  }, []);


  return (
    <div>
      {/* Your global state or logic can go here */}
      {children}
    </div>
  );
};

export default MyProvider;
