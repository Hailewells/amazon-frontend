import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'
import CarouselEffect from '../../Components/Carousel/CarouselEffect'
function Landing() {
  return (
    <Layout>
        <CarouselEffect/>
        <Category/>
        <Product/>
    </Layout>
  )
}

export default Landing
