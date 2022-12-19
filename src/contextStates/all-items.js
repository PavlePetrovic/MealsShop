import React, { useEffect, useState } from 'react'

const AllItems = React.createContext([])

export const AllItemsProvider = props => {
   const [items, setItems] = useState([])

   const getMeals = async () => {
    let res = await fetch('https://react-http-a3704-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
    let data = await res.json()
  
    const allMealsArray = data.map(meal => {
      return {
        name: meal.name,
        description: meal.description,
        price: +meal.price
      }
    })
  
    setItems(allMealsArray)
   } 

   useEffect(() => {
    getMeals()
   }, [])

   return (
      <AllItems.Provider 
         value={items}>
         {props.children}
      </AllItems.Provider>
   )
}

export default AllItems