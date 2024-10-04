import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./src/pages/Landing/Landing";
import Auth from "./src/pages/Auth/Auth";
import Payment from "./src/pages/Payment/Payment";
import Orders from "./src/pages/Orders/Orders";
import Cart from "./src/pages/Cart/Cart";
import Results from "./src/pages/Results/Results";
import ProductDetail from "./src/pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Protectedroute from "./src/Components/ProtectedRoute/Protectedroute";

function Routing() {
  const stripePromise = loadStripe(
    "pk_test_51Q5a7YRtOMHU3ETiv4yXrvRvPgEvD2CIUFXmihte8CtZP4gB4TOkpWTYqcNOI8LvvhdpAOIizZLQeUaozBBH1Qh700sfBvlxH8"
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <Protectedroute
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </Protectedroute>
          }
        />
        <Route path="/orders"
          element={
            <Protectedroute
              msg={"you must log in to see your orders"}
              redirect={"/orders"}
            >
                <Orders />
            </Protectedroute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
