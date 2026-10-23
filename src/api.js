const BASE=(import.meta.env.VITE_API_BASE_URL||'').replace(/\/$/,'');
async function req(path,opts){
  let r;try{r=await fetch(BASE+path,opts)}catch{throw new Error('Cannot reach the server. Check your connection and try again.')}
  if(!r.ok){let m='';try{const j=await r.json();m=j.message||j.error||''}catch{}throw new Error(m||`Request failed (${r.status})`)}
  const t=await r.text();return t?JSON.parse(t):null;
}
export const api={
  products:(page=0,size=12)=>req(`/api/v1/products?page=${page}&size=${size}`),
  product:id=>req(`/api/v1/products/${id}`),
  categories:()=>req('/api/v1/categories/all'),
  category:id=>req(`/api/v1/categories/${id}`),
  states:()=>req('/api/v1/states/available'),
  createOrder:body=>req('/api/v1/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),
};
export const money=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n??0)+' DZD';
