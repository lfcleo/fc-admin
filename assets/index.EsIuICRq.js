import{d as x,c as f,o as a,a as V,e as n,w as c,k as l,g as r,s as u,t as d,n as v,ai as y,E as k,aj as N,ak as g,v as h}from"./index.Bw-HXdJa.js";const B={class:"fc-trend-prefix"},C={class:"fc-trend-value"},P={class:"fc-trend-suffix"},b=x({__name:"index",props:{modelValue:{type:Number,default:0},prefix:{type:String,default:""},suffix:{type:String,default:""},reverse:{type:Boolean,default:!1}},setup(t){const e=t,o=f(()=>{if(e.modelValue==0)return"Z";if(e.modelValue<0)return"N";if(e.modelValue>0)return"P"}),i=f(()=>{if(e.modelValue==0)return"Z";if(e.modelValue<0)return e.reverse?"P":"N";if(e.modelValue>0)return e.reverse?"N":"P"});return(E,S)=>{const _=y,s=k,m=N,p=g;return a(),V("span",{class:v(["fc-trend","fc-trend--"+i.value])},[o.value=="P"?(a(),n(s,{key:0,class:"fc-trend-icon"},{default:c(()=>[l(_)]),_:1})):r("",!0),o.value=="N"?(a(),n(s,{key:1,class:"fc-trend-icon"},{default:c(()=>[l(m)]),_:1})):r("",!0),o.value=="Z"?(a(),n(s,{key:2,class:"fc-trend-icon"},{default:c(()=>[l(p)]),_:1})):r("",!0),u("em",B,d(t.prefix),1),u("em",C,d(t.modelValue),1),u("em",P,d(t.suffix),1)],2)}}}),w=h(b,[["__scopeId","data-v-4295627c"]]);export{w as _};
