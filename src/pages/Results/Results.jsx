import React, { useEffect, useState } from 'react';
import classes from './Results.module.css';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { productUrl } from '../../API/endpoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function Results() {
  const [result, setResult] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    setisLoading(true);
    axios.get(`/api/products/category/${encodeURIComponent(categoryName)}`)
      .then((res) => {
        // console.log(res);
        setResult(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [categoryName]); // Add categoryName as a dependency

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>
          category/ {categoryName}
        </p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products__container}>
            {result?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;
