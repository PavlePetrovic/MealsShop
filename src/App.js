import React from "react";

import './App.scss'
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import { AllItemsProvider } from "./contextStates/all-items";
import { CartItemsProvider } from "./contextStates/cart-items";

function App() {

  return (
    <div className="App">
      <CartItemsProvider>
        <Header />
        <AllItemsProvider>
          <ItemList/>
        </AllItemsProvider>
      </CartItemsProvider>
    </div>
  );
}

export default App;
