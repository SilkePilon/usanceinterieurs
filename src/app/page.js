import React from 'react'
import BannerTwo from '@/components/section/heroes/bannerOne'
import BannerOne from '@/components/section/heroes/bannerTwo'
import HeaderTwo from '@/components/header/headerTwo'
import Header from '@/components/preview/header'
import Banner from '@/components/preview/banner'
import Demos from '@/components/preview/demos'
import Footer from '@/components/footer'

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Demos />
      <Footer />
    </>
  )
}

export default Home