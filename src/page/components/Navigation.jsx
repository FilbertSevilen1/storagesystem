import React, { useEffect, useState } from "react";
import '../../css/navigation.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
function Navigation(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user)
    const borrowing = useSelector((state)=>state.borrowing)

    const logout = () =>{
        dispatch({type:"LOGOUT"})
    }

    // const checkBorrowing = () =>{
    //     console.log('id : ', user.user_id)
    //     let data = {
    //         user_id : user.user_id
    //     }
    //     axios.post(API_URL + '/items/borrowing', data)
    //     .then((respond)=>{
    //         console.log(respond.data.length)
    //         if(respond.data.length != 0)setBorrowing(true);
    //     })
    //     .catch((error)=>{
    //         console.log(error.message)
    //     })
    // }

    useEffect(()=>{
        // checkBorrowing();
    },[user])

    return (
        <div className="navigationContainer">
            <div className="navigationContainerGroup">
                {/* User */}
                <button className="navigationButton" onClick={(()=>navigate('/'))}>
                    Item List
                </button>
                {
                    borrowing?
                    <button className="navigationButton" onClick={(()=>navigate('borrowing'))}>
                        Borrowing
                    </button>
                    :
                    <button className="navigationButton" onClick={(()=>navigate('borrow'))}>
                        Cart
                    </button>
                }
                <button className="navigationButton" onClick={(()=>navigate('history'))}>
                    History
                </button>

                {/* Admin */}
                {
                    user.user_role == 'Admin'?
                    <button className="navigationButton" onClick={(()=>navigate('insert'))}>
                        Add Item
                    </button>
                    :
                    <div>
                    </div>
                }
            </div>
                {
                    user.user_role != ''?
                    <div className="navigationContainerGroup">
                        <div className="navigationProfile">
                            Hello, {user.user_name}
                        </div>
                        <button className="navigationButton" onClick={logout}>
                            Logout
                        </button>
                    </div>
                    :
                    <div className="navigationContainerGroup">
                        <button className="navigationButton" onClick={(()=>navigate('login'))}>
                            Login
                        </button>
                        <button className="navigationButton" onClick={(()=>navigate('register'))}>
                            Register
                        </button>
                    </div>
                }
        </div>
    )
}
export default Navigation;