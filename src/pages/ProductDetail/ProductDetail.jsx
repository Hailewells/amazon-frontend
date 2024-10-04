import React, { useEffect, useState } from 'react'
// import classes from './ProductDetail.module.css'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import { productUrl } from '../../API/endpoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'
function ProductDetail() {
  const {productId} =useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setisLoading] = useState(false);
  useEffect(() =>{
    setisLoading(true)
    axios.get(`/api/products/${encodeURIComponent(productId)}`)
    .then((res) => {
      setProduct(res.data)
      setisLoading(false)
    }).catch((err) => {
      console.log(err)
      setisLoading(false)});
      
  },[productId]) 
  return (
      <Layout>
        <div className={classes.container}>
        {isLoading ? <Loader/> : (        <ProductCard
        product={product}
        flex ={true}
        renderDesc ={true}
        renderAdd={true}
        />)}
        </div>

      </Layout>
  )
}

export default ProductDetail
