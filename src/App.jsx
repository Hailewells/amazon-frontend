

import { useContext, useEffect } from "react";
import Routing from "../Router"
import { auth } from "./utility/firebase";
import { Type } from "./utility/action.type";
import { DataContext } from "./Components/DataProvider/DataProvider";
 



function App() {
  const [{user}, dispatch] = useContext(DataContext)
  useEffect(() => {
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    dispatch({
      type: Type.SET_USER,
      payload: authUser
    })
  }else{
    dispatch({
      type: Type.SET_USER,
      payload: null,
    })
  }
})

  }, []);
  return <Routing/>
}

export default App
