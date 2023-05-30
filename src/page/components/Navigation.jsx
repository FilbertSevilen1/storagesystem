import React from "react";
import '../../css/navigation.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function Navigation(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user)
    console.log(user)

    const logout = () =>{
        dispatch({type:"LOGOUT"})
    }
    return (
        <div className="navigationContainer">
            <div className="navigationContainerGroup">
                {/* User */}
                <button className="navigationButton" onClick={(()=>navigate('/'))}>
                    Item List
                </button>
                <button className="navigationButton" onClick={(()=>navigate('borrow'))}>
                    Borrow
                </button>
                <button className="navigationButton" onClick={(()=>navigate('return'))}>
                    Return
                </button>
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