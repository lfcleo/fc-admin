import{d as u,o as p,e as g,w as a,k as e}from"./index.Bw-HXdJa.js";import{a as h}from"./el-main.B07pfieo.js";import{E as f}from"./el-row.BEUSs2Qz.js";import{E as b}from"./el-col.DlOUmWKu.js";import{E as y}from"./el-card.6quAyc34.js";import{_}from"./index.vue_vue_type_script_setup_true_name_ECharts_lang.L1Eiv2EH.js";const D=u({__name:"echarts",setup(x){const l={title:{text:"柱状图",textStyle:{color:"#a1a1a1"}},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{textStyle:{color:"#a1a1a1"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisLabel:{color:"#a1a1a1"}}],yAxis:[{type:"value",axisLabel:{color:"#a1a1a1"}}],series:[{name:"Direct",type:"bar",emphasis:{focus:"series"},data:[320,332,301,334,390,330,320]},{name:"Email",type:"bar",stack:"Ad",emphasis:{focus:"series"},data:[120,132,101,134,90,230,210]},{name:"Union Ads",type:"bar",stack:"Ad",emphasis:{focus:"series"},data:[220,182,191,234,290,330,310]},{name:"Video Ads",type:"bar",stack:"Ad",emphasis:{focus:"series"},data:[150,232,201,154,190,330,410]}]},s={title:{text:"折线图",textStyle:{color:"#a1a1a1"}},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:["Email","Union Ads","Video Ads","Direct"],textStyle:{color:"#a1a1a1"}},toolbox:{feature:{saveAsImage:{}}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisLabel:{color:"#a1a1a1"}}],yAxis:[{type:"value",axisLabel:{color:"#a1a1a1"}}],series:[{name:"Email",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"series"},data:[120,132,101,134,90,230,210]},{name:"Union Ads",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"series"},data:[220,182,191,234,290,330,310]},{name:"Video Ads",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"series"},data:[150,232,201,154,190,330,410]},{name:"Direct",type:"line",stack:"Total",areaStyle:{},emphasis:{focus:"series"},data:[320,332,301,334,390,330,320]}]},i={title:{text:"雷达图",textStyle:{color:"#a1a1a1"}},legend:{data:["Allocated Budget","Actual Spending"],textStyle:{color:"#a1a1a1"}},radar:{shape:"circle",indicator:[{name:"Sales"},{name:"Administration"},{name:"Information Technology"},{name:"Customer Support"},{name:"Development"},{name:"Marketing"}]},series:[{name:"Budget vs spending",type:"radar",data:[{value:[4200,3e3,2e4,35e3,5e4,18e3],name:"Allocated Budget"},{value:[5e3,14e3,28e3,26e3,42e3,21e3],name:"Actual Spending"}]}]},n={title:{text:"饼图",textStyle:{color:"#a1a1a1"}},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{left:"center",top:"bottom",data:["rose 1","rose 2","rose 3","rose 4"],textStyle:{color:"#a1a1a1"}},toolbox:{show:!0,feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},restore:{show:!0},saveAsImage:{show:!0}}},series:[{name:"Radius Mode",type:"pie",radius:[60,280],center:["50%","50%"],roseType:"radius",itemStyle:{borderRadius:5},label:{show:!0},emphasis:{label:{show:!0}},data:[{value:10,name:"rose 1"},{value:8,name:"rose 2"},{value:8,name:"rose 3"},{value:8,name:"rose 4"}]}]},d={title:{text:"嵌套环形图",textStyle:{color:"#a1a1a1"}},tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{data:["Direct","Email","Baidu","Google"],textStyle:{color:"#a1a1a1"}},series:[{name:"Access From",type:"pie",selectedMode:"single",radius:[0,"30%"],label:{position:"inner",fontSize:14},labelLine:{show:!1},data:[{value:1548,name:"Search Engine"},{value:775,name:"Direct"},{value:679,name:"Marketing",selected:!0}]},{name:"Access From",type:"pie",radius:["45%","60%"],labelLine:{length:30},label:{formatter:`{a|{a}}{abg|}
{hr|}
  {b|{b}：}{c}  {per|{d}%}  `,backgroundColor:"#F6F8FC",borderColor:"#8C8D8E",borderWidth:1,borderRadius:4,rich:{a:{color:"#6E7079",lineHeight:22,align:"center"},hr:{borderColor:"#8C8D8E",width:"100%",borderWidth:1,height:0},b:{color:"#4C5058",fontSize:14,fontWeight:"bold",lineHeight:33},per:{color:"#fff",backgroundColor:"#4C5058",padding:[3,4],borderRadius:4}}},data:[{value:1048,name:"Baidu"},{value:335,name:"Direct"},{value:310,name:"Email"},{value:251,name:"Google"}]}]};return(S,v)=>{const t=_,o=y,r=b,c=f,m=h;return p(),g(m,null,{default:a(()=>[e(c,{gutter:15},{default:a(()=>[e(r,{lg:8},{default:a(()=>[e(o,{shadow:"never"},{default:a(()=>[e(t,{height:300,option:l})]),_:1})]),_:1}),e(r,{lg:8},{default:a(()=>[e(o,{shadow:"never"},{default:a(()=>[e(t,{height:300,option:s})]),_:1})]),_:1}),e(r,{lg:8},{default:a(()=>[e(o,{shadow:"never"},{default:a(()=>[e(t,{height:300,option:i})]),_:1})]),_:1}),e(r,{lg:12},{default:a(()=>[e(o,{shadow:"never"},{default:a(()=>[e(t,{height:600,option:n})]),_:1})]),_:1}),e(r,{lg:12},{default:a(()=>[e(o,{shadow:"never"},{default:a(()=>[e(t,{height:600,option:d})]),_:1})]),_:1})]),_:1})]),_:1})}}});export{D as default};
