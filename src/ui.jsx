import {Link} from 'react-router-dom';
import {money} from './api.js';
export const Status=({s,empty,children})=>s.loading?<p className="note" role="status">Loading…</p>:s.error?<p className="note err" role="alert">{s.error.message}</p>:empty?<p className="note">{empty}</p>:children;
export function ProductCard({p,tone=''}){
  return <Link to={`/product/${p.id}`} className={`card ${tone}`}>
    <div className="card-img">{p.mainImg?<img src={p.mainImg} alt={p.name} loading="lazy"/>:null}{p.available===false&&<span className="tag">Sold out</span>}</div>
    <div className="card-info"><h3>{p.name}</h3><span className="price">{money(p.price)}</span></div>
    <span className="explore">Explore now <i aria-hidden>↗</i></span>
  </Link>;
}
