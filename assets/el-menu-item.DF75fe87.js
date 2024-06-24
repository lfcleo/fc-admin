import{aD as T,_ as me,d as q,u as N,o as j,e as Ce,w as ie,h as A,aa as Pe,aS as _e,au as J,at as ae,bj as Ae,c as f,b as pe,C as Q,y as x,bh as ze,aN as Be,S as ve,T as U,M as re,z as fe,$ as Se,H as g,aA as D,E as xe,G as Ee,ax as Le,F as he,i as V,Z as be,bp as Ie,am as We,J as ce,aH as je,bE as De,ar as Re,I as ye,bF as Fe,ag as Ve,a9 as qe,A as Ge,a as X,s as de,n as Y,l as He,t as Ze,j as Je,N as Me}from"./index.Bw-HXdJa.js";import{t as K}from"./aria.nkjrUMQ-.js";import{_ as Ue}from"./index.BOG6n9gv.js";import{E as ke}from"./el-popper.BrmkM6_b.js";import{T as Ke}from"./index.r5W6hzzQ.js";import{t as ee}from"./error.Cq9Fpw4b.js";import{f as Qe}from"./vnode.C9FGNq6A.js";import{C as Xe}from"./index.xSHHmd7U.js";let Ye=class{constructor(n,t){this.parent=n,this.domNode=t,this.subIndex=0,this.subIndex=0,this.init()}init(){this.subMenuItems=this.domNode.querySelectorAll("li"),this.addListeners()}gotoSubIndex(n){n===this.subMenuItems.length?n=0:n<0&&(n=this.subMenuItems.length-1),this.subMenuItems[n].focus(),this.subIndex=n}addListeners(){const n=this.parent.domNode;Array.prototype.forEach.call(this.subMenuItems,t=>{t.addEventListener("keydown",r=>{let i=!1;switch(r.code){case T.down:{this.gotoSubIndex(this.subIndex+1),i=!0;break}case T.up:{this.gotoSubIndex(this.subIndex-1),i=!0;break}case T.tab:{K(n,"mouseleave");break}case T.enter:case T.space:{i=!0,r.currentTarget.click();break}}return i&&(r.preventDefault(),r.stopPropagation()),!1})})}},et=class{constructor(n,t){this.domNode=n,this.submenu=null,this.submenu=null,this.init(t)}init(n){this.domNode.setAttribute("tabindex","0");const t=this.domNode.querySelector(`.${n}-menu`);t&&(this.submenu=new Ye(this,t)),this.addListeners()}addListeners(){this.domNode.addEventListener("keydown",n=>{let t=!1;switch(n.code){case T.down:{K(n.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(0),t=!0;break}case T.up:{K(n.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(this.submenu.subMenuItems.length-1),t=!0;break}case T.tab:{K(n.currentTarget,"mouseleave");break}case T.enter:case T.space:{t=!0,n.currentTarget.click();break}}t&&n.preventDefault()})}},tt=class{constructor(n,t){this.domNode=n,this.init(t)}init(n){const t=this.domNode.childNodes;Array.from(t).forEach(r=>{r.nodeType===1&&new et(r,n)})}};const nt=q({name:"ElMenuCollapseTransition",setup(){const e=N("menu");return{listeners:{onBeforeEnter:t=>t.style.opacity="0.2",onEnter(t,r){J(t,`${e.namespace.value}-opacity-transition`),t.style.opacity="1",r()},onAfterEnter(t){ae(t,`${e.namespace.value}-opacity-transition`),t.style.opacity=""},onBeforeLeave(t){t.dataset||(t.dataset={}),Ae(t,e.m("collapse"))?(ae(t,e.m("collapse")),t.dataset.oldOverflow=t.style.overflow,t.dataset.scrollWidth=t.clientWidth.toString(),J(t,e.m("collapse"))):(J(t,e.m("collapse")),t.dataset.oldOverflow=t.style.overflow,t.dataset.scrollWidth=t.clientWidth.toString(),ae(t,e.m("collapse"))),t.style.width=`${t.scrollWidth}px`,t.style.overflow="hidden"},onLeave(t){J(t,"horizontal-collapse-transition"),t.style.width=`${t.dataset.scrollWidth}px`}}}}});function ot(e,n,t,r,i,C){return j(),Ce(_e,Pe({mode:"out-in"},e.listeners),{default:ie(()=>[A(e.$slots,"default")]),_:3},16)}var at=me(nt,[["render",ot],["__file","menu-collapse-transition.vue"]]);function Te(e,n){const t=f(()=>{let i=e.parent;const C=[n.value];for(;i.type.name!=="ElMenu";)i.props.index&&C.unshift(i.props.index),i=i.parent;return C});return{parentMenu:f(()=>{let i=e.parent;for(;i&&!["ElMenu","ElSubMenu"].includes(i.type.name);)i=i.parent;return i}),indexPath:t}}function st(e){return f(()=>{const t=e.backgroundColor;return t?new Ke(t).shade(20).toString():""})}const $e=(e,n)=>{const t=N("menu");return f(()=>t.cssVarBlock({"text-color":e.textColor||"","hover-text-color":e.textColor||"","bg-color":e.backgroundColor||"","hover-bg-color":st(e).value||"","active-color":e.activeTextColor||"",level:`${n}`}))},lt=pe({index:{type:String,required:!0},showTimeout:Number,hideTimeout:Number,popperClass:String,disabled:Boolean,teleported:{type:Boolean,default:void 0},popperOffset:Number,expandCloseIcon:{type:V},expandOpenIcon:{type:V},collapseCloseIcon:{type:V},collapseOpenIcon:{type:V}}),se="ElSubMenu";var ge=q({name:se,props:lt,setup(e,{slots:n,expose:t}){const r=be(),{indexPath:i,parentMenu:C}=Te(r,f(()=>e.index)),m=N("menu"),b=N("sub-menu"),l=Q("rootMenu");l||ee(se,"can not inject root menu");const d=Q(`subMenu:${C.value.uid}`);d||ee(se,"can not inject sub menu");const p=x({}),I=x({});let y;const $=x(!1),te=x(),G=x(null),O=f(()=>_.value==="horizontal"&&P.value?"bottom-start":"right-start"),z=f(()=>_.value==="horizontal"&&P.value||_.value==="vertical"&&!l.props.collapse?e.expandCloseIcon&&e.expandOpenIcon?E.value?e.expandOpenIcon:e.expandCloseIcon:ze:e.collapseCloseIcon&&e.collapseOpenIcon?E.value?e.collapseOpenIcon:e.collapseCloseIcon:Be),P=f(()=>d.level===0),R=f(()=>{const s=e.teleported;return s===void 0?P.value:s}),ne=f(()=>l.props.collapse?`${m.namespace.value}-zoom-in-left`:`${m.namespace.value}-zoom-in-top`),oe=f(()=>_.value==="horizontal"&&P.value?["bottom-start","bottom-end","top-start","top-end","right-start","left-start"]:["right-start","right","right-end","left-start","bottom-start","bottom-end","top-start","top-end"]),E=f(()=>l.openedMenus.includes(e.index)),B=f(()=>{let s=!1;return Object.values(p.value).forEach(c=>{c.active&&(s=!0)}),Object.values(I.value).forEach(c=>{c.active&&(s=!0)}),s}),_=f(()=>l.props.mode),L=ve({index:e.index,indexPath:i,active:B}),F=$e(l.props,d.level+1),H=f(()=>{var s;return(s=e.popperOffset)!=null?s:l.props.popperOffset}),W=f(()=>{var s;return(s=e.popperClass)!=null?s:l.props.popperClass}),Z=f(()=>{var s;return(s=e.showTimeout)!=null?s:l.props.showTimeout}),o=f(()=>{var s;return(s=e.hideTimeout)!=null?s:l.props.hideTimeout}),a=()=>{var s,c,M;return(M=(c=(s=G.value)==null?void 0:s.popperRef)==null?void 0:c.popperInstanceRef)==null?void 0:M.destroy()},u=s=>{s||a()},h=()=>{l.props.menuTrigger==="hover"&&l.props.mode==="horizontal"||l.props.collapse&&l.props.mode==="vertical"||e.disabled||l.handleSubMenuClick({index:e.index,indexPath:i.value,active:B.value})},v=(s,c=Z.value)=>{var M;if(s.type!=="focus"){if(l.props.menuTrigger==="click"&&l.props.mode==="horizontal"||!l.props.collapse&&l.props.mode==="vertical"||e.disabled){d.mouseInChild.value=!0;return}d.mouseInChild.value=!0,y==null||y(),{stop:y}=Ie(()=>{l.openMenu(e.index,i.value)},c),R.value&&((M=C.value.vnode.el)==null||M.dispatchEvent(new MouseEvent("mouseenter")))}},k=(s=!1)=>{var c;if(l.props.menuTrigger==="click"&&l.props.mode==="horizontal"||!l.props.collapse&&l.props.mode==="vertical"){d.mouseInChild.value=!1;return}y==null||y(),d.mouseInChild.value=!1,{stop:y}=Ie(()=>!$.value&&l.closeMenu(e.index,i.value),o.value),R.value&&s&&((c=d.handleMouseleave)==null||c.call(d,!0))};U(()=>l.props.collapse,s=>u(!!s));{const s=M=>{I.value[M.index]=M},c=M=>{delete I.value[M.index]};re(`subMenu:${r.uid}`,{addSubMenu:s,removeSubMenu:c,handleMouseleave:k,mouseInChild:$,level:d.level+1})}return t({opened:E}),fe(()=>{l.addSubMenu(L),d.addSubMenu(L)}),Se(()=>{d.removeSubMenu(L),l.removeSubMenu(L)}),()=>{var s;const c=[(s=n.title)==null?void 0:s.call(n),g(xe,{class:b.e("icon-arrow"),style:{transform:E.value?e.expandCloseIcon&&e.expandOpenIcon||e.collapseCloseIcon&&e.collapseOpenIcon&&l.props.collapse?"none":"rotateZ(180deg)":"none"}},{default:()=>D(z.value)?g(r.appContext.components[z.value]):g(z.value)})],M=l.isMenuPopup?g(ke,{ref:G,visible:E.value,effect:"light",pure:!0,offset:H.value,showArrow:!1,persistent:!0,popperClass:W.value,placement:O.value,teleported:R.value,fallbackPlacements:oe.value,transition:ne.value,gpuAcceleration:!1},{content:()=>{var S;return g("div",{class:[m.m(_.value),m.m("popup-container"),W.value],onMouseenter:w=>v(w,100),onMouseleave:()=>k(!0),onFocus:w=>v(w,100)},[g("ul",{class:[m.b(),m.m("popup"),m.m(`popup-${O.value}`)],style:F.value},[(S=n.default)==null?void 0:S.call(n)])])},default:()=>g("div",{class:b.e("title"),onClick:h},c)}):g(he,{},[g("div",{class:b.e("title"),ref:te,onClick:h},c),g(Ue,{},{default:()=>{var S;return Ee(g("ul",{role:"menu",class:[m.b(),m.m("inline")],style:F.value},[(S=n.default)==null?void 0:S.call(n)]),[[Le,E.value]])}})]);return g("li",{class:[b.b(),b.is("active",B.value),b.is("opened",E.value),b.is("disabled",e.disabled)],role:"menuitem",ariaHaspopup:!0,ariaExpanded:E.value,onMouseenter:v,onMouseleave:()=>k(),onFocus:v},[M])}}});const ut=pe({mode:{type:String,values:["horizontal","vertical"],default:"vertical"},defaultActive:{type:String,default:""},defaultOpeneds:{type:ce(Array),default:()=>je([])},uniqueOpened:Boolean,router:Boolean,menuTrigger:{type:String,values:["hover","click"],default:"hover"},collapse:Boolean,backgroundColor:String,textColor:String,activeTextColor:String,closeOnClickOutside:Boolean,collapseTransition:{type:Boolean,default:!0},ellipsis:{type:Boolean,default:!0},popperOffset:{type:Number,default:6},ellipsisIcon:{type:V,default:()=>De},popperEffect:{type:String,values:["dark","light"],default:"dark"},popperClass:String,showTimeout:{type:Number,default:300},hideTimeout:{type:Number,default:300}}),le=e=>Array.isArray(e)&&e.every(n=>D(n)),it={close:(e,n)=>D(e)&&le(n),open:(e,n)=>D(e)&&le(n),select:(e,n,t,r)=>D(e)&&le(n)&&Re(t)&&(r===void 0||r instanceof Promise)};var rt=q({name:"ElMenu",props:ut,emits:it,setup(e,{emit:n,slots:t,expose:r}){const i=be(),C=i.appContext.config.globalProperties.$router,m=x(),b=N("menu"),l=N("sub-menu"),d=x(-1),p=x(e.defaultOpeneds&&!e.collapse?e.defaultOpeneds.slice(0):[]),I=x(e.defaultActive),y=x({}),$=x({}),te=f(()=>e.mode==="horizontal"||e.mode==="vertical"&&e.collapse),G=()=>{const o=I.value&&y.value[I.value];if(!o||e.mode==="horizontal"||e.collapse)return;o.indexPath.forEach(u=>{const h=$.value[u];h&&O(u,h.indexPath)})},O=(o,a)=>{p.value.includes(o)||(e.uniqueOpened&&(p.value=p.value.filter(u=>a.includes(u))),p.value.push(o),n("open",o,a))},z=o=>{const a=p.value.indexOf(o);a!==-1&&p.value.splice(a,1)},P=(o,a)=>{z(o),n("close",o,a)},R=({index:o,indexPath:a})=>{p.value.includes(o)?P(o,a):O(o,a)},ne=o=>{(e.mode==="horizontal"||e.collapse)&&(p.value=[]);const{index:a,indexPath:u}=o;if(!(ye(a)||ye(u)))if(e.router&&C){const h=o.route||a,v=C.push(h).then(k=>(k||(I.value=a),k));n("select",a,u,{index:a,indexPath:u,route:h},v)}else I.value=a,n("select",a,u,{index:a,indexPath:u})},oe=o=>{const a=y.value,u=a[o]||I.value&&a[I.value]||a[e.defaultActive];u?I.value=u.index:I.value=o},E=o=>{const a=getComputedStyle(o),u=Number.parseInt(a.marginLeft,10),h=Number.parseInt(a.marginRight,10);return o.offsetWidth+u+h||0},B=()=>{var o,a;if(!m.value)return-1;const u=Array.from((a=(o=m.value)==null?void 0:o.childNodes)!=null?a:[]).filter(w=>w.nodeName!=="#comment"&&(w.nodeName!=="#text"||w.nodeValue)),h=64,v=getComputedStyle(m.value),k=Number.parseInt(v.paddingLeft,10),s=Number.parseInt(v.paddingRight,10),c=m.value.clientWidth-k-s;let M=0,S=0;return u.forEach((w,Oe)=>{M+=E(w),M<=c-h&&(S=Oe+1)}),S===u.length?-1:S},_=o=>$.value[o].indexPath,L=(o,a=33.34)=>{let u;return()=>{u&&clearTimeout(u),u=setTimeout(()=>{o()},a)}};let F=!0;const H=()=>{if(d.value===B())return;const o=()=>{d.value=-1,Ve(()=>{d.value=B()})};F?o():L(o)(),F=!1};U(()=>e.defaultActive,o=>{y.value[o]||(I.value=""),oe(o)}),U(()=>e.collapse,o=>{o&&(p.value=[])}),U(y.value,G);let W;We(()=>{e.mode==="horizontal"&&e.ellipsis?W=Fe(m,H).stop:W==null||W()});const Z=x(!1);{const o=v=>{$.value[v.index]=v},a=v=>{delete $.value[v.index]};re("rootMenu",ve({props:e,openedMenus:p,items:y,subMenus:$,activeIndex:I,isMenuPopup:te,addMenuItem:v=>{y.value[v.index]=v},removeMenuItem:v=>{delete y.value[v.index]},addSubMenu:o,removeSubMenu:a,openMenu:O,closeMenu:P,handleMenuItemClick:ne,handleSubMenuClick:R})),re(`subMenu:${i.uid}`,{addSubMenu:o,removeSubMenu:a,mouseInChild:Z,level:0})}return fe(()=>{e.mode==="horizontal"&&new tt(i.vnode.el,b.namespace.value)}),r({open:a=>{const{indexPath:u}=$.value[a];u.forEach(h=>O(h,u))},close:z,handleResize:H}),()=>{var o,a;let u=(a=(o=t.default)==null?void 0:o.call(t))!=null?a:[];const h=[];if(e.mode==="horizontal"&&m.value){const c=Qe(u),M=d.value===-1?c:c.slice(0,d.value),S=d.value===-1?[]:c.slice(d.value);S!=null&&S.length&&e.ellipsis&&(u=M,h.push(g(ge,{index:"sub-menu-more",class:l.e("hide-arrow"),popperOffset:e.popperOffset},{title:()=>g(xe,{class:l.e("icon-more")},{default:()=>g(e.ellipsisIcon)}),default:()=>S})))}const v=$e(e,0),k=e.closeOnClickOutside?[[Xe,()=>{p.value.length&&(Z.value||(p.value.forEach(c=>n("close",c,_(c))),p.value=[]))}]]:[],s=Ee(g("ul",{key:String(e.collapse),role:"menubar",ref:m,style:v.value,class:{[b.b()]:!0,[b.m(e.mode)]:!0,[b.m("collapse")]:e.collapse}},[...u,...h]),k);return e.collapseTransition&&e.mode==="vertical"?g(at,()=>s):s}}});const ct=pe({index:{type:ce([String,null]),default:null},route:{type:ce([String,Object])},disabled:Boolean}),dt={click:e=>D(e.index)&&Array.isArray(e.indexPath)},ue="ElMenuItem",mt=q({name:ue,components:{ElTooltip:ke},props:ct,emits:dt,setup(e,{emit:n}){const t=be(),r=Q("rootMenu"),i=N("menu"),C=N("menu-item");r||ee(ue,"can not inject root menu");const{parentMenu:m,indexPath:b}=Te(t,qe(e,"index")),l=Q(`subMenu:${m.value.uid}`);l||ee(ue,"can not inject sub menu");const d=f(()=>e.index===r.activeIndex),p=ve({index:e.index,indexPath:b,active:d}),I=()=>{e.disabled||(r.handleMenuItemClick({index:e.index,indexPath:b.value,route:e.route}),n("click",p))};return fe(()=>{l.addSubMenu(p),r.addMenuItem(p)}),Se(()=>{l.removeSubMenu(p),r.removeMenuItem(p)}),{parentMenu:m,rootMenu:r,active:d,nsMenu:i,nsMenuItem:C,handleClick:I}}});function pt(e,n,t,r,i,C){const m=Ge("el-tooltip");return j(),X("li",{class:Y([e.nsMenuItem.b(),e.nsMenuItem.is("active",e.active),e.nsMenuItem.is("disabled",e.disabled)]),role:"menuitem",tabindex:"-1",onClick:n[0]||(n[0]=(...b)=>e.handleClick&&e.handleClick(...b))},[e.parentMenu.type.name==="ElMenu"&&e.rootMenu.props.collapse&&e.$slots.title?(j(),Ce(m,{key:0,effect:e.rootMenu.props.popperEffect,placement:"right","fallback-placements":["left"],persistent:""},{content:ie(()=>[A(e.$slots,"title")]),default:ie(()=>[de("div",{class:Y(e.nsMenu.be("tooltip","trigger"))},[A(e.$slots,"default")],2)]),_:3},8,["effect"])):(j(),X(he,{key:1},[A(e.$slots,"default"),A(e.$slots,"title")],64))],2)}var we=me(mt,[["render",pt],["__file","menu-item.vue"]]);const vt={title:String},ft="ElMenuItemGroup",ht=q({name:ft,props:vt,setup(){return{ns:N("menu-item-group")}}});function bt(e,n,t,r,i,C){return j(),X("li",{class:Y(e.ns.b())},[de("div",{class:Y(e.ns.e("title"))},[e.$slots.title?A(e.$slots,"title",{key:1}):(j(),X(he,{key:0},[He(Ze(e.title),1)],64))],2),de("ul",null,[A(e.$slots,"default")])],2)}var Ne=me(ht,[["render",bt],["__file","menu-item-group.vue"]]);const wt=Je(rt,{MenuItem:we,MenuItemGroup:Ne,SubMenu:ge}),Nt=Me(we),Ot=Me(Ne),Pt=Me(ge);export{wt as E,Nt as a,Ot as b,Pt as c};
