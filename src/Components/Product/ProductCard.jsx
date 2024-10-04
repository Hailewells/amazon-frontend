import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import Currencyformat from '../CurrencyFormat/Currencyformat'
import classes from './Product.module.css'
import {Link} from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../utility/action.type' 
function ProductCard({product, flex, renderDesc, renderAdd}) {
    const { id, title, price, rating, image, description } = product;

 const [state, dispatch]=useContext(DataContext) 

  

const addToCart =() =>{
  dispatch({
    type: Type.ADD_TO_BASKET, 
    item:{
      id, title, price, rating, image, description
    }
})
 
}




  return (
    <div className={`${classes.card__container} ${flex?classes.product__flexed: ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3 className={classes.title}>{title}</h3>
        {renderDesc && <div style={{maxWidth: "750px"}}>{description}</div>}

        <div className={classes.rating}>
            <Rating value={rating?.rate} precision={0.1} />
            <small>{rating?.count}</small>

        </div>
        <div className={classes.price}>
            <Currencyformat amount={price}/>
        </div>
        {
        renderAdd && 
        <button className={classes.button} onClick={addToCart}>add to cart</button>
        } 
      </div>
    </div>
  )
}

export default ProductCard
