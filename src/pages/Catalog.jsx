import {useSearchParams} from 'react-router-dom';
import {api} from '../api.js';import {useAsync} from '../hooks.js';import {ProductCard,Status} from '../ui.jsx';
export default function Catalog(){
  const [sp,setSp]=useSearchParams();const cat=sp.get('category');const page=+(sp.get('page')||0);
  const cats=useAsync(()=>api.categories(),[]);
  const res=useAsync(()=>cat?api.category(cat).then(c=>({content:c.products||[]})):api.products(page,12),[cat,page]);
  const list=res.data?.content||[];const tp=res.data?.page?.totalPages||1;
  const set=o=>{const n=new URLSearchParams(sp);Object.entries(o).forEach(([k,v])=>v==null?n.delete(k):n.set(k,v));setSp(n)};
  return <section className="sec"><h1 className="h-sm">Cata<mark>logue</mark></h1>
    <div className="chips" role="group" aria-label="Filter by category"><button aria-pressed={!cat} className={!cat?'on':''} onClick={()=>set({category:null,page:null})}>All</button>
      {cats.data?.map(c=><button key={c.id} aria-pressed={cat===c.id} className={cat===c.id?'on':''} onClick={()=>set({category:c.id,page:null})}>{c.name}</button>)}</div>
    <Status s={res} empty={list.length?null:'Nothing here yet. Try another category.'}><div className="grid4">{list.map(p=><ProductCard key={p.id} p={p}/>)}</div>
      {!cat&&tp>1&&<div className="pager"><button className="btn" disabled={page<=0} onClick={()=>set({page:page-1})}>Previous</button><span>Page {page+1} of {tp}</span><button className="btn" disabled={page+1>=tp} onClick={()=>set({page:page+1})}>Next</button></div>}</Status></section>;
}
