import{d as L,x as O,y as x,z as j,o as q,e as F,w as t,k as e,s as a,t as r,l,f as u,A as b,E as H,B as J,p as R,q as $,v as G}from"./index.Bw-HXdJa.js";import{a as K}from"./el-main.B07pfieo.js";import{E as Q}from"./el-row.BEUSs2Qz.js";import{_ as W}from"./index.vue_vue_type_script_setup_true_name_ECharts_lang.L1Eiv2EH.js";import{E as X,a as Y,p as _}from"./package.Cxf86oqP.js";import{E as Z}from"./el-tag.CzZPdati.js";/* empty css                 */import{_ as ee}from"./index.B7DHPGNW.js";import{_ as te}from"./index.EsIuICRq.js";import{E as ae}from"./el-col.DlOUmWKu.js";import{E as oe}from"./el-card.6quAyc34.js";import{E as le}from"./el-avatar.CzdbRHUh.js";import{h as se}from"./index.BD3XrQao.js";import"./vnode.C9FGNq6A.js";import"./use-form-common-props.BgNKS3AW.js";import"./constants.Dnj8X3EN.js";import"./el-tooltip.l0sNRNKZ.js";import"./el-popper.BrmkM6_b.js";import"./index.BHXUVmxi.js";import"./index.C_MNJChK.js";import"./isUndefined.DCTLXrZ8.js";import"./focus-trap.BAcfioKZ.js";import"./index.D9swEZg7.js";import"./index.GJMPp4rU.js";import"./use-form-item.CTr4H4j6.js";import"./index.r5W6hzzQ.js";import"./index.CTGuaza0.js";import"./event.BB_Ol6Sd.js";import"./error.Cq9Fpw4b.js";import"./index.DG3RyMHR.js";import"./scroll.q23gPQds.js";import"./aria.nkjrUMQ-.js";import"./validator.Bp9ffmHk.js";const ne=()=>se.get("/apiv1/dashboard"),d=m=>(R("data-v-b927ab6e"),m=m(),$(),m),de={class:"tip-body"},re={class:"tip-title"},ie=d(()=>a("div",{class:"tip-desc"},[a("a",{target:"_balnk",href:"https://gitee.com/lfcleo/fc-admin"}," FC-Admin"),l("，基于 "),a("a",{target:"_balnk",href:"https://gitee.com/lolicode/scui"}," SCUI "),l(" 开发。使用了最新的Vue3、 Vite、Element-Plus、TypeScript、Pinia等主流技术开发。从零搭建的一套后台管理框架。 "),a("a",{target:"_balnk",href:"https://gitee.com/lfcleo/fc-admin"}," 文档地址点击这里 "),l("。 ")],-1)),ue={class:"vab-card-header"},_e=d(()=>a("div",null,"待处理",-1)),ce=d(()=>a("div",null,"处理信息1",-1)),pe=d(()=>a("div",null,"处理信息2",-1)),me=d(()=>a("div",null,"处理信息3",-1)),fe=d(()=>a("div",null,"处理信息4",-1)),ve={class:"vab-card-header"},he=d(()=>a("div",null,"信息",-1)),ge={class:"vab-card-header"},xe=d(()=>a("div",null,"分析概览",-1)),be={class:"vab-card-header"},we=d(()=>a("div",null,"数据统计",-1)),Ee=L({__name:"index",setup(m){const w=O(),E=x({}),V=x({}),c=x(7.7),y=x(-6.7);j(()=>{D()});const D=async()=>{let f=await ne();E.value=f.data.lineChart,V.value=f.data.columnChart},I=()=>{const o=new Date().getHours();return o>=6&&o<12?"上午好，"+w.userInfo.userName+"。元气满满的早晨，加油哦。":o>=12&&o<18?"中午好，"+w.userInfo.userName+"。忙碌了一上午，记得吃午饭哦。":"晚上好，"+w.userInfo.userName+"。睡觉要有好梦。"};return(f,o)=>{const C=le,s=oe,n=ae,v=te,h=ee,k=b("EditPen"),g=H,A=J,N=b("Message"),B=Z,p=X,T=Y,U=b("DataLine"),S=W,M=b("DataAnalysis"),P=Q,z=K;return q(),F(z,null,{default:t(()=>[e(P,{gutter:15},{default:t(()=>[e(n,{xs:24,sm:24,md:24,lg:24,xl:24},{default:t(()=>[e(s,{shadow:"never",class:"welcome"},{default:t(()=>[e(C,{size:"large",src:"/img/avatar.jpg"}),a("div",de,[a("div",re,r(I()),1),ie])]),_:1})]),_:1}),e(n,{xs:24,sm:24,md:12,lg:6,xl:6},{default:t(()=>[e(s,{shadow:"never",class:"vab-card vab-card-primary"},{default:t(()=>[e(h,{title:"总销量",value:"123456.78",prefix:"¥",groupSeparator:"",style:{color:"white"}},{default:t(()=>[e(v,{modelValue:c.value,"onUpdate:modelValue":o[0]||(o[0]=i=>c.value=i)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(n,{xs:24,sm:24,md:12,lg:6,xl:6},{default:t(()=>[e(s,{shadow:"never",class:"vab-card"},{default:t(()=>[e(h,{title:"今日净利润",value:"123456.78",prefix:"¥",groupSeparator:""},{default:t(()=>[e(v,{modelValue:c.value,"onUpdate:modelValue":o[1]||(o[1]=i=>c.value=i)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(n,{xs:24,sm:24,md:12,lg:6,xl:6},{default:t(()=>[e(s,{shadow:"never",class:"vab-card"},{default:t(()=>[e(h,{title:"总成交",value:"456789.88",prefix:"¥",groupSeparator:""},{default:t(()=>[e(v,{modelValue:c.value,"onUpdate:modelValue":o[2]||(o[2]=i=>c.value=i)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(n,{xs:24,sm:24,md:12,lg:6,xl:6},{default:t(()=>[e(s,{shadow:"never",class:"vab-card"},{default:t(()=>[e(h,{title:"订单量",value:"7890",suffix:"单",groupSeparator:""},{default:t(()=>[e(v,{modelValue:y.value,"onUpdate:modelValue":o[3]||(o[3]=i=>y.value=i)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(n,{xs:24,sm:24,md:24,lg:12,xl:12},{default:t(()=>[e(s,{shadow:"never",class:"vab-card"},{header:t(()=>[a("div",ue,[e(g,null,{default:t(()=>[e(k)]),_:1}),_e,e(A,{value:12})])]),default:t(()=>[ce,pe,me,fe]),_:1})]),_:1}),e(n,{xs:24,sm:24,md:24,lg:12,xl:12},{default:t(()=>[e(s,{shadow:"never",class:"vab-card"},{header:t(()=>[a("div",ve,[e(g,null,{default:t(()=>[e(N)]),_:1}),he]),e(B,{type:"success"},{default:t(()=>[l("当前版本："+r(u(_).version)+"。更新时间：2024-6-22",1)]),_:1})]),default:t(()=>[e(T,{border:"",column:3},{default:t(()=>[e(p,{label:"vue"},{default:t(()=>[l(r(u(_).dependencies.vue),1)]),_:1}),e(p,{label:"element-plus"},{default:t(()=>[l(r(u(_).dependencies["element-plus"]),1)]),_:1}),e(p,{label:"pinia"},{default:t(()=>[l(r(u(_).dependencies.pinia),1)]),_:1}),e(p,{label:"vue-router"},{default:t(()=>[l(r(u(_).dependencies["vue-router"]),1)]),_:1}),e(p,{label:"axios"},{default:t(()=>[l(r(u(_).dependencies.axios),1)]),_:1}),e(p,{label:"vue-i18n"},{default:t(()=>[l(r(u(_).dependencies["vue-i18n"]),1)]),_:1})]),_:1})]),_:1})]),_:1}),e(n,{xs:24,sm:24,md:24,lg:12,xl:12},{default:t(()=>[e(s,{shadow:"never",class:"vab-card"},{header:t(()=>[a("div",ge,[e(g,null,{default:t(()=>[e(U)]),_:1}),xe])]),default:t(()=>[e(S,{style:{height:"300px"},option:E.value},null,8,["option"])]),_:1})]),_:1}),e(n,{xs:24,sm:24,md:24,lg:12,xl:12},{default:t(()=>[e(s,{shadow:"never",class:"vab-card"},{header:t(()=>[a("div",be,[e(g,null,{default:t(()=>[e(M)]),_:1}),we])]),default:t(()=>[e(S,{style:{height:"300px"},option:V.value},null,8,["option"])]),_:1})]),_:1})]),_:1})]),_:1})}}}),at=G(Ee,[["__scopeId","data-v-b927ab6e"]]);export{at as default};