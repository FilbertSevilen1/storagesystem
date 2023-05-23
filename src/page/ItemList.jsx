import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import '../css/item.css'
import axios from 'axios';
import ItemListRow from './ItemListRow';

const API_URL = process.env.REACT_APP_API_URL

function ItemList(){
    const user = useSelector((state)=>state.user)
    const [searchName, setSearchName] = useState('')
    const [ page, setPage ] = useState(1);
    const [ maxPage, setMaxPage] = useState('');
    const [ items, setItems ] = useState('');



    useEffect(()=>{
        getItemData();
    },[page])

    const getItemData = ()=>{
        let data = {
            item_name : searchName
        }
        axios.post(API_URL + `/items?_page=${page}`,data)
        .then((respond)=>{
            setItems(respond.data.item)
            if(respond.data.total%10===0){
                setMaxPage(Math.floor(respond.data.total/10))
            }
            else setMaxPage(Math.floor(respond.data.total/10)+1)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }

    const generateDataRow = () =>{
        if(items){
            return items.map((item, index) => {
                return <ItemListRow
                    key = {item.item_id}
                    item = {item}
                />
            })
        }
    }
    const prevButton = () =>{
        if(page <= 1) return;
        setPage(page-1);
    }
    const nextButton = () =>{
        if(page >= maxPage) return;
        setPage(page+1);
    }
    const searchEventHandler = (e) =>{
        setSearchName(e.target.value)
        getItemData();
    }
    const resetButton = () =>{
        setSearchName('');
        getItemData();
    }
    return(
        <div className='itemContainer'>
            <div className='itemContainerContent'>
                <h1>Item List</h1>
                <div className='itemSearchBar'>
                    <div className='itemSearchLabel'>Search :</div>
                    <input value={searchName} onChange={searchEventHandler} type='search' className='itemSearchBox' placeholder='ex. Pensil'></input>
                    <button onClick={resetButton} className='itemSearchButton'>Reset</button>
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
                        Stock
                    </div>
                    <div className='itemRowHeader itemLabel'>
                        Action
                    </div>
                </div>
                {generateDataRow()}
                {
                    searchName?
                    <div>
                        
                    </div>
                    :
                    <div className='itemContainerControl'>
                        <button className='itemContainerButton' onClick={prevButton}>
                            {"<"}
                        </button>
                            {page}/{maxPage}
                        <button className='itemContainerButton' onClick={nextButton}>
                            {">"}
                        </button>
                    </div>
                }
                
            </div>
        </div>
    )
}
export default ItemList;