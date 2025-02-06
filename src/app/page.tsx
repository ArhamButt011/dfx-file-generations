'use client'
import Navbar from '@/components/Home/navbar'
import Hero from '@/components/Home/Hero'
import Sample from '@/components/Home/Sample'
import Working from '@/components/Home/Working'
import Pricing from '@/components/Home/Pricing'
import FAQ from '@/components/Home/FAQ'
import Footer from '@/components/Home/Footer'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import Dashboard from '@/components/admin/Dashboard'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const { userData } = useAuth()

  return (
    <>
      {userData && userData.role == 'admin' ? (
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
      ) : (
        <>
          <Navbar />
          <Hero />
          <Sample />
          <Working />
          <Pricing />
          <FAQ />
          <Footer />
        </>
      )}
    </>
  )
}
