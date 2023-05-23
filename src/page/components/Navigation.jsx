import React from "react";
import '../../css/navigation.css'
import { useNavigate } from "react-router-dom";
function Navigation(){
    const navigate = useNavigate();
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
                {/* <button className="navigationButton" onClick={(()=>navigate('Edit'))}>
                    Edit Item
                </button> */}
            </div>
            <div className="navigationContainerGroup">
                <button className="navigationButton" onClick={(()=>navigate('Login'))}>
                    Login
                </button>
                <button className="navigationButton" onClick={(()=>navigate('Register'))}>
                    Register
                </button>
            </div>
        </div>
    )
}
export default Navigation;