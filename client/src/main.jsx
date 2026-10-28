import React,{useEffect,useLayoutEffect} from 'react';
import{createRoot}from'react-dom/client';
import routes from './routes.json';
import './site.css';
const pages=import.meta.glob('./pages/*.json',{eager:true,import:'default'});
function Page(){
 const path=location.pathname.replace(/\/$/,'')||'/';
 const key=routes[path]||'home';
 const page=pages[`./pages/${key}.json`];
 useLayoutEffect(()=>{
  document.title=page.title;
  let desc=document.querySelector('meta[name="description"]');if(!desc){desc=document.createElement('meta');desc.name='description';document.head.append(desc)}desc.content=page.description;
  const st=document.createElement('style');st.id='page-styles';st.textContent=page.css;document.head.append(st);
  document.documentElement.classList.add('js');
  return()=>{st.remove();document.documentElement.classList.remove('js')};
 },[page]);
 useEffect(()=>{
  // Run original, page-specific interactive behavior only after React has mounted the HTML.
  const s=document.createElement('script');s.textContent=page.js;document.body.append(s);
  // Existing source pages navigate via regular links; each navigation gets a fresh page lifecycle.
  return()=>s.remove();
 },[page]);
 return <div dangerouslySetInnerHTML={{__html:page.html}}/>;
}
createRoot(document.getElementById('root')).render(<Page/>);
