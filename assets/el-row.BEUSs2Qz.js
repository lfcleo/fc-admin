import{r as c}from"./el-col.DlOUmWKu.js";import{b as p,d as r,u as f,c as a,M as g,o as m,e as d,w as y,h as w,n as _,f as o,a0 as v,r as b,_ as R,j as h}from"./index.Bw-HXdJa.js";const j=["start","center","end","space-around","space-between","space-evenly"],C=["top","middle","bottom"],S=p({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:j,default:"start"},align:{type:String,values:C}}),x=r({name:"ElRow"}),$=r({...x,props:S,setup(n){const t=n,e=f("row"),l=a(()=>t.gutter);g(c,{gutter:l});const i=a(()=>{const s={};return t.gutter&&(s.marginRight=s.marginLeft=`-${t.gutter/2}px`),s}),u=a(()=>[e.b(),e.is(`justify-${t.justify}`,t.justify!=="start"),e.is(`align-${t.align}`,!!t.align)]);return(s,k)=>(m(),d(b(s.tag),{class:_(o(u)),style:v(o(i))},{default:y(()=>[w(s.$slots,"default")]),_:3},8,["class","style"]))}});var E=R($,[["__file","row.vue"]]);const K=h(E);export{K as E};