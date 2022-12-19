import React, { useContext, useState } from 'react'

import './Form.scss'
import useInput from '../../hooks/use-input'
import CartItems from '../../contextStates/cart-items'

const Form = ({backToCart, orderedItems, totalPrice, closeCart}) => {
   const cartItemsContextData = useContext(CartItems)
   const [isLoading, setIsLoading] = useState(false)

   const {
      value: firstNameValue,
      isValid: firstNameIsValid,
      isInvalid: firstNameIsInvalid,
      setValueHandler: firstNameSetValue,
      setBlurHandler: firstNameSetBlur,
      reset: firstNameReset
   } = useInput(value => value.trim() !== '')

   const {
      value: lastNameValue,
      isValid: lastNameIsValid,
      isInvalid: lastNameIsInvalid,
      setValueHandler: lastNameSetValue,
      setBlurHandler: lastNameSetBlur,
      reset: lastNameReset
   } = useInput(value => value.trim() !== '')

   const {
      value: phoneValue,
      isValid: phoneIsValid,
      isInvalid: phoneIsInvalid,
      setValueHandler: phoneSetValue,
      setBlurHandler: phoneSetBlur,
      reset: phoneReset
   } = useInput(value => +value.trim() > 0)

   const {
      value: emailValue,
      isValid: emailIsValid,
      isInvalid: emailIsInvalid,
      setValueHandler: emailSetValue,
      setBlurHandler: emailSetBlur,
      reset: emailReset
   } = useInput(value => value.trim().includes('@')) 

   const addOrdedHandler = async (order) => {
      await fetch('https://react-http-a3704-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json'
        }
      })
   }

   let isFormValid = false

   if (firstNameIsValid && lastNameIsValid && emailIsValid && phoneIsValid) {
      isFormValid = true
   }
   
   const formSubmitHandler = (e) => {
      e.preventDefault()
      setIsLoading(true)

      if (!isFormValid) {
         return
      }

      const order = {
         firstName: firstNameValue,
         lastName: lastNameValue,
         phone: phoneValue,
         email: emailValue,
         totalPrice: totalPrice,
         orderDetails: orderedItems
      }

      addOrdedHandler(order)

      firstNameReset()
      lastNameReset()
      phoneReset()
      emailReset()
      
      cartItemsContextData.clearCart()

      backToCart()
      closeCart()

      setIsLoading(false)
   }

   const firstNameClasses = firstNameIsInvalid ? 'invalid' : ''
   const lastNameClasses = lastNameIsInvalid ? 'invalid' : ''
   const phoneClasses = phoneIsInvalid ? 'invalid' : ''
   const emailClasses = emailIsInvalid ? 'invalid' : ''

  return (
    <>
      <button className='cart-back-btn' onClick={backToCart}>
         {`Go Back`}
      </button>
      <form onSubmit={formSubmitHandler}>
         <div className='cart-form-name'>
            <div className="cart-form-name-box">
               <label htmlFor="first-name">First Name</label>
               <input 
                  type="text" 
                  id='first-name' 
                  className={firstNameClasses}
                  onChange={firstNameSetValue}
                  onBlur={firstNameSetBlur}
                  value={firstNameValue}
               />
            </div>
            <div className="cart-form-name-box">
               <label htmlFor="last-name">Last Name</label>
               <input 
                  type="text" 
                  id='last-name'
                  className={lastNameClasses}
                  onChange={lastNameSetValue}
                  onBlur={lastNameSetBlur}
                  value={lastNameValue}
               />
            </div>
         </div>
         <label htmlFor="tel">Phone</label>
         <input 
            type="text"
            id='tel' 
            className={phoneClasses}
            onChange={phoneSetValue}
            onBlur={phoneSetBlur}
            value={phoneValue}
         />
         <label htmlFor="email">Email</label>
         <input 
            type="email"
            id='email'
            className={emailClasses}
            onChange={emailSetValue}
            onBlur={emailSetBlur}
            value={emailValue}
         />
         <button className='form-submit-btn' disabled={!isFormValid}>
            {isLoading && 'Ordering...'}
            {!isLoading && 'Finish Order'}
         </button>
      </form>
    </>
  )
}

export default Form