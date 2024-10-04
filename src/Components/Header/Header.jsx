import React , {useContext}from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import {Link} from 'react-router-dom'
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../utility/firebase";
function Header() {
  const [{user, basket}, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) =>{
    return item.amount + amount
  }, 0)

  return (
    <section className={classes.fixed}>
    <section>
      <div className={classes.header__container}>
        {/* logo  */}
        <div className={classes.logo__container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt=""
            />
          </Link>
          {/* delivery */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        {/* search */}
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" id="" placeholder="search product" />
          <FaSearch size={38} />
        </div>

        {/* right side link */}
        <div className={classes.order__container}>
          <Link to="" className={classes.language}>
            <img
              src="https://pngimg.com/uploads/flags/flags_PNG14592.png"
              alt=""
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>
          {/* three components */}
          <Link to={!user && "/auth"}>
            <div>
              {
                user ? (
                  <>
          <p>Hello, {user?.email?.split("@")[0]}</p>
          <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>

              ):(
                <>
                <p>Hello, SignIn</p>        
                <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          {/* orders */}
          <Link to="/Orders">
            <p>returns</p>
            <span>& Orders</span>
          </Link>
          {/* cart */}
          <Link to="/Cart" className={classes.cart}>
            <FaCartArrowDown size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
    </section>
  );
}

export default Header;
