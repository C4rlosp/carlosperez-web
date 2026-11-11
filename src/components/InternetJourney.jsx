import { useEffect, useState } from 'react';
import './InternetJourney.css';

const content = {
  es: {
    eyebrow: 'LABORATORIO INTERACTIVO · EL ECOSISTEMA DE INTERNET',
    title: 'Internet no es una sola red.', accent: 'Es la conexión entre miles de ellas.',
    intro: 'Elegí una acción cotidiana y descubrí qué actores participan, cómo se relacionan y qué decisiones de ingeniería hacen posible la experiencia.',
    choose: '¿Qué querés explorar?', journey: 'RECORRIDO INTERACTIVO', stage: 'ETAPA', of: 'DE', previous: 'Anterior', next: 'Siguiente', restart: 'Volver a empezar', pause: 'Pausar', resume: 'Reproducir', actors: 'ACTORES Y CONCEPTOS', insight: 'LA IDEA CLAVE',
    disclaimer: 'Modelo conceptual educativo. Los recorridos son posibles ejemplos, no rutas obligatorias ni topologías de redes reales. No se utilizan datos operativos.',
    end: 'Internet funciona porque redes independientes se conectan, intercambian información y toman decisiones.',
    scenarios: [
      { icon: '▶', name: 'Ver un video', short: 'Contenido y distribución', actors: ['Dispositivo', 'DNS', 'ISP', 'CDN', 'Redes interconectadas'], steps: [
        ['La solicitud', 'Abrís una plataforma de video. Tu dispositivo necesita localizar los servicios que intervienen; DNS puede ayudar a resolver sus nombres.'],
        ['Tu conexión', 'Tu proveedor de Internet (ISP) te da acceso a otras redes y transporta los paquetes hacia los servicios elegidos.'],
        ['Entrega de contenido', 'Una CDN puede distribuir el video desde infraestructura cercana o desde otro lugar, según la plataforma y la conectividad disponible.'],
        ['La experiencia', 'El contenido llega a tu dispositivo. La capacidad, la congestión y la latencia influyen en el inicio y la continuidad de la reproducción.']
      ], insight: 'Una CDN distribuye contenido; no todas las solicitudes usan una CDN ni tienen que pasar por un IXP.' },
      { icon: '◎', name: 'Abrir una página', short: 'Nombres, rutas y servicios', actors: ['Navegador', 'DNS', 'ISP', 'Enrutamiento IP', 'Servidor'], steps: [
        ['Un nombre legible', 'Escribís una dirección web. Cuando hace falta, el navegador obtiene información mediante DNS para localizar el servicio.'],
        ['Conectividad', 'Tu equipo utiliza la red de acceso y el ISP para alcanzar la dirección del servicio.'],
        ['Entre redes', 'Los paquetes pueden cruzar distintas redes o interconexiones directas. Sus rutas dependen de las políticas y condiciones de conectividad.'],
        ['Respuesta', 'El servidor o la plataforma de entrega responde. El navegador procesa los recursos necesarios para mostrar la página.']
      ], insight: 'DNS localiza servicios; IP transporta paquetes; las aplicaciones determinan qué información se intercambia.' },
      { icon: '◉', name: 'Hacer una videollamada', short: 'Calidad en tiempo real', actors: ['Dispositivos', 'ISP', 'Plataforma', 'Redes intermedias', 'Transporte'], steps: [
        ['Conectarse', 'Los participantes acceden a Internet desde redes que pueden ser distintas.'],
        ['Establecer la sesión', 'La aplicación coordina la comunicación y puede utilizar servidores para señalización o retransmisión.'],
        ['Intercambiar medios', 'El audio y el video viajan por los caminos disponibles, directamente o mediante infraestructura de la plataforma.'],
        ['Mantener calidad', 'Latencia, jitter, pérdida y congestión afectan la conversación. La aplicación puede ajustar su comportamiento para adaptarse.']
      ], insight: 'La calidad no depende solo de la velocidad contratada: también importan el retardo, su variación y la pérdida.' },
      { icon: '⇄', name: 'Conectar dos redes', short: 'BGP, peering y tránsito', actors: ['Sistemas autónomos', 'BGP', 'Peering', 'Tránsito IP', 'IXP'], steps: [
        ['Redes independientes', 'Internet reúne redes administradas por distintas organizaciones, cada una con sus propias decisiones de conectividad.'],
        ['Intercambiar rutas', 'BGP permite que sistemas autónomos intercambien información de alcanzabilidad de prefijos, sujeta a políticas.'],
        ['Interconectarse', 'Las redes pueden establecer peering directo, encontrarse en un IXP o contratar tránsito IP para alcanzar otras redes.'],
        ['Elegir caminos', 'Las políticas BGP, los acuerdos y la conectividad disponible influyen en las rutas anunciadas y seleccionadas.']
      ], insight: 'Un IXP facilita interconexiones; no decide las rutas de sus participantes. Peering y tránsito cumplen funciones distintas.' }
    ]
  },
  en: {
    eyebrow: 'INTERACTIVE LAB · THE INTERNET ECOSYSTEM', title: 'The Internet is not one network.', accent: 'It is thousands of networks connected.',
    intro: 'Choose an everyday activity and discover which actors participate, how they connect, and the engineering decisions behind the experience.',
    choose: 'What would you like to explore?', journey: 'INTERACTIVE JOURNEY', stage: 'STEP', of: 'OF', previous: 'Previous', next: 'Next', restart: 'Start again', pause: 'Pause', resume: 'Play', actors: 'ACTORS AND CONCEPTS', insight: 'KEY INSIGHT',
    disclaimer: 'Educational conceptual model. Journeys illustrate possible scenarios, not mandatory paths or real network topologies. No operational data is used.',
    end: 'The Internet works because independent networks interconnect, exchange information, and make decisions.',
    scenarios: [
      {icon:'▶',name:'Watch a video',short:'Content delivery',actors:['Device','DNS','ISP','CDN','Interconnected networks'],steps:[
        ['The request','You open a video platform. Your device needs to locate the services involved; DNS can help resolve their names.'],
        ['Your connection','Your Internet service provider (ISP) connects you to other networks and carries packets toward the selected services.'],
        ['Content delivery','A CDN may distribute the video from nearby or remote infrastructure, depending on the platform and available connectivity.'],
        ['The experience','Content reaches your device. Capacity, congestion and latency influence playback startup and continuity.']
      ],insight:'A CDN distributes content; not every request uses a CDN or passes through an IXP.'},
      {icon:'◎',name:'Open a website',short:'Names, routes and services',actors:['Browser','DNS','ISP','IP routing','Server'],steps:[
        ['A readable name','You enter a web address. When necessary, the browser uses DNS information to locate the service.'],
        ['Connectivity','Your device uses its access network and ISP to reach the service address.'],
        ['Across networks','Packets may traverse multiple networks or direct interconnections. Paths depend on policies and connectivity conditions.'],
        ['The response','The server or delivery platform responds. The browser processes the resources required to display the page.']
      ],insight:'DNS locates services; IP transports packets; applications determine what information is exchanged.'},
      {icon:'◉',name:'Make a video call',short:'Real-time quality',actors:['Devices','ISP','Platform','Intermediate networks','Transport'],steps:[
        ['Getting online','Participants connect through access networks that may be different.'],
        ['Establishing the session','The application coordinates the call and may use servers for signaling or media relay.'],
        ['Exchanging media','Audio and video travel over available paths, directly or through the platform’s infrastructure.'],
        ['Maintaining quality','Latency, jitter, packet loss and congestion affect the conversation. Applications may adapt their behavior.']
      ],insight:'Quality is not just about bandwidth: delay, jitter and packet loss matter too.'},
      {icon:'⇄',name:'Connect two networks',short:'BGP, peering and transit',actors:['Autonomous systems','BGP','Peering','IP transit','IXP'],steps:[
        ['Independent networks','The Internet connects networks managed by different organizations, each making its own connectivity decisions.'],
        ['Exchanging routes','BGP lets autonomous systems exchange prefix reachability information, subject to routing policies.'],
        ['Interconnecting','Networks may peer directly, meet at an IXP or purchase IP transit to reach other networks.'],
        ['Choosing paths','BGP policies, agreements and available connectivity influence advertised and selected routes.']
      ],insight:'An IXP facilitates interconnection; it does not select participants’ routes. Peering and transit serve different purposes.'}
    ]
  }
};

function EcosystemGraphic({active, step, data, playing, motionKey}) {
  const labels = data.scenarios[active].actors;
  const angles = [-90, -18, 54, 126, 198];
  return <svg className="ij-world" viewBox="0 0 580 360" role="img" aria-label={labels.join(', ')}>
    <defs><radialGradient id="ij-globe-grad"><stop offset="0" stopColor="#195674"/><stop offset="1" stopColor="#08273e"/></radialGradient><filter id="ij-glow"><feGaussianBlur stdDeviation="4"/></filter></defs>
    <circle cx="290" cy="178" r="112" fill="url(#ij-globe-grad)" stroke="#3b829b" strokeWidth="1.5"/>
    <ellipse cx="290" cy="178" rx="49" ry="112" fill="none" stroke="#3b829b" opacity=".65"/>
    <ellipse cx="290" cy="178" rx="111" ry="43" fill="none" stroke="#3b829b" opacity=".65"/>
    <path d="M178 178H402 M290 66V290" stroke="#3b829b" opacity=".6"/>
    {angles.map((a,i)=>{const rad=a*Math.PI/180; const x=290+Math.cos(rad)*164; const y=178+Math.sin(rad)*144; const isOn=i<=Math.min(step+1,4); const isCurrent=i===Math.min(step+1,4);return <g key={i}>
      <line x1="290" y1="178" x2={x} y2={y} stroke={isOn?'#70e1e7':'#315c75'} strokeWidth={isCurrent?2.8:isOn?1.5:1} strokeDasharray="5 7" opacity={isOn?'.9':'.5'}/>
      {isOn&&<circle cx={x} cy={y} r="22" fill="#5bdce6" opacity=".12" filter="url(#ij-glow)"/>}
      <circle cx={x} cy={y} r="27" fill={isCurrent?'#17647a':isOn?'#12465c':'#0d3047'} stroke={isOn?'#6de2e6':'#3c6880'} strokeWidth={isCurrent?2.5:1.5}/>
      <text x={x} y={y+3} fill={isOn?'#eaffff':'#b2cbdb'} textAnchor="middle" fontSize={labels[i].length>15?'8.2':'10'} fontWeight="600">{labels[i].length>19?labels[i].slice(0,18)+'…':labels[i]}</text>
    </g>})}
    {playing && <g key={`${active}-${step}-${motionKey}`}>
      <circle r="5.5" fill="#a5ffff" className="ij-packet">
        <animateMotion dur="2.7s" repeatCount="indefinite"
          path={`M ${290+Math.cos(angles[step]*Math.PI/180)*164} ${178+Math.sin(angles[step]*Math.PI/180)*144} Q 290 178 ${290+Math.cos(angles[Math.min(step+1,4)]*Math.PI/180)*164} ${178+Math.sin(angles[Math.min(step+1,4)]*Math.PI/180)*144}`}/>
      </circle>
    </g>}
    <circle cx="290" cy="178" r="22" fill="#4ad6df" opacity=".16"/><circle cx="290" cy="178" r="8" fill="#7ce8e8"/>
    <circle cx="290" cy="178" r="14" fill="none" stroke="#7ce8e8" opacity=".7" className="ij-world-pulse"/>
  </svg>;
}

export default function InternetJourney({language='es'}) {
  const lang=language==='en'?'en':'es'; const d=content[lang];
  const [active,setActive]=useState(0); const [step,setStep]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [motionKey,setMotionKey]=useState(0);
  const goToStep=(n)=>{setStep(n);setMotionKey(k=>k+1)};
  useEffect(()=>{
    if(!playing)return;
    const timer=window.setTimeout(()=>{
      if(step===3)setPlaying(false);
      else goToStep(step+1);
    },4200);
    return ()=>window.clearTimeout(timer);
  },[playing,step,active]);
  useEffect(()=>{
    const pauseHidden=()=>{if(document.hidden)setPlaying(false)};
    document.addEventListener('visibilitychange',pauseHidden);
    return ()=>document.removeEventListener('visibilitychange',pauseHidden);
  },[]);
  const selected=d.scenarios[active];
  const choose=(i)=>{setActive(i);goToStep(0);setPlaying(true)};
  return <section className="ij-lab" aria-labelledby="ij-title">
    <div className="ij-container">
      <p className="ij-kicker">{d.eyebrow}</p>
      <h2 id="ij-title">{d.title}<br/><span>{d.accent}</span></h2>
      <p className="ij-intro">{d.intro}</p>
      <p className="ij-choice-label">{d.choose}</p>
      <div className="ij-experiences" role="group" aria-label={d.choose}>
        {d.scenarios.map((scenario,i)=><button key={i} type="button" className={`ij-experience ${active===i?'is-active':''}`} aria-pressed={active===i} onClick={()=>choose(i)}><span className="ij-experience__icon" aria-hidden="true">{scenario.icon}</span><strong>{scenario.name}</strong><small>{scenario.short}</small></button>)}
      </div>
      <div className="ij-ecosystem">
        <div className="ij-visual"><div className="ij-visual__tag">{d.journey} · {String(active+1).padStart(2,'0')}</div><EcosystemGraphic active={active} step={step} data={d} playing={playing} motionKey={motionKey}/><p className="ij-visual__note">{d.disclaimer}</p></div>
        <div className="ij-story" aria-live="polite">
          <div className="ij-story__top"><span>{d.stage} {String(step+1).padStart(2,'0')} / 04</span><span>{selected.name}</span></div>
          <div className="ij-progress" aria-hidden="true">{selected.steps.map((_,i)=><span key={i} className={i===step?'is-active':i<step?'is-complete':''}/>)}</div>
          <h3>{selected.steps[step][0]}</h3><p>{selected.steps[step][1]}</p>
          <div className="ij-story__buttons">
            <button type="button" onClick={()=>{setPlaying(false);goToStep(Math.max(0,step-1))}} disabled={step===0}>← {d.previous}</button>
            <button type="button" className="ij-story__next" onClick={()=>{setPlaying(false);goToStep(step===3?0:step+1)}}>{step===3?d.restart:d.next+' →'}</button>
            <button type="button" className="ij-story__autoplay" aria-pressed={playing} onClick={()=>{
              if(step===3){goToStep(0);setPlaying(true)}
              else setPlaying(v=>!v)
            }}>{playing?'Ⅱ '+d.pause:'▶ '+d.resume}</button>
          </div>
          <div className="ij-story__insight"><span>{d.insight}</span><p>{selected.insight}</p></div>
        </div>
      </div>
      <div className="ij-actors"><span>{d.actors}</span><div>{selected.actors.map(a=><span key={a}>{a}</span>)}</div></div>
      <p className="ij-closing">{d.end}</p>
    </div>
  </section>;
}
