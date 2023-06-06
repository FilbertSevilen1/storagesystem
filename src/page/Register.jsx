import React, { useRef, useState } from "react";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import '../css/item.css'
import '../css/index.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL
function Register(){
    const navigate = useNavigate();

    const username = useRef("");
    const password = useRef("");
    const [gender, setGender] = useState("");
    const birthday = useRef("");
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = () =>{
        if(!username.current.value){
            toast.error(`Username cannot be Empty`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        if(username.current.value.length<4){
            toast.error(`Username cannot be less than 4 characters`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        if(!password.current.value){
            toast.error(`Password cannot be Empty`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        if(password.current.value<4){
            toast.error(`Password cannot be less than 4 characters`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        let data = {
            username : username.current.value,
            password : password.current.value,
            gender : gender,
            birthday : birthday.current.value
        }
        console.log(data)
        axios.post(API_URL + '/users/register', data)
        .then((repsond)=>{
            toast.success(`${repsond.data}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                });
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
                <h1>Register</h1>
                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Username :</div>
                    <input ref={username} className='itemSearchBox' placeholder='ex. Klee'></input>
                </div>
                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Password :</div>
                    <input ref={password} className='itemSearchBox' placeholder='*********' type="password"></input>
                </div>

                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Gender :</div>
                    <div className="itemRadioGroup">
                        <div className="pointer"><input className="pointer" type="radio" name="gender" id="male" value="Male" onClick={()=>setGender("Male")}></input><label htmlFor="male" className="pointer">Male</label></div>
                        <div className="pointer"><input className="pointer" type="radio" name="gender" id="female" value="Female" onClick={()=>setGender("Female")}></input><label htmlFor="female" className="pointer">Female</label></div>
                    </div>
                    {/* <select className="itemSearchBox" onChange={(event)=>handleChange(event.target.value)}>
                        <option>-Not Selected-</option>
                    </select> */}
                </div>

                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Birthday :</div>
                    <input ref={birthday} className='itemSearchBox' placeholder='0' type="date"></input>
                </div>
                <p className="errorMessage">{errorMessage}</p>
                <button className='itemSubmitButton' onClick={onSubmit}>Register</button>
            </div>
        </div>
    )
}
export default Register;