const __vite__fileDeps=["./account.B6W7mtJ3.js","./index.Bw-HXdJa.js","./index.BiL6X3Aw.css","./el-card.6quAyc34.js","./el-card.BRs6t4Sx.css","./el-form-item.DdTFErcb.js","./constants.Dnj8X3EN.js","./castArray.BRNpEoYs.js","./use-form-common-props.BgNKS3AW.js","./error.Cq9Fpw4b.js","./index.C_MNJChK.js","./_Uint8Array.CtrPbzOU.js","./index.BHXUVmxi.js","./_initCloneObject.DfkDKOcq.js","./el-form-item.DeFBUyhQ.css","./el-tag.CzZPdati.js","./el-tag.GlP_X63n.css","./el-select.DntxXXo5.js","./index.CTGuaza0.js","./event.BB_Ol6Sd.js","./use-form-item.CTr4H4j6.js","./el-popper.BrmkM6_b.js","./isUndefined.DCTLXrZ8.js","./focus-trap.BAcfioKZ.js","./el-popper.Dp4T8EOK.css","./el-scrollbar.BL44KAAM.js","./el-scrollbar.DgVM_IK3.css","./token.DI9FKtlJ.js","./strings.Cl9EmgRa.js","./isEqual.Ckuk4erB.js","./scroll.q23gPQds.js","./debounce.RM8y6Bmx.js","./index.xSHHmd7U.js","./el-select.t6gegVI7.css","./el-alert.CuN-_INI.js","./el-alert.CGNjtr_4.css","./index.GJMPp4rU.js","./index.r5W6hzzQ.js","./el-button.BWsECEeL.css","./el-input.CxR3fIHd.css","./setting.CI71qBml.js","./el-color-picker.Deh1uEtl.js","./el-color-picker.BdOz0oAF.css","./el-switch.CENBarjO.js","./validator.Bp9ffmHk.js","./el-switch.Cnha7ZgU.css","./pushSettings.Da7h6v7C.js","./index.B6LaodqR.js","./el-checkbox.C4LPJRI2.css","./password.Cqt5nxwv.js","./index.oEjjvhXs.js","./index.CuNgN6L6.css","./index.D9swEZg7.js","./index.DG3RyMHR.js","./vnode.C9FGNq6A.js","./aria.nkjrUMQ-.js","./space.DbH1Usfh.js","./el-row.BEUSs2Qz.js","./el-col.DlOUmWKu.js","./el-col.EDDeApav.css","./el-row.kmzYOPyF.css","./index.B7DHPGNW.js","./el-tooltip.l0sNRNKZ.js","./index.DxxW388J.css","./el-progress.CDNSOGiL.js","./el-progress.Dy5ni5x8.css","./logs.jRN2xOr9.js","./index.BtqTwnCc.js","./el-loading.DVMv0Nzu.js","./el-loading.D5XuAxUM.css","./el-empty.C4HW-14l.js","./el-empty.BQnRFgPe.css","./sortable.esm.C0-Qcoum.js","./index.Bvs7mmi0.js","./index.Bt923kQR.css","./upToEnterprise.CeQsFnbh.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as T,z as X,T as Y,b as $,d as v,u as z,o as t,a as _,e as i,f as l,a8 as Z,g as P,n as w,_ as M,a9 as ee,F as f,m as h,h as L,k as s,aa as R,ab as te,j as oe,N as ne,x as ae,ac as D,w as o,s as g,t as O,l as se,ad as le,r as B,ae as p,E as re,af as m}from"./index.Bw-HXdJa.js";/* empty css                  */import{E as ie,a as ue,b as ce,d as pe}from"./el-main.B07pfieo.js";import{E as me,a as _e,b as de}from"./el-menu-item.DF75fe87.js";import"./el-tooltip.l0sNRNKZ.js";import"./el-popper.BrmkM6_b.js";import{E as fe}from"./el-tag.CzZPdati.js";import{E as ve}from"./el-avatar.CzdbRHUh.js";import"./aria.nkjrUMQ-.js";import"./index.BOG6n9gv.js";import"./index.r5W6hzzQ.js";import"./error.Cq9Fpw4b.js";import"./vnode.C9FGNq6A.js";import"./index.xSHHmd7U.js";import"./index.BHXUVmxi.js";import"./index.C_MNJChK.js";import"./isUndefined.DCTLXrZ8.js";import"./constants.Dnj8X3EN.js";import"./focus-trap.BAcfioKZ.js";import"./use-form-common-props.BgNKS3AW.js";const Ee=(u,r=0)=>{if(r===0)return u;const n=T(!1);let a=0;const c=()=>{a&&clearTimeout(a),a=window.setTimeout(()=>{n.value=u.value},r)};return X(c),Y(()=>u.value,e=>{e?c():n.value=e}),n},ke=$({animated:{type:Boolean,default:!1},count:{type:Number,default:1},rows:{type:Number,default:3},loading:{type:Boolean,default:!0},throttle:{type:Number}}),ge=$({variant:{type:String,values:["circle","rect","h1","h3","text","caption","p","image","button"],default:"text"}}),he=v({name:"ElSkeletonItem"}),ye=v({...he,props:ge,setup(u){const r=z("skeleton");return(n,a)=>(t(),_("div",{class:w([l(r).e("item"),l(r).e(n.variant)])},[n.variant==="image"?(t(),i(l(Z),{key:0})):P("v-if",!0)],2))}});var y=M(ye,[["__file","skeleton-item.vue"]]);const Ie=v({name:"ElSkeleton"}),Ne=v({...Ie,props:ke,setup(u,{expose:r}){const n=u,a=z("skeleton"),c=Ee(ee(n,"loading"),n.throttle);return r({uiLoading:c}),(e,b)=>l(c)?(t(),_("div",R({key:0,class:[l(a).b(),l(a).is("animated",e.animated)]},e.$attrs),[(t(!0),_(f,null,h(e.count,E=>(t(),_(f,{key:E},[e.loading?L(e.$slots,"template",{key:E},()=>[s(y,{class:w(l(a).is("first")),variant:"p"},null,8,["class"]),(t(!0),_(f,null,h(e.rows,k=>(t(),i(y,{key:k,class:w([l(a).e("paragraph"),l(a).is("last",k===e.rows&&e.rows>1)]),variant:"p"},null,8,["class"]))),128))]):P("v-if",!0)],64))),128))],16)):L(e.$slots,"default",te(R({key:1},e.$attrs)))}});var Te=M(Ne,[["__file","skeleton.vue"]]);const we=oe(Te,{SkeletonItem:y});ne(y);const Pe={class:"user-info-top"},Ue=v({__name:"index",setup(u){const r=ae(),n=p(()=>m(()=>import("./account.B6W7mtJ3.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]),import.meta.url)),a=p(()=>m(()=>import("./setting.CI71qBml.js"),__vite__mapDeps([40,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,41,36,37,42,43,44,45,39,38]),import.meta.url)),c=p(()=>m(()=>import("./pushSettings.Da7h6v7C.js"),__vite__mapDeps([46,1,2,3,4,5,6,7,8,9,10,11,12,13,14,47,19,20,29,48]),import.meta.url)),e=p(()=>m(()=>import("./password.Cqt5nxwv.js"),__vite__mapDeps([49,1,2,3,4,5,6,7,8,9,10,11,12,13,14,50,51,34,35,52,36,20,37,18,19,53,30,54,55,23,44,38,39]),import.meta.url)),b=p(()=>m(()=>import("./space.DbH1Usfh.js"),__vite__mapDeps([56,1,2,57,58,59,60,3,4,61,62,21,12,10,22,6,23,24,63,64,65]),import.meta.url)),E=p(()=>m(()=>import("./logs.jRN2xOr9.js"),__vite__mapDeps([66,1,2,3,4,67,68,69,15,8,6,16,17,18,12,19,20,10,9,21,22,23,24,25,26,27,28,29,11,30,31,32,7,33,70,71,72,47,13,73,74,39,48]),import.meta.url)),k=p(()=>m(()=>import("./upToEnterprise.CeQsFnbh.js"),__vite__mapDeps([75,1,2,70,10,71,36,20,6,8,37,38]),import.meta.url)),C=T("账号信息"),S=T(D(n)),j=[{groupName:"基本设置",list:[{icon:"Postcard",title:"账号信息",component:n},{icon:"Operation",title:"个人设置",component:a},{icon:"Lock",title:"密码",component:e},{icon:"Bell",title:"通知设置",component:c}]},{groupName:"数据管理",list:[{icon:"Coin",title:"存储空间信息",component:b},{icon:"Clock",title:"操作日志",component:E}]},{groupName:"账号升级",list:[{icon:"OfficeBuilding",title:"升级为企业账号",component:k}]}],x=I=>{C.value=I.title,S.value=D(I.component)};return(I,be)=>{const F=ve,H=fe,G=ie,q=re,J=_e,K=de,Q=me,A=ue,V=ce,U=pe,W=we;return t(),i(V,{class:"page-user"},{default:o(()=>[s(U,{style:{width:"240px"}},{default:o(()=>[s(V,null,{default:o(()=>[s(G,{style:{height:"auto",display:"block"}},{default:o(()=>[g("div",Pe,[s(F,{size:70,src:"/img/avatar.jpg"}),g("h2",null,O(l(r).userInfo.userName),1),g("p",null,[s(H,{effect:"dark",round:"",size:"large","disable-transitions":""},{default:o(()=>[se("超级管理员")]),_:1})])])]),_:1}),s(A,{class:"nopadding"},{default:o(()=>[s(Q,{class:"menu","default-active":C.value},{default:o(()=>[(t(),_(f,null,h(j,N=>s(K,{key:N.groupName,title:N.groupName},{default:o(()=>[(t(!0),_(f,null,h(N.list,d=>(t(),i(J,{key:d.title,index:d.title,onClick:Ce=>x(d)},{title:o(()=>[g("span",null,O(d.title),1)]),default:o(()=>[d.icon?(t(),i(q,{key:0},{default:o(()=>[(t(),i(B(d.icon)))]),_:2},1024)):P("",!0)]),_:2},1032,["index","onClick"]))),128))]),_:2},1032,["title"])),64))]),_:1},8,["default-active"])]),_:1})]),_:1})]),_:1}),s(A,null,{default:o(()=>[(t(),i(le,null,{default:o(()=>[(t(),i(B(S.value)))]),fallback:o(()=>[s(W,{rows:3})]),_:1}))]),_:1})]),_:1})}}});export{Ue as default};
