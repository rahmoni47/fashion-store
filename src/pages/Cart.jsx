import {Link} from 'react-router-dom';import {useCart} from '../cart.jsx';import {money} from '../api.js';
export default function Cart(){
  const {items,setQty,remove,subtotal}=useCart();
  if(!items.length)return <section className="sec"><h1 className="h-sm">Your <mark>cart</mark></h1><p className="note">Your cart is empty.</p><Link to="/catalogue" className="btn dark">Browse the catalogue</Link></section>;
  return <section className="sec"><h1 className="h-sm">Your <mark>cart</mark></h1><div className="cart">
    <ul className="lines">{items.map(i=><li key={`${i.productId}${i.size}${i.color}`}><img src={i.img} alt={i.name}/><div><Link to={`/product/${i.productId}`}><b>{i.name}</b></Link><small>{[i.size,i.color].filter(Boolean).join(' / ')}</small><span className="price">{money(i.price)}</span>
      <div className="qty sm"><button aria-label="Decrease" onClick={()=>setQty(i,i.quantity-1)}>−</button><span>{i.quantity}</span><button aria-label="Increase" onClick={()=>setQty(i,i.quantity+1)}>+</button></div></div>
      <button className="lnk" onClick={()=>remove(i)}>Remove</button></li>)}</ul>
    <aside className="sum"><h2>Summary</h2><dl><dt>Products</dt><dd>{money(subtotal)}</dd></dl><p className="small">Delivery fee is added at checkout.</p><Link to="/checkout" className="btn dark big">Checkout</Link></aside></div></section>;
}
