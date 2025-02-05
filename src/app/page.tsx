'use client'
import Navbar from '@/components/Home/navbar'
import Hero from '@/components/Home/Hero'
import Sample from '@/components/Home/Sample'
import Working from '@/components/Home/Working'
import Pricing from '@/components/Home/Pricing'
import FAQ from '@/components/Home/FAQ'
import Footer from '@/components/Home/Footer'
import { useEffect, useState } from 'react'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'
import Dashboard from '@/components/admin/Dashboard'

export default function Home() {
  enum Role {
    Admin = 'admin',
    User = 'user',
  }

  const [role, setRole] = useState<Role>(Role.Admin)
  useEffect(() => {
    setRole(Role.Admin)
  }, [])

  return (
    <>
      {role === Role.Admin ? (
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
