'use strict';const NO={n:'n'},OE=Object.entries,OK=Object.keys,RE=RegExp,RQ=require,CL=console.log,JS=JSON.stringify,JP=JSON.parse,DN=Date.now,ZL=RQ('zlib'),FS=RQ('fs'),CR=RQ('crypto'),SW=RQ('stream').Writable,SR=RQ('stream').Readable,http=RQ('http'),cfg=RQ('./package.json').config,rw={wbF:async(f,a,b)=>{const c=FS.createWriteStream(a.data+f+'.'+a.zip),d=new SR;d.push(JS(b[f])),d.push(null),d.pipe(ZL.createDeflate()).pipe(c),a.is_debug&&CL(`BKwbF${f} RECS ${b[f].length}`)},rbf:async(h,a,b)=>{const c=FS.createReadStream(a.data+h+'.'+a.zip),d=new SW;let e=[],f=0;d.on('error',a=>CL('ERR WSTRM',h,a)),d.on('finish',()=>{let g=Buffer.alloc(f);for(let d=0,a=e.length,b=0;d<a;d++)e[d].copy(g,b),b+=e[d].length;b[h]=JP(g.toString()),b._all[h]=b[h].length,a.is_debug&&CL(`WS4 ${h} LN ${f} RCS ${b[h].length}`)}),d.write=(b)=>{e.push(b),f+=b.length},c.pipe(ZL.createInflate()).pipe(d)},rbfa:async(d,a)=>{await Promise.all(d.tabs.map(async(b)=>rw.rbf(b,d,a)))},rdf:async(g,a)=>FS.readdir(g.app,(b,c)=>c.forEach(b=>FS.readFile(g.app+b,(c,d)=>{if(c)throw c;let e=g.is_fcrypt?CR.createHmac('sha256',g.cert+DN()).update(b).digest('hex'):b;a._file[b]=e,a[e]=d,g.is_debug&&CL(`fcrypt ${g.is_fcrypt} FILE ${b} loaded ${d.length} ${e}`)})))},FX={eF:d=>a=>b=>b[d].toString()===a.toString(),rF:d=>a=>b=>new RE(a,'i').test(b[d]),NrF:d=>a=>b=>!new RE(a,'i').test(b[d]),tF:c=>()=>a=>a[c],NtF:c=>()=>a=>!a[c],gF:d=>a=>b=>b[d]>=a,lF:d=>a=>b=>b[d]<=a,bF:d=>a=>b=>b[d]>=a.k&&b[d]<=a.g,NbF:d=>a=>b=>b[d]<=a.k&&b[d]>=a.g,iF:d=>b=>c=>new RE(b.join('|')).test(c[d]),mfs:c=>d=>a=>c.reduce((b,c)=>b||new RE(d,'i').test(a[c].replace(/[<>;:\- ./\\]/g,'')),!1)},mfms=c=>(d,a)=>d.filter(FX.mfs(c)(a)),eof=d=>(a,b)=>{return-1===a.indexOf(b[d])&&a.push(b[d]),a},fc=(c,a)=>c.filter(FX[a.f](a.k)(a.v)),fo=(e,c)=>(a,b)=>a.concat(e.filter(d=>d[c]===b)),as=c=>a=>c.reduce((b,d)=>{return b[d]=a[d],b},{}),KV=e=>{return{k:e[0],v:e[1]}},DG=a=>a.reduce((T,E)=>{OE(E).reduce((t,e)=>{t[e[0]]=(t[e[0]]||0)+e[1];return t},T);return T},{}),MO=a=>a.reduce((c,a)=>{return c[a]={},c},{}),aly=(f,g=1,b=1)=>(c,d)=>{return OK(f).forEach(e=>{c[e][d[e]]=(c[e][d[e]]||0)+(d[g]||1)*(d[b]||1)}),c},U=(a,e)=>a.reduce((T,E)=>T+'_'+e[E],''),alx=(A,e,f=1,g=1)=>(T,E)=>{T[U(A,E)]=(T[U(A,E)]||0)+(E[f]||1)*(E[g]||1);return T},icuv=(c,a)=>{return c._id=c._id||'VSMC'+DN().toString(35)+a,c._ctime=c._ctime||DN(),c._utime=DN(),c._version=(c._version||0)+1,c},bxpl=c=>{const b=c.map(b=>b||0).sort((a,b)=>a-b);return{min:b[0],q1:b[parseInt(0.25*b.length)],q5:b[parseInt(0.5*b.length)],mean:b.reduce((a,b,c,d)=>a+(b||0)/d.length,0),q7:b[parseInt(0.75*b.length)],max:b[b.length-1],l:b.length}},buzz=(i,f)=>OE(i.reduce((A,B)=>{return B[f].split(/\W/).filter(e=>e.length>7).map(e=>e.toLowerCase()).reduce((T,E)=>{return T[E]=(T[E]||0)+1,T},A),A},{})).map(KV).sort((a,b)=>b.v-a.v).slice(0,50),FC=(h,a='')=>new Promise((b,c)=>{'https'===h.prot&&(process.env.NODE_TLS_REJECT_UNAUTHORIZED='0');const d=require(h.prot).request({host:h.host,port:h.port,method:h.method,path:h.path,headers:{Accept:'application/json',Authorization:'Basic '+h.auth,"x-encoding":h.senc?'deflate':'',"accept-encoding":h.renc?'deflate':''}},(a)=>{let d=new SW,e=[],f=0;d.write=(b)=>{e.push(b),f+=b.length},d.on('error',b=>{CL('XRES-ErRor: '+b.message)}),d.on('finish',()=>{let g=Buffer.alloc(f);for(let a=0,b=e.length,c=0;a<b;a++)e[a].copy(g,c),c+=e[a].length;b(g.toString())}),h.renc?a.pipe(ZL.createInflate()).pipe(d):a.pipe(d)});d.on('error',b=>{CL('XREQ-ERror: '+b.message)});let e=new SR;e.push(a),e.push(null),h.senc?e.pipe(ZL.createDeflate()).pipe(d):e.pipe(d)}),FCSD=async(c,a)=>{await FC(c,a)},rest=(k,a,l,m,c,b,d)=>{const e=l[2],g=b&&JSON.parse(b);let f=null;switch(k.is_debug&&CL(`REST_${a}${l.length} ${e} ${m[e]&&m[e].length} ${b.slice(0,30)}`),a){case'GET':switch(l.length){case 3:'_cmd'===e?(k.is_debug&&CL('sfunc',g.sfunc,g.cmd),g.sfunc&&Function.apply(null,g.sfunc)(m,{w:SW,r:SR,h:RQ('http')}),g.cmd&&Function.apply(null,m.commands.filter(b=>b.cmd===g.cmd)[0].sfunc)(m,{w:SW,r:SR,h:RQ('http')})):c.push(JS(m[e]?m[e]:[NO]));break;case 4:switch(l[3]){case'_arfield':c.push(JS(m[e]?g.ar.reduce(fo(m[e],g.field),[]):[NO]));break;case'_ids':c.push(JS(m[e]?g.reduce(fo(m[e],'_id'),[]):[NO]));break;case'_f1':c.push(JS(m[e]?m[e][0]:[NO]));break;case'_l1':c.push(JS(m[e]?m[e][m[e].length-1]:[NO]));break;case'_f5':c.push(JS(m[e]?m[e].slice(0,5):[NO]));break;case'_l5':c.push(JS(m[e]?m[e].slice(-5):[NO]));break;case'_v5':c.push(JS(m[e]?m[e].sort((b,c)=>c._version-b._version).slice(0,5):[NO]));break;case'_u5':c.push(JS(m[e]?m[e].sort((b,c)=>c._utime-b._utime).slice(0,5):[NO]));break;case'_filter':c.push(JS(m[e]?g.reduce(fc,m[e]):[NO]));break;case'_structure':c.push(JS(m[e]?m[e].map(as(g)):[NO]));break;case'_combine':c.push(JS(m[e]?g.filter.reduce(fc,m[e]).map(as(g.structure)):[NO]));break;case'_ocombine':c.push(JS(m[e]?g.filter.reduce(fc,g.oar.reduce(fo(m[e],g.ofield),[])).map(as(g.structure)):[NO]));break;case'_mcombine':c.push(JS(m[e]?g.searchvalues.split(' ').reduce(mfms(g.searchfields),g.filter.reduce(fc,m[e])).map(as(g.structure)):[NO]));break;default:if('_cmd'===e){c.push(JS(Function.apply(null,Array.prototype.filter.call(m.commands,(b)=>b.cmd===l[3])[0].sfunc)(m,null)));break}if('_app'===e){const d=m[e].filter(b=>b._id===l[3]),a=Buffer.from(0<d.length?d[0].content:'20','hex').toString('utf8');c.push(a);break}}break;case 5:c.push(JS(m[e]?m[e].filter(b=>b[l[3]]===l[4]):[NO]));break;default:c.push('{}')}break;case'POST':switch(l.length){case 3:'_bulk'===e?(g.forEach(b=>{m[b.index]||(m[b.index]=[]),m[b.index].P(icuv(b.row,0))}),g.map(b=>b.index).forEach(b=>{m._utc[b]=DN(),m._all[b]=m[b].length})):(!m[e]&&(m[e]=[]),m[e].push(icuv(g,0)),m._utc[e]=DN(),m._all[e]=m[e].length),c.push('{}');break;case 4:switch(l[3]){case'_fetch':FCSD(g,JS(m[e]));break;case'_ffetch':FCSD(g.server,JS(g.filter.reduce(fc,m[e])));break;case'_fcfetch':FCSD(g.server,JS(g.filter.reduce(fc,m[e]).map(as(g.structure))));break;case'_ofetch':FCSD(g.server,JS(g.oar.reduce(fo(m[e],g.ofield),[])));break;case'_fcofetch':FCSD(g.server,JS(g.filter.reduce(fc,g.oar.reduce(fo(m[e],g.ofield),[])).map(as(g.structure))));break;case'_arfield':c.push(JS(m[e]?g.oar.reduce(fo(m[e],g.ofield),[]):[NO]));break;case'_ids':c.push(JS(m[e]?g.reduce(fo(m[e],'_id'),[]):[NO]));break;case'_summary':f=MO(g),c.push(JS(m[e].reduce(aly(f),f)));break;case'_fsummary':f=MO(g.structure),c.push(JS(g.filter.reduce(fc,m[e]).reduce(aly(f),f)));break;case'_fsummaryc':f=MO(g.structure),c.push(JS(g.filter.reduce(fc,m[e]).reduce(aly(f,g.cfield),f)));break;case'_fosummary':f=MO(g.structure),c.push(JS(g.filter.reduce(fc,g.oar.reduce(fo(m[e],g.ofield),[])).reduce(aly(f),f)));break;case'_fosummaryc':f=MO(g.structure),c.push(JS(g.filter.reduce(fc,g.oar.reduce(fo(m[e],g.ofield),[])).reduce(aly(f,g.cfield),f)));break;case'_fosummarycc':f=MO(g.structure),c.push(JS(g.filter.reduce(fc,g.oar.reduce(fo(m[e],g.ofield),[])).reduce(aly(f,g.cfield[0],g.cfield[1]),f)));break;case'_fcsummary':c.push(JS(OE(g.filter.reduce(fc,m[e]).reduce(alx(g.structure,{}),{})).map(KV)));break;case'_fcsummaryc':c.push(JS(OE(g.filter.reduce(fc,m[e]).reduce(alx(g.structure,{},g.cfield),{})).map(KV)));break;case'_fcsummarycc':c.push(JS(OE(g.filter.reduce(fc,m[e]).reduce(alx(g.structure,{},g.cfield[0],g.cfield[1]),{})).map(KV)));break;case'_entries':c.push(JS(DG(m[e])));break;case'_fentries':c.push(JS(DG(g.filter.reduce(fc,m[e]))));break;case'_flentries':c.push(JS(DG(g.filter.reduce(fc,m[e]).map(e=>{delete(e.L);return e}))));break;case'_boxplot':f=g.reduce((c,d)=>{return c[d]=bxpl(m[e].map(b=>b[d])),c},{}),c.push(JS(f));break;case'_fboxplot':f=g.structure.reduce((c,d)=>{return c[d]=bxpl(g.filter.reduce(fc,m[e]).map(b=>b[d])),c},{}),c.push(JS(f));break;case'_foboxplot':f=g.structure.reduce((c,d)=>{return c[d]=bxpl(g.filter.reduce(fc,g.oar.reduce(fo(m[e],g.ofield),[])).map(b=>b[d])),c},{}),c.push(JS(f));break;case'_buzz':c.push(JS((!m[e])?[NO]:buzz(m[e],g.cfield)));break;case'_fbuzz':c.push(JS((!m[e])?[NO]:buzz(g.filter.reduce(fc,m[e]),g.cfield)));break;case'_fobuzz':c.push(JS((!m[e])?[NO]:buzz(g.filter.reduce(fc,g.oar.reduce(fo(m[e],g.ofield),[])),g.cfield)));break;case'_filter':c.push(JS(m[e]?g.reduce(fc,m[e]):[NO]));break;case'_combine':c.push(JS(m[e]?g.filter.reduce(fc,m[e]).map(as(g.structure)):[NO]));break;case'_structure':c.push(JS(m[e]?m[e].map(as(g)):[NO]));break;case'_ocombine':c.push(JS(m[e]?g.filter.reduce(fc,g.oar.reduce(fo(m[e],g.ofield),[])).map(as(g.structure)):[NO]));break;case'_mcombine':c.push(JS(m[e]?g.searchvalues.split(' ').reduce(mfms(g.searchfields),g.filter.reduce(fc,m[e])).map(as(g.structure)):[NO]));break;case'_bulk':m[e]||(m[e]=[]),g.forEach(icuv),m[e]=m[e].concat(g),m._utc[e]=DN(),m._all[e]=m[e].length}break;case 5:switch(k.is_debug&&CL(5,'POST',l[3],l[4]),l[4]){case'raspc':CL(5,'POST','raspc'),RQ('./swSendUDP')(g);break;case'mail':CL(5,'POST','mail',g),RQ('./swMailClient')(g)}break;case 6:let a=m[e].filter(b=>b._id===l[3]);1===a.length&&(a[0][l[4]]=l[5],a[0]=icuv(a[0],0));break;default:c.push('{}')}break;case'PUT':switch(l.length){case 3:if('_bulk'===e)k.is_debug&&CL('MIDX BULK UPD'),OK(g).forEach(d=>{k.is_debug&&CL('_BULK Multiindex ',d),OK(g[d]).map(e=>{let b=m[d].filter(a=>a._id===e);1===b.length&&(OE(g[d][e]).forEach(c=>{'object'==typeof c[1]?(b[0][c[0]].time.push(c[1][0]),b[0][c[0]].value.push(c[1][1]),b[0][c[0]].last=c[1][1],b[0][c[0]].time.length>b[0][c[0]].max&&(b[0][c[0]].time.shift(),b[0][c[0]].value.shift())):b[0][c[0]]=c[1]}),b[0]=icuv(b[0],0))}),m._utc[d]=DN()});else if(m._utc[e]=DN(),!m[e])m[e]=[],m[e].push(icuv(g,0));else{let c=m[e].filter(b=>b._id===g._id);1===c.length?(k.is_debug&&CL('DS ID EXistiert '),OK(g).forEach(b=>{c[0][b]=g[b]}),c[0]=icuv(c[0],0)):(k.is_debug&&CL('!ID OR MORE'),m[e].push(icuv(g,0)))}break;case 6:let a=m[e].filter(b=>b._id===l[3]);1===a.length&&(a[0][l[4]]=l[5],a[0]=icuv(a[0],0)),m._utc[e]=DN();break;case 4:m[e]||(m[e]=[{_id:l[3]}]);let b=m[e].filter(b=>b._id===l[3]);1===b.length&&(OK(g).forEach(c=>{b[0][c]=g[c]}),b[0]=icuv(b[0],0)),(d[e]||[]).forEach(a=>a.write(`event:put\ndata:{"index":"${e}","_id":"${l[3]}","msg":${JSON.stringify(g)}}\n\n`)),m._utc[e]=DN();break;case 5:m[e]||(m[e]=[{_id:l[3]}]),k.is_debug&&CL(`ES PUT ${e} _ID${l[3]} TP:${l[4]} TN:${(d[e]||[]).length}`);let c=m[e].filter(b=>b._id===l[3]);if(1===c.length){switch(l[4]){case'acandidate':c[0][l[4]]||(c[0][l[4]]=[]),c[0][l[4]].push(g[l[4]]);break;case'ocandidate':c[0][l[4]]||(c[0][l[4]]=[]),c[0][l[4]].push(g[l[4]]);break;default:OK(g).forEach(b=>{c[0][b]=g[b]})}c[0]=icuv(c[0],0)}d[e].forEach((a,b,c)=>a.write(`event:update\ndata:{"type":"${l[4]}","users":${c.length},"msg":"msg","time":${Date.now()}}\n\n`)),m._utc[e]=DN()}break;case'DELETE':switch(l.length){case 3:m[e]=[];break;case 4:switch(l[3]){case'_filter':m[e]=g.reduce(fc,m[e]);break;case'_structure':g.forEach(c=>{m[e].forEach(a=>a[c]&&delete a[c])});break;default:m[e]=m[e].filter(b=>b._id!==l[3])}}m._utc[e]=DN(),m._all[e]=m[e].length}},port=process.env.PORT||process.env.OPENSHIFT_NODEJS_PORT||cfg.webport,ipaddress=process.env.IP||process.env.OPENSHIFT_NODEJS_IP||'0.0.0.0',router=(a,b,c,d,e)=>{let f='';const g=a.method,h=a.url,i=a.headers['accept-encoding']||'ac.n.v.',j=a.headers['x-encoding']||'xe.n.v.',k=/rest\//.test(h),l=/rest\/_app\//.test(h),m=/event-source\//.test(h),n=!(k||m),o=h.split('?')[0].split('/'),p=o[k||m?2:1],q=i&&i.match(/\bdeflate\b/),r=j&&j.match(/\bdeflate\b/);d.is_debug&&CL(`ROUTER X ${j}[${r}] AC ${i}[${q}] URL ${a.url} METHOD ${a.method} bevent${m}`),d.is_log&&c._log.push({time:DN(),method:a.method,path:a.url,remote:a.connection.remoteAddress.split(':').pop()});let s=new SW,t=[],u=0;s.on('finish',()=>{let a=Buffer.alloc(u);for(let b=0,c=t.length,d=0;b<c;b++)t[b].copy(a,d),d+=t[b].length;if(f=a.toString(),d.is_debug&&CL(`WS-${a.toString('hex').slice(0,100)} - LEN ${u} POSTDATA.length:${f.length} `),!m){b.setHeader('Access-Control-Allow-Origin','*'),b.writeHead(200,{"content-encoding":'deflate',"content-type":k&&!l?'application/json':''});let a=new SR;q?a.pipe(ZL.createDeflate()).pipe(b):a.pipe(b),n&&a.push(c[p]?c[p]:c[d.first]),k&&rest(d,g,o,c,a,f,e),a.push(null)}else b.writeHead(200,{Connection:'keep-alive',"Content-Type":'text/event-stream',"Cache-Control":'no-cache'}),e[p]=e[p]||[],e[p].push(b),d.is_debug&&CL(`ES (bevent:${m}) EVIndex:${p} ${e[p].length}`),b.write(`retry:60000\nid:${Date.now().toString(35)}\ndata:{"type":"new","time":${Date.now()}}\n\n`),e[p].forEach((b,c,d)=>b.write(`data:{"type":"new user","users":${d.length},"time":${Date.now()}}\n\n`))}),s.write=(a)=>{t.push(a),u+=a.length},j&&j.match(/\bdeflate\b/)?(d.is_debug&&CL('wir haben ein deflate'),a.pipe(ZL.createInflate()).pipe(s)):a.pipe(s),a.on('end',()=>{d.is_debug&&CL(`RQEND ${l?'FREST':''} ${n?'FILE':''} ${k?'REST':''} ${m?'EVENT':''} [${g}] ${h}(${o.length}) index:${p} data.l:${f.length} zip:${q}`)}),b.on('close',()=>{CL(`RES.CLS bEV:${m} IDX:${p}  dp${e[p]}`);if(e[p])e[p]=e[p].filter(a=>a!==b)}),b.on('aborted',()=>CL('RES.ABRTD'))};let data={_utc:{},_log:[],_file:{},_app:[],_all:{},default:' ',login:cfg.login},stime=DN(),sub={},bsub=!1;cfg.is_data&&rw.rbfa(cfg,data),cfg.is_app&&rw.rdf(cfg,data),cfg.is_backup&&setInterval(()=>{OK(data._utc).filter(a=>data._utc[a]>stime).forEach(async(a)=>await rw.wbF(a,cfg,data)),stime=DN()},cfg.backup_time),http.createServer((a,b)=>router(a,b,data,cfg,sub)).listen(port,ipaddress,()=>{cfg.is_debug&&CL(`listen${port} ${ipaddress}`)})
