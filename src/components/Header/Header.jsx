import React from 'react'
import Cart from '../Cart/Cart'

import coverImage from '../../images/meals.jpg'
import './Header.scss'

const Header = () => {
  return (
    <>
    <header>
      <div className='header-wrapper'>
        <h1 className='header-h1'>ReactMeals</h1>
        <Cart />
      </div>
    </header>
    <div className='cover-image'>
      <img src={coverImage} alt="cover-image"/>
    </div>
    <section className='landing-text-wrapper'>
      <div className='landing-text'>
        <h1>Delicious Food, Delivered To You</h1>
        <p>Choose your favorite meal from our broad selection of available melas and enjoy a delicious lunch or dinner at home.</p>
        <p className='hide'>All our meals are cooked with high-quality ingredientsm just-in-time and of course by experienced chefs!</p>
      </div>
    </section>
    </>
  )
}

export default Header