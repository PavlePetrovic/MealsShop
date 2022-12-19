import React, { useState, useContext } from 'react'

import './Cart.scss'
import { FaShoppingCart } from 'react-icons/fa'
import CartItems from '../../contextStates/cart-items'
import CartItem from './CartItem'
import Form from '../Form/Form'

const Cart = () => {
  const cartItemsContextData = useContext(CartItems)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  
  if (cartItemsContextData.items.length === 0 && isCartOpen){
    setIsCartOpen(false)
  }

  const cartOpenHandle = () => {
    setIsCartOpen(!isCartOpen)
  }

  const cartCloseHandle = (e) => {
    if (e.target.className === 'cart-opened') {
      setIsCartOpen(false)
    }
  }

  const items = cartItemsContextData.items.map((item, index) => {
    return (
      <CartItem 
        key={item.name} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        itemsLength={cartItemsContextData.items.length}
        index={index}
      />
    )
  })

  const roundedTotalPrice = Math.round(cartItemsContextData.totalPrice * 100) / 100

  const orderHandle = () => {
    setIsOrdered(true)
  }

  const backToCartHandle = () => {
    setIsOrdered(false)
  }

  const setIsCartOpenHandler = () => {
    setIsCartOpen(false)
  }

  return (
    <>
      <button className='cart-btn' onClick={cartOpenHandle}> <FaShoppingCart className='cart-btn-ico'/> Your Cart <span className={`cart-btn-amount ${cartItemsContextData.numberOfItemsInCart === 0 ? 'cart-btn-amount-empty' : 'cart-btn-amount-full'}`}>{cartItemsContextData.numberOfItemsInCart}</span></button>
      {isCartOpen && (
        <div className='cart-opened' onClick={cartCloseHandle}>
          {!isOrdered ? (
            <div className='cart'>
              {items}
              <div className='cart-total'>
                <h2>Total amount</h2>
                <p>${roundedTotalPrice}</p>
              </div>
              <div className='cart-btns'>
                <button onClick={cartOpenHandle}>Close</button>
                <button onClick={orderHandle}>Order</button>
              </div>
            </div>
          ) : (
            <div className="cart">
              <Form 
                backToCart={backToCartHandle} 
                orderedItems={cartItemsContextData.items} 
                totalPrice={roundedTotalPrice}
                closeCart={setIsCartOpenHandler}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Cart