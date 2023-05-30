import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const API_URL = process.env.REACT_APP_API_URL
function ItemListRow(props) {
    const user = useSelector((state)=>state.user)
    const item = props.item
    const dispatch = useDispatch({type:"REFRESH", payload:""})

    const addToBurrow = () =>{
        let data = {
            user_id : user.user_id,
            item_id : item.item_id
        }
        console.log(data)
        axios.post(API_URL + `/items/add`, data)
        .then((respond)=>{
            console.log(respond)
            alert(respond.data)
            window.location.reload(false);
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
  return (
    <div className='itemRow'>
        <div className='itemLabelId'>
            {item.item_id}
        </div>
        <div className='itemLabel'>
            {item.item_name}
        </div>
        <div className='itemLabel'>
            {item.item_type}
        </div>
        <div className='itemLabel'>
            {item.storage_name}
        </div>
        <div className='itemLabel'>
            {item.item_stock}
        </div>
        <div className='itemLabel'>
            <button className='itemButton itemButtonGreen' onClick={()=>addToBurrow()}>Borrow</button>
            <button className='itemButton itemButtonBlue'>Detail</button>
        </div>
    </div>
  )
}

export default ItemListRow