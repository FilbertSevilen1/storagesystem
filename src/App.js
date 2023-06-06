import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import  Axios  from "axios";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./page/components/Navigation.jsx";
import ItemList from "./page/ItemList.jsx";
import Borrow from "./page/Borrow.jsx";
import Edit from "./page/Edit.jsx";
import History from "./page/History.jsx";
import Insert from "./page/Insert.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Borrowing from "./page/Borrowing.jsx";

const API_URL = process.env.REACT_APP_API_URL

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state)=>state.user)

  const checkBorrowing = (id) =>{
      let data = {
          user_id : id
      }
      Axios.post(API_URL + '/items/borrowing', data)
      .then((respond)=>{
          if(respond.data.length != 0)dispatch({type:'BORROWING'});
      })
      .catch((error)=>{
          console.log(error.message)
      })
  }

  useEffect(()=>{
    const id = localStorage.getItem("storage_system_token")
    if(id){
      let data = {
        user_id : id
      }
      Axios.post(API_URL + `/users/keeplogin`,data)
      .then((respond)=>{
        checkBorrowing(respond.data[0].user_id);
        dispatch({type:'USER_LOGIN', payload:respond.data[0]})
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
    }
    
  },[])
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<ItemList/>}></Route>
        {/* <Route path="/item" element={<ItemList/>}></Route> */}
        <Route path="/borrow" element={<Borrow/>}></Route>
        <Route path="/borrowing" element={<Borrowing/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
        <Route path="/history" element={<History/>}></Route>
        <Route path="/insert" element={<Insert/>}></Route>

        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;