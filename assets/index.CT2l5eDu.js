import{f as s}from"./vnode.C9FGNq6A.js";import{al as a,br as u}from"./index.Bw-HXdJa.js";const c=(t,n,d)=>s(t.subTree).filter(e=>{var r;return u(e)&&((r=e.type)==null?void 0:r.name)===n&&!!e.component}).map(e=>e.component.uid).map(e=>d[e]).filter(e=>!!e),f=(t,n)=>{const d={},o=a([]);return{children:o,addChild:r=>{d[r.uid]=r,o.value=c(t,n,d)},removeChild:r=>{delete d[r],o.value=o.value.filter(i=>i.uid!==r)}}};export{f as u};
