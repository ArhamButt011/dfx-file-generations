'use client'
import Navbar from '@/components/Home/navbar'
import Hero from '@/components/Home/Hero'
// import Sample from '@/components/Home/Sample'
import Working from '@/components/Home/Working'
import Pricing from '@/components/Home/Pricing'
import FAQ from '@/components/Home/FAQ'
import Footer from '@/components/Home/Footer'
import Banner from '@/components/Home/Banner'
// import ContactUS from '@/components/Home/ContactUS'
// import { useAuth } from '@/context/AuthContext'

export default function Home() {
  // const { userData } = useAuth()

  return (
    <>
      <Navbar />
      <Banner />
      <Hero />
      {/* <Sample /> */}
      <Working />
      <Pricing />
      <FAQ />
      {/* <ContactUS /> */}
      <Footer />
    </>
  )
}
