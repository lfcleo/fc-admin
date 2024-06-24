import{g as lt}from"./uuid.D_VhYxgV.js";import{d as _t,y as ft,c as Dt,z as Ut,o as Ft,a as vt,s as zt,a0 as dt}from"./index.Bw-HXdJa.js";var H={},kt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},mt={},N={};let it;const Ht=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];N.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};N.getSymbolTotalCodewords=function(t){return Ht[t]};N.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t};N.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');it=t};N.isKanjiModeEnabled=function(){return typeof it<"u"};N.toSJIS=function(t){return it(t)};var O={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+r)}}e.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},e.from=function(i,o){if(e.isValid(i))return i;try{return t(i)}catch{return o}}})(O);function yt(){this.buffer=[],this.length=0}yt.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let r=0;r<t;r++)this.putBit((e>>>t-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var Vt=yt;function V(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}V.prototype.set=function(e,t,r,i){const o=e*this.size+t;this.data[o]=r,i&&(this.reservedBit[o]=!0)};V.prototype.get=function(e,t){return this.data[e*this.size+t]};V.prototype.xor=function(e,t,r){this.data[e*this.size+t]^=r};V.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var Kt=V,Ct={};(function(e){const t=N.getSymbolSize;e.getRowColCoords=function(i){if(i===1)return[];const o=Math.floor(i/7)+2,n=t(i),s=n===145?26:Math.ceil((n-13)/(2*o-2))*2,c=[n-7];for(let u=1;u<o-1;u++)c[u]=c[u-1]-s;return c.push(6),c.reverse()},e.getPositions=function(i){const o=[],n=e.getRowColCoords(i),s=n.length;for(let c=0;c<s;c++)for(let u=0;u<s;u++)c===0&&u===0||c===0&&u===s-1||c===s-1&&u===0||o.push([n[c],n[u]]);return o}})(Ct);var Et={};const Jt=N.getSymbolSize,gt=7;Et.getPositions=function(t){const r=Jt(t);return[[0,0],[r-gt,0],[0,r-gt]]};var Bt={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},e.from=function(o){return e.isValid(o)?parseInt(o,10):void 0},e.getPenaltyN1=function(o){const n=o.size;let s=0,c=0,u=0,l=null,a=null;for(let E=0;E<n;E++){c=u=0,l=a=null;for(let h=0;h<n;h++){let f=o.get(E,h);f===l?c++:(c>=5&&(s+=t.N1+(c-5)),l=f,c=1),f=o.get(h,E),f===a?u++:(u>=5&&(s+=t.N1+(u-5)),a=f,u=1)}c>=5&&(s+=t.N1+(c-5)),u>=5&&(s+=t.N1+(u-5))}return s},e.getPenaltyN2=function(o){const n=o.size;let s=0;for(let c=0;c<n-1;c++)for(let u=0;u<n-1;u++){const l=o.get(c,u)+o.get(c,u+1)+o.get(c+1,u)+o.get(c+1,u+1);(l===4||l===0)&&s++}return s*t.N2},e.getPenaltyN3=function(o){const n=o.size;let s=0,c=0,u=0;for(let l=0;l<n;l++){c=u=0;for(let a=0;a<n;a++)c=c<<1&2047|o.get(l,a),a>=10&&(c===1488||c===93)&&s++,u=u<<1&2047|o.get(a,l),a>=10&&(u===1488||u===93)&&s++}return s*t.N3},e.getPenaltyN4=function(o){let n=0;const s=o.data.length;for(let u=0;u<s;u++)n+=o.data[u];return Math.abs(Math.ceil(n*100/s/5)-10)*t.N4};function r(i,o,n){switch(i){case e.Patterns.PATTERN000:return(o+n)%2===0;case e.Patterns.PATTERN001:return o%2===0;case e.Patterns.PATTERN010:return n%3===0;case e.Patterns.PATTERN011:return(o+n)%3===0;case e.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(n/3))%2===0;case e.Patterns.PATTERN101:return o*n%2+o*n%3===0;case e.Patterns.PATTERN110:return(o*n%2+o*n%3)%2===0;case e.Patterns.PATTERN111:return(o*n%3+(o+n)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}e.applyMask=function(o,n){const s=n.size;for(let c=0;c<s;c++)for(let u=0;u<s;u++)n.isReserved(u,c)||n.xor(u,c,r(o,u,c))},e.getBestMask=function(o,n){const s=Object.keys(e.Patterns).length;let c=0,u=1/0;for(let l=0;l<s;l++){n(l),e.applyMask(l,o);const a=e.getPenaltyN1(o)+e.getPenaltyN2(o)+e.getPenaltyN3(o)+e.getPenaltyN4(o);e.applyMask(l,o),a<u&&(u=a,c=l)}return c}})(Bt);var j={};const R=O,K=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],J=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];j.getBlocksCount=function(t,r){switch(r){case R.L:return K[(t-1)*4+0];case R.M:return K[(t-1)*4+1];case R.Q:return K[(t-1)*4+2];case R.H:return K[(t-1)*4+3];default:return}};j.getTotalCodewordsCount=function(t,r){switch(r){case R.L:return J[(t-1)*4+0];case R.M:return J[(t-1)*4+1];case R.Q:return J[(t-1)*4+2];case R.H:return J[(t-1)*4+3];default:return}};var pt={},Q={};const z=new Uint8Array(512),Y=new Uint8Array(256);(function(){let t=1;for(let r=0;r<255;r++)z[r]=t,Y[t]=r,t<<=1,t&256&&(t^=285);for(let r=255;r<512;r++)z[r]=z[r-255]})();Q.log=function(t){if(t<1)throw new Error("log("+t+")");return Y[t]};Q.exp=function(t){return z[t]};Q.mul=function(t,r){return t===0||r===0?0:z[Y[t]+Y[r]]};(function(e){const t=Q;e.mul=function(i,o){const n=new Uint8Array(i.length+o.length-1);for(let s=0;s<i.length;s++)for(let c=0;c<o.length;c++)n[s+c]^=t.mul(i[s],o[c]);return n},e.mod=function(i,o){let n=new Uint8Array(i);for(;n.length-o.length>=0;){const s=n[0];for(let u=0;u<o.length;u++)n[u]^=t.mul(o[u],s);let c=0;for(;c<n.length&&n[c]===0;)c++;n=n.slice(c)}return n},e.generateECPolynomial=function(i){let o=new Uint8Array([1]);for(let n=0;n<i;n++)o=e.mul(o,new Uint8Array([1,t.exp(n)]));return o}})(pt);const At=pt;function st(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}st.prototype.initialize=function(t){this.degree=t,this.genPoly=At.generateECPolynomial(this.degree)};st.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const r=new Uint8Array(t.length+this.degree);r.set(t);const i=At.mod(r,this.genPoly),o=this.degree-i.length;if(o>0){const n=new Uint8Array(this.degree);return n.set(i,o),n}return i};var Yt=st,It={},L={},ut={};ut.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var M={};const Nt="[0-9]+",$t="[A-Z $%*+\\-./:]+";let k="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";k=k.replace(/u/g,"\\u");const Ot="(?:(?![A-Z0-9 $%*+\\-./:]|"+k+`)(?:.|[\r
]))+`;M.KANJI=new RegExp(k,"g");M.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");M.BYTE=new RegExp(Ot,"g");M.NUMERIC=new RegExp(Nt,"g");M.ALPHANUMERIC=new RegExp($t,"g");const jt=new RegExp("^"+k+"$"),Qt=new RegExp("^"+Nt+"$"),Gt=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");M.testKanji=function(t){return jt.test(t)};M.testNumeric=function(t){return Qt.test(t)};M.testAlphanumeric=function(t){return Gt.test(t)};(function(e){const t=ut,r=M;e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(n,s){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?n.ccBits[0]:s<27?n.ccBits[1]:n.ccBits[2]},e.getBestModeForData=function(n){return r.testNumeric(n)?e.NUMERIC:r.testAlphanumeric(n)?e.ALPHANUMERIC:r.testKanji(n)?e.KANJI:e.BYTE},e.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},e.isValid=function(n){return n&&n.bit&&n.ccBits};function i(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+o)}}e.from=function(n,s){if(e.isValid(n))return n;try{return i(n)}catch{return s}}})(L);(function(e){const t=N,r=j,i=O,o=L,n=ut,s=7973,c=t.getBCHDigit(s);function u(h,f,m){for(let y=1;y<=40;y++)if(f<=e.getCapacity(y,m,h))return y}function l(h,f){return o.getCharCountIndicator(h,f)+4}function a(h,f){let m=0;return h.forEach(function(y){const p=l(y.mode,f);m+=p+y.getBitsLength()}),m}function E(h,f){for(let m=1;m<=40;m++)if(a(h,m)<=e.getCapacity(m,f,o.MIXED))return m}e.from=function(f,m){return n.isValid(f)?parseInt(f,10):m},e.getCapacity=function(f,m,y){if(!n.isValid(f))throw new Error("Invalid QR Code version");typeof y>"u"&&(y=o.BYTE);const p=t.getSymbolTotalCodewords(f),w=r.getTotalCodewordsCount(f,m),C=(p-w)*8;if(y===o.MIXED)return C;const g=C-l(y,f);switch(y){case o.NUMERIC:return Math.floor(g/10*3);case o.ALPHANUMERIC:return Math.floor(g/11*2);case o.KANJI:return Math.floor(g/13);case o.BYTE:default:return Math.floor(g/8)}},e.getBestVersionForData=function(f,m){let y;const p=i.from(m,i.M);if(Array.isArray(f)){if(f.length>1)return E(f,p);if(f.length===0)return 1;y=f[0]}else y=f;return u(y.mode,y.getLength(),p)},e.getEncodedBits=function(f){if(!n.isValid(f)||f<7)throw new Error("Invalid QR Code version");let m=f<<12;for(;t.getBCHDigit(m)-c>=0;)m^=s<<t.getBCHDigit(m)-c;return f<<12|m}})(It);var Tt={};const et=N,St=1335,qt=21522,ht=et.getBCHDigit(St);Tt.getEncodedBits=function(t,r){const i=t.bit<<3|r;let o=i<<10;for(;et.getBCHDigit(o)-ht>=0;)o^=St<<et.getBCHDigit(o)-ht;return(i<<10|o)^qt};var Mt={};const Wt=L;function _(e){this.mode=Wt.NUMERIC,this.data=e.toString()}_.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};_.prototype.getLength=function(){return this.data.length};_.prototype.getBitsLength=function(){return _.getBitsLength(this.data.length)};_.prototype.write=function(t){let r,i,o;for(r=0;r+3<=this.data.length;r+=3)i=this.data.substr(r,3),o=parseInt(i,10),t.put(o,10);const n=this.data.length-r;n>0&&(i=this.data.substr(r),o=parseInt(i,10),t.put(o,n*3+1))};var Xt=_;const Zt=L,W=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function D(e){this.mode=Zt.ALPHANUMERIC,this.data=e}D.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};D.prototype.getLength=function(){return this.data.length};D.prototype.getBitsLength=function(){return D.getBitsLength(this.data.length)};D.prototype.write=function(t){let r;for(r=0;r+2<=this.data.length;r+=2){let i=W.indexOf(this.data[r])*45;i+=W.indexOf(this.data[r+1]),t.put(i,11)}this.data.length%2&&t.put(W.indexOf(this.data[r]),6)};var xt=D,te=function(t){for(var r=[],i=t.length,o=0;o<i;o++){var n=t.charCodeAt(o);if(n>=55296&&n<=56319&&i>o+1){var s=t.charCodeAt(o+1);s>=56320&&s<=57343&&(n=(n-55296)*1024+s-56320+65536,o+=1)}if(n<128){r.push(n);continue}if(n<2048){r.push(n>>6|192),r.push(n&63|128);continue}if(n<55296||n>=57344&&n<65536){r.push(n>>12|224),r.push(n>>6&63|128),r.push(n&63|128);continue}if(n>=65536&&n<=1114111){r.push(n>>18|240),r.push(n>>12&63|128),r.push(n>>6&63|128),r.push(n&63|128);continue}r.push(239,191,189)}return new Uint8Array(r).buffer};const ee=te,ne=L;function U(e){this.mode=ne.BYTE,typeof e=="string"&&(e=ee(e)),this.data=new Uint8Array(e)}U.getBitsLength=function(t){return t*8};U.prototype.getLength=function(){return this.data.length};U.prototype.getBitsLength=function(){return U.getBitsLength(this.data.length)};U.prototype.write=function(e){for(let t=0,r=this.data.length;t<r;t++)e.put(this.data[t],8)};var oe=U;const re=L,ie=N;function F(e){this.mode=re.KANJI,this.data=e}F.getBitsLength=function(t){return t*13};F.prototype.getLength=function(){return this.data.length};F.prototype.getBitsLength=function(){return F.getBitsLength(this.data.length)};F.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let r=ie.toSJIS(this.data[t]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),e.put(r,13)}};var se=F,bt={exports:{}};(function(e){var t={single_source_shortest_paths:function(r,i,o){var n={},s={};s[i]=0;var c=t.PriorityQueue.make();c.push(i,0);for(var u,l,a,E,h,f,m,y,p;!c.empty();){u=c.pop(),l=u.value,E=u.cost,h=r[l]||{};for(a in h)h.hasOwnProperty(a)&&(f=h[a],m=E+f,y=s[a],p=typeof s[a]>"u",(p||y>m)&&(s[a]=m,c.push(a,m),n[a]=l))}if(typeof o<"u"&&typeof s[o]>"u"){var w=["Could not find a path from ",i," to ",o,"."].join("");throw new Error(w)}return n},extract_shortest_path_from_predecessor_list:function(r,i){for(var o=[],n=i;n;)o.push(n),r[n],n=r[n];return o.reverse(),o},find_path:function(r,i,o){var n=t.single_source_shortest_paths(r,i,o);return t.extract_shortest_path_from_predecessor_list(n,o)},PriorityQueue:{make:function(r){var i=t.PriorityQueue,o={},n;r=r||{};for(n in i)i.hasOwnProperty(n)&&(o[n]=i[n]);return o.queue=[],o.sorter=r.sorter||i.default_sorter,o},default_sorter:function(r,i){return r.cost-i.cost},push:function(r,i){var o={value:r,cost:i};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(bt);var ue=bt.exports;(function(e){const t=L,r=Xt,i=xt,o=oe,n=se,s=M,c=N,u=ue;function l(w){return unescape(encodeURIComponent(w)).length}function a(w,C,g){const d=[];let B;for(;(B=w.exec(g))!==null;)d.push({data:B[0],index:B.index,mode:C,length:B[0].length});return d}function E(w){const C=a(s.NUMERIC,t.NUMERIC,w),g=a(s.ALPHANUMERIC,t.ALPHANUMERIC,w);let d,B;return c.isKanjiModeEnabled()?(d=a(s.BYTE,t.BYTE,w),B=a(s.KANJI,t.KANJI,w)):(d=a(s.BYTE_KANJI,t.BYTE,w),B=[]),C.concat(g,d,B).sort(function(I,T){return I.index-T.index}).map(function(I){return{data:I.data,mode:I.mode,length:I.length}})}function h(w,C){switch(C){case t.NUMERIC:return r.getBitsLength(w);case t.ALPHANUMERIC:return i.getBitsLength(w);case t.KANJI:return n.getBitsLength(w);case t.BYTE:return o.getBitsLength(w)}}function f(w){return w.reduce(function(C,g){const d=C.length-1>=0?C[C.length-1]:null;return d&&d.mode===g.mode?(C[C.length-1].data+=g.data,C):(C.push(g),C)},[])}function m(w){const C=[];for(let g=0;g<w.length;g++){const d=w[g];switch(d.mode){case t.NUMERIC:C.push([d,{data:d.data,mode:t.ALPHANUMERIC,length:d.length},{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.ALPHANUMERIC:C.push([d,{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.KANJI:C.push([d,{data:d.data,mode:t.BYTE,length:l(d.data)}]);break;case t.BYTE:C.push([{data:d.data,mode:t.BYTE,length:l(d.data)}])}}return C}function y(w,C){const g={},d={start:{}};let B=["start"];for(let A=0;A<w.length;A++){const I=w[A],T=[];for(let P=0;P<I.length;P++){const S=I[P],v=""+A+P;T.push(v),g[v]={node:S,lastCount:0},d[v]={};for(let q=0;q<B.length;q++){const b=B[q];g[b]&&g[b].node.mode===S.mode?(d[b][v]=h(g[b].lastCount+S.length,S.mode)-h(g[b].lastCount,S.mode),g[b].lastCount+=S.length):(g[b]&&(g[b].lastCount=S.length),d[b][v]=h(S.length,S.mode)+4+t.getCharCountIndicator(S.mode,C))}}B=T}for(let A=0;A<B.length;A++)d[B[A]].end=0;return{map:d,table:g}}function p(w,C){let g;const d=t.getBestModeForData(w);if(g=t.from(C,d),g!==t.BYTE&&g.bit<d.bit)throw new Error('"'+w+'" cannot be encoded with mode '+t.toString(g)+`.
 Suggested mode is: `+t.toString(d));switch(g===t.KANJI&&!c.isKanjiModeEnabled()&&(g=t.BYTE),g){case t.NUMERIC:return new r(w);case t.ALPHANUMERIC:return new i(w);case t.KANJI:return new n(w);case t.BYTE:return new o(w)}}e.fromArray=function(C){return C.reduce(function(g,d){return typeof d=="string"?g.push(p(d,null)):d.data&&g.push(p(d.data,d.mode)),g},[])},e.fromString=function(C,g){const d=E(C,c.isKanjiModeEnabled()),B=m(d),A=y(B,g),I=u.find_path(A.map,"start","end"),T=[];for(let P=1;P<I.length-1;P++)T.push(A.table[I[P]].node);return e.fromArray(f(T))},e.rawSplit=function(C){return e.fromArray(E(C,c.isKanjiModeEnabled()))}})(Mt);const G=N,X=O,ce=Vt,ae=Kt,le=Ct,fe=Et,nt=Bt,ot=j,de=Yt,$=It,ge=Tt,he=L,Z=Mt;function we(e,t){const r=e.size,i=fe.getPositions(t);for(let o=0;o<i.length;o++){const n=i[o][0],s=i[o][1];for(let c=-1;c<=7;c++)if(!(n+c<=-1||r<=n+c))for(let u=-1;u<=7;u++)s+u<=-1||r<=s+u||(c>=0&&c<=6&&(u===0||u===6)||u>=0&&u<=6&&(c===0||c===6)||c>=2&&c<=4&&u>=2&&u<=4?e.set(n+c,s+u,!0,!0):e.set(n+c,s+u,!1,!0))}}function me(e){const t=e.size;for(let r=8;r<t-8;r++){const i=r%2===0;e.set(r,6,i,!0),e.set(6,r,i,!0)}}function ye(e,t){const r=le.getPositions(t);for(let i=0;i<r.length;i++){const o=r[i][0],n=r[i][1];for(let s=-2;s<=2;s++)for(let c=-2;c<=2;c++)s===-2||s===2||c===-2||c===2||s===0&&c===0?e.set(o+s,n+c,!0,!0):e.set(o+s,n+c,!1,!0)}}function Ce(e,t){const r=e.size,i=$.getEncodedBits(t);let o,n,s;for(let c=0;c<18;c++)o=Math.floor(c/3),n=c%3+r-8-3,s=(i>>c&1)===1,e.set(o,n,s,!0),e.set(n,o,s,!0)}function x(e,t,r){const i=e.size,o=ge.getEncodedBits(t,r);let n,s;for(n=0;n<15;n++)s=(o>>n&1)===1,n<6?e.set(n,8,s,!0):n<8?e.set(n+1,8,s,!0):e.set(i-15+n,8,s,!0),n<8?e.set(8,i-n-1,s,!0):n<9?e.set(8,15-n-1+1,s,!0):e.set(8,15-n-1,s,!0);e.set(i-8,8,1,!0)}function Ee(e,t){const r=e.size;let i=-1,o=r-1,n=7,s=0;for(let c=r-1;c>0;c-=2)for(c===6&&c--;;){for(let u=0;u<2;u++)if(!e.isReserved(o,c-u)){let l=!1;s<t.length&&(l=(t[s]>>>n&1)===1),e.set(o,c-u,l),n--,n===-1&&(s++,n=7)}if(o+=i,o<0||r<=o){o-=i,i=-i;break}}}function Be(e,t,r){const i=new ce;r.forEach(function(u){i.put(u.mode.bit,4),i.put(u.getLength(),he.getCharCountIndicator(u.mode,e)),u.write(i)});const o=G.getSymbolTotalCodewords(e),n=ot.getTotalCodewordsCount(e,t),s=(o-n)*8;for(i.getLengthInBits()+4<=s&&i.put(0,4);i.getLengthInBits()%8!==0;)i.putBit(0);const c=(s-i.getLengthInBits())/8;for(let u=0;u<c;u++)i.put(u%2?17:236,8);return pe(i,e,t)}function pe(e,t,r){const i=G.getSymbolTotalCodewords(t),o=ot.getTotalCodewordsCount(t,r),n=i-o,s=ot.getBlocksCount(t,r),c=i%s,u=s-c,l=Math.floor(i/s),a=Math.floor(n/s),E=a+1,h=l-a,f=new de(h);let m=0;const y=new Array(s),p=new Array(s);let w=0;const C=new Uint8Array(e.buffer);for(let I=0;I<s;I++){const T=I<u?a:E;y[I]=C.slice(m,m+T),p[I]=f.encode(y[I]),m+=T,w=Math.max(w,T)}const g=new Uint8Array(i);let d=0,B,A;for(B=0;B<w;B++)for(A=0;A<s;A++)B<y[A].length&&(g[d++]=y[A][B]);for(B=0;B<h;B++)for(A=0;A<s;A++)g[d++]=p[A][B];return g}function Ae(e,t,r,i){let o;if(Array.isArray(e))o=Z.fromArray(e);else if(typeof e=="string"){let l=t;if(!l){const a=Z.rawSplit(e);l=$.getBestVersionForData(a,r)}o=Z.fromString(e,l||40)}else throw new Error("Invalid data");const n=$.getBestVersionForData(o,r);if(!n)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=n;else if(t<n)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+n+`.
`);const s=Be(t,r,o),c=G.getSymbolSize(t),u=new ae(c);return we(u,t),me(u),ye(u,t),x(u,r,0),t>=7&&Ce(u,t),Ee(u,s),isNaN(i)&&(i=nt.getBestMask(u,x.bind(null,u,r))),nt.applyMask(i,u),x(u,r,i),{modules:u,version:t,errorCorrectionLevel:r,maskPattern:i,segments:o}}mt.create=function(t,r){if(typeof t>"u"||t==="")throw new Error("No input text");let i=X.M,o,n;return typeof r<"u"&&(i=X.from(r.errorCorrectionLevel,X.M),o=$.from(r.version),n=nt.from(r.maskPattern),r.toSJISFunc&&G.setToSJISFunction(r.toSJISFunc)),Ae(t,o,i,n)};var Pt={},ct={};(function(e){function t(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let i=r.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+r);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(n){return[n,n]}))),i.length===6&&i.push("F","F");const o=parseInt(i.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+i.slice(0,6).join("")}}e.getOptions=function(i){i||(i={}),i.color||(i.color={});const o=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,n=i.width&&i.width>=21?i.width:void 0,s=i.scale||4;return{width:n,scale:n?4:s,margin:o,color:{dark:t(i.color.dark||"#000000ff"),light:t(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},e.getScale=function(i,o){return o.width&&o.width>=i+o.margin*2?o.width/(i+o.margin*2):o.scale},e.getImageWidth=function(i,o){const n=e.getScale(i,o);return Math.floor((i+o.margin*2)*n)},e.qrToImageData=function(i,o,n){const s=o.modules.size,c=o.modules.data,u=e.getScale(s,n),l=Math.floor((s+n.margin*2)*u),a=n.margin*u,E=[n.color.light,n.color.dark];for(let h=0;h<l;h++)for(let f=0;f<l;f++){let m=(h*l+f)*4,y=n.color.light;if(h>=a&&f>=a&&h<l-a&&f<l-a){const p=Math.floor((h-a)/u),w=Math.floor((f-a)/u);y=E[c[p*s+w]?1:0]}i[m++]=y.r,i[m++]=y.g,i[m++]=y.b,i[m]=y.a}}})(ct);(function(e){const t=ct;function r(o,n,s){o.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=s,n.width=s,n.style.height=s+"px",n.style.width=s+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(n,s,c){let u=c,l=s;typeof u>"u"&&(!s||!s.getContext)&&(u=s,s=void 0),s||(l=i()),u=t.getOptions(u);const a=t.getImageWidth(n.modules.size,u),E=l.getContext("2d"),h=E.createImageData(a,a);return t.qrToImageData(h.data,n,u),r(E,l,a),E.putImageData(h,0,0),l},e.renderToDataURL=function(n,s,c){let u=c;typeof u>"u"&&(!s||!s.getContext)&&(u=s,s=void 0),u||(u={});const l=e.render(n,s,u),a=u.type||"image/png",E=u.rendererOpts||{};return l.toDataURL(a,E.quality)}})(Pt);var Rt={};const Ie=ct;function wt(e,t){const r=e.a/255,i=t+'="'+e.hex+'"';return r<1?i+" "+t+'-opacity="'+r.toFixed(2).slice(1)+'"':i}function tt(e,t,r){let i=e+t;return typeof r<"u"&&(i+=" "+r),i}function Ne(e,t,r){let i="",o=0,n=!1,s=0;for(let c=0;c<e.length;c++){const u=Math.floor(c%t),l=Math.floor(c/t);!u&&!n&&(n=!0),e[c]?(s++,c>0&&u>0&&e[c-1]||(i+=n?tt("M",u+r,.5+l+r):tt("m",o,0),o=0,n=!1),u+1<t&&e[c+1]||(i+=tt("h",s),s=0)):o++}return i}Rt.render=function(t,r,i){const o=Ie.getOptions(r),n=t.modules.size,s=t.modules.data,c=n+o.margin*2,u=o.color.light.a?"<path "+wt(o.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",l="<path "+wt(o.color.dark,"stroke")+' d="'+Ne(s,n,o.margin)+'"/>',a='viewBox="0 0 '+c+" "+c+'"',h='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+a+' shape-rendering="crispEdges">'+u+l+`</svg>
`;return typeof i=="function"&&i(null,h),h};const Te=kt,rt=mt,Lt=Pt,Se=Rt;function at(e,t,r,i,o){const n=[].slice.call(arguments,1),s=n.length,c=typeof n[s-1]=="function";if(!c&&!Te())throw new Error("Callback required as last argument");if(c){if(s<2)throw new Error("Too few arguments provided");s===2?(o=r,r=t,t=i=void 0):s===3&&(t.getContext&&typeof o>"u"?(o=i,i=void 0):(o=i,i=r,r=t,t=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(r=t,t=i=void 0):s===2&&!t.getContext&&(i=r,r=t,t=void 0),new Promise(function(u,l){try{const a=rt.create(r,i);u(e(a,t,i))}catch(a){l(a)}})}try{const u=rt.create(r,i);o(null,e(u,t,i))}catch(u){o(u)}}H.create=rt.create;H.toCanvas=at.bind(null,Lt.render);H.toDataURL=at.bind(null,Lt.renderToDataURL);H.toString=at.bind(null,function(e,t,r){return Se.render(e,r)});const Me=["id"],Re=_t({__name:"index",props:{size:{default:200},iconSize:{default:40},content:{},logo:{},options:{},errorLevel:{default:"H"}},setup(e,{expose:t}){const r=e,i=ft(""),o=ft("canvas"+lt()),n=Dt(()=>({width:r.size+"px",height:r.size+"px"})),s=async()=>{const u=await H.toCanvas(document.getElementById(o.value),r.content,{width:r.size,margin:2,errorCorrectionLevel:r.errorLevel,...r.options});if(r.logo){const l=u.getContext("2d"),a=r.iconSize+5,E=r.iconSize+5,h=(u.width-a)/2,f=(u.width-E)/2;l.fillStyle="#fff",l.fillRect(h,f,a,E);const m=(u.width-r.iconSize)/2,y=(u.width-r.iconSize)/2,p=new Image;p.crossOrigin="Anonymous",p.onload=()=>{l.drawImage(p,m,y,r.iconSize,r.iconSize),i.value=u.toDataURL()},p.src=r.logo}else i.value=u.toDataURL()},c=(u=lt(),l=".png")=>{const a=document.createElement("a");a.style.display="none",a.download=`${u}${l}`,a.href=i.value,document.body.appendChild(a),a.click(),document.body.removeChild(a)};return Ut(()=>{s()}),t({downLoadQRCode:c}),(u,l)=>(Ft(),vt("div",{style:dt(n.value)},[zt("canvas",{style:dt(n.value),id:o.value},null,12,Me)],4))}});export{Re as _};