import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utility/firebase";
import { Type } from "../../utility/action.type";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { BeatLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });
  const [{user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation()

const authHandler = async(e) =>{
  e.preventDefault()
  if(e.target.name === "signin"){
    setLoading({...loading, signIn: true})
    signInWithEmailAndPassword(auth, email, password)
   .then((userInfo) => {
    dispatch({
      type: Type.SET_USER,
      user: userInfo.user,
    })
    setLoading({...loading, signIn:false})
    navigate(navStateData?.state?.redirect || "/")
  }).catch((err) =>{
    setError(err.message);
    console.log(err);
    setLoading({...loading, signIn:false})
  })

}else{
  createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
    setLoading({...loading, signUp:true})
    dispatch({
      type: Type.SET_USER,
      user: userInfo.user,
    })
    setLoading({...loading, signUp:false})
    navigate("/")
}).catch((err) =>{
  setError(err.message);
  console.log(err);
  setLoading({...loading, signUp:false})
})
}
}
  return ( 
  <section className={classes.login}>
      <Link to="/">
        <img
          src="https://www.hatchwise.com/wp-content/uploads/2022/08/Amazon-Logo-2000-present-1024x576.jpeg"
          alt=""
        />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            > 
              {navStateData?.state?.msg }
            </small>
          )
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input  value={password} onChange={(e)=>setPassword(e.target.value)}type="password" id="password" required />
          </div>
          <button type="submit" onClick={authHandler} name="signin" className={classes.login__signInButton}>
            {
              loading.signIn? <BeatLoader color="#fff" size={15} /> : ("Sign In"
            )}
            </button>
        </form>

        <p>
          Sign in to amazon-clone dolor sit amet consectetur adipisicing elit. Nulla, sit distinctio explicabo ipsum minus laudantium rem id iusto velit nesciunt error. Aperiam quas maxime ut unde ratione possimus neque minus.
        </p>

        <button type="submit" onClick={authHandler} name="signup" className={classes.login__signUpButton}>
        {
              loading.signUp? <BeatLoader color="#fff" size={15} /> : ("Create your Account"
            )}
          </button>
        {
          error && <small className={classes.login__error}>{error}</small>
        }
      </div>
    </section>
  );
}

export default Auth;
