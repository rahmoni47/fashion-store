import {useEffect,useState} from 'react';
export function useAsync(fn,deps){
  const [s,set]=useState({loading:true});
  useEffect(()=>{let ok=true;set({loading:true});fn().then(data=>ok&&set({data}),error=>ok&&set({error}));return()=>{ok=false}},deps);// eslint-disable-line
  return s;
}
