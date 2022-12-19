import React from 'react'

import './ItemInfo.scss'

const ItemInfo = props => {
  return (
    <div className='item-info'>
      <p className='item-info-name'>{props.name}</p>
      <p className='item-info-description'>{props.description}</p>
      <p className='item-info-price'>${props.price}</p>
    </div>
  )
}

export default ItemInfo