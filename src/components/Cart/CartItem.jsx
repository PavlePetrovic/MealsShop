import React, { useContext } from 'react'

import './CartItem.scss'
import CartItems from '../../contextStates/cart-items'

const CartItem = ({name, amount, price, itemsLength, index}) => {
  const cartItemsContextData = useContext(CartItems)

  const handleIncrement = () => {
   const itemPrice = price / amount
   cartItemsContextData.onAddItem(name, itemPrice, 1)
  }

  const handleDecrement = () => {
   const itemPrice = price / amount
   cartItemsContextData.onRemoveItem(name, itemPrice)
  }

  const roundedPrice = Math.round((price / amount) * 100) / 100

  return (
   <div 
      className={`cart-item 
        ${itemsLength === index + 1 ? 'cart-item-last' : 'cart-item-regular'}
        ${index === 0 ? 'cart-item-first' : 'cart-item-not-first'}  
      `}
    >
    <div className='cart-item-info'>
      <h3>{name}</h3>
      <p>${roundedPrice} <span className='amount'>x {amount}</span></p>
    </div>
    <div className='cart-item-btns'>
      <button className='cart-item-btn' onClick={handleDecrement}>-</button>
      <button className='cart-item-btn' onClick={handleIncrement} >+</button>
    </div>
   </div>
  )
}

export default CartItem