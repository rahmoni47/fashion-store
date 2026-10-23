import {useState} from 'react';import {Link} from 'react-router-dom';
import {api,money} from '../api.js';import {useAsync} from '../hooks.js';import {useCart} from '../cart.jsx';import {Status} from '../ui.jsx';
const F=[['customerFirstName','First name',50],['customerLastName','Last name',50],['customerPhone','Phone number'],['shippingAddress','Shipping address']];
export default function Checkout(){
  const {items,subtotal,clear}=useCart();const st=useAsync(()=>api.states(),[]);
  const [f,setF]=useState({});const [state,setState]=useState('');const [errs,setErrs]=useState({});const [busy,setBusy]=useState(false);const [fail,setFail]=useState('');const [done,setDone]=useState(null);
  if(done)return <section className="sec"><h1 className="h-sm">Order <mark>placed</mark></h1><p className="note ok" role="status">Thank you, {done.customerFirstName}. Order total: {money(done.totalPrice)} (products {money(done.productsPrice)} + delivery {money(done.deliveryPrice)}).</p><Link className="btn dark" to="/catalogue">Keep shopping</Link></section>;
  if(!items.length)return <section className="sec"><h1 className="h-sm">Check<mark>out</mark></h1><p className="note">Your cart is empty.</p><Link className="btn dark" to="/catalogue">Browse the catalogue</Link></section>;
  const sel=st.data?.find(s=>String(s.id)===state);const fee=sel?.deliveryToHome??0;const total=subtotal+fee;
  const submit=async e=>{e.preventDefault();const er={};
    F.forEach(([k,l,max])=>{const v=(f[k]||'').trim();if(!v)er[k]=`${l} is required`;else if(max&&v.length>max)er[k]=`${l} must be ${max} characters or fewer`});
    if(!state)er.state='Choose a state';setErrs(er);setFail('');if(Object.keys(er).length)return;
    setBusy(true);
    try{const o=await api.createOrder({customerFirstName:f.customerFirstName.trim(),customerLastName:f.customerLastName.trim(),customerPhone:f.customerPhone.trim(),shippingAddress:f.shippingAddress.trim(),state:+state,
      orderItems:items.map(i=>({productId:i.productId,color:i.color||undefined,size:i.size||undefined,quantity:i.quantity,price:i.price}))});clear();setDone(o)}
    catch(x){setFail(x.message)}finally{setBusy(false)}};
  return <section className="sec"><h1 className="h-sm">Check<mark>out</mark></h1><form className="cart" onSubmit={submit} noValidate>
    <div className="form">{F.map(([k,l,max])=><label key={k}>{l}<input value={f[k]||''} maxLength={max} onChange={e=>setF({...f,[k]:e.target.value})} aria-invalid={!!errs[k]} autoComplete={k==='customerPhone'?'tel':undefined} inputMode={k==='customerPhone'?'tel':undefined}/>{errs[k]&&<span className="err">{errs[k]}</span>}</label>)}
      <label>State<Status s={st} empty={st.data?.length===0?'No delivery states are available right now.':null}><select value={state} onChange={e=>setState(e.target.value)} aria-invalid={!!errs.state}><option value="">Select a state</option>{st.data?.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></Status>{errs.state&&<span className="err">{errs.state}</span>}</label></div>
    <aside className="sum"><h2>Summary</h2><dl><dt>Products</dt><dd>{money(subtotal)}</dd><dt>Delivery</dt><dd>{sel?money(fee):'Choose a state'}</dd><dt className="tot">Total</dt><dd className="tot">{money(total)}</dd></dl>
      {fail&&<p className="note err" role="alert">{fail}</p>}<button className="btn dark big" disabled={busy||st.loading}>{busy?'Placing order…':'Place order'}</button></aside></form></section>;
}
