import React, { useEffect, useRef, useState } from "react";
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import '../css/item.css';
import '../css/index.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL
function Login(){
    const username = useRef("");
    const user = useSelector((state)=>state.user)
    const password = useRef("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [gender, setGender] = useState("");
    const birthday = useRef("")
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        if(user.role){
            navigate("/")
        }
    },[user])

    const onSubmit = () =>{
        let data = {
            username: username.current.value,
            password: password.current.value
        }
        axios.post(API_URL + '/users/login', data)
        .then((respond)=>{
            toast.success(`Login Success`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
            
            localStorage.setItem("storage_system_token", respond.data[0].user_id)
            dispatch({type:"USER_LOGIN", payload:respond.data[0]})
        })
        .catch((error)=>{
            console.log(error)
            toast.error(`${error.response.data}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
    }

    const handleChange = (event) =>{
        setGender(event)
    }

    return(
        <div className='itemContainer'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <div className='itemContainerContent'>
                <h1>Login</h1>
                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Username :</div>
                    <input ref={username} className='itemSearchBox' placeholder='ex. Jack'></input>
                </div>
                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Password :</div>
                    <input type="password" ref={password} className='itemSearchBox' placeholder='********'></input>
                </div>
                <p className="errorMessage">{errorMessage}</p>
                <button className='itemSubmitButton' onClick={onSubmit}>Login</button>
            </div>
        </div>
    )
}
export default Login;