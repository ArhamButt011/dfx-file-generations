import React from 'react'
import ContactUS from '@/components/Home/ContactUS'
import Navbar from '@/components/Home/navbar'
// import Footer from '@/components/Home/Footer'
import ContactUsFooter from '@/components/Home/ContactUsFooter'
function page() {
  return (
    <div>
      <Navbar />
      <ContactUS />
      <ContactUsFooter />
    </div>
  )
}

export default page
