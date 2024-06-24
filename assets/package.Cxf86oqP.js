import{g as Q,f as X}from"./vnode.C9FGNq6A.js";import{d as w,C as W,D as V,u as J,G as z,H as k,I as Y,b as P,J as Z,f as n,o as l,a as v,s as b,F as f,m as C,e as I,k as q,_ as L,K as x,L as ee,M as te,c as se,n as _,h as R,l as F,t as K,g as le,j as ne,N as ie}from"./index.Bw-HXdJa.js";import{u as re}from"./use-form-common-props.BgNKS3AW.js";const A=Symbol("elDescriptions");var E=w({name:"ElDescriptionsCell",props:{cell:{type:Object},tag:{type:String,default:"td"},type:{type:String}},setup(){return{descriptions:W(A,{})}},render(){var g,a,t,N,i,c,D;const o=Q(this.cell),e=(((g=this.cell)==null?void 0:g.dirs)||[]).map(G=>{const{dir:H,arg:M,modifiers:O,value:U}=G;return[H,U,M,O]}),{border:d,direction:r}=this.descriptions,s=r==="vertical",h=((N=(t=(a=this.cell)==null?void 0:a.children)==null?void 0:t.label)==null?void 0:N.call(t))||o.label,u=(D=(c=(i=this.cell)==null?void 0:i.children)==null?void 0:c.default)==null?void 0:D.call(c),m=o.span,S=o.align?`is-${o.align}`:"",y=o.labelAlign?`is-${o.labelAlign}`:S,$=o.className,B=o.labelClassName,j={width:V(o.width),minWidth:V(o.minWidth)},p=J("descriptions");switch(this.type){case"label":return z(k(this.tag,{style:j,class:[p.e("cell"),p.e("label"),p.is("bordered-label",d),p.is("vertical-label",s),y,B],colSpan:s?m:1},h),e);case"content":return z(k(this.tag,{style:j,class:[p.e("cell"),p.e("content"),p.is("bordered-content",d),p.is("vertical-content",s),S,$],colSpan:s?m:m*2-1},u),e);default:return z(k("td",{style:j,class:[p.e("cell"),S],colSpan:m},[Y(h)?void 0:k("span",{class:[p.e("label"),B]},h),k("span",{class:[p.e("content"),$]},u)]),e)}}});const oe=P({row:{type:Z(Array),default:()=>[]}}),ae={key:1},ce=w({name:"ElDescriptionsRow"}),pe=w({...ce,props:oe,setup(g){const a=W(A,{});return(t,N)=>n(a).direction==="vertical"?(l(),v(f,{key:0},[b("tr",null,[(l(!0),v(f,null,C(t.row,(i,c)=>(l(),I(n(E),{key:`tr1-${c}`,cell:i,tag:"th",type:"label"},null,8,["cell"]))),128))]),b("tr",null,[(l(!0),v(f,null,C(t.row,(i,c)=>(l(),I(n(E),{key:`tr2-${c}`,cell:i,tag:"td",type:"content"},null,8,["cell"]))),128))])],64)):(l(),v("tr",ae,[(l(!0),v(f,null,C(t.row,(i,c)=>(l(),v(f,{key:`tr3-${c}`},[n(a).border?(l(),v(f,{key:0},[q(n(E),{cell:i,tag:"td",type:"label"},null,8,["cell"]),q(n(E),{cell:i,tag:"td",type:"content"},null,8,["cell"])],64)):(l(),I(n(E),{key:1,cell:i,tag:"td",type:"both"},null,8,["cell"]))],64))),128))]))}});var de=L(pe,[["__file","descriptions-row.vue"]]);const ue=P({border:{type:Boolean,default:!1},column:{type:Number,default:3},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},size:x,title:{type:String,default:""},extra:{type:String,default:""}}),me=w({name:"ElDescriptions"}),ve=w({...me,props:ue,setup(g){const a=g,t=J("descriptions"),N=re(),i=ee();te(A,a);const c=se(()=>[t.b(),t.m(N.value)]),D=(e,d,r,s=!1)=>(e.props||(e.props={}),d>r&&(e.props.span=r),s&&(e.props.span=d),e),o=()=>{if(!i.default)return[];const e=X(i.default()).filter(u=>{var m;return((m=u==null?void 0:u.type)==null?void 0:m.name)==="ElDescriptionsItem"}),d=[];let r=[],s=a.column,h=0;return e.forEach((u,m)=>{var S;const y=((S=u.props)==null?void 0:S.span)||1;if(m<e.length-1&&(h+=y>s?s:y),m===e.length-1){const $=a.column-h%a.column;r.push(D(u,$,s,!0)),d.push(r);return}y<s?(s-=y,r.push(u)):(r.push(D(u,y,s)),d.push(r),s=a.column,r=[])}),d};return(e,d)=>(l(),v("div",{class:_(n(c))},[e.title||e.extra||e.$slots.title||e.$slots.extra?(l(),v("div",{key:0,class:_(n(t).e("header"))},[b("div",{class:_(n(t).e("title"))},[R(e.$slots,"title",{},()=>[F(K(e.title),1)])],2),b("div",{class:_(n(t).e("extra"))},[R(e.$slots,"extra",{},()=>[F(K(e.extra),1)])],2)],2)):le("v-if",!0),b("div",{class:_(n(t).e("body"))},[b("table",{class:_([n(t).e("table"),n(t).is("bordered",e.border)])},[b("tbody",null,[(l(!0),v(f,null,C(o(),(r,s)=>(l(),I(de,{key:s,row:r},null,8,["row"]))),128))])],2)],2)],2))}});var ye=L(ve,[["__file","description.vue"]]);const fe=P({label:{type:String,default:""},span:{type:Number,default:1},width:{type:[String,Number],default:""},minWidth:{type:[String,Number],default:""},align:{type:String,default:"left"},labelAlign:{type:String,default:""},className:{type:String,default:""},labelClassName:{type:String,default:""}}),T=w({name:"ElDescriptionsItem",props:fe}),Ee=ne(ye,{DescriptionsItem:T}),$e=ie(T),be="fc-admin",ge="1.0.0",he="module",Se={dev:"vite --mode development",build:"vue-tsc && vite build --mode production",start:"vite --mode production","build:env":"vue-tsc && vite build --mode development",preview:"vite preview"},_e={"@wangeditor/editor":"^5.1.23","@wangeditor/editor-for-vue":"^5.1.12",axios:"^1.6.8","crypto-js":"^4.2.0","disable-devtool":"^0.3.7",echarts:"^5.5.0","element-plus":"^2.7.5",nprogress:"^0.2.0",pinia:"^2.1.7","pinia-plugin-persistedstate":"^3.2.1","pinyin-pro":"^3.20.3",qrcode:"^1.5.3",qs:"^6.12.1","secure-ls":"^1.2.6",sortablejs:"^1.15.2","unplugin-auto-import":"^0.17.5","unplugin-vue-components":"^0.27.0",vue:"^3.4.27","vue-cropper":"^1.1.3","vue-i18n":"^9.13.1","vue-router":"^4.3.2"},we={"@element-plus/icons-vue":"^2.3.1","@types/crypto-js":"^4.2.2","@types/node":"^20.12.10","@types/nprogress":"^0.2.3","@types/qrcode":"^1.5.5","@types/qs":"^6.9.15","@types/sortablejs":"^1.15.8","@vitejs/plugin-vue":"^5.0.4",sass:"^1.77.0",typescript:"^5.4.5",vite:"^5.2.11","vue-tsc":"^2.0.16"},Ce={name:be,private:!0,version:ge,type:he,scripts:Se,dependencies:_e,devDependencies:we};export{$e as E,Ee as a,Ce as p};
