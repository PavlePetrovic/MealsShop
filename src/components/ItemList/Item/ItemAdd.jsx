import React, { useContext, useRef } from 'react'

import CartItems from '../../../contextStates/cart-items'
import './ItemAdd.scss'

const ItemAdd = props => {

  const cartItemsContextData = useContext(CartItems)

  const amountInputRef = useRef()

  const addItemHandler = () => {
    const amountNumber = parseInt(amountInputRef.current.value)
    cartItemsContextData.onAddItem(props.name, props.price, amountNumber)
  }

  return (
    <div className='item-add'>
      <div>
        <label htmlFor="amount">Amount </label>
        <input 
          ref={amountInputRef}
          type="number" 
          defaultValue='1'
          min='1'
          max='100'
          id="amount" 
          className='item-add-input' 
        />
      </div>
      <div>
        <button className='item-add-btn' onClick={addItemHandler}>+ Add</button>
      </div>
    </div>
  )
}

export default ItemAdd