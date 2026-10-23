import {useState} from 'react';
import {Link,NavLink,Routes,Route} from 'react-router-dom';
import {useCart} from './cart.jsx';
import Home from './pages/Home.jsx';import Catalog from './pages/Catalog.jsx';import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';import Checkout from './pages/Checkout.jsx';
export default function App(){
  const {count}=useCart();const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  return <>
    <header className="hdr"><Link to="/" className="logo" onClick={close}><svg width="26" height="26" viewBox="0 0 26 26" aria-hidden><rect width="26" height="26" rx="8" fill="#F8D448"/><path d="M7 19V7h12M7 13h8" stroke="#000" strokeWidth="3" fill="none"/></svg>FASHION</Link>
      <nav className={`nav ${open?'open':''}`} aria-label="Main"><NavLink to="/" end onClick={close}>Home</NavLink><NavLink to="/catalogue" onClick={close}>Catalogue</NavLink></nav>
      <div className="acts"><Link to="/catalogue" className="btn dark hide-s">Shop now</Link>
        <Link to="/cart" className="cartb" aria-label={`Cart, ${count} items`}>Cart<b>{count}</b></Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/></button></div></header>
    <main><Routes><Route path="/" element={<Home/>}/><Route path="/catalogue" element={<Catalog/>}/><Route path="/product/:id" element={<Product/>}/>
      <Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="*" element={<p className="note">Page not found.</p>}/></Routes></main>
    <footer className="ftr"><div className="logo">FASHION</div><p>Street style for people who dress first and explain later.</p><Link to="/catalogue">Browse the catalogue</Link></footer>
  </>;
}
