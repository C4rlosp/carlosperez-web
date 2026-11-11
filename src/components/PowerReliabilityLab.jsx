import { useEffect, useId, useState } from 'react';
import './PowerReliabilityLab.css';

const copy = {
  es: {
    eyebrow: 'EXPERIENCIA INTERACTIVA · CONTINUIDAD ENERGÉTICA',
    title: 'Cuando proteger un sistema también requiere comprenderlo.',
    intro: 'Explorá el comportamiento de un sistema eléctrico de respaldo mediante tres escenarios interactivos. Evaluá cómo la demanda, la capacidad disponible y la coordinación de protecciones influyen en la confiabilidad y continuidad de los servicios.',
    modes: ['Operación normal', 'Interrupción de alimentación', 'Recuperación del sistema'],
    status: ['Sistema operativo', 'Alimentación interrumpida', 'Suministro restablecido'],
    descriptions: [
      'La red AC alimenta el rectificador. La carga DC recibe energía y el banco de baterías se mantiene en carga.',
      'Se simula una interrupción de la alimentación AC. El banco de baterías mantiene temporalmente la carga DC mientras disminuye su reserva.',
      'Al restablecerse la alimentación AC, el rectificador vuelve a suministrar energía y el banco inicia su recarga.'
    ],
    labels: ['Red AC', 'Protección', 'Rectificador', 'Banco de baterías', 'Carga DC'],
    insight: 'La lección: la continuidad depende de la coordinación entre alimentación, respaldo, protecciones y demanda.',
    note: 'Simulación didáctica: niveles, tiempos y valores son ilustrativos; no representan mediciones ni una instalación real.',
    charge: 'Estado de carga ilustrativo', flow: 'Ruta energética', normal: 'AC → rectificador → carga DC + baterías', failure: 'Baterías → barra DC → carga DC', recovery: 'AC → rectificador → carga DC + recarga',
    ac: 'Entrada AC', online: 'Disponible', offline: 'Interrumpida', dc: 'Carga DC', supplied: 'Alimentada', battery: 'Banco', charging: 'Cargando', discharging: 'Descargando', holding: 'En mantenimiento', empty: 'Reserva agotada', noDc: 'Sin suministro DC disponible', reset: 'Reiniciar simulación', percent: 'SOC',
    rbs: { heading: 'IMPACTO EN LA ESTACIÓN MÓVIL', title: 'La señal continúa mientras exista respaldo', subtitle: 'Una estación RBS conecta a las personas. El sistema DC mantiene operativos sus equipos durante la interrupción de AC, hasta agotar la reserva disponible.', tower: 'Torre y antenas', shelter: 'Shelter · RBS', user: 'Usuario conectado', live: 'Servicio móvil operativo', backup: 'Servicio sostenido por baterías', down: 'Servicio interrumpido', restored: 'Servicio restablecido', source: 'Fuente de energía', grid: 'Rectificador / AC', batteries: 'Banco de baterías', none: 'Sin energía disponible', note: 'Esquema educativo ficticio. No representa instalaciones, incidentes ni parámetros operativos reales.' },
    detail: ['Recorrido de energía normal', 'Alimentación AC interrumpida · suministro desde baterías', 'Alimentación restablecida · recuperación de carga']
  },
  en: {
    eyebrow: 'INTERACTIVE EXPERIENCE · POWER CONTINUITY',
    title: 'Understanding a system is essential to protecting it.',
    intro: 'Explore a backup-power system through three interactive scenarios. Evaluate how demand, available capacity, and protection coordination influence reliability and service continuity.',
    modes: ['Normal operation', 'Power interruption', 'System recovery'],
    status: ['System operating', 'Power interrupted', 'Supply restored'],
    descriptions: [
      'AC power feeds the rectifier. The DC load is supplied while the battery bank is maintained on charge.',
      'An AC supply interruption is simulated. The battery bank temporarily supplies the DC load while its available reserve decreases.',
      'When AC supply is restored, the rectifier resumes supplying power and the battery bank begins recharging.'
    ],
    labels: ['AC supply', 'Protection', 'Rectifier', 'Battery bank', 'DC load'],
    insight: 'The lesson: continuity depends on coordinating supply, backup, protection, and demand.',
    note: 'Educational simulation: levels, timing and values are illustrative, not actual measurements or installation data.',
    charge: 'Illustrative state of charge', flow: 'Power path', normal: 'AC → rectifier → DC load + batteries', failure: 'Batteries → DC bus → DC load', recovery: 'AC → rectifier → DC load + recharge',
    ac: 'AC input', online: 'Available', offline: 'Interrupted', dc: 'DC load', supplied: 'Supplied', battery: 'Battery bank', charging: 'Charging', discharging: 'Discharging', holding: 'Float / standby', empty: 'Reserve depleted', noDc: 'No DC power available', reset: 'Reset simulation', percent: 'SOC',
    rbs: { heading: 'MOBILE SITE IMPACT', title: 'The signal continues while backup power lasts', subtitle: 'An RBS site connects people. The DC power system keeps its equipment running during an AC interruption until the battery reserve is depleted.', tower: 'Tower and antennas', shelter: 'Shelter · RBS', user: 'Connected user', live: 'Mobile service operating', backup: 'Service powered by batteries', down: 'Service interrupted', restored: 'Service restored', source: 'Power source', grid: 'Rectifier / AC', batteries: 'Battery bank', none: 'No power available', note: 'Fictional educational diagram. It does not represent actual installations, incidents, or operating parameters.' },
    detail: ['Normal power path', 'AC supply interrupted · battery supply', 'Supply restored · charging recovery']
  }
};

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export default function PowerReliabilityLab({ language = 'es' }) {
  const [mode, setMode] = useState(0);
  const [soc, setSoc] = useState(78);
  const [auto, setAuto] = useState(true);
  const [phase, setPhase] = useState(0);
  const t = copy[language === 'en' ? 'en' : 'es'];
  const id = useId().replace(/:/g, '');
  const failed = mode === 1;
  const depleted = failed && soc <= 0;
  const batteryActive = failed && !depleted;
  const current = !failed;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSoc(value => {
        if (mode === 1) return clamp(value - 1, 0, 96);
        if (mode === 2) return clamp(value + 1, 0, 96);
        return clamp(value + (value < 84 ? 1 : 0), 0, 96);
      });
    }, 650);
    return () => window.clearInterval(timer);
  }, [mode]);

  const reset = () => { setMode(0); setSoc(78); setPhase(0); setAuto(true); };
  useEffect(() => {
    if (!auto) return undefined;
    const stages = [
      { mode:0, duration:4200 },
      { mode:1, duration:11500 },
      { mode:2, duration:8000 },
      { mode:0, duration:5000 }
    ];
    const timer = window.setTimeout(() => {
      const next = (phase + 1) % stages.length;
      setPhase(next);
      setMode(stages[next].mode);
    }, stages[phase].duration);
    return () => window.clearTimeout(timer);
  }, [auto, phase]);
  const story = language === 'en' ? [
    ['NORMAL SUPPLY','AC powers the rectifier, the DC load is supplied, and the battery bank stays ready.'],
    ['POWER INTERRUPTION','AC supply is interrupted. Batteries temporarily sustain the simulated load while discharging.'],
    ['SUPPLY RESTORED','AC supply is restored and the batteries begin to recharge.'],
    ['VERIFIED RECOVERY','The simulated service is stable again. The sequence restarts to illustrate backup-power behavior.']
  ] : [
    ['ALIMENTACIÓN NORMAL','La red AC alimenta el rectificador, sostiene la carga DC y mantiene preparado el banco de baterías.'],
    ['INTERRUPCIÓN DE ALIMENTACIÓN','Se interrumpe la alimentación AC y las baterías sostienen temporalmente la carga simulada.'],
    ['ALIMENTACIÓN RESTABLECIDA','Se restablece la alimentación AC y comienza la recarga de las baterías.'],
    ['RECUPERACIÓN VERIFICADA','El servicio simulado vuelve a estabilizarse. La secuencia se repite para ilustrar el comportamiento del respaldo.']
  ];

  const powerPath = depleted ? t.noDc : mode === 0 ? t.normal : mode === 1 ? t.failure : t.recovery;
  const batteryState = depleted ? t.empty : failed ? t.discharging : mode === 2 || soc < 84 ? t.charging : t.holding;

  return (
    <section className={`prl prl--mode-${mode}`} aria-labelledby={`prl-title-${id}`}>
      <div className="prl__intro">
        <div>
          <span className="prl__eyebrow">{t.eyebrow}</span>
          <h3 id={`prl-title-${id}`}>{t.title}</h3>
          <p>{t.intro}</p>
        </div>
        <div className="prl__modes" role="group" aria-label={t.title}>
          {t.modes.map((name, i) => (
            <button key={name} type="button" aria-pressed={mode === i} className={mode === i ? 'is-selected' : ''} onClick={() => {setAuto(false);setMode(i);setPhase(i)}}>{name}</button>
          ))}
        </div>
      </div>

      <div className="cp-autolab-story" aria-live="polite">
        <div className="cp-autolab-story__head"><span>{language==='en'?'GUIDED POWER SEQUENCE':'SECUENCIA ELÉCTRICA GUIADA'}</span><span className={auto?'cp-autolab-live':'cp-autolab-paused'}>{auto?'● AUTO':(language==='en'?'Ⅱ PAUSED':'Ⅱ PAUSA')}</span></div>
        <strong>{story[phase][0]}</strong><p>{story[phase][1]}</p>
        <div className="cp-autolab-progress">{story.map((step,i)=><span key={step[0]} className={i===phase?'is-active':''}/>)}</div>
        <div className="cp-autolab-buttons"><button type="button" onClick={()=>setAuto(v=>!v)}>{auto?(language==='en'?'Pause':'Pausar'):(language==='en'?'Resume':'Continuar')}</button><button type="button" onClick={reset}>{language==='en'?'Restart sequence':'Reiniciar secuencia'}</button></div>
      </div>
      <div className="prl__stage">
        <div className="prl__visual">
          <div className="prl__diagram" role="img" aria-label={`${t.status[mode]}. ${t.detail[mode]}. ${t.charge}: ${soc}%.`}>
            <svg viewBox="0 0 930 390" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id={`prl-flow-${id}`} x1="0" x2="1"><stop stopColor="#4abaff"/><stop offset="1" stopColor="#2bd7b5"/></linearGradient>
                <filter id={`prl-halo-${id}`} x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="4"/></filter>
              </defs>
              <g className="prl__wire"><path d="M177 152 H240"/><path d="M372 152 H426"/><path d="M576 152 H719"/><path d="M625 152 V248"/></g>
              {current && <g className="prl__energy prl__energy--forward" stroke={`url(#prl-flow-${id})`}>
                <path d="M177 152 H240"/><path d="M372 152 H426"/><path d="M576 152 H719"/><path d="M625 152 V248"/>
              </g>}
              {batteryActive && <g className="prl__energy prl__energy--battery" stroke="#ffb368"><path d="M625 248 V152 H719"/></g>}
              {failed && <path d="M177 152 H240" className="prl__broken"/>}
              {current && [205,398,651].map((x, i) => <g key={i} className="prl__pulse" style={{ animationDelay: `${i * .42}s` }}><circle cx={x} cy="152" r="5" fill="#8debdc" filter={`url(#prl-halo-${id})`}/><circle cx={x} cy="152" r="3" fill="#d7fff5"/></g>)}
              {batteryActive && <g className="prl__pulse prl__pulse--battery"><circle cx="625" cy="202" r="6" fill="#ffc58b" filter={`url(#prl-halo-${id})`}/><circle cx="625" cy="202" r="3" fill="#ffd8b2"/></g>}

              <g className="prl__device"><rect x="30" y="100" width="147" height="104" rx="16"/><path d="M69 154 q17 -32 34 0 t34 0" className="prl__symbol"/></g>
              <g className={`prl__device ${failed ? 'prl__device--fault' : 'prl__device--active'}`}><rect x="240" y="100" width="132" height="104" rx="16"/>{failed ? <path d="M287 136 L324 173 M324 136 L287 173" className="prl__symbol prl__symbol--fault"/> : <path d="M290 152 H324" className="prl__symbol prl__symbol--green"/>}</g>
              <g className="prl__device"><rect x="426" y="100" width="150" height="104" rx="16"/><path d="M463 138 H539 M463 153 H539 M463 168 H539" className="prl__symbol"/></g>
              <g className={`prl__device ${depleted ? 'prl__device--fault' : ''}`}><rect x="719" y="100" width="176" height="104" rx="16"/><path d="M769 137 H844 M769 153 H844 M769 169 H844" className="prl__symbol"/></g>
              <g fontFamily="Inter, sans-serif" fontSize="16" fill="#dcebf8" textAnchor="middle"><text x="104" y="231">{t.labels[0]}</text><text x="306" y="231">{t.labels[1]}</text><text x="501" y="231">{t.labels[2]}</text><text x="806" y="231">{t.labels[4]}</text></g>
              <g>
                {[553,592,631,670].map((x, i) => (
                  <g key={x}>
                    <rect x={x} y="248" width="30" height="72" rx="5" fill="#122c45" stroke={failed ? '#ffb368' : '#2bd7b5'} strokeWidth="2"/>
                    <rect x={x + 5} y={314 - 58 * soc / 100} width="20" height={58 * soc / 100} rx="2" fill={failed ? '#ffb368' : '#2bd7b5'} className="prl__battery-fill" style={{ animationDelay: `${i * .12}s` }}/>
                    <path d={`M${x + 10} 244 H${x + 20}`} stroke="#b9d5e7" strokeWidth="3" strokeLinecap="round"/>
                  </g>
                ))}
                <text x="625" y="350" fontFamily="Inter, sans-serif" fontSize="16" fill="#dcebf8" textAnchor="middle">{t.labels[3]}</text>
                <text x="625" y="373" fontFamily="Inter, sans-serif" fontSize="13" fill={failed ? '#ffb368' : '#2bd7b5'} textAnchor="middle">{soc}% · {batteryState}</text>
              </g>
              {failed && <g><circle cx="306" cy="80" r="7" fill="#ff9b85" className="prl__alarm"/><text x="306" y="68" textAnchor="middle" fill="#ffb7a8" fontFamily="Inter, sans-serif" fontSize="13">{t.offline}</text></g>}
            </svg>
          </div>
          <div className="prl__legend" aria-hidden="true"><span><i className="prl__legend-dot prl__legend-dot--green"/>{t.online}</span><span><i className="prl__legend-dot prl__legend-dot--orange"/>{t.discharging}</span><span><i className="prl__legend-dot prl__legend-dot--red"/>{t.offline}</span></div>
        </div>
        <aside className="prl__detail" aria-live="polite">
          <div className="prl__status"><span className={`prl__indicator ${failed ? 'is-failed' : ''}`}/><span>{t.status[mode]}</span></div>
          <strong>{t.detail[mode]}</strong>
          <p>{t.descriptions[mode]}</p>
          <div className="prl__telemetry">
            <div className="prl__soc-heading"><span>{t.charge}</span><b>{soc}%</b></div>
            <div className="prl__soc-track" role="progressbar" aria-label={t.charge} aria-valuemin={0} aria-valuemax={100} aria-valuenow={soc}><div style={{ width: `${soc}%` }}/></div>
            <div className="prl__metrics"><div><span>{t.ac}</span><b className={failed ? 'prl__warning' : ''}>{failed ? t.offline : t.online}</b></div><div><span>{t.battery}</span><b>{batteryState}</b></div><div><span>{t.dc}</span><b>{depleted ? t.offline : t.supplied}</b></div></div>
            <div className="prl__flow-caption"><span>{t.flow}</span><p>{powerPath}</p></div>
          </div>
          <div className="prl__lesson">{t.insight}</div>
          <button className="prl__reset" type="button" onClick={reset}>↺ {t.reset}</button>
        </aside>
      </div>

      <div className={`prl__rbs-scene ${depleted ? 'prl__rbs-scene--down' : ''}`} aria-labelledby={`prl-rbs-title-${id}`}>
        <div className="prl__rbs-heading">
          <div><span className="prl__eyebrow">{t.rbs.heading}</span><h4 id={`prl-rbs-title-${id}`}>{t.rbs.title}</h4><p>{t.rbs.subtitle}</p></div>
          <div className={`prl__rbs-status ${depleted ? 'is-down' : ''}`} role="status"><span className="prl__rbs-led" />{depleted ? t.rbs.down : failed ? t.rbs.backup : mode === 2 ? t.rbs.restored : t.rbs.live}</div>
        </div>
        <div className="prl__rbs-visual" role="img" aria-label={`${t.rbs.shelter}, ${t.rbs.tower}, ${t.rbs.user}. ${depleted ? t.rbs.down : t.rbs.live}.`}>
          <svg viewBox="0 0 960 340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <defs><linearGradient id={`prl-sky-${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#102d48"/><stop offset="1" stopColor="#0b1e32"/></linearGradient></defs>
            <rect width="960" height="340" rx="14" fill={`url(#prl-sky-${id})`}/>
            <path d="M0 291 H960" stroke="#355873" strokeWidth="2"/>
            {/* The power path is physically distinct from the RF coverage path. */}
            <g className="prl__rbs-shelter">
              <path d="M55 205 L164 164 L273 205 Z" fill="#305d7b" stroke="#85c5e9" strokeWidth="3"/>
              <rect x="70" y="205" width="188" height="86" rx="4" fill="#193d5a" stroke="#85c5e9" strokeWidth="3"/>
              <rect x="91" y="221" width="62" height="62" rx="5" fill="#102a41" stroke="#70b4da"/>
              <path d="M102 234 H142 M102 245 H142 M102 256 H142" stroke="#70b4da" strokeWidth="3"/>
              <circle cx="105" cy="268" r="4" fill={depleted ? '#ff9b85' : '#2bd7b5'}/>
              <rect x="179" y="222" width="56" height="48" rx="5" fill="#102a41" stroke="#70b4da"/>
              <path d="M189 236 H225 M189 247 H225" stroke="#70b4da" strokeWidth="3"/>
            </g>
            <path d="M258 268 H386 V160 H451" fill="none" stroke="#536d81" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            {!depleted && <path className="prl__rbs-power" d="M258 268 H386 V160 H451" fill="none" stroke="#ffb368" strokeWidth="3.5" strokeDasharray="9 12" strokeLinecap="round"/>}
            <g className="prl__rbs-tower" stroke="#82c9f3" strokeWidth="3" fill="none" strokeLinejoin="round">
              <path d="M405 290 L480 48 L555 290 Z M421 230 H539 M438 177 H522 M451 126 H509 M405 290 L522 177 M555 290 L438 177 M421 230 L509 126 M539 230 L451 126"/>
              <path d="M480 48 V29"/>
            </g>
            <g fill="#bce7ff"><rect x="456" y="50" width="11" height="57" rx="4"/><rect x="493" y="50" width="11" height="57" rx="4"/></g>
            <g className="prl__rbs-radiation" stroke="#68baff" strokeWidth="3" fill="none">
              <path d="M512 51 Q549 79 512 109"/><path d="M526 35 Q583 80 526 124"/>
            </g>
            <g className="prl__rbs-coverage" stroke="#68baff" strokeWidth="3" fill="none">
              <path d="M526 66 Q690 13 809 176" strokeDasharray="10 14"/>
              <path d="M532 90 Q690 77 807 183" strokeDasharray="5 15" opacity=".7"/>
            </g>
            <g transform="translate(805 188)">
              <circle cx="0" cy="0" r="16" fill="#ffd6b0"/>
              <path d="M-16 37 Q-15 19 0 19 Q15 19 16 37 V73 H-16 Z" fill="#347eb3"/>
              <path d="M-12 71 L-17 102 M12 71 L17 102" stroke="#8cb8d8" strokeWidth="8" strokeLinecap="round"/>
              <path d="M12 34 L29 45" stroke="#ffd6b0" strokeWidth="7" strokeLinecap="round"/>
              <rect x="26" y="31" width="14" height="23" rx="3" fill="#11273b" stroke="#84d9ff" strokeWidth="2"/>
              <path className="prl__rbs-phone-signal" d="M29 27 Q34 19 39 27 M26 23 Q34 11 42 23" fill="none" stroke="#68baff" strokeWidth="2"/>
            </g>
            <g fontFamily="Inter, sans-serif" fontSize="16" fill="#d6eafb" textAnchor="middle">
              <text x="164" y="322">{t.rbs.shelter}</text>
              <text x="480" y="322">{t.rbs.tower}</text>
              <text x="820" y="322">{t.rbs.user}</text>
              <text x="330" y="249" fontSize="12" fill="#ffca8f">DC</text>
              <text x="678" y="65" fontSize="12" fill="#9bcfff">RF</text>
            </g>
          </svg>
        </div>
        <div className="prl__rbs-footer"><div><span>{t.rbs.source}</span><strong>{depleted ? t.rbs.none : failed ? t.rbs.batteries : t.rbs.grid}</strong></div><div><span>{t.charge}</span><strong>{soc}%</strong></div><p>{t.rbs.note}</p></div>
      </div>
      <p className="prl__note">{t.note}</p>
    </section>
  );
}
