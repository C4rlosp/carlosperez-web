import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, { Background, Controls, Handle, MarkerType, Position, ReactFlowProvider, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import './LibertyTrafficLab.css';

const POINTS = [
  { id:'rbs', name:'Red de acceso', role:'Origen del tráfico', x:20, y:190, kind:'access' },
  { id:'a1', name:'Nodo Norte', role:'Enrutamiento IP', x:240, y:190 },
  { id:'dwdm', name:'Transporte', role:'Enlace óptico', x:490, y:25, kind:'optical' },
  { id:'a3', name:'Nodo Sur', role:'Camino alternativo', x:490, y:335 },
  { id:'core', name:'Red destino', role:'Conectividad IP', x:790, y:190, kind:'core' },
];
// Dos rutas lógicas independientes. DWDM es transporte L1 y no agrega un salto IP.
// Cada conexión utiliza handles explícitos para mantener visibles los dos caminos.
const LINKS = [
  {a:'rbs',b:'a1',cost:1,sourceHandle:'right',targetHandle:'left',kind:'access'},
  {a:'a1',b:'dwdm',cost:1,sourceHandle:'top',targetHandle:'left',kind:'optical'},
  {a:'dwdm',b:'core',cost:1,sourceHandle:'right',targetHandle:'top',kind:'optical'},
  {a:'a1',b:'a3',cost:3,sourceHandle:'bottom',targetHandle:'left',kind:'mesh'},
  {a:'a3',b:'core',cost:4,sourceHandle:'right',targetHandle:'bottom',kind:'mesh'},
];
const translations = {
  es: {
    eyebrow:'LABORATORIO INTERACTIVO · RESILIENCIA DE RED', title:'La redundancia existe. ¿Pero qué ocurre cuando falla un enlace?',
    intro:'Explorá una topología ficticia. Interrumpí el transporte principal y observá cómo una política de selección de rutas puede recuperar la conectividad mediante un camino alternativo.',
    normal:'Operación normal', failure:'Interrumpir enlace', te:'Ruta alternativa TE', reset:'Restablecer escenario',
    normalState:'Transporte disponible', failureState:'Transporte interrumpido', teState:'Ruta alternativa seleccionada',
    normalDesc:'El enlace óptico conecta dos nodos IP sin introducir un salto de enrutamiento adicional.',
    failureDesc:'El enlace principal deja de estar disponible. La simulación muestra una interrupción temporal antes de seleccionar una ruta alternativa.',
    teDesc:'En este escenario, una política ficticia selecciona un camino IP alternativo después de detectar la interrupción. La recuperación no está garantizada en todas las redes.',
    hops:'Saltos IP', cost:'Costo ilustrativo', path:'Recorrido seleccionado', noPath:'Sin ruta seleccionada',
    note:'Escenario educativo completamente ficticio: nodos, enlaces, métricas, tiempos y decisiones no representan redes ni incidentes reales. La recuperación depende del diseño, la detección de fallas, la convergencia y las políticas configuradas.',
    tip:'Podés mover los nodos, ampliar el mapa y explorar los enlaces. El diseño de caminos es ilustrativo.',
    legendActive:'Camino activo', legendAvailable:'Enlace disponible', legendDown:'Tramo indisponible', optical:'Transporte óptico: no constituye un salto IP'
  },
  en: {
    eyebrow:'INTERACTIVE LAB · TRANSPORT ENGINEERING', title:'Redundancy exists. But what happens when a link fails?',
    intro:'Explore a fictional network topology. Interrupt the primary transport link and see how a routing policy may restore connectivity over an alternate path.',
    normal:'Normal operation', failure:'Interrupt link', te:'Alternate TE route', reset:'Reset scenario',
    normalState:'Transport available', failureState:'Transport unavailable', teState:'Alternate route selected',
    normalDesc:'Optical transport connects two IP nodes without introducing an additional routing hop.',
    failureDesc:'The primary link becomes unavailable. The simulation shows a temporary interruption before an alternate path is selected.',
    teDesc:'In this fictional scenario, a routing policy selects an alternate IP path after the interruption is detected. Recovery is not guaranteed in every network.',
    hops:'IP hops', cost:'Illustrative cost', path:'Selected path', noPath:'No selected path',
    note:'Entirely fictional educational scenario: nodes, links, metrics, timing and decisions do not represent any real network or incident. Recovery depends on network design, fault detection, convergence and configured policies.',
    tip:'Drag nodes, zoom, and explore links. Path selection is illustrative.',
    legendActive:'Active route', legendAvailable:'Available link', legendDown:'Unavailable segment', optical:'Optical transport does not add an IP hop'
  }
};
function OpticalPrism() {
  return <svg className="cp-lab-prism" viewBox="0 0 42 38" aria-hidden="true" focusable="false">
    <path d="M5 19 15 6 27 19 15 32Z" fill="none" stroke="currentColor" strokeWidth="1.7"/>
    <path d="M17 19 27 6 38 19 27 32Z" fill="none" stroke="currentColor" strokeWidth="1.7"/>
    <path d="M5 19H38M15 6 27 32" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5"/>
  </svg>;
}
function NetworkNode({ data }) {
  const optical = data.kind === 'optical';
  return <div className={`cp-lab-node cp-lab-node--${data.kind || 'agg'} ${data.active?'is-active':''} ${data.down?'is-down':''}`}>
    <Handle id="left" type="target" position={Position.Left} isConnectable={false}/>
    <Handle id="top" type="target" position={Position.Top} isConnectable={false}/>
    <Handle id="bottom" type="target" position={Position.Bottom} isConnectable={false}/>
    <span className="cp-lab-node-icon" aria-hidden="true">{optical?<OpticalPrism/>:data.kind==='access'?'◉':data.kind==='core'?'⬡':'◇'}</span>
    <span className="cp-lab-node-text"><strong>{data.name}</strong><small>{data.role}</small></span>
    <Handle id="right" type="source" position={Position.Right} isConnectable={false}/>
    <Handle id="top" type="source" position={Position.Top} isConnectable={false}/>
    <Handle id="bottom" type="source" position={Position.Bottom} isConnectable={false}/>
  </div>;
}
const nodeTypes = { network: NetworkNode };
const primary = ['rbs','a1','dwdm','core'];
const alternate = ['rbs','a1','a3','core'];
const broken = new Set(['a1-dwdm','dwdm-core']);
function isPathLink(a,b,path) { return path.some((p,i)=>i<path.length-1 && ((p===a && path[i+1]===b)||(p===b && path[i+1]===a))); }
const localizedPoints = {
  es: POINTS,
  en: [
    { ...POINTS[0], name:'Access network', role:'Traffic origin' },
    { ...POINTS[1], name:'North node', role:'IP routing' },
    { ...POINTS[2], name:'Transport', role:'Optical link' },
    { ...POINTS[3], name:'South node', role:'Alternate path' },
    { ...POINTS[4], name:'Destination', role:'IP connectivity' },
  ]
};
function TrafficLab({ lang }) {
  const t = translations[lang] || translations.es;
  const points = localizedPoints[lang] || localizedPoints.es;
  const [mode,setMode] = useState('normal');
  const [auto,setAuto] = useState(true);
  const [cycle,setCycle] = useState(0);
  const path = mode==='normal'?primary:mode==='te'?alternate:[];
  useEffect(()=>{
    if(!auto)return undefined;
    const delay=mode==='normal'?5500:mode==='failure'?2300:8500;
    const timer=window.setTimeout(()=>{
      if(mode==='normal')setMode('failure');
      else if(mode==='failure')setMode('te');
      else {setMode('normal');setCycle(v=>v+1);}
    },delay);
    return ()=>window.clearTimeout(timer);
  },[auto,mode]);
  const [nodes,setNodes,onNodesChange] = useNodesState(points.map(p=>({id:p.id,type:'network',position:{x:p.x,y:p.y},data:{...p,active:primary.includes(p.id)},draggable:true})));
  useEffect(()=>{ setNodes(current=>current.map(n=>({...n,data:{...n.data,name:points.find(p=>p.id===n.id)?.name,role:points.find(p=>p.id===n.id)?.role,active:path.includes(n.id),down:n.id==='dwdm' && mode!=='normal'}}))); },[mode,lang,setNodes]);
  const edges = useMemo(()=>LINKS.map(({a,b,cost,kind,sourceHandle,targetHandle})=>{
    const down = mode!=='normal' && broken.has(`${a}-${b}`);
    const active = isPathLink(a,b,path);
    const color = down?'#ff817d':active?(kind==='optical'?'#69dff0':'#39d6b0'):'#466480';
    return {
      id:`${a}-${b}`,source:a,target:b,sourceHandle,targetHandle,
      type:'smoothstep',animated:active,selectable:false,
      className:`cp-lab-link cp-lab-link--${kind} ${active?'is-active':''} ${down?'is-down':''}`,
      style:{stroke:color,strokeWidth:active?4:down?3:2,strokeDasharray:down?'7 6':active?'8 6':undefined,opacity:active||down?1:.56},
      markerEnd:{type:MarkerType.ArrowClosed,color,width:15,height:15},
      data:{cost}
    };
  }),[mode,path]);
  const cost = mode==='normal'?2:mode==='te'?7:null;
  const hops = path.length ? path.filter(id=>id!=='dwdm').length-1 : null;
  const description = mode==='normal'?t.normalDesc:mode==='failure'?t.failureDesc:t.teDesc;
  const state = mode==='normal'?t.normalState:mode==='failure'?t.failureState:t.teState;
  const onReset = useCallback(()=>{setMode('normal');setAuto(true);setCycle(0)},[]);
  const stage=mode==='normal'?0:mode==='failure'?1:2;
  const story=lang==='en'?[
    ['NORMAL TRANSPORT','Traffic follows the preferred optical transport path. The alternate IP route remains available but unused.'],
    ['PRIMARY LINK DOWN','The primary transport link fails. The active path becomes unavailable and service is interrupted while the network detects the fault.'],
    ['ALTERNATE ROUTE','Traffic engineering selects the alternative IP path. The primary link remains unavailable; service is restored only through the viable route.']
  ]:[
    ['TRANSPORTE NORMAL','El tráfico utiliza el transporte óptico preferido. La ruta IP alternativa está disponible, pero todavía no se utiliza.'],
    ['ENLACE PRINCIPAL INTERRUMPIDO','Falla el enlace principal. El camino activo queda indisponible y el servicio se interrumpe mientras se detecta el problema.'],
    ['RUTA ALTERNATIVA','La ingeniería de tráfico selecciona el camino IP alternativo. El enlace principal continúa indisponible; la continuidad depende de la ruta disponible.']
  ];
  return <section className="cp-lab" aria-labelledby="cp-lab-title">
    <div className="cp-lab-head"><div><p className="cp-lab-kicker">{t.eyebrow}</p><h3 id="cp-lab-title">{t.title}</h3><p>{t.intro}</p></div>
      <div className="cp-lab-controls" role="group" aria-label={lang==='en'?'Network scenario':'Escenario de red'}>
        {[['normal',t.normal],['failure',t.failure]].map(([id,label])=><button key={id} type="button" className={(id==='normal'?mode==='normal':mode!=='normal')?'is-selected':''} aria-pressed={id==='normal'?mode==='normal':mode!=='normal'} onClick={()=>{setAuto(false);setMode(id)}}>{label}</button>)}
      </div>
    </div>
    <div className="cp-autolab-story" aria-live="polite">
      <div className="cp-autolab-story__head"><span>{lang==='en'?'GUIDED RESILIENCE SEQUENCE':'SECUENCIA DE RESILIENCIA GUIADA'}</span><span className={auto?'cp-autolab-live':'cp-autolab-paused'}>{auto?'● AUTO':(lang==='en'?'Ⅱ PAUSED':'Ⅱ PAUSA')}</span></div>
      <strong>{story[stage][0]}</strong><p>{story[stage][1]}</p>
      <div className="cp-autolab-progress">{story.map((step,i)=><span key={step[0]} className={i===stage?'is-active':''}/>)}</div>
      <div className="cp-autolab-buttons"><button type="button" onClick={()=>setAuto(v=>!v)}>{auto?(lang==='en'?'Pause':'Pausar'):(lang==='en'?'Resume':'Continuar')}</button><button type="button" onClick={onReset}>{lang==='en'?'Restart sequence':'Reiniciar secuencia'}</button></div>
    </div>
    <div className="cp-lab-stage">
      <div className="cp-lab-flow" aria-label={lang==='en'?'Interactive simulated network':'Red simulada interactiva'}>
        <ReactFlow key={lang} nodes={nodes} onNodesChange={onNodesChange} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{padding:.14}} minZoom={.35} maxZoom={1.6} nodesConnectable={false} elementsSelectable={false} proOptions={{hideAttribution:false}}>
          <Background color="#23405a" gap={22} size={1}/><Controls showInteractive={false} position="bottom-left"/>
        </ReactFlow>
      </div>
      <aside className="cp-lab-panel" aria-live="polite">
        <span className={`cp-lab-status ${mode==='failure'?'is-failure':''}`}><i/>{state}</span>
        <p>{description}</p>
        <div className="cp-lab-metrics"><div><span>{t.hops}</span><strong>{hops??'—'}</strong></div><div><span>{t.cost}</span><strong>{cost??'—'}</strong></div></div>
        <span className="cp-lab-path-label">{t.path}</span><strong className="cp-lab-path">{path.length?path.map(id=>points.find(p=>p.id===id).name).join(' → '):t.noPath}</strong>
        <button className="cp-lab-reset" type="button" onClick={onReset}>↺ {t.reset}</button>
      </aside>
    </div>
    <div className="cp-lab-bottom"><div className="cp-lab-legend"><span><i className="active"/>{t.legendActive}</span><span><i className="available"/>{t.legendAvailable}</span><span><i className="down"/>{t.legendDown}</span></div><p>{t.tip} · {t.optical}</p></div>
    <p className="cp-lab-disclaimer">{t.note}</p>
  </section>;
}
export default function LibertyTrafficLab({lang='es'}) { return <ReactFlowProvider><TrafficLab lang={lang}/></ReactFlowProvider>; }
