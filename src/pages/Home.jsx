import {Link} from 'react-router-dom';
import {api} from '../api.js';import {useAsync} from '../hooks.js';import {ProductCard,Status} from '../ui.jsx';
const tones=['t-gray','t-lav','t-cyan'];
export default function Home(){
  const prods=useAsync(()=>api.products(0,6),[]);const cats=useAsync(()=>api.categories(),[]);
  const list=prods.data?.content||[];const hero=list.find(p=>p.mainImg);
  return <>
    <section className="hero"><div className="hero-txt"><h1>Be <mark>unique</mark>.<br/>Wear it loud.</h1><p>New pieces drop straight from our catalogue. Pick your fit and make it yours.</p><Link to="/catalogue" className="btn dark big">Shop now</Link></div>
      <div className="hero-img">{hero&&<Link to={`/product/${hero.id}`}><img src={hero.mainImg} alt={hero.name}/><span className="hero-tag">{hero.name}</span></Link>}</div></section>
    <div className="strip" aria-hidden><div>{Array(8).fill('NEW DROPS • STREET STYLE • WEAR IT LOUD • ').join('')}</div></div>
    <section className="sec"><h2>New <mark>arrivals</mark></h2>
      <Status s={prods} empty={list.length?null:'No products yet. Check back soon.'}><div className="grid3">{list.slice(0,3).map((p,i)=><ProductCard key={p.id} p={p} tone={tones[i]}/>)}</div></Status></section>
    {cats.data?.length>0&&<section className="sec"><h2>Shop by category</h2><div className="cats">{cats.data.map((c,i)=><Link key={c.id} to={`/catalogue?category=${c.id}`} className={`cat ${tones[i%3]}`}>{c.img&&<img src={c.img} alt="" loading="lazy"/>}<b>{c.name}</b><small>{c.description}</small></Link>)}</div></section>}
    {list.length>3&&<section className="sec"><h2>More to wear</h2><div className="grid4">{list.slice(3).map(p=><ProductCard key={p.id} p={p}/>)}</div></section>}
    <section className="banner"><h2>Your next fit is one click away.</h2><Link to="/catalogue" className="btn dark big">Enter the catalogue</Link></section>
  </>;
}
