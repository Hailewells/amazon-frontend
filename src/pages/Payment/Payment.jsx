import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import {Type} from '../../utility/action.type'
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import Currencyformat from '../../Components/CurrencyFormat/Currencyformat';
import { axiosInstance } from "../../API/axios"
import { BeatLoader } from 'react-spinners';
import {db} from "../../utility/firebase"
import { useNavigate } from 'react-router-dom';
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);


  const total = basket.reduce((amount, item)=> {
    return item.price * item.amount + amount
  },0 )
  const [error, setError] = useState(null);
const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    e?.error?.message? setError(e?.error?.message) : setError("")
  }

  const handlePayment = async(e) =>{
    e.preventDefault();
    //step 1  contact to the client secret
    try{
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total}`,
      })

      const clientSecret = response.data?.clientSecret;
      //step 2  client side confirm
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(result);


      //step 3  order firestore database save, clear basket
      const paymentIntent = result.paymentIntent;
      console.log("PaymentIntent:", paymentIntent);
      await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set ({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      })

      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET })

      setProcessing(false)
      navigate("/orders", {state:{msg:"you have placed a new order"}})

    }catch (error) {
console.log(error);
setProcessing(false);
      }
    }
    //step 2  react side confirmation
    //step 3  order firestore database save, clear basket

  return ( 
  <Layout>
      {/* header */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <h3>{user?.email}</h3>
            <div>123 react lane</div>
            <div>chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
            <div>
              {basket?.map((item) => (
                <ProductCard product={item} flex={true} />
              ))}
            </div>
          </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__detail}>
            <form onSubmit={handlePayment}>
              {error && <small style={{color: "red"}}>{error}</small>}


              <CardElement onChange={handleChange}/>

              {/* price */}
              <div className={classes.payment__price}>
                <div>
                  <span style={{display: "flex", gap: "10px"}}>
                    <p>Total Order</p>
                      <Currencyformat amount={total} />
                  </span>
                </div>
                <button type='submit'> 
                  {
                    processing? ( 
                    <div className={classes.loader}>
                    <BeatLoader color="#fff" size={15} />
                    <p>Please wait ...</p>
                    </div> 
                    ) : "Pay Now"
                  }
                </button>
              </div>

            </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
