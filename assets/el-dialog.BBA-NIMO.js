import{az as ae,b as H,i as se,d as N,aE as te,C as j,c as D,o as B,a as q,s as O,h as k,n as m,f as e,t as ne,k as M,w as E,e as K,r as re,E as ie,g as _,a0 as Q,_ as W,bo as de,J as Z,bN as ue,aK as ce,y as w,bO as fe,D as ve,T as G,ag as pe,z as ye,Z as me,bP as ge,bp as J,bq as be,L as Ce,be as he,u as Ee,M as ke,G as we,aa as De,b2 as Te,ax as Ie,aS as Be,aT as Fe,j as Se}from"./index.Bw-HXdJa.js";import{u as Ae,a as $e,E as Pe,b as Le}from"./index.DG3RyMHR.js";import{F as Re,E as Oe}from"./focus-trap.BAcfioKZ.js";import{U as X}from"./event.BB_Ol6Sd.js";import{u as Y}from"./index.C_MNJChK.js";import{i as Me}from"./isUndefined.DCTLXrZ8.js";const Ne=(...o)=>a=>{o.forEach(r=>{ae(r)?r(a):r.value=a})},x=Symbol("dialogInjectionKey"),ee=H({center:Boolean,alignCenter:Boolean,closeIcon:{type:se},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),ze={close:()=>!0},Ve=["aria-level"],Ue=["aria-label"],qe=["id"],Ke=N({name:"ElDialogContent"}),_e=N({...Ke,props:ee,emits:ze,setup(o){const a=o,{t:r}=te(),{Close:A}=de,{dialogRef:n,headerRef:c,bodyId:T,ns:t,style:g}=j(x),{focusTrapRef:i}=j(Re),f=D(()=>[t.b(),t.is("fullscreen",a.fullscreen),t.is("draggable",a.draggable),t.is("align-center",a.alignCenter),{[t.m("center")]:a.center}]),v=Ne(i,n),b=D(()=>a.draggable),u=D(()=>a.overflow);return Ae(n,c,b,u),(s,I)=>(B(),q("div",{ref:e(v),class:m(e(f)),style:Q(e(g)),tabindex:"-1"},[O("header",{ref_key:"headerRef",ref:c,class:m([e(t).e("header"),{"show-close":s.showClose}])},[k(s.$slots,"header",{},()=>[O("span",{role:"heading","aria-level":s.ariaLevel,class:m(e(t).e("title"))},ne(s.title),11,Ve)]),s.showClose?(B(),q("button",{key:0,"aria-label":e(r)("el.dialog.close"),class:m(e(t).e("headerbtn")),type:"button",onClick:I[0]||(I[0]=$=>s.$emit("close"))},[M(e(ie),{class:m(e(t).e("close"))},{default:E(()=>[(B(),K(re(s.closeIcon||e(A))))]),_:1},8,["class"])],10,Ue)):_("v-if",!0)],2),O("div",{id:e(T),class:m(e(t).e("body"))},[k(s.$slots,"default")],10,qe),s.$slots.footer?(B(),q("footer",{key:0,class:m(e(t).e("footer"))},[k(s.$slots,"footer")],2)):_("v-if",!0)],6))}});var je=W(_e,[["__file","dialog-content.vue"]]);const Ze=H({...ee,appendToBody:Boolean,appendTo:{type:Z(String),default:"body"},beforeClose:{type:Z(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1},headerAriaLevel:{type:String,default:"2"}}),Ge={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[X]:o=>ue(o),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},Je=(o,a)=>{var r;const n=me().emit,{nextZIndex:c}=ce();let T="";const t=Y(),g=Y(),i=w(!1),f=w(!1),v=w(!1),b=w((r=o.zIndex)!=null?r:c());let u,s;const I=fe("namespace",ge),$=D(()=>{const d={},h=`--${I.value}-dialog`;return o.fullscreen||(o.top&&(d[`${h}-margin-top`]=o.top),o.width&&(d[`${h}-width`]=ve(o.width))),d}),z=D(()=>o.alignCenter?{display:"flex"}:{});function P(){n("opened")}function V(){n("closed"),n(X,!1),o.destroyOnClose&&(v.value=!1)}function U(){n("close")}function L(){s==null||s(),u==null||u(),o.openDelay&&o.openDelay>0?{stop:u}=J(()=>R(),o.openDelay):R()}function F(){u==null||u(),s==null||s(),o.closeDelay&&o.closeDelay>0?{stop:s}=J(()=>l(),o.closeDelay):l()}function S(){function d(h){h||(f.value=!0,i.value=!1)}o.beforeClose?o.beforeClose(d):F()}function p(){o.closeOnClickModal&&S()}function R(){be&&(i.value=!0)}function l(){i.value=!1}function y(){n("openAutoFocus")}function C(){n("closeAutoFocus")}function oe(d){var h;((h=d.detail)==null?void 0:h.focusReason)==="pointer"&&d.preventDefault()}o.lockScroll&&$e(i);function le(){o.closeOnPressEscape&&S()}return G(()=>o.modelValue,d=>{d?(f.value=!1,L(),v.value=!0,b.value=Me(o.zIndex)?c():b.value++,pe(()=>{n("open"),a.value&&(a.value.scrollTop=0)})):i.value&&F()}),G(()=>o.fullscreen,d=>{a.value&&(d?(T=a.value.style.transform,a.value.style.transform=""):a.value.style.transform=T)}),ye(()=>{o.modelValue&&(i.value=!0,v.value=!0,L())}),{afterEnter:P,afterLeave:V,beforeLeave:U,handleClose:S,onModalClick:p,close:F,doClose:l,onOpenAutoFocus:y,onCloseAutoFocus:C,onCloseRequested:le,onFocusoutPrevented:oe,titleId:t,bodyId:g,closed:f,style:$,overlayDialogStyle:z,rendered:v,visible:i,zIndex:b}},Ye=["aria-label","aria-labelledby","aria-describedby"],He=N({name:"ElDialog",inheritAttrs:!1}),Qe=N({...He,props:Ze,emits:Ge,setup(o,{expose:a}){const r=o,A=Ce();he({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},D(()=>!!A.title));const n=Ee("dialog"),c=w(),T=w(),t=w(),{visible:g,titleId:i,bodyId:f,style:v,overlayDialogStyle:b,rendered:u,zIndex:s,afterEnter:I,afterLeave:$,beforeLeave:z,handleClose:P,onModalClick:V,onOpenAutoFocus:U,onCloseAutoFocus:L,onCloseRequested:F,onFocusoutPrevented:S}=Je(r,c);ke(x,{dialogRef:c,headerRef:T,bodyId:f,ns:n,rendered:u,style:v});const p=Le(V),R=D(()=>r.draggable&&!r.fullscreen);return a({visible:g,dialogContentRef:t}),(l,y)=>(B(),K(Fe,{to:l.appendTo,disabled:l.appendTo!=="body"?!1:!l.appendToBody},[M(Be,{name:"dialog-fade",onAfterEnter:e(I),onAfterLeave:e($),onBeforeLeave:e(z),persisted:""},{default:E(()=>[we(M(e(Pe),{"custom-mask-event":"",mask:l.modal,"overlay-class":l.modalClass,"z-index":e(s)},{default:E(()=>[O("div",{role:"dialog","aria-modal":"true","aria-label":l.title||void 0,"aria-labelledby":l.title?void 0:e(i),"aria-describedby":e(f),class:m(`${e(n).namespace.value}-overlay-dialog`),style:Q(e(b)),onClick:y[0]||(y[0]=(...C)=>e(p).onClick&&e(p).onClick(...C)),onMousedown:y[1]||(y[1]=(...C)=>e(p).onMousedown&&e(p).onMousedown(...C)),onMouseup:y[2]||(y[2]=(...C)=>e(p).onMouseup&&e(p).onMouseup(...C))},[M(e(Oe),{loop:"",trapped:e(g),"focus-start-el":"container",onFocusAfterTrapped:e(U),onFocusAfterReleased:e(L),onFocusoutPrevented:e(S),onReleaseRequested:e(F)},{default:E(()=>[e(u)?(B(),K(je,De({key:0,ref_key:"dialogContentRef",ref:t},l.$attrs,{center:l.center,"align-center":l.alignCenter,"close-icon":l.closeIcon,draggable:e(R),overflow:l.overflow,fullscreen:l.fullscreen,"show-close":l.showClose,title:l.title,"aria-level":l.headerAriaLevel,onClose:e(P)}),Te({header:E(()=>[l.$slots.title?k(l.$slots,"title",{key:1}):k(l.$slots,"header",{key:0,close:e(P),titleId:e(i),titleClass:e(n).e("title")})]),default:E(()=>[k(l.$slots,"default")]),_:2},[l.$slots.footer?{name:"footer",fn:E(()=>[k(l.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):_("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,Ye)]),_:3},8,["mask","overlay-class","z-index"]),[[Ie,e(g)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["to","disabled"]))}});var We=W(Qe,[["__file","dialog.vue"]]);const so=Se(We);export{so as E,Ge as a,Ne as c,Ze as d,Je as u};