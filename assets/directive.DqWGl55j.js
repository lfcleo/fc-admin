import{d as E,S as k,o as t,e as r,w as e,k as a,G as s,l as i,s as b,a3 as l,W as p}from"./index.Bw-HXdJa.js";import{a as M}from"./el-main.B07pfieo.js";import{E as B}from"./el-alert.CuN-_INI.js";import{E as N}from"./el-card.6quAyc34.js";/* empty css                  */import{E as V}from"./index.GJMPp4rU.js";import"./use-form-item.CTr4H4j6.js";import"./constants.Dnj8X3EN.js";import"./index.C_MNJChK.js";import"./use-form-common-props.BgNKS3AW.js";import"./index.r5W6hzzQ.js";const D={style:{width:"100%",height:"500px"}},J=E({__name:"directive",setup(F){const u=k({text:"FC-Admin",textColor:"rgba(180, 180, 180, 0.8)"}),_=()=>{p.success("我是防抖按钮触发的事件")},m=()=>{p.success("我是节流按钮触发的事件")},v=()=>{p.success("长按事件触发成功")};return(S,T)=>{const o=V,d=N,n=B,h=M,y=l("copy"),f=l("debounce"),x=l("throttle"),g=l("longpress"),L=l("auth"),w=l("auths"),A=l("auths-all"),c=l("role"),C=l("waterMarker");return t(),r(h,null,{default:e(()=>[a(d,{shadow:"never",header:"通用指令"},{default:e(()=>[s((t(),r(o,{type:"primary"},{default:e(()=>[i("复制指令")]),_:1})),[[y,"我是从FC-Admin复制指令Copy的值"]]),s((t(),r(o,{type:"primary"},{default:e(()=>[i(" 防抖按钮 (连续点击只执行最后一次。0.5秒后执行) ")]),_:1})),[[f,_]]),s((t(),r(o,{type:"primary"},{default:e(()=>[i(" 节流按钮 (1S秒内多次点击只会执行1次) ")]),_:1})),[[x,m]]),s((t(),r(o,{type:"primary"},{default:e(()=>[i(" 长按指令（长按2秒触发事件） ")]),_:1})),[[g,v]])]),_:1}),a(d,{shadow:"never",header:"v-auth 高精度权限控制(根据本地存储permissions判断)",style:{"margin-top":"20px"}},{default:e(()=>[s((t(),r(o,{type:"primary"},{default:e(()=>[i(`v-auth="'user.add'"`)]),_:1})),[[L,"user.add"]]),s((t(),r(o,{type:"primary"},{default:e(()=>[i(`v-auths="['user.no','user.add']"`)]),_:1})),[[w,["user.no","user.add"]]]),s((t(),r(o,{type:"primary"},{default:e(()=>[i(`v-auths-all="'list.add', 'user.edit'"`)]),_:1})),[[A,["list.add","user.edit"]]]),a(n,{title:"v-auth指令 是$AUTH的语法糖, 原先需要使用v-if来判断是否有权限, 判断单项权限，如果满足就判断有权限，不满足会隐藏。",style:{"margin-top":"20px"}}),a(n,{title:"v-auths指令 传入数组,有一项满足就判断有权限，不满足会隐藏。",style:{"margin-top":"20px"}}),a(n,{title:"v-auths-all指令 传入数组,必须全满足才有权限，比如user.no没有这个权限，加到这里的话就表示不全部满足，会隐藏。",style:{"margin-top":"20px"}}),a(n,{title:"本地存储的permissions包含有ALL，则v-auth,v-auths,v-auths-all指令都会显示。ALL为最高权限。",style:{"margin-top":"20px"}})]),_:1}),a(d,{shadow:"never",header:"v-role 角色权限控制(根据本地存储userinfo.role判断)",style:{"margin-top":"20px"}},{default:e(()=>[s((t(),r(o,{type:"primary"},{default:e(()=>[i(`v-role="'admin'"`)]),_:1})),[[c,["admin"]]]),s((t(),r(o,{type:"primary"},{default:e(()=>[i(`v-role="['ALL','admin']"`)]),_:1})),[[c,["ALL","admin"]]]),a(n,{title:"v-role指令 是$ROLE的语法糖, 原理是判断是否含有用户所在的角色别名",style:{"margin-top":"20px"}}),a(n,{title:"本地存储的userinfo.role包含有ALL，则v-role指令会显示。ALL为最高权限。",style:{"margin-top":"20px"}})]),_:1}),a(d,{shadow:"never",header:"水印指令",style:{"margin-top":"20px"}},{default:e(()=>[s(b("div",D,null,512),[[C,u]])]),_:1})]),_:1})}}});export{J as default};
