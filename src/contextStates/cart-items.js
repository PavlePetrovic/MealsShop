import React, { useState } from 'react'

const CartItems = React.createContext({
   items: [],
   onAddItem: () => {},
   onRemoveItem: () => {},
   numberOfItemsInCart: 0,
   totalPrice: 0,
   clearCart: () => {}
})

export const CartItemsProvider = props => {
   const [items, setItems] = useState([])

   const addItemHandler = (name, price, amount) => {
      setItems(prevItems => {
         if (!prevItems.length) {
            return [{
               name: name,
               price: amount > 1 ? price * amount : price,
               amount: amount
            }]
         } else {
            let isNameSame = false
            let itemIndex = null
            for (let i = 0; i < prevItems.length; i++) {
               if (prevItems[i].name === name) {
                  isNameSame = true
                  itemIndex = i
                  break
               }
            }

            if (isNameSame === false) {
               return [{
                  name: name,
                  price: amount > 1 ? price * amount : price,
                  amount: amount
               }, ...prevItems]
            }

            if (isNameSame === true) {
               prevItems[itemIndex].price = amount > 1 ? price * amount + prevItems[itemIndex].price : price + prevItems[itemIndex].price
               prevItems[itemIndex].amount = amount + prevItems[itemIndex].amount
               return [...prevItems]
            }
         }
      })
   }

   const removeItemHandle = (name, price) => {
      setItems(prevItems => {
         let itemIndex = null
         for (let i = 0; i < prevItems.length; i++) {
            if (prevItems[i].name === name) {
               itemIndex = i
               break
            }
         }

         if (prevItems[itemIndex].amount - 1 === 0){
            prevItems.splice(itemIndex, 1)
            return [...prevItems]
         }

         prevItems[itemIndex].price = prevItems[itemIndex].price - price
         prevItems[itemIndex].amount = prevItems[itemIndex].amount - 1
         return [...prevItems]        
      })
   }

   const numberOfItemsInCartHandle = () => {
      let number = 0
      items.forEach(item => {
         number = number + item.amount
      })
      return number
   }

   const totalPriceHandle = () => {
      let total = 0
      items.forEach(item => {
         total = total + item.price
      })
      return total
   }

   const clearCartHandle = () => {
      setItems([])
   }

   return (
      <CartItems.Provider 
         value={{
            items: items, // items: items => items,
            onAddItem: addItemHandler,
            onRemoveItem: removeItemHandle,
            numberOfItemsInCart: numberOfItemsInCartHandle(),
            totalPrice: totalPriceHandle(),
            clearCart: clearCartHandle
         }}>
         {props.children}
      </CartItems.Provider>
   )
}

export default CartItems