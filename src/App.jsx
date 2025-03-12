import './index.css';
import Nav from './components/Nav.jsx'
import React, {useState, useEffect} from 'react';

import Footer from "./components/Footer.jsx";
import Home from './pages/Home';
import Books from './pages/Books';
import BookInfo from './pages/BookInfo';
import Cart from './pages/Cart';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {books} from './data'

function App() {

  const [cart, setCart] = useState([]);

  //const [cartTotal, setCartTotal] = useState([]);

  // function addItemToCart(book) {
  //   const dupeItem = cart.find(item => +item.id === +book.id);

  //   if(dupeItem) {
  //     setCart(cart.map(item => {
  //       if(item.id === dupeItem.id) {
  //         return {
  //           ...item,
  //           quantity: item.quantity +1
  //         }
  //       }
  //       else {
  //         return item
  //       }
  //     }))
  //   }
  //   else {
  //     setCart([...cart, {...book, quanity: 1}])
  //   }
    
    
  // }

  function addItemToCart(book) {
    setCart([...cart, {...book, quantity: 1}])
  }

  function removeFromCart(book) {
    setCart(cart.filter(item => item !== book));
  }

  function numberInCart() {
    // let counter = 0;
    // cart.forEeach((item) => {
    //   counter += item.quantity
    // });
    // return counter;
    let counter = 0;
    if(cart.length > 0) {
      for(let i = 0; i<cart.length; i++) {
        counter += cart[i].quantity
      }
    }
    return counter;
  }

  // function changeQuantity(book, quantity) {
  //   setCart(cart.map(item => {
  //     if(+item.id === +book.id) {
  //       return {
  //         ...item,
  //         quantity: +quantity
  //       }
  //     }
  //     else {
  //       return item
  //     }
  //   }))
  // }

  //ternary version of above function
  function changeQuantity(book, quantity) {
    setCart(cart.map(item => 
      +item.id === book.id 
      ? {
        ...item,
        quantity: +quantity
      }
      : item
    ))
  }

  useEffect(() => {
    console.log(cart);
  }, [cart])

  return (
    <Router>
    <div className="App"> 
    <Nav numberInCart={numberInCart}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/books" element={<Books books={books}/>}/>
        <Route path="/books/:id" element={<BookInfo books={books} addItemToCart={addItemToCart} cart={cart}/>}/>
        <Route path="/cart" element={<Cart books={books} cart={cart} changeQuantity={changeQuantity} removeFromCart={removeFromCart}/>}/>
      </Routes>
       
       <Footer />
    </div>
    </Router>
  );
}

export default App;
