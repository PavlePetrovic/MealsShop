import React from 'react'
import ItemAdd from './Item/ItemAdd'
import ItemInfo from './Item/ItemInfo'

import './Item.scss'

const Item = props => {
  return (
    <div className={`item ${props.itemsLength === props.index + 1 ? 'last-item' : 'item-border'}`}>
      <ItemInfo 
        name={props.name} 
        description={props.description} 
        price={props.price} 
      />
      <ItemAdd 
        name={props.name}
        price={props.price}
      />
    </div>
  )
}

export default Item