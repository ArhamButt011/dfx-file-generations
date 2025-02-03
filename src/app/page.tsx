// import Image from "next/image";yy
import Navbar from "@/components/Home/navbar"
import Hero from "@/components/Home/Hero";
import Sample from "@/components/Home/Sample";
import Working from "@/components/Home/Working";
import Pricing from "@/components/Home/Pricing";
import FAQ from "@/components/Home/FAQ";
import Footer from "@/components/Home/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sample />
      <Working />
      <Pricing/>
      <FAQ/>
      <Footer/>
    </>
  );
}
