import{d as x,y as d,S as g,o as _,e as w,w as s,k as t,s as y,l as v,a as B,t as I,g as V,W as N,V as S}from"./index.Bw-HXdJa.js";import{E as F}from"./el-result.D5wms3tz.js";import{E as R,a as $}from"./el-form-item.DdTFErcb.js";import{_ as A}from"./index.oEjjvhXs.js";/* empty css                  *//* empty css                 */import{_ as D,E as L,a as M}from"./commonPage.vue_vue_type_script_setup_true_lang.VZvqZhV5.js";import{E as P}from"./index.CTGuaza0.js";import{E as T}from"./index.GJMPp4rU.js";import"./constants.Dnj8X3EN.js";import"./castArray.BRNpEoYs.js";import"./use-form-common-props.BgNKS3AW.js";import"./error.Cq9Fpw4b.js";import"./index.C_MNJChK.js";import"./_Uint8Array.CtrPbzOU.js";import"./index.BHXUVmxi.js";import"./_initCloneObject.DfkDKOcq.js";import"./event.BB_Ol6Sd.js";import"./index.CT2l5eDu.js";import"./vnode.C9FGNq6A.js";/* empty css                  */import"./el-main.B07pfieo.js";import"./logo.B4m6Habq.js";import"./use-form-item.CTr4H4j6.js";import"./index.r5W6hzzQ.js";const W=y("div",{class:"el-form-item-msg"},"请输入注册时填写的登录账号",-1),Y={class:"yzm"},j={key:0},G=y("div",{class:"el-form-item-msg"},"请输入包含英文、数字的8位以上密码",-1),ye=x({__name:"resetPassword",setup(H){const u=d(0),i=d(!1),p=d(0),f=d(),o=g({user:"",phone:"",yzm:"",newpw:"",newpw2:""}),E=g({user:[{required:!0,message:"请输入登录账号"}],phone:[{required:!0,message:"请输入手机号"}],yzm:[{required:!0,message:"请输入短信验证码"}],newpw:[{required:!0,message:"请输入新的密码"}],newpw2:[{required:!0,message:"请再次输入新的密码"},{validator:(a,e,r)=>{e!==o.newpw?r(new Error("两次输入密码不一致")):r()}}]}),b=async a=>{a&&await a.validateField("phone",e=>{if(e){N.success("已发送短信至手机号码"),i.value=!0,p.value=60;var r=setInterval(()=>{p.value-=1,p.value<1&&(clearInterval(r),i.value=!1,p.value=0)},1e3)}})},k=async a=>{a&&await a.validate(e=>{e&&(u.value=1)})},h=()=>{S.push({path:"/login"})};return(a,e)=>{const r=L,z=M,m=P,n=R,c=T,C=A,U=$,q=F;return _(),w(D,{title:"重置密码"},{default:s(()=>[t(z,{active:u.value,simple:"","finish-status":"success"},{default:s(()=>[t(r,{title:"填写新密码"}),t(r,{title:"完成重置"})]),_:1},8,["active"]),u.value==0?(_(),w(U,{key:0,ref_key:"formRef",ref:f,model:o,rules:E,"label-width":120},{default:s(()=>[t(n,{label:"登录账号",prop:"user"},{default:s(()=>[t(m,{modelValue:o.user,"onUpdate:modelValue":e[0]||(e[0]=l=>o.user=l),placeholder:"请输入登录账号"},null,8,["modelValue"]),W]),_:1}),t(n,{label:"手机号码",prop:"phone"},{default:s(()=>[t(m,{modelValue:o.phone,"onUpdate:modelValue":e[1]||(e[1]=l=>o.phone=l),placeholder:"请输入手机号码"},null,8,["modelValue"])]),_:1}),t(n,{label:"短信验证码",prop:"yzm"},{default:s(()=>[y("div",Y,[t(m,{modelValue:o.yzm,"onUpdate:modelValue":e[2]||(e[2]=l=>o.yzm=l),placeholder:"请输入6位短信验证码"},null,8,["modelValue"]),t(c,{onClick:e[3]||(e[3]=l=>b(f.value)),disabled:i.value},{default:s(()=>[v("获取验证码"),i.value?(_(),B("span",j," ("+I(p.value)+")",1)):V("",!0)]),_:1},8,["disabled"])])]),_:1}),t(n,{label:"新密码",prop:"newpw"},{default:s(()=>[t(m,{modelValue:o.newpw,"onUpdate:modelValue":e[4]||(e[4]=l=>o.newpw=l),"show-password":"",placeholder:"请输入新密码"},null,8,["modelValue"]),G,t(C,{modelValue:o.newpw,"onUpdate:modelValue":e[5]||(e[5]=l=>o.newpw=l)},null,8,["modelValue"])]),_:1}),t(n,{label:"确认新密码",prop:"newpw2"},{default:s(()=>[t(m,{modelValue:o.newpw2,"onUpdate:modelValue":e[6]||(e[6]=l=>o.newpw2=l),"show-password":"",placeholder:"请再一次输入新密码"},null,8,["modelValue"])]),_:1}),t(n,null,{default:s(()=>[t(c,{type:"primary",onClick:e[7]||(e[7]=l=>k(f.value))},{default:s(()=>[v("提交")]),_:1})]),_:1})]),_:1},8,["model","rules"])):V("",!0),u.value==1?(_(),w(q,{key:1,icon:"success",title:"密码重置成功","sub-title":"请牢记自己的新密码,返回登录后使用新密码登录"},{extra:s(()=>[t(c,{type:"primary",onClick:h},{default:s(()=>[v("返回登录")]),_:1})]),_:1})):V("",!0)]),_:1})}}});export{ye as default};
