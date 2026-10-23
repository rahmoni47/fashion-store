import {useState} from 'react';import {useParams,useNavigate} from 'react-router-dom';
import {api,money} from '../api.js';import {useAsync} from '../hooks.js';import {Status} from '../ui.jsx';import {useCart} from '../cart.jsx';
export default function Product(){
  const {id}=useParams();const s=useAsync(()=>api.product(id),[id]);
  return <section className="sec"><Status s={s}>{s.data&&<Detail p={s.data} key={s.data.id}/>}</Status></section>;
}
function Detail({p}){
  const {add}=useCart();const nav=useNavigate();
  const [size,setSize]=useState(p.sizes?.[0]||'');const [color,setColor]=useState(p.colors?.[0]||'');const [q,setQ]=useState(1);
  const [img,setImg]=useState(p.mainImg);const [added,setAdded]=useState(false);
  const imgs=[p.mainImg,...(p.extraImgs||[])].filter(Boolean);
  const go=()=>{add({productId:p.id,name:p.name,img:p.mainImg,price:p.price,size,color,quantity:q});setAdded(true)};
  return <div className="pd"><div className="pd-gal"><div className="pd-main">{img&&<img src={img} alt={p.name}/>}</div>
      {imgs.length>1&&<div className="thumbs">{imgs.map(u=><button key={u} onClick={()=>setImg(u)} aria-label="Show image" className={u===img?'on':''}><img src={u} alt=""/></button>)}</div>}</div>
    <div className="pd-info"><p className="crumb">{p.category}</p><h1>{p.name}</h1><p className="price big">{money(p.price)}</p>
      {p.description&&<p className="desc">{p.description}</p>}
      {p.sizes?.length>0&&<fieldset><legend>Size</legend>{p.sizes.map(x=><button key={x} className={`opt ${x===size?'on':''}`} aria-pressed={x===size} onClick={()=>setSize(x)}>{x}</button>)}</fieldset>}
      {p.colors?.length>0&&<fieldset><legend>Color</legend>{p.colors.map(x=><button key={x} className={`opt ${x===color?'on':''}`} aria-pressed={x===color} onClick={()=>setColor(x)}>{x}</button>)}</fieldset>}
      <div className="qty"><button aria-label="Decrease" onClick={()=>setQ(Math.max(1,q-1))}>−</button><span aria-live="polite">{q}</span><button aria-label="Increase" onClick={()=>setQ(q+1)}>+</button></div>
      {p.available===false?<p className="note err">This product is currently unavailable.</p>:<button className="btn dark big" onClick={go}>Add to cart</button>}
      {added&&<p className="note ok" role="status">Added to cart. <button className="lnk" onClick={()=>nav('/cart')}>View cart</button></p>}</div></div>;
}
