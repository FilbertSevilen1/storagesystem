import React, { useEffect, useState } from 'react'
import ItemListRow from './ItemListRow'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL
function Borrowing(){
    const [borrowID, setBorrowID] = useState('');
    const [borrowReason, setBorrowReason] = useState('');
    const [borrowStatus, setBorrowStatus] = useState('');
    const [borrowLocation, setBorrowLocation] = useState('');
    const user = useSelector((state)=>state.user)
    const [items, setItems] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        getOngoing();
        
    },[user])
    const getOngoing = () =>{
        let data = {
            user_id : user.user_id
        }
        axios.post(API_URL + '/items/ongoing',data)
        .then((respond)=>{
            if(respond.data.length){
                setItems(respond.data)
                setBorrowID(respond.data[0].borrow_id)
                setBorrowReason(respond.data[0].borrow_reason)
                setBorrowStatus(respond.data[0].borrow_status)
                setBorrowLocation(respond.data[0].borrow_location)
            }
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    const updateBorrow = () =>{
        let data = {
            borrow_reason : borrowReason,
            borrow_location : borrowLocation,
            borrow_id : borrowID
        }
        axios.post(API_URL + '/items/updateDraft', data)
        .then((respond)=>{
            alert(respond.data)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    const submitBorrow = () =>{
        if(!borrowLocation){
            return alert("Location Cannot be Empty")
        }
        if(!borrowReason){
            return alert("Reason Cannot be Empty")
        }
        
        let data = {
            borrow_reason : borrowReason,
            borrow_location : borrowLocation,
            borrow_id : borrowID
        }
        axios.post(API_URL + '/items/borrow', data)
        .then((respond)=>{
            alert(respond.data)
            navigate('/')
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    const returnBorrow = () =>{
        let data = {
            borrow_id : borrowID
        }
        axios.post(API_URL + '/items/returnitems', data)
        .then((respond)=>{
            alert(respond.data)
            dispatch({type:"RETURN"})
            navigate('/')
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    const handleReason = (event) =>{
        setBorrowReason(event.target.value)
    }
    const handleLocation = (event) =>{
        setBorrowLocation(event.target.value)
    }
    const generateDataRow = () =>{
        if(items){
            return items.map((item, index) => {
                return <ItemListRow
                    key = {item.item_id}
                    item = {item}
                    type = {"borrowing"}
                />
            })
        }
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
                <h1>Borrowing</h1>
                {
                    items.length?
                    <div>
                        <div className='itemSearchBarCol'>
                                <div className='itemSearchLabelLarge'>Borrow ID : {borrowID}</div>
                                <div className='itemSearchLabelLarge'>Location : 
                                    <input className='itemSearchBox' value={borrowLocation} onChange={(event)=>handleLocation(event)}></input>
                                </div>
                                <div className='itemSearchLabelLarge'>Reason : 
                                    <input className='itemSearchBox' value={borrowReason} onChange={(event)=>handleReason(event)}></input>
                                </div>
                                <div className='itemSearchLabelLarge'>Status : {borrowStatus}</div>
                            </div>
                            <div className='itemRow'>
                                <div className='itemRowHeader itemLabelId'>
                                    Item Id
                                </div>
                                <div className='itemRowHeader itemLabel'>
                                    Item Name
                                </div>
                                <div className='itemRowHeader itemLabel'>
                                    Item Type
                                </div>
                                <div className='itemRowHeader itemLabel'>
                                    Storage Name
                                </div>
                                <div className='itemRowHeader itemLabel'>
                                    Count
                                </div>
                            </div>
                            {generateDataRow()}
                        <div className='itemContainerControlAction'>
                            <button className='itemSubmitButtonUpdate' onClick={updateBorrow}>
                                Update
                            </button>
                            <button className='itemSubmitButton' onClick={returnBorrow}>
                                Return
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        No Data...
                    </div>
                }
           
                
            </div>
            
        </div>
    )
}
export default Borrowing;