'use client'
import React from 'react'
import Hero from '@/components/prelanding/hero'
import Choose from '@/components/prelanding/Choose'
// import Sample from '@/components/Home/Sample'
import Pricing from '@/components/prelanding/Pricing'
import Signup from '@/components/prelanding/signup'
import Footer from '@/components/prelanding/footer'
function page() {
  return (
    <>
      <Hero />
      <Choose />
      {/* <Sample/> */}
      <Pricing />
      <Signup />
      <Footer />
    </>
  )
}

export default page
