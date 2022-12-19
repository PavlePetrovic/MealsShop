import React, { useContext } from 'react'

import Item from './Item'
import './ItemList.scss'
import AllItems from '../../contextStates/all-items'

const ItemList = () => {

  const allItemsContextData = useContext(AllItems)

  const items = allItemsContextData.map((item, index) => {
    return (
      <Item 
        key={item.name} 
        name={item.name}
        description={item.description}
        price={item.price}
        itemsLength={allItemsContextData.length}
        index={index}
      />
    )
  })

  return (
    <section className='item-list'>
      {allItemsContextData.length === 0 && <p className='item-list-loader'>Loading...</p>}
      {allItemsContextData.length > 0 && items}
    </section>
  )
}

export default ItemList