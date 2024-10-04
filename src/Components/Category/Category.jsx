import React from 'react'
import {categoryImages} from "./categoryinfos"
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'
function Category() {
  return (
    <section className={classes.category__container}>
    {
        categoryImages.map((infos, index) => {
            return <CategoryCard data = {infos} key={index}/>
        })
    }
    </section>
  )
}

export default Category
