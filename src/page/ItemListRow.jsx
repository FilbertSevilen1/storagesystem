import React from 'react'

function ItemListRow(props) {
    const item = props.item
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
            <button className='itemButton itemButtonGreen'>Borrow</button>
            <button className='itemButton itemButtonBlue'>Detail</button>
        </div>
    </div>
  )
}

export default ItemListRow