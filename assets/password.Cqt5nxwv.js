import{d as V,S as d,y as E,o as y,e as g,w as t,k as o,l as v,s as i,V as h}from"./index.Bw-HXdJa.js";import{E as x}from"./el-card.6quAyc34.js";import{E as N,a as b}from"./el-form-item.DdTFErcb.js";/* empty css                  */import{_ as B}from"./index.oEjjvhXs.js";/* empty css                 */import{E as k}from"./el-alert.CuN-_INI.js";import{E as C}from"./index.D9swEZg7.js";import{E as U}from"./index.CTGuaza0.js";import{E as q}from"./index.GJMPp4rU.js";import"./constants.Dnj8X3EN.js";import"./castArray.BRNpEoYs.js";import"./use-form-common-props.BgNKS3AW.js";import"./error.Cq9Fpw4b.js";import"./index.C_MNJChK.js";import"./_Uint8Array.CtrPbzOU.js";import"./index.BHXUVmxi.js";import"./_initCloneObject.DfkDKOcq.js";import"./index.DG3RyMHR.js";import"./scroll.q23gPQds.js";import"./vnode.C9FGNq6A.js";import"./aria.nkjrUMQ-.js";import"./focus-trap.BAcfioKZ.js";import"./validator.Bp9ffmHk.js";import"./event.BB_Ol6Sd.js";import"./use-form-item.CTr4H4j6.js";import"./index.r5W6hzzQ.js";const F=i("div",{class:"el-form-item-msg"},"必须提供当前登录用户密码才能进行更改",-1),I=i("div",{class:"el-form-item-msg"},"请输入包含英文、数字的8位以上密码",-1),ne=V({__name:"password",setup(R){const r=d({userPassword:"",newPassword:"",confirmNewPassword:""}),u=d({userPassword:[{required:!0,message:"请输入当前密码"}],newPassword:[{required:!0,message:"请输入新密码"}],confirmNewPassword:[{required:!0,message:"请再次输入新密码"},{validator:(a,e,l)=>{e!==r.newPassword?l(new Error("两次输入密码不一致")):l()}}]}),p=E(),w=async a=>{a&&await a.validate(e=>{e&&C.confirm("密码修改成功，是否跳转至登录页使用新密码登录","修改成功",{type:"success"}).then(()=>{h.replace({path:"/login"})}).catch(()=>{})})};return(a,e)=>{const l=k,n=U,m=N,f=B,_=q,c=b,P=x;return y(),g(P,{shadow:"never",header:"修改密码"},{default:t(()=>[o(l,{title:"密码更新成功后，您将被重定向到登录页面，您可以使用新密码重新登录。",type:"info","show-icon":"",style:{"margin-bottom":"15px"}}),o(c,{ref_key:"formRef",ref:p,model:r,rules:u,"label-width":"120px",style:{"margin-top":"20px"}},{default:t(()=>[o(m,{label:"当前密码",prop:"userPassword"},{default:t(()=>[o(n,{modelValue:r.userPassword,"onUpdate:modelValue":e[0]||(e[0]=s=>r.userPassword=s),type:"password","show-password":"",placeholder:"请输入当前密码"},null,8,["modelValue"]),F]),_:1}),o(m,{label:"新密码",prop:"newPassword"},{default:t(()=>[o(n,{modelValue:r.newPassword,"onUpdate:modelValue":e[1]||(e[1]=s=>r.newPassword=s),type:"password","show-password":"",placeholder:"请输入新密码"},null,8,["modelValue"]),o(f,{modelValue:r.newPassword,"onUpdate:modelValue":e[2]||(e[2]=s=>r.newPassword=s)},null,8,["modelValue"]),I]),_:1}),o(m,{label:"确认新密码",prop:"confirmNewPassword"},{default:t(()=>[o(n,{modelValue:r.confirmNewPassword,"onUpdate:modelValue":e[3]||(e[3]=s=>r.confirmNewPassword=s),type:"password","show-password":"",placeholder:"请再次输入新密码"},null,8,["modelValue"])]),_:1}),o(m,null,{default:t(()=>[o(_,{type:"primary",onClick:e[4]||(e[4]=s=>w(p.value))},{default:t(()=>[v("保存密码")]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1})}}});export{ne as default};