import React, {useContext, useState, useEffect} from 'react'
import classes from './Orders.module.css'
import {db} from "../../utility/firebase"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import Layout from '../../Components/Layout/Layout'
import ProductCard from '../../Components/Product/ProductCard'
function Orders() {
  const [{user}, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if(user){
      db.collection('users').doc(user.uid).collection('orders').orderBy("created", "desc").onSnapshot((snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})));
        // dispatch({type: 'SET_ORDERS', payload: orders});
      });
    }else{
      setOrders([])
    }
  }, []);

  return (
    <div>
      <Layout>
        <section className={classes.container}>
          <div className={classes.orders__container}>
            <h2>Your Orders</h2>
            {
              orders?.length === 0 && (
                <p>No orders found</p>
              )
            }
            <div>
              {
                orders?.map((eachOrder, i) =>{
                  return (
                    <div key={i}>
                      <hr />
                      <p>Order ID: {eachOrder?.id}</p>
                      {
                        eachOrder?.data?.basket?.map((order => {
                          return (<ProductCard flex={true}
                          product={order}
                          key={order.id}/>
                          )
                        }
                        ))
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default Orders
