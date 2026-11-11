import React, { useState } from 'react';
import './BgpPolicyLab.css';

const copy = {
 es: {
  title:'¿Confiarías en este anuncio BGP?', subtitle:'Una sesión establecida no significa que todos sus prefijos deban aceptarse.',
  choose:'Seleccioná un anuncio', evaluate:'Evaluar políticas', reset:'Reiniciar evaluación',
  peer:'PEER BGP', policies:'POLÍTICAS', destination:'RED DE DESTINO', origin:'Origen', prefix:'Prefijo anunciado', rpki:'Estado RPKI',
  verdict:'Decisión de enrutamiento', accept:'ACEPTAR', reject:'RECHAZAR', pending:'PENDIENTE',
  checks:'Evaluación de políticas', authorization:'Prefijo autorizado', originCheck:'Validación de origen', maxLength:'Longitud de prefijo',
  allowed:'Cumple', denied:'No cumple', note:'Simulación didáctica: la sesión BGP permanece establecida; se evalúa cada anuncio individualmente. No representa la arquitectura ni las políticas de una organización.',
  examples:[
   {name:'Anuncio autorizado',prefix:'203.0.113.0/24',asn:'AS64512',rpki:'Válido',allow:true,origin:true,length:true,reason:'El prefijo está autorizado, su origen es válido y cumple el límite de longitud.'},
   {name:'Origen RPKI inválido',prefix:'203.0.113.0/24',asn:'AS64513',rpki:'Inválido',allow:true,origin:false,length:true,reason:'El origen anunciado no coincide con la autorización RPKI del escenario. Se rechaza este anuncio.'},
   {name:'Prefijo fuera de política',prefix:'198.51.100.0/24',asn:'AS64512',rpki:'No encontrado',allow:false,origin:true,length:true,reason:'La política local no autoriza este prefijo. El estado RPKI «No encontrado» no equivale a «Inválido».'},
   {name:'Longitud no permitida',prefix:'203.0.113.0/25',asn:'AS64512',rpki:'Inválido',allow:true,origin:false,length:false,reason:'El anuncio excede la longitud máxima autorizada para el ROA simulado y no supera la política de longitud.'}
  ]
 },
 en: {
  title:'Would you trust this BGP announcement?', subtitle:'An established session does not mean every prefix should be accepted.',
  choose:'Choose an announcement', evaluate:'Evaluate policies', reset:'Reset evaluation',
  peer:'BGP PEER', policies:'POLICIES', destination:'DESTINATION NETWORK', origin:'Origin', prefix:'Announced prefix', rpki:'RPKI status',
  verdict:'Routing decision', accept:'ACCEPT', reject:'REJECT', pending:'PENDING',
  checks:'Policy evaluation', authorization:'Authorized prefix', originCheck:'Origin validation', maxLength:'Prefix length',
  allowed:'Pass', denied:'Fail', note:'Educational simulation: the BGP session remains established while each announcement is evaluated separately. It does not represent any organization’s architecture or policies.',
  examples:[
   {name:'Authorized announcement',prefix:'203.0.113.0/24',asn:'AS64512',rpki:'Valid',allow:true,origin:true,length:true,reason:'The prefix is authorized, the origin is valid, and the length is within the allowed limit.'},
   {name:'RPKI-invalid origin',prefix:'203.0.113.0/24',asn:'AS64513',rpki:'Invalid',allow:true,origin:false,length:true,reason:'The announced origin does not match the simulated RPKI authorization. This announcement is rejected.'},
   {name:'Prefix outside policy',prefix:'198.51.100.0/24',asn:'AS64512',rpki:'Not found',allow:false,origin:true,length:true,reason:'The local policy does not authorize this prefix. RPKI “Not found” does not mean “Invalid”.'},
   {name:'Disallowed prefix length',prefix:'203.0.113.0/25',asn:'AS64512',rpki:'Invalid',allow:true,origin:false,length:false,reason:'The announcement exceeds the simulated ROA maxLength and fails the prefix-length policy.'}
  ]
 }
};

export default function BgpPolicyLab({language='es'}) {
 const t=copy[language]||copy.es;
 const [selection,setSelection]=useState(0);
 const [evaluated,setEvaluated]=useState(false);
 const scenario=t.examples[selection];
 const accepted=scenario.allow&&scenario.origin&&scenario.length;
 const choose=(value)=>{setSelection(Number(value));setEvaluated(false)};
 return <div className="bpl">
  <div className="bpl-heading"><div><span className="bpl-eyebrow">BGP · RPKI · ROUTING POLICY</span><h4>{t.title}</h4><p>{t.subtitle}</p></div><span className="bpl-session"><i/> BGP ESTABLISHED</span></div>
  <div className="bpl-topology" aria-label={t.title}>
   <div className="bpl-node"><span className="bpl-symbol">◎</span><strong>AS64512</strong><small>{t.peer}</small></div>
   <div className="bpl-wire"><span className="bpl-wire-core"/><span className="bpl-dot"/></div>
   <div className="bpl-node bpl-node-policy"><span className="bpl-symbol">◇</span><strong>{t.policies}</strong><small>RPKI + FILTERS</small></div>
   <div className={'bpl-wire bpl-wire-output '+(evaluated?(accepted?'accepted':'rejected'):'waiting')}><span className="bpl-wire-core"/><span className="bpl-gate">{evaluated?(accepted?'✓':'×'):'⌁'}</span></div>
   <div className={'bpl-node bpl-node-destination '+(evaluated&&accepted?'bpl-node-active':'')}><span className="bpl-symbol">▣</span><strong>{t.destination}</strong><small>{evaluated?(accepted?t.accept:t.reject):t.pending}</small></div>
  </div>
  <div className="bpl-content"><div className="bpl-card"><label htmlFor="bpl-announcement">{t.choose}</label><select id="bpl-announcement" value={selection} onChange={e=>choose(e.target.value)}>{t.examples.map((example,index)=><option value={index} key={index}>{example.name}</option>)}</select>
   <div className="bpl-data"><div><small>{t.prefix}</small><strong>{scenario.prefix}</strong></div><div><small>{t.origin}</small><strong>{scenario.asn}</strong></div><div><small>{t.rpki}</small><strong>{scenario.rpki}</strong></div></div>
   <div className="bpl-actions"><button type="button" className="bpl-primary" onClick={()=>setEvaluated(true)}>{t.evaluate} →</button><button type="button" className="bpl-secondary" onClick={()=>{setSelection(0);setEvaluated(false)}}>↺ {t.reset}</button></div>
  </div><div className="bpl-card bpl-results" aria-live="polite"><div className="bpl-result-head"><span>{t.verdict}</span><strong className={'bpl-verdict '+(evaluated?(accepted?'yes':'no'):'neutral')}>{evaluated?(accepted?t.accept:t.reject):t.pending}</strong></div>
   <div className="bpl-check-title">{t.checks}</div>
   {[[t.authorization,scenario.allow],[t.originCheck,scenario.origin],[t.maxLength,scenario.length]].map(([name,ok])=><div className="bpl-check" key={name}><span>{name}</span><strong className={evaluated?(ok?'bpl-pass':'bpl-fail'):''}>{!evaluated?'—':ok?'✓ '+t.allowed:'× '+t.denied}</strong></div>)}
   {evaluated?<p className="bpl-reason">{scenario.reason}</p>:<p className="bpl-reason bpl-muted">{t.subtitle}</p>}
  </div></div>
  <p className="bpl-disclaimer">{t.note}</p>
 </div>;
}
