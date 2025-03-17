// 'use client'
// import React from 'react'
// import Hero from '@/components/prelanding/hero'
// import Choose from '@/components/prelanding/Choose'
// // import Sample from '@/components/Home/Sample'
// import Pricing from '@/components/prelanding/Pricing'
// import Signup from '@/components/prelanding/signup'
// import Footer from '@/components/prelanding/footer'
// function page() {
//   return (
//     <>
//       <Hero />
//       <Choose />
//       {/* <Sample/> */}
//       <Pricing />
//       <Signup />
//       <Footer />
//     </>
//   )
// }

// export default page
'use client'
import Navbar from '@/components/Home/navbar'
import Hero from '@/components/Home/Hero'
import Sample from '@/components/Home/Sample'
import Working from '@/components/Home/Working'
import Pricing from '@/components/Home/Pricing'
import FAQ from '@/components/Home/FAQ'
import Footer from '@/components/Home/Footer'
// import ContactUS from '@/components/Home/ContactUS'
// import { useAuth } from '@/context/AuthContext'

export default function Home() {
  // const { userData } = useAuth()

  return (
    <>
      <Navbar />
      <Hero />
      <Sample />
      <Working />
      <Pricing />
      <FAQ />
      {/* <ContactUS /> */}
      <Footer />
    </>
  )
}
