import React, { useEffect, useId, useRef, useState } from "react";
import '../css/item.css'
import Axios from "axios";
const API_URL = process.env.REACT_APP_API_URL
function Insert(){
    const item_name = useRef("");
    const item_type = useRef("");
    const item_stock = useRef(0);
    const [storage, setStorage] = useState("");
    const [selectedStorage, setSelectedStorage] = useState("");
    useEffect(()=>{
        Axios.get(API_URL + "/storages")
        .then((respond)=>{
            setStorage(respond.data)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    },[])

    const generateStorage = () =>{
        if(storage){
            return storage.map((item, index) => {
                return (
                    <option key={index} value={item.storage_id}>{item.storage_name}</option>
                )
            })
        }
    }

    const handleChange = (event) =>{
        setSelectedStorage(event)
    }

    const onSubmit = () =>{

        if(!item_name.current.value){
            return alert("Item Name cannot be empty")
        }
        if(item_name.current.value.length >255){
            return alert("Item Name cannot excess 255 characters")
        }

        if(!item_type.current.value){
            return alert("Item Type cannot be empty")
        }
        if(item_type.current.value.length >255){
            return alert("Item Type cannot excess 255 characters")
        }

        if(item_stock.current.value<1){
            return alert("Item Stock cannot be empty")
        }

        if(!selectedStorage){
            return alert("Storage cannot be empty")
        }

        let data = {
            item_name : item_name.current.value,
            item_type : item_type.current.value,
            item_stock : item_stock.current.value,
            storage_id : selectedStorage,
        }
        console.log(data)
        Axios.post(API_URL + "/items/insert", data)
        .then((respond)=>{
            console.log(respond)
            alert(respond.data)
        })
        .catch((error)=>{
            console.log(error.message)
            alert(error.message)
        })
    }

    return(
        <div className='itemContainer'>
            <div className='itemContainerContent'>
                <h1>Add Item</h1>
                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Item Name :</div>
                    <input ref={item_name} className='itemSearchBox' placeholder='ex. Pensil'></input>
                </div>
                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Item Type :</div>
                    <input ref={item_type} className='itemSearchBox' placeholder='ex. Electronic'></input>
                </div>

                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Storage :</div>
                    <select className="itemSearchBox" onChange={(event)=>handleChange(event.target.value)}>
                        <option>-Not Selected-</option>
                        {generateStorage()}
                    </select>
                </div>

                <div className='itemSearchBarInput'>
                    <div className='itemSearchLabel'>Item Stock :</div>
                    <input ref={item_stock} className='itemSearchBox' placeholder='0' type="number"></input>
                </div>

                <button className='itemSubmitButton' onClick={onSubmit}>Submit</button>
            </div>
        </div>
    )
}
export default Insert;