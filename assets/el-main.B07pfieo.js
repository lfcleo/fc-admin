import{d as n,L as b,u as c,c as p,o as i,a as u,h as _,n as d,f as s,_ as f,a0 as m,j as w,N as h}from"./index.Bw-HXdJa.js";const k=n({name:"ElContainer"}),B=n({...k,props:{direction:{type:String}},setup(o){const t=o,e=b(),a=c("container"),r=p(()=>t.direction==="vertical"?!0:t.direction==="horizontal"?!1:e&&e.default?e.default().some(v=>{const E=v.type.name;return E==="ElHeader"||E==="ElFooter"}):!1);return(l,v)=>(i(),u("section",{class:d([s(a).b(),s(a).is("vertical",s(r))])},[_(l.$slots,"default")],2))}});var C=f(B,[["__file","container.vue"]]);const N=n({name:"ElAside"}),F=n({...N,props:{width:{type:String,default:null}},setup(o){const t=o,e=c("aside"),a=p(()=>t.width?e.cssVarBlock({width:t.width}):{});return(r,l)=>(i(),u("aside",{class:d(s(e).b()),style:m(s(a))},[_(r.$slots,"default")],6))}});var g=f(F,[["__file","aside.vue"]]);const H=n({name:"ElFooter"}),V=n({...H,props:{height:{type:String,default:null}},setup(o){const t=o,e=c("footer"),a=p(()=>t.height?e.cssVarBlock({height:t.height}):{});return(r,l)=>(i(),u("footer",{class:d(s(e).b()),style:m(s(a))},[_(r.$slots,"default")],6))}});var $=f(V,[["__file","footer.vue"]]);const z=n({name:"ElHeader"}),A=n({...z,props:{height:{type:String,default:null}},setup(o){const t=o,e=c("header"),a=p(()=>t.height?e.cssVarBlock({height:t.height}):{});return(r,l)=>(i(),u("header",{class:d(s(e).b()),style:m(s(a))},[_(r.$slots,"default")],6))}});var y=f(A,[["__file","header.vue"]]);const M=n({name:"ElMain"}),x=n({...M,setup(o){const t=c("main");return(e,a)=>(i(),u("main",{class:d(s(t).b())},[_(e.$slots,"default")],2))}});var S=f(x,[["__file","main.vue"]]);const j=w(C,{Aside:g,Footer:$,Header:y,Main:S}),L=h(g),q=h($),D=h(y),G=h(S);export{D as E,G as a,j as b,q as c,L as d};
