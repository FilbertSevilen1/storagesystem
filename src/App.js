import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import  Axios  from "axios";
import { useDispatch } from "react-redux";
import Navigation from "./page/components/Navigation.jsx";
import Landing from "./page/Landing.jsx";
import ItemList from "./page/ItemList.jsx";
import Borrow from "./page/Borrow.jsx";
import Edit from "./page/Edit.jsx";
import History from "./page/History.jsx";
import Return from "./page/Return.jsx";

const API_URL = process.env.REACT_APP_API_URL

function App() {
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   const id = localStorage.getItem("df_token")
  //   let data = {
  //     id : id
  //   }
  //   Axios.post(API_URL + `/auth/keeplogin`,data)
  //   .then((respond)=>{
  //     dispatch({type:'USER_LOGIN', payload:respond.data[0]})
  //   })
  //   .catch((error)=>{
  //     console.log(error.response.data)
  //   })
  // },[])
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<ItemList/>}></Route>
        {/* <Route path="/item" element={<ItemList/>}></Route> */}
        <Route path="/borrow" element={<Borrow/>}></Route>
        <Route path="/return" element={<Return/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
        <Route path="/history" element={<History/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;