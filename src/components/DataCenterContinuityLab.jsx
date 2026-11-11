import { useEffect, useState } from 'react';
import './DataCenterContinuityLab.css';

const languageCopy = {
  es: {
    eyebrow: 'LABORATORIO INTERACTIVO · CONTINUIDAD DEL CENTRO DE DATOS',
    title: 'La disponibilidad depende de todo el sistema.',
    intro: 'Explorá cómo la energía, la climatización y la conectividad trabajan en conjunto para sostener los servicios críticos. Simulá diferentes escenarios y descubrí cómo la redundancia, la capacidad disponible y las decisiones operativas influyen en la continuidad del servicio.',
    modes: ['Operación normal', 'Falla eléctrica', 'Falla de climatización', 'Falla de enlace', 'Respaldo insuficiente'],
    status: ['Servicios disponibles', 'Generador suministrando energía', 'Refrigeración redundante activa', 'Conectividad por ruta alternativa', 'Continuidad comprometida'],
    description: [
      'La red eléctrica alimenta las cargas mediante el sistema de distribución y UPS. La climatización y los enlaces operan normalmente.',
      'La alimentación comercial falla. El UPS sostiene las cargas durante la transición y el generador, si arranca y tiene capacidad, asume el suministro.',
      'Una unidad de climatización queda fuera de servicio. La unidad redundante mantiene la temperatura si dispone de capacidad suficiente.',
      'Se interrumpe el enlace principal. El tráfico utiliza la conexión secundaria cuando la topología y las políticas lo permiten.',
      'Una falla supera la capacidad o autonomía del respaldo. Las cargas críticas pueden quedar indisponibles: redundancia sin dimensionamiento no garantiza continuidad.'
    ],
    labels: ['Red eléctrica', 'UPS', 'Generador', 'Climatización A', 'Climatización B', 'Red A', 'Red B', 'Cargas críticas'],
    power: 'Energía', thermal: 'Climatización', network: 'Conectividad', service: 'Servicios',
    live: 'Operativo', backup: 'Respaldo', failed: 'No disponible', standby: 'En espera',
    lesson: 'La lección: la continuidad del negocio se diseña considerando las dependencias entre sistemas, no solo duplicando equipos.',
    note: 'Simulación conceptual: no representa una instalación real, autonomía de UPS, tiempos de transferencia, temperaturas ni capacidades verificadas.',
    reset: 'Restablecer escenario', summary: 'Estado de la infraestructura', flow: 'Flujos hacia los servicios críticos', powerFlow: 'Alimentación', coolingFlow: 'Refrigeración', networkFlow: 'Tráfico', stopped: 'Interrumpido', transfer: 'Respaldo activo', stages: ['Detección de falla', 'Transferencia de respaldo', 'Servicio estabilizado'], impact: 'Resultado para el servicio', serviceUp: 'Servicio disponible', serviceDown: 'Servicio interrumpido', servicePaths: 'Dependencias de las cargas críticas', consequence: 'El servicio requiere energía, refrigeración y conectividad disponibles. Un sistema sano por sí solo no garantiza el servicio.', failureDetail: 'El suministro se agota: aunque las unidades de refrigeración y los enlaces estén físicamente disponibles, las cargas críticas dejan de prestar servicio.', timeline: 'Secuencia de respuesta', phasePower: ['UPS sostiene la carga', 'Generador asume el suministro'], phaseCooling: ['Climatización A fuera de servicio', 'Climatización B sostiene la operación'], phaseNetwork: ['Ruta principal interrumpida', 'Tráfico por ruta secundaria'], phaseExhaust: ['Respaldo agotado', 'Cargas críticas fuera de servicio']
  },
  en: {
    eyebrow: 'INTERACTIVE LAB · DATA CENTER CONTINUITY',
    title: 'Availability depends on the entire system.',
    intro: 'Explore how power, cooling, and connectivity work together to support critical services. Simulate different scenarios and discover how redundancy, available capacity, and operational decisions influence service continuity.',
    modes: ['Normal operation', 'Power failure', 'Cooling failure', 'Link failure', 'Insufficient backup'],
    status: ['Services available', 'Generator supplying power', 'Redundant cooling active', 'Traffic on alternate path', 'Continuity at risk'],
    description: [
      'Utility power feeds the loads through the distribution and UPS systems. Cooling and network links operate normally.',
      'Utility power fails. The UPS bridges the transition and the generator takes over if it starts successfully and has sufficient capacity.',
      'One cooling unit fails. The redundant unit maintains acceptable conditions if sufficient capacity is available.',
      'The primary link fails. Traffic switches to the secondary connection when topology and routing policies support it.',
      'A failure exceeds backup capacity or autonomy. Critical loads may become unavailable: redundancy without proper sizing does not ensure continuity.'
    ],
    labels: ['Utility', 'UPS', 'Generator', 'Cooling A', 'Cooling B', 'Network A', 'Network B', 'Critical loads'],
    power: 'Power', thermal: 'Cooling', network: 'Connectivity', service: 'Services',
    live: 'Operating', backup: 'Backup', failed: 'Unavailable', standby: 'Standby',
    lesson: 'The lesson: business continuity requires understanding dependencies across systems, not simply duplicating equipment.',
    note: 'Conceptual simulation: not an actual installation or verified UPS runtime, transfer time, temperature, or capacity.',
    reset: 'Reset scenario', summary: 'Infrastructure status', flow: 'Flows supporting critical services', powerFlow: 'Power', coolingFlow: 'Cooling', networkFlow: 'Traffic', stopped: 'Interrupted', transfer: 'Backup active', stages: ['Failure detected', 'Backup transfer', 'Service stabilized'], impact: 'Service outcome', serviceUp: 'Service available', serviceDown: 'Service interrupted', servicePaths: 'Critical-load dependencies', consequence: 'Service depends on available power, cooling, and connectivity. One healthy subsystem alone cannot guarantee availability.', failureDetail: 'Backup is exhausted: cooling and network equipment may still be physically available, but critical loads can no longer deliver service.', timeline: 'Response sequence', phasePower: ['UPS bridges the interruption', 'Generator takes over'], phaseCooling: ['Cooling A out of service', 'Cooling B maintains operation'], phaseNetwork: ['Primary route interrupted', 'Traffic on secondary route'], phaseExhaust: ['Backup exhausted', 'Critical loads unavailable']
  }
};

const states = [
  ['ok','ok','standby','ok','standby','ok','standby','ok'],
  ['failed','ok','backup','ok','standby','ok','standby','ok'],
  ['ok','ok','standby','failed','backup','ok','standby','ok'],
  ['ok','ok','standby','ok','standby','failed','backup','ok'],
  ['failed','failed','failed','ok','standby','ok','standby','failed']
];

// Los canales son conceptuales: representan dependencias, no cableado real.
// Un respaldo activo conserva el flujo; una dependencia fallida lo interrumpe.
const flowStates = [
  ['ok', 'ok', 'ok'],
  ['backup', 'ok', 'ok'],
  ['ok', 'backup', 'ok'],
  ['ok', 'ok', 'backup'],
  ['failed', 'ok', 'ok']
];

function ServiceFlows({ mode, t, phase }) {
  const failedService = mode === 4;
  const domains = [
    { name: t.powerFlow, state: flowStates[mode][0], color: 'power' },
    { name: t.coolingFlow, state: flowStates[mode][1], color: 'cooling' },
    { name: t.networkFlow, state: flowStates[mode][2], color: 'network' }
  ];
  return <div className={`dcl__dependency dcl__dependency--${failedService ? 'failed' : 'live'}`} aria-label={t.servicePaths}>
    <div className="dcl__flows">
      {domains.map(domain => {
        const state = domain.state;
        const interrupted = state === 'failed';
        const backup = state === 'backup';
        return <div key={domain.color} className={`dcl__flow dcl__flow--${domain.color} dcl__flow--${state}`}>
          <span className="dcl__flow-name">{domain.name}</span>
          <span className="dcl__flow-track" aria-hidden="true"><span className="dcl__flow-energy" /></span>
          <span className="dcl__flow-state">{interrupted ? t.stopped : backup ? t.transfer : t.live}</span>
        </div>;
      })}
    </div>
    <div className="dcl__convergence" aria-hidden="true"><span/><span/><span/><i/></div>
    <div className={`dcl__service-result ${failedService ? 'dcl__service-result--failed' : ''}`}>
      <span className="dcl__result-label">{t.impact}</span>
      <strong>{failedService ? t.serviceDown : t.serviceUp}</strong>
      <span className="dcl__result-note">{failedService ? t.failureDetail : t.consequence}</span>
    </div>
  </div>;
}

function Indicator({ label, state }) {
  return <div className={`dcl__node dcl__node--${state}`}>
    <span className="dcl__node-indicator" aria-hidden="true" />
    <span>{label}</span>
  </div>;
}

export default function DataCenterContinuityLab({ language = 'es' }) {
  const t = languageCopy[language === 'en' ? 'en' : 'es'];
  const [mode, setMode] = useState(0);
  const [phase, setPhase] = useState(2);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (mode === 0) { setPhase(2); return undefined; }
    setPhase(0);
    const first = window.setTimeout(() => setPhase(1), 850);
    const second = window.setTimeout(() => setPhase(2), 2050);
    return () => { window.clearTimeout(first); window.clearTimeout(second); };
  }, [mode]);
  useEffect(() => {
    if (!auto) return undefined;
    const timer = window.setTimeout(() => setMode(v => (v + 1) % 5), mode === 0 ? 4600 : 6700);
    return () => window.clearTimeout(timer);
  }, [auto, mode]);
  const selectMode = n => { setAuto(false); setMode(n); };
  const restart = () => { setMode(0); setPhase(2); setAuto(true); };
  const story = language === 'en'
    ? ['All critical dependencies are available. Watch what changes when a subsystem fails.',
       'Utility power fails. The UPS bridges the transfer; the generator takes over if it starts and has capacity.',
       'Primary cooling fails. Redundant cooling can sustain service only with enough capacity.',
       'The primary link fails. Connectivity depends on a viable alternate path and routing policies.',
       'Backup capacity is insufficient. The service can stop even if cooling and connectivity remain healthy.']
    : ['Todas las dependencias críticas están disponibles. Observá qué cambia cuando falla un subsistema.',
       'Falla la energía comercial. El UPS cubre la transición y el generador asume la carga si arranca y tiene capacidad.',
       'Falla la climatización principal. El respaldo sostiene el servicio solo si tiene capacidad suficiente.',
       'Falla el enlace principal. La continuidad depende de una ruta alternativa viable y sus políticas.',
       'El respaldo es insuficiente. El servicio puede detenerse aunque la climatización y los enlaces estén disponibles.'];
  const s = states[mode];
  const categories = [
    { label: t.power, items: [0,1,2] },
    { label: t.thermal, items: [3,4] },
    { label: t.network, items: [5,6] }
  ];
  return <section className="dcl" aria-labelledby="dcl-title">
    <div className="dcl__wrap">
      <div className="dcl__head">
        <div><p className="dcl__eyebrow">{t.eyebrow}</p><h3 id="dcl-title">{t.title}</h3><p className="dcl__intro">{t.intro}</p></div>
      </div>
      <div className="cp-guided" aria-live="polite">
        <div className="cp-guided__meta"><span>{language==='en'?'AUTOMATED CONTINUITY STORY':'HISTORIA AUTOMÁTICA DE CONTINUIDAD'}</span><span>{auto?'● AUTO':(language==='en'?'Ⅱ PAUSED':'Ⅱ PAUSA')}</span></div>
        <strong>{t.modes[mode]}</strong><p>{story[mode]}</p>
        <div className="cp-guided__steps">{t.modes.map((label,i)=><span key={label} className={i===mode?'active':''}/>)}</div>
        <div className="cp-guided__actions"><button type="button" onClick={()=>setAuto(v=>!v)}>{auto?(language==='en'?'Pause':'Pausar'):(language==='en'?'Resume':'Continuar')}</button><button type="button" onClick={restart}>{language==='en'?'Restart story':'Reiniciar historia'}</button></div>
      </div>
      <div className="dcl__tabs"  role="group" aria-label={t.summary}>
        {t.modes.map((label, i) => <button type="button" key={label} aria-pressed={mode === i} className={mode === i ? 'dcl__tab dcl__tab--active' : 'dcl__tab'} onClick={() => selectMode(i)}>{label}</button>)}
      </div>
      <div className="dcl__panel">
        <div className="dcl__diagram">
          <div className="dcl__systems">
            {categories.map(category => <div className="dcl__system" key={category.label}>
              <div className="dcl__system-title">{category.label}</div>
              <div className="dcl__nodes">{category.items.map(i => <Indicator key={i} label={t.labels[i]} state={s[i]}/>)}</div>
              <div className={`dcl__connector ${category.items.some(i => s[i] === 'ok' || s[i] === 'backup') ? 'dcl__connector--active' : ''}`} aria-hidden="true"/>
            </div>)}
          </div>
          {mode !== 0 && <div className="dcl__timeline" aria-label={t.timeline}>
            {t.stages.map((stage, i) => <span key={stage} className={i <= phase ? 'dcl__timeline-step dcl__timeline-step--active' : 'dcl__timeline-step'}>{i + 1}. {stage}</span>)}
          </div>}
          <ServiceFlows mode={mode} t={t} phase={phase} />
          <div className={`dcl__load ${s[7] === 'failed' ? 'dcl__load--failed' : 'dcl__load--live'}`}>
            <svg viewBox="0 0 110 65" width="110" height="65" aria-hidden="true"><rect x="4" y="5" width="102" height="55" rx="6" fill="none" stroke="currentColor" strokeWidth="2"/>{[19,32,45].map(y => <g key={y}><path d={`M16 ${y} H92`} stroke="currentColor" strokeWidth="2"/><circle cx="22" cy={y+5} r="2.5" fill="currentColor"/></g>)}</svg>
            <strong>{t.labels[7]}</strong><span>{s[7] === 'failed' ? t.failed : t.live}</span>
          </div>
          <div className="dcl__legend"><span><i className="dcl__dot dcl__dot--ok"/>{t.live}</span><span><i className="dcl__dot dcl__dot--backup"/>{t.backup}</span><span><i className="dcl__dot dcl__dot--failed"/>{t.failed}</span></div>
        </div>
        <aside className="dcl__aside" aria-live="polite" aria-atomic="true">
          <span className={`dcl__status ${mode === 4 ? 'dcl__status--failed' : ''}`}><i/>{t.status[mode]}</span>
          <h4>{t.modes[mode]}</h4><p>{t.description[mode]}</p>
          {mode !== 0 && <div className="dcl__phase" aria-live="off"><span>{t.timeline}</span><strong>{phase === 0 ? t.stages[0] : phase === 1 ? t.stages[1] : t.stages[2]}</strong></div>}
          <div className="dcl__metrics">
            {categories.map(category => {
              const items = category.items.map(i => s[i]);
              const value = items.includes('backup') ? t.backup : items.includes('ok') ? t.live : t.failed;
              return <div key={category.label}><span>{category.label}</span><strong>{value}</strong></div>;
            })}
          </div>
          <blockquote>{t.lesson}</blockquote>
          <button type="button" className="dcl__reset" onClick={restart}>↺ {t.reset}</button>
        </aside>
      </div>
      <p className="dcl__note">{t.note}</p>
    </div>
  </section>;
}
