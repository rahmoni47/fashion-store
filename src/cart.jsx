import {createContext,useContext,useEffect,useState,useCallback} from 'react';
const Ctx=createContext();
const key=i=>`${i.productId}|${i.size||''}|${i.color||''}`;
export function CartProvider({children}){
  const [items,setItems]=useState(()=>{try{return JSON.parse(localStorage.getItem('cart'))||[]}catch{return []}});
  useEffect(()=>{try{localStorage.setItem('cart',JSON.stringify(items))}catch{}},[items]);
  const add=useCallback((it)=>setItems(p=>{const k=key(it),f=p.find(x=>key(x)===k);return f?p.map(x=>key(x)===k?{...x,quantity:x.quantity+it.quantity}:x):[...p,it]}),[]);
  const setQty=useCallback((it,q)=>setItems(p=>p.map(x=>key(x)===key(it)?{...x,quantity:Math.max(1,q)}:x)),[]);
  const remove=useCallback(it=>setItems(p=>p.filter(x=>key(x)!==key(it))),[]);
  const clear=useCallback(()=>setItems([]),[]);
  const subtotal=items.reduce((s,i)=>s+i.price*i.quantity,0);
  const count=items.reduce((s,i)=>s+i.quantity,0);
  return <Ctx.Provider value={{items,add,setQty,remove,clear,subtotal,count}}>{children}</Ctx.Provider>;
}
export const useCart=()=>useContext(Ctx);
