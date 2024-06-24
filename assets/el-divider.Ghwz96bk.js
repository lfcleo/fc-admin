import{b as Z,J as D,d as B,u as x,c as h,o as N,a as V,n as W,f as b,h as R,g as X,a0 as fe,_ as A,j as me,y,M as U,C,z as De,$ as ve,bB as Pe,a9 as j,T as ge,aC as Be,A as I,e as J,w,k as F,ab as Le,bC as Ae,aD as $,ag as Me,i as Ge,E as be,bh as ze,aE as Ye,D as Ve,b2 as Ue,aa as q,Z as we,s as Je,r as He,ay as oe,F as je,N as Ie,bw as Ee,bD as We}from"./index.Bw-HXdJa.js";import{E as _e}from"./index.GJMPp4rU.js";import{c as P,u as qe,a as de,E as Ze,O as Qe,w as ue}from"./el-popper.BrmkM6_b.js";import{E as Xe}from"./el-scrollbar.BL44KAAM.js";import{u as ye}from"./index.C_MNJChK.js";import{u as xe}from"./use-form-common-props.BgNKS3AW.js";import{c as eo}from"./castArray.BRNpEoYs.js";import{c as he}from"./el-dialog.BBA-NIMO.js";import{F as oo}from"./focus-trap.BAcfioKZ.js";const no=Z({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:D(String),default:"solid"}}),to=B({name:"ElDivider"}),lo=B({...to,props:no,setup(e){const o=e,l=x("divider"),n=h(()=>l.cssVar({"border-style":o.borderStyle}));return(s,d)=>(N(),V("div",{class:W([b(l).b(),b(l).m(s.direction)]),style:fe(b(n)),role:"separator"},[s.$slots.default&&s.direction!=="vertical"?(N(),V("div",{key:0,class:W([b(l).e("text"),b(l).is(s.contentPosition)])},[R(s.$slots,"default")],2)):X("v-if",!0)],6))}});var ro=A(lo,[["__file","divider.vue"]]);const un=me(ro),so=B({inheritAttrs:!1});function io(e,o,l,n,s,d){return R(e.$slots,"default")}var ao=A(so,[["render",io],["__file","collection.vue"]]);const uo=B({name:"ElCollectionItem",inheritAttrs:!1});function co(e,o,l,n,s,d){return R(e.$slots,"default")}var po=A(uo,[["render",co],["__file","collection-item.vue"]]);const Ce="data-el-collection-item",Te=e=>{const o=`El${e}Collection`,l=`${o}Item`,n=Symbol(o),s=Symbol(l),d={...ao,name:o,setup(){const r=y(null),p=new Map;U(n,{itemMap:p,getItems:()=>{const m=b(r);if(!m)return[];const f=Array.from(m.querySelectorAll(`[${Ce}]`));return[...p.values()].sort((t,c)=>f.indexOf(t.ref)-f.indexOf(c.ref))},collectionRef:r})}},i={...po,name:l,setup(r,{attrs:p}){const v=y(null),m=C(n,void 0);U(s,{collectionItemRef:v}),De(()=>{const f=b(v);f&&m.itemMap.set(f,{ref:f,...p})}),ve(()=>{const f=b(v);m.itemMap.delete(f)})}};return{COLLECTION_INJECTION_KEY:n,COLLECTION_ITEM_INJECTION_KEY:s,ElCollection:d,ElCollectionItem:i}},fo=Z({style:{type:D([String,Array,Object])},currentTabId:{type:D(String)},defaultCurrentTabId:String,loop:Boolean,dir:{type:String,values:["ltr","rtl"],default:"ltr"},orientation:{type:D(String)},onBlur:Function,onFocus:Function,onMousedown:Function}),{ElCollection:mo,ElCollectionItem:vo,COLLECTION_INJECTION_KEY:ne,COLLECTION_ITEM_INJECTION_KEY:go}=Te("RovingFocusGroup"),te=Symbol("elRovingFocusGroup"),$e=Symbol("elRovingFocusGroupItem"),bo={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"},wo=(e,o)=>e,Io=(e,o,l)=>{const n=wo(e.key);return bo[n]},Eo=(e,o)=>e.map((l,n)=>e[(n+o)%e.length]),le=e=>{const{activeElement:o}=document;for(const l of e)if(l===o||(l.focus(),o!==document.activeElement))return},ce="currentTabIdChange",pe="rovingFocusGroup.entryFocus",_o={bubbles:!1,cancelable:!0},yo=B({name:"ElRovingFocusGroupImpl",inheritAttrs:!1,props:fo,emits:[ce,"entryFocus"],setup(e,{emit:o}){var l;const n=y((l=e.currentTabId||e.defaultCurrentTabId)!=null?l:null),s=y(!1),d=y(!1),i=y(null),{getItems:r}=C(ne,void 0),p=h(()=>[{outline:"none"},e.style]),v=u=>{o(ce,u)},m=()=>{s.value=!0},f=P(u=>{var g;(g=e.onMousedown)==null||g.call(e,u)},()=>{d.value=!0}),E=P(u=>{var g;(g=e.onFocus)==null||g.call(e,u)},u=>{const g=!b(d),{target:M,currentTarget:k}=u;if(M===k&&g&&!b(s)){const G=new Event(pe,_o);if(k==null||k.dispatchEvent(G),!G.defaultPrevented){const _=r().filter(O=>O.focusable),T=_.find(O=>O.active),S=_.find(O=>O.id===b(n)),z=[T,S,..._].filter(Boolean).map(O=>O.ref);le(z)}}d.value=!1}),t=P(u=>{var g;(g=e.onBlur)==null||g.call(e,u)},()=>{s.value=!1}),c=(...u)=>{o("entryFocus",...u)};U(te,{currentTabbedId:Pe(n),loop:j(e,"loop"),tabIndex:h(()=>b(s)?-1:0),rovingFocusGroupRef:i,rovingFocusGroupRootStyle:p,orientation:j(e,"orientation"),dir:j(e,"dir"),onItemFocus:v,onItemShiftTab:m,onBlur:t,onFocus:E,onMousedown:f}),ge(()=>e.currentTabId,u=>{n.value=u??null}),Be(i,pe,c)}});function ho(e,o,l,n,s,d){return R(e.$slots,"default")}var Co=A(yo,[["render",ho],["__file","roving-focus-group-impl.vue"]]);const To=B({name:"ElRovingFocusGroup",components:{ElFocusGroupCollection:mo,ElRovingFocusGroupImpl:Co}});function $o(e,o,l,n,s,d){const i=I("el-roving-focus-group-impl"),r=I("el-focus-group-collection");return N(),J(r,null,{default:w(()=>[F(i,Le(Ae(e.$attrs)),{default:w(()=>[R(e.$slots,"default")]),_:3},16)]),_:3})}var So=A(To,[["render",$o],["__file","roving-focus-group.vue"]]);const Oo=B({components:{ElRovingFocusCollectionItem:vo},props:{focusable:{type:Boolean,default:!0},active:{type:Boolean,default:!1}},emits:["mousedown","focus","keydown"],setup(e,{emit:o}){const{currentTabbedId:l,loop:n,onItemFocus:s,onItemShiftTab:d}=C(te,void 0),{getItems:i}=C(ne,void 0),r=ye(),p=y(null),v=P(t=>{o("mousedown",t)},t=>{e.focusable?s(b(r)):t.preventDefault()}),m=P(t=>{o("focus",t)},()=>{s(b(r))}),f=P(t=>{o("keydown",t)},t=>{const{key:c,shiftKey:u,target:g,currentTarget:M}=t;if(c===$.tab&&u){d();return}if(g!==M)return;const k=Io(t);if(k){t.preventDefault();let _=i().filter(T=>T.focusable).map(T=>T.ref);switch(k){case"last":{_.reverse();break}case"prev":case"next":{k==="prev"&&_.reverse();const T=_.indexOf(M);_=n.value?Eo(_,T+1):_.slice(T+1);break}}Me(()=>{le(_)})}}),E=h(()=>l.value===b(r));return U($e,{rovingFocusGroupItemRef:p,tabIndex:h(()=>b(E)?0:-1),handleMousedown:v,handleFocus:m,handleKeydown:f}),{id:r,handleKeydown:f,handleFocus:m,handleMousedown:v}}});function Fo(e,o,l,n,s,d){const i=I("el-roving-focus-collection-item");return N(),J(i,{id:e.id,focusable:e.focusable,active:e.active},{default:w(()=>[R(e.$slots,"default")]),_:3},8,["id","focusable","active"])}var No=A(Oo,[["render",Fo],["__file","roving-focus-item.vue"]]);const Ro=Z({trigger:qe.trigger,effect:{...de.effect,default:"light"},type:{type:D(String)},placement:{type:D(String),default:"bottom"},popperOptions:{type:D(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:D([Number,String]),default:0},maxHeight:{type:D([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:D(Object)},teleported:de.teleported}),Se=Z({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:Ge}}),ko=Z({onKeydown:{type:D(Function)}}),Ko=[$.down,$.pageDown,$.home],Oe=[$.up,$.pageUp,$.end],Do=[...Ko,...Oe],{ElCollection:Po,ElCollectionItem:Bo,COLLECTION_INJECTION_KEY:Lo,COLLECTION_ITEM_INJECTION_KEY:Ao}=Te("Dropdown"),ee=Symbol("elDropdown"),{ButtonGroup:Mo}=_e,Go=B({name:"ElDropdown",components:{ElButton:_e,ElButtonGroup:Mo,ElScrollbar:Xe,ElDropdownCollection:Po,ElTooltip:Ze,ElRovingFocusGroup:So,ElOnlyChild:Qe,ElIcon:be,ArrowDown:ze},props:Ro,emits:["visible-change","click","command"],setup(e,{emit:o}){const l=we(),n=x("dropdown"),{t:s}=Ye(),d=y(),i=y(),r=y(null),p=y(null),v=y(null),m=y(null),f=y(!1),E=[$.enter,$.space,$.down],t=h(()=>({maxHeight:Ve(e.maxHeight)})),c=h(()=>[n.m(T.value)]),u=h(()=>eo(e.trigger)),g=ye().value,M=h(()=>e.id||g);ge([d,u],([a,K],[Y])=>{var se,ie,ae;(se=Y==null?void 0:Y.$el)!=null&&se.removeEventListener&&Y.$el.removeEventListener("pointerenter",L),(ie=a==null?void 0:a.$el)!=null&&ie.removeEventListener&&a.$el.removeEventListener("pointerenter",L),(ae=a==null?void 0:a.$el)!=null&&ae.addEventListener&&K.includes("hover")&&a.$el.addEventListener("pointerenter",L)},{immediate:!0}),ve(()=>{var a,K;(K=(a=d.value)==null?void 0:a.$el)!=null&&K.removeEventListener&&d.value.$el.removeEventListener("pointerenter",L)});function k(){G()}function G(){var a;(a=r.value)==null||a.onClose()}function _(){var a;(a=r.value)==null||a.onOpen()}const T=xe();function S(...a){o("command",...a)}function L(){var a,K;(K=(a=d.value)==null?void 0:a.$el)==null||K.focus()}function z(){}function O(){const a=b(p);u.value.includes("hover")&&(a==null||a.focus()),m.value=null}function re(a){m.value=a}function Q(a){f.value||(a.preventDefault(),a.stopImmediatePropagation())}function H(){o("visible-change",!0)}function ke(a){(a==null?void 0:a.type)==="keydown"&&p.value.focus()}function Ke(){o("visible-change",!1)}return U(ee,{contentRef:p,role:h(()=>e.role),triggerId:M,isUsingKeyboard:f,onItemEnter:z,onItemLeave:O}),U("elDropdown",{instance:l,dropdownSize:T,handleClick:k,commandHandler:S,trigger:j(e,"trigger"),hideOnClick:j(e,"hideOnClick")}),{t:s,ns:n,scrollbar:v,wrapStyle:t,dropdownTriggerKls:c,dropdownSize:T,triggerId:M,triggerKeys:E,currentTabId:m,handleCurrentTabIdChange:re,handlerMainButtonClick:a=>{o("click",a)},handleEntryFocus:Q,handleClose:G,handleOpen:_,handleBeforeShowTooltip:H,handleShowTooltip:ke,handleBeforeHideTooltip:Ke,onFocusAfterTrapped:a=>{var K,Y;a.preventDefault(),(Y=(K=p.value)==null?void 0:K.focus)==null||Y.call(K,{preventScroll:!0})},popperRef:r,contentRef:p,triggeringElementRef:d,referenceElementRef:i}}});function zo(e,o,l,n,s,d){var i;const r=I("el-dropdown-collection"),p=I("el-roving-focus-group"),v=I("el-scrollbar"),m=I("el-only-child"),f=I("el-tooltip"),E=I("el-button"),t=I("arrow-down"),c=I("el-icon"),u=I("el-button-group");return N(),V("div",{class:W([e.ns.b(),e.ns.is("disabled",e.disabled)])},[F(f,{ref:"popperRef",role:e.role,effect:e.effect,"fallback-placements":["bottom","top"],"popper-options":e.popperOptions,"gpu-acceleration":!1,"hide-after":e.trigger==="hover"?e.hideTimeout:0,"manual-mode":!0,placement:e.placement,"popper-class":[e.ns.e("popper"),e.popperClass],"reference-element":(i=e.referenceElementRef)==null?void 0:i.$el,trigger:e.trigger,"trigger-keys":e.triggerKeys,"trigger-target-el":e.contentRef,"show-after":e.trigger==="hover"?e.showTimeout:0,"stop-popper-mouse-event":!1,"virtual-ref":e.triggeringElementRef,"virtual-triggering":e.splitButton,disabled:e.disabled,transition:`${e.ns.namespace.value}-zoom-in-top`,teleported:e.teleported,pure:"",persistent:"",onBeforeShow:e.handleBeforeShowTooltip,onShow:e.handleShowTooltip,onBeforeHide:e.handleBeforeHideTooltip},Ue({content:w(()=>[F(v,{ref:"scrollbar","wrap-style":e.wrapStyle,tag:"div","view-class":e.ns.e("list")},{default:w(()=>[F(p,{loop:e.loop,"current-tab-id":e.currentTabId,orientation:"horizontal",onCurrentTabIdChange:e.handleCurrentTabIdChange,onEntryFocus:e.handleEntryFocus},{default:w(()=>[F(r,null,{default:w(()=>[R(e.$slots,"dropdown")]),_:3})]),_:3},8,["loop","current-tab-id","onCurrentTabIdChange","onEntryFocus"])]),_:3},8,["wrap-style","view-class"])]),_:2},[e.splitButton?void 0:{name:"default",fn:w(()=>[F(m,{id:e.triggerId,ref:"triggeringElementRef",role:"button",tabindex:e.tabindex},{default:w(()=>[R(e.$slots,"default")]),_:3},8,["id","tabindex"])])}]),1032,["role","effect","popper-options","hide-after","placement","popper-class","reference-element","trigger","trigger-keys","trigger-target-el","show-after","virtual-ref","virtual-triggering","disabled","transition","teleported","onBeforeShow","onShow","onBeforeHide"]),e.splitButton?(N(),J(u,{key:0},{default:w(()=>[F(E,q({ref:"referenceElementRef"},e.buttonProps,{size:e.dropdownSize,type:e.type,disabled:e.disabled,tabindex:e.tabindex,onClick:e.handlerMainButtonClick}),{default:w(()=>[R(e.$slots,"default")]),_:3},16,["size","type","disabled","tabindex","onClick"]),F(E,q({id:e.triggerId,ref:"triggeringElementRef"},e.buttonProps,{role:"button",size:e.dropdownSize,type:e.type,class:e.ns.e("caret-button"),disabled:e.disabled,tabindex:e.tabindex,"aria-label":e.t("el.dropdown.toggleDropdown")}),{default:w(()=>[F(c,{class:W(e.ns.e("icon"))},{default:w(()=>[F(t)]),_:1},8,["class"])]),_:1},16,["id","size","type","class","disabled","tabindex","aria-label"])]),_:3})):X("v-if",!0)],2)}var Yo=A(Go,[["render",zo],["__file","dropdown.vue"]]);const Vo=B({name:"DropdownItemImpl",components:{ElIcon:be},props:Se,emits:["pointermove","pointerleave","click","clickimpl"],setup(e,{emit:o}){const l=x("dropdown"),{role:n}=C(ee,void 0),{collectionItemRef:s}=C(Ao,void 0),{collectionItemRef:d}=C(go,void 0),{rovingFocusGroupItemRef:i,tabIndex:r,handleFocus:p,handleKeydown:v,handleMousedown:m}=C($e,void 0),f=he(s,d,i),E=h(()=>n.value==="menu"?"menuitem":n.value==="navigation"?"link":"button"),t=P(c=>{const{code:u}=c;if(u===$.enter||u===$.space)return c.preventDefault(),c.stopImmediatePropagation(),o("clickimpl",c),!0},v);return{ns:l,itemRef:f,dataset:{[Ce]:""},role:E,tabIndex:r,handleFocus:p,handleKeydown:t,handleMousedown:m}}}),Uo=["aria-disabled","tabindex","role"];function Jo(e,o,l,n,s,d){const i=I("el-icon");return N(),V(je,null,[e.divided?(N(),V("li",q({key:0,role:"separator",class:e.ns.bem("menu","item","divided")},e.$attrs),null,16)):X("v-if",!0),Je("li",q({ref:e.itemRef},{...e.dataset,...e.$attrs},{"aria-disabled":e.disabled,class:[e.ns.be("menu","item"),e.ns.is("disabled",e.disabled)],tabindex:e.tabIndex,role:e.role,onClick:o[0]||(o[0]=r=>e.$emit("clickimpl",r)),onFocus:o[1]||(o[1]=(...r)=>e.handleFocus&&e.handleFocus(...r)),onKeydown:o[2]||(o[2]=oe((...r)=>e.handleKeydown&&e.handleKeydown(...r),["self"])),onMousedown:o[3]||(o[3]=(...r)=>e.handleMousedown&&e.handleMousedown(...r)),onPointermove:o[4]||(o[4]=r=>e.$emit("pointermove",r)),onPointerleave:o[5]||(o[5]=r=>e.$emit("pointerleave",r))}),[e.icon?(N(),J(i,{key:0},{default:w(()=>[(N(),J(He(e.icon)))]),_:1})):X("v-if",!0),R(e.$slots,"default")],16,Uo)],64)}var Ho=A(Vo,[["render",Jo],["__file","dropdown-item-impl.vue"]]);const Fe=()=>{const e=C("elDropdown",{}),o=h(()=>e==null?void 0:e.dropdownSize);return{elDropdown:e,_elDropdownSize:o}},jo=B({name:"ElDropdownItem",components:{ElDropdownCollectionItem:Bo,ElRovingFocusItem:No,ElDropdownItemImpl:Ho},inheritAttrs:!1,props:Se,emits:["pointermove","pointerleave","click"],setup(e,{emit:o,attrs:l}){const{elDropdown:n}=Fe(),s=we(),d=y(null),i=h(()=>{var t,c;return(c=(t=b(d))==null?void 0:t.textContent)!=null?c:""}),{onItemEnter:r,onItemLeave:p}=C(ee,void 0),v=P(t=>(o("pointermove",t),t.defaultPrevented),ue(t=>{if(e.disabled){p(t);return}const c=t.currentTarget;c===document.activeElement||c.contains(document.activeElement)||(r(t),t.defaultPrevented||c==null||c.focus())})),m=P(t=>(o("pointerleave",t),t.defaultPrevented),ue(t=>{p(t)})),f=P(t=>{if(!e.disabled)return o("click",t),t.type!=="keydown"&&t.defaultPrevented},t=>{var c,u,g;if(e.disabled){t.stopImmediatePropagation();return}(c=n==null?void 0:n.hideOnClick)!=null&&c.value&&((u=n.handleClick)==null||u.call(n)),(g=n.commandHandler)==null||g.call(n,e.command,s,t)}),E=h(()=>({...e,...l}));return{handleClick:f,handlePointerMove:v,handlePointerLeave:m,textContent:i,propsAndAttrs:E}}});function Wo(e,o,l,n,s,d){var i;const r=I("el-dropdown-item-impl"),p=I("el-roving-focus-item"),v=I("el-dropdown-collection-item");return N(),J(v,{disabled:e.disabled,"text-value":(i=e.textValue)!=null?i:e.textContent},{default:w(()=>[F(p,{focusable:!e.disabled},{default:w(()=>[F(r,q(e.propsAndAttrs,{onPointerleave:e.handlePointerLeave,onPointermove:e.handlePointerMove,onClickimpl:e.handleClick}),{default:w(()=>[R(e.$slots,"default")]),_:3},16,["onPointerleave","onPointermove","onClickimpl"])]),_:3},8,["focusable"])]),_:3},8,["disabled","text-value"])}var Ne=A(jo,[["render",Wo],["__file","dropdown-item.vue"]]);const qo=B({name:"ElDropdownMenu",props:ko,setup(e){const o=x("dropdown"),{_elDropdownSize:l}=Fe(),n=l.value,{focusTrapRef:s,onKeydown:d}=C(oo,void 0),{contentRef:i,role:r,triggerId:p}=C(ee,void 0),{collectionRef:v,getItems:m}=C(Lo,void 0),{rovingFocusGroupRef:f,rovingFocusGroupRootStyle:E,tabIndex:t,onBlur:c,onFocus:u,onMousedown:g}=C(te,void 0),{collectionRef:M}=C(ne,void 0),k=h(()=>[o.b("menu"),o.bm("menu",n==null?void 0:n.value)]),G=he(i,v,s,f,M),_=P(S=>{var L;(L=e.onKeydown)==null||L.call(e,S)},S=>{const{currentTarget:L,code:z,target:O}=S;if(L.contains(O),$.tab===z&&S.stopImmediatePropagation(),S.preventDefault(),O!==b(i)||!Do.includes(z))return;const Q=m().filter(H=>!H.disabled).map(H=>H.ref);Oe.includes(z)&&Q.reverse(),le(Q)});return{size:n,rovingFocusGroupRootStyle:E,tabIndex:t,dropdownKls:k,role:r,triggerId:p,dropdownListWrapperRef:G,handleKeydown:S=>{_(S),d(S)},onBlur:c,onFocus:u,onMousedown:g}}}),Zo=["role","aria-labelledby"];function Qo(e,o,l,n,s,d){return N(),V("ul",{ref:e.dropdownListWrapperRef,class:W(e.dropdownKls),style:fe(e.rovingFocusGroupRootStyle),tabindex:-1,role:e.role,"aria-labelledby":e.triggerId,onBlur:o[0]||(o[0]=(...i)=>e.onBlur&&e.onBlur(...i)),onFocus:o[1]||(o[1]=(...i)=>e.onFocus&&e.onFocus(...i)),onKeydown:o[2]||(o[2]=oe((...i)=>e.handleKeydown&&e.handleKeydown(...i),["self"])),onMousedown:o[3]||(o[3]=oe((...i)=>e.onMousedown&&e.onMousedown(...i),["self"]))},[R(e.$slots,"default")],46,Zo)}var Re=A(qo,[["render",Qo],["__file","dropdown-menu.vue"]]);const cn=me(Yo,{DropdownItem:Ne,DropdownMenu:Re}),pn=Ie(Ne),fn=Ie(Re),mn=Ee("sysViewTags",{state:()=>({list:[]}),actions:{closeTabsOnSide(e,o){const l=this.list.findIndex(n=>n.path===e);if(l!==-1){const n=o==="left"?[0,l]:[l+1,this.list.length];this.list=this.list.filter((s,d)=>d<n[0]||d>=n[1]||s.meta.isAffix)}},closeTabs(e){this.list=this.list.filter(o=>o.path===e||o.meta.isAffix)}},persist:{key:"ViewTags",storage:We}}),vn=Ee("sysKeepAlive",{state:()=>({list:[]}),actions:{addKeepAliveName(e){this.list.includes(e)||this.list.push(e)},removeKeepAliveName(e){this.list=this.list.filter(o=>o!==e)},removeKeepAliveNames(e){const o=new Set(e.map(l=>l.name));this.list=this.list.filter(l=>o.has(l))}}});export{fn as E,vn as a,cn as b,un as c,pn as d,mn as u};
