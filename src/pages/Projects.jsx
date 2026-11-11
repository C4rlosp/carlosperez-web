import { lazy, Suspense } from 'react';
import { useState } from 'react';
const DataCenterContinuityLab = lazy(() => import('../components/DataCenterContinuityLab'));
const InternetJourney = lazy(() => import('../components/InternetJourney'));
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Projects.css';
const NetworkEngineeringLab = lazy(() => import('../components/NetworkEngineeringLab'));
import EngineeringCapabilities from '../components/EngineeringCapabilities';
const LibertyTrafficLab = lazy(() => import('../components/LibertyTrafficLab'));

const PowerReliabilityLab = lazy(() => import('../components/PowerReliabilityLab'));
const content = {
  es: {
    kicker: 'INGENIERÍA EN EL MUNDO REAL',
    heroA: 'Los desafíos cambian.',
    heroB: 'La forma de enfrentarlos me define.',
    lead: 'De la infraestructura crítica a la interconexión de Internet. Distintos escenarios, una misma convicción: comprender el sistema antes de construir una solución.',
    explore: 'Conocer los proyectos',
    introTitle: 'No se trata solo de tecnología. Se trata de resolver lo que importa.',
    introText: 'Estos casos representan diferentes etapas de mi carrera. En algunos lideré equipos, en otros trabajé junto a especialistas y, en todos, aprendí que las mejores soluciones nacen del criterio compartido.',
    mexico: {
      context: 'Ericsson · México',
      title: 'Diagnóstico y confiabilidad de infraestructura crítica.',
      lead: 'Resolver desafíos técnicos en sistemas de soporte requiere comprender su funcionamiento integral.',
      problem: 'La operación y mantenimiento de infraestructura de telecomunicaciones exige identificar y resolver situaciones que pueden comprometer la confiabilidad de los sistemas críticos.',
      work: 'Como coordinador de Operación y Mantenimiento (O&M), participé en el diagnóstico y resolución de incidencias relacionadas con infraestructura eléctrica, aplicando análisis de causa raíz y criterios de ingeniería para fortalecer la confiabilidad de los sistemas.',
      lesson: 'Una solución confiable comienza por comprender el sistema completo.',
      pLabel: 'El problema', wLabel: 'Mi participación'
    },
    liberty: {
      context: 'Liberty · Costa Rica',
      title: 'Diseñar continuidad más allá de la redundancia.',
      lead: 'La resiliencia exige una visión integral de la infraestructura y sus dependencias.',
      problem: 'Las infraestructuras de telecomunicaciones requieren una evolución constante para responder a mayores exigencias de disponibilidad, continuidad y calidad del servicio.',
      work: 'Participé en un trabajo colaborativo entre equipos de ingeniería para evaluar oportunidades de mejora en la resiliencia de la red, aportando al análisis de alternativas técnicas y estrategias de ingeniería de tráfico orientadas a fortalecer la continuidad operativa.',
      lesson: 'La resiliencia se fortalece con análisis, coordinación y visión de conjunto.',
      pLabel: 'El problema', wLabel: 'La propuesta'
    },
    crix: {
      context: 'CRIX · Costa Rica',
      title: 'Preparar la interconexión para lo que viene.',
      lead: 'La evolución de la interconexión requiere combinar escalabilidad, seguridad y visión operativa.',
      problem: 'El crecimiento del ecosistema de Internet plantea desafíos constantes de capacidad, confiabilidad y evolución tecnológica.',
      work: 'He contribuido a la evolución y modernización de infraestructuras de interconexión de Internet, participando en iniciativas orientadas a fortalecer su capacidad, seguridad, resiliencia y visibilidad operativa. Mi trabajo combina ingeniería de redes, planificación tecnológica y mejora continua de procesos.',
      lesson: 'Una infraestructura madura evoluciona con visión de futuro y criterio operativo.',
      pLabel: 'El desafío', wLabel: 'El trabajo'
    },
    datacenter: { context: 'Operación de centros de datos', title: 'La continuidad no depende de un solo sistema.', lead: 'Energía, climatización y conectividad deben trabajar juntas para mantener disponibles los servicios críticos.', problem: 'La operación de un centro de datos exige gestionar dependencias entre alimentación, respaldo, refrigeración y enlaces. Una falla aislada puede afectar múltiples servicios si no existe capacidad o redundancia efectiva.', work: 'Mi experiencia administrando infraestructura de centros de datos me ha permitido comprender la importancia de supervisar las condiciones operativas, planificar el mantenimiento y evaluar los riesgos para la continuidad del negocio.', lesson: 'La resiliencia se construye desde la infraestructura física hasta los servicios que dependen de ella.', pLabel: 'El desafío', wLabel: 'Mi experiencia' },
    teamTitle: 'La ingeniería también se construye con personas.',
    teamLead: 'En Ericsson México fui referente técnico para otros ingenieros ante problemas complejos de red. Más adelante, como consultor en Ericsson Costa Rica, lideré técnicamente a comisionadores y capacité personal para responder a la demanda de un proyecto.',
    teamQuote: 'Compartir lo que uno sabe también es una forma de ampliar la capacidad de una red.',
    beyondTitle: 'Del trabajo técnico a compartir experiencias.',
    beyondText: 'Hoy también llevo estas experiencias a charlas universitarias y foros internacionales. No para presentar una carrera perfecta, sino para abrir conversaciones sobre lo que funciona, lo que falla y lo que podemos construir mejor.',
    endTitle: '¿Tenés un desafío que vale la pena resolver?',
    endText: 'Me interesa colaborar en proyectos donde el criterio técnico, la experiencia y las personas hagan la diferencia.',
    cta: 'Conversemos',
    caseKicker: 'EXPERIENCIA SELECCIONADA · PROYECTOS CRÍTICOS',
    caseTitle: 'Decisiones de ingeniería en entornos donde la continuidad importa.',
    caseIntro: 'Cuatro ámbitos de mi trayectoria: diagnóstico técnico, resiliencia de redes, evolución de interconexión y continuidad de infraestructura. Cada experiencia destaca mi participación y el criterio de ingeniería aplicado.',
    evidenceLabel: 'CRITERIO DE INGENIERÍA',
    practiceKicker: 'DEL PROYECTO AL CRITERIO',
    practiceTitle: 'Experiencia aplicada. Conocimiento que se puede explorar.',
    practiceText: 'Estos entornos interactivos son simulaciones educativas desarrolladas para explicar decisiones de arquitectura, diagnóstico y operación. No representan sistemas productivos ni sustituyen la experiencia de los casos anteriores.',
    lab1: 'Políticas y diagnóstico BGP',
    lab1Text: 'Exploración educativa de políticas de rutas, diagnóstico de sesiones y observabilidad BGP.',
    lab2: 'Continuidad eléctrica',
    lab2Text: 'Principios generales de protección y continuidad de energía en infraestructura crítica.',
    lab3: 'Resiliencia de transporte',
    lab3Text: 'Principios de selección de rutas y continuidad ante cambios en el transporte.',
    lab4: 'Rutas de Internet',
    lab4Text: 'Peering, tránsito y contenido: las decisiones detrás de una experiencia aparentemente inmediata.',
    lab5: 'Continuidad integral',
    lab5Text: 'Dependencias entre energía, climatización y conectividad de servicios críticos.',
    servicesKicker: 'ÁREAS DE COLABORACIÓN',
    servicesTitle: 'Una mirada integral para desafíos complejos.',
    servicesIntro: 'Desde la infraestructura física hasta las decisiones de arquitectura y operación. Mi experiencia conecta disciplinas que no pueden evaluarse de forma aislada.',
    serviceItems: [
      ['Arquitectura e interconexión', 'Diseño y evolución de redes, intercambio de tráfico y criterios de enrutamiento.'],
      ['Resiliencia y continuidad', 'Análisis de dependencias, redundancia efectiva y respuesta ante fallas.'],
      ['Operación de infraestructura crítica', 'Diagnóstico, evaluación de riesgos y mejora de procesos operativos.'],
      ['Automatización y observabilidad', 'Validaciones técnicas, visibilidad y herramientas que apoyan decisiones humanas.']
    ],
    serviceNote: 'Ámbitos de experiencia y colaboración, no una promesa de resultados sin diagnóstico previo.',
    visual1: 'Protección eléctrica y respaldo',
    visual2: 'Caminos alternativos de tráfico',
    visual3: 'Evolución de la interconexión'
  },
  en: {
    kicker: 'ENGINEERING IN THE REAL WORLD',
    heroA: 'Challenges change.',
    heroB: 'How I approach them defines me.',
    lead: 'From critical infrastructure to Internet interconnection. Different settings, one conviction: understand the system before building a solution.',
    explore: 'Explore the work',
    introTitle: "It's not just about technology. It's about solving what matters.",
    introText: 'These stories represent different stages of my career. In some I led teams, in others I worked alongside specialists, and in all of them I learned that strong solutions grow from shared judgment.',
    mexico: {
      context: 'Ericsson · Mexico', title: 'Diagnosing and strengthening critical infrastructure.',
      lead: 'Addressing technical challenges in supporting systems requires understanding the whole environment.',
      problem: 'Operating and maintaining telecommunications infrastructure requires identifying and resolving issues that may affect the reliability of critical systems.',
      work: 'As an Operations and Maintenance (O&M) coordinator, I contributed to diagnosing and resolving electrical-infrastructure issues, applying root-cause analysis and engineering judgment to strengthen system reliability.',
      lesson: 'Reliable solutions begin with understanding the entire system.', pLabel: 'The problem', wLabel: 'My role'
    },
    liberty: {
      context: 'Liberty · Costa Rica', title: 'Designing continuity beyond redundancy.',
      lead: 'Resilience calls for a holistic view of infrastructure and its dependencies.',
      problem: 'Telecommunications infrastructure must continually evolve to meet growing expectations for availability, continuity, and service quality.',
      work: 'I collaborated with engineering teams to evaluate opportunities to improve network resilience, contributing technical analysis and traffic-engineering perspectives aimed at strengthening operational continuity.',
      lesson: 'Resilience grows through analysis, collaboration, and a system-wide perspective.', pLabel: 'The problem', wLabel: 'The proposal'
    },
    crix: {
      context: 'CRIX · Costa Rica', title: 'Preparing interconnection for what comes next.',
      lead: 'Evolving interconnection requires balancing scalability, security, and operational insight.',
      problem: 'The growing Internet ecosystem presents ongoing challenges in capacity, reliability, and technological evolution.',
      work: 'I have contributed to the modernization and evolution of Internet interconnection infrastructure through initiatives focused on capacity, security, resilience, and operational visibility. My work combines network engineering, technology planning, and continuous process improvement.',
      lesson: 'Mature infrastructure evolves through forward-looking engineering and operational judgment.', pLabel: 'The challenge', wLabel: 'The work'
    },
    datacenter: { context: 'Data center operations', title: 'Continuity does not depend on a single system.', lead: 'Power, cooling, and connectivity must work together to keep critical services available.', problem: 'Operating a data center requires managing dependencies between power, backup systems, cooling, and network links. A single failure can affect multiple services without adequate capacity and effective redundancy.', work: 'My experience managing data center infrastructure has reinforced the importance of monitoring operating conditions, planning maintenance, and assessing business continuity risks.', lesson: 'Resilience is built from physical infrastructure all the way to the services that depend on it.', pLabel: 'The challenge', wLabel: 'My experience' },
    teamTitle: 'Engineering is also built through people.',
    teamLead: 'At Ericsson Mexico, fellow engineers relied on me for complex network troubleshooting. Later, as a consultant at Ericsson Costa Rica, I served as technical lead for commissioning engineers and trained people to meet project demand.',
    teamQuote: 'Sharing what you know is another way to expand a network’s capabilities.',
    beyondTitle: 'From technical work to sharing experiences.',
    beyondText: 'Today I also bring these experiences to university talks and international forums—not to present a perfect career, but to start conversations about what works, what fails, and what we can build better.',
    endTitle: 'Have a challenge worth solving?',
    endText: 'I enjoy collaborating where technical judgment, experience, and people make the difference.',
    cta: "Let's talk",
    caseKicker: 'SELECTED EXPERIENCE · CRITICAL PROJECTS',
    caseTitle: 'Engineering decisions where continuity matters.',
    caseIntro: 'Four areas of my career: technical diagnosis, network resilience, interconnection evolution, and infrastructure continuity. Each experience highlights my contribution and engineering approach.',
    evidenceLabel: 'ENGINEERING INSIGHT',
    practiceKicker: 'FROM EXPERIENCE TO EXPLORATION',
    practiceTitle: 'Applied experience. Knowledge you can explore.',
    practiceText: 'These interactive environments are educational simulations developed to explain architecture, troubleshooting, and operational decisions. They do not depict production systems or replace the experience described above.',
    lab1: 'BGP policies and diagnostics',
    lab1Text: 'An educational exploration of routing policies, session diagnostics, and BGP observability.',
    lab2: 'Power continuity',
    lab2Text: 'General principles of electrical protection and power continuity in critical infrastructure.',
    lab3: 'Transport resilience',
    lab3Text: 'Routing and continuity principles when transport conditions change.',
    lab4: 'Internet paths',
    lab4Text: 'Peering, transit, and content: decisions behind an apparently immediate experience.',
    lab5: 'End-to-end continuity',
    lab5Text: 'Dependencies among power, cooling, and connectivity in critical services.',
    servicesKicker: 'AREAS OF COLLABORATION',
    servicesTitle: 'An integrated perspective on complex challenges.',
    servicesIntro: 'From physical infrastructure to architecture and operations. My experience connects disciplines that cannot be assessed in isolation.',
    serviceItems: [
      ['Architecture and interconnection', 'Network evolution, traffic exchange, and routing decisions.'],
      ['Resilience and continuity', 'Dependency analysis, effective redundancy, and failure response.'],
      ['Critical infrastructure operations', 'Troubleshooting, risk assessment, and operational process improvement.'],
      ['Automation and observability', 'Technical validation, visibility, and tools that support human decisions.']
    ],
    serviceNote: 'Areas of experience and collaboration, not a promise of outcomes without prior assessment.',
    visual1: 'Power protection and backup',
    visual2: 'Alternative traffic paths',
    visual3: 'Interconnection evolution'
  }
};

function CaseStudy({ item, chapter, flipped }) {
  return (
    <article className={`cp-v2-case ${flipped ? 'cp-v2-case--flipped' : ''}`}>
      <div className="cp-v2-case-art">
        <div className="cp-v2-case-art-message" aria-hidden="true">

          <strong>{chapter}</strong>
          <i></i>
        </div>
        <div className="cp-v2-art-caption">{item.context}</div>
      </div>
      <div className="cp-v2-case-copy">
        <span className="cp-v2-context">{item.context}</span>
        <h3>{item.title}</h3>
        <p className="cp-v2-case-lead">{item.lead}</p>
        <div className="cp-v2-case-body">
          <div><h4>{item.pLabel}</h4><p>{item.problem}</p></div>
          <div><h4>{item.wLabel}</h4><p>{item.work}</p></div>
        </div>
        <blockquote>{item.lesson}</blockquote>
      </div>
    </article>
  );
}

export default function Projects() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'es';
  const c = content[lang];
  const [selectedLab, setSelectedLab] = useState(null);

  return (
    <main className="cp-v2">
      <section className="cp-v2-hero" aria-labelledby="cp-v2-title">
        <div className="cp-v2-wrap">
          <p className="cp-v2-kicker">{c.kicker}</p>
          <h1 id="cp-v2-title">{c.heroA}<br/><span>{c.heroB}</span></h1>
          <p className="cp-v2-hero-lead">{c.lead}</p>
          <a className="cp-v2-explore" href="#casos">{c.explore}<span aria-hidden="true">↘</span></a>
        </div>
        <div className="cp-v2-hero-decoration" aria-hidden="true"><span/><span/><span/></div>
      </section>

      <section className="cp-v2-intro" id="casos">
        <div className="cp-v2-wrap cp-v2-intro-grid">
          <h2>{c.introTitle}</h2>
          <p>{c.introText}</p>
        </div>
      </section>

      <section className="cp-v2-section-heading" aria-labelledby="cp-v2-cases-title">
        <div className="cp-v2-wrap cp-v2-section-heading-grid">
          <div><p className="cp-v2-eyebrow">{c.caseKicker}</p><h2 id="cp-v2-cases-title">{c.caseTitle}</h2></div>
          <p>{c.caseIntro}</p>
        </div>
      </section>

      <section className="cp-v2-studies" aria-label={c.explore}>
        <CaseStudy item={c.mexico} chapter={lang === 'es' ? 'DIAGNÓSTICO' : 'DIAGNOSIS'}/>
        <CaseStudy item={c.liberty} chapter={lang === 'es' ? 'RESILIENCIA' : 'RESILIENCE'} flipped/>
        <CaseStudy item={c.crix} chapter={lang === 'es' ? 'INTERCONEXIÓN' : 'INTERCONNECTION'}/>
        <CaseStudy item={c.datacenter} chapter={lang === 'es' ? 'CONTINUIDAD' : 'CONTINUITY'} flipped/>
      </section>

      <section className="cp-v2-services" aria-labelledby="cp-v2-services-title">
        <div className="cp-v2-wrap">
          <div className="cp-v2-services-head">
            <p className="cp-v2-eyebrow">{c.servicesKicker}</p>
            <h2 id="cp-v2-services-title">{c.servicesTitle}</h2>
            <p>{c.servicesIntro}</p>
          </div>
          <div className="cp-v2-services-grid">
            {c.serviceItems.map(([title, description]) => (
              <article className="cp-v2-service" key={title}>

                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
          <p className="cp-v2-services-note">{c.serviceNote}</p>
          <Link className="cp-v2-services-link" to="/contact">{c.cta}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <EngineeringCapabilities />

      <section className="cp-v2-practice" aria-labelledby="cp-v2-practice-title">
        <div className="cp-v2-wrap cp-v2-practice-heading">
          <p className="cp-v2-eyebrow">{c.practiceKicker}</p>
          <h2 id="cp-v2-practice-title">{c.practiceTitle}</h2>
          <p>{c.practiceText}</p>
        </div>
        <div className="cp-v2-lab-picker" role="group" aria-label={lang === 'es' ? 'Elegir demostración' : 'Choose demonstration'}>
          {[1,2,3,4,5].map((n) => (
            <button key={n} type="button" className={`cp-v2-lab-choice ${selectedLab === n ? 'is-selected' : ''}`}
              aria-pressed={selectedLab === n}
              onClick={() => setSelectedLab(current => current === n ? null : n)}>
              <span className="cp-v2-lab-choice-copy"><strong>{c[`lab${n}`]}</strong><small>{c[`lab${n}Text`]}</small></span>
              <span className="cp-v2-lab-choice-action" aria-hidden="true">{selectedLab === n ? '−' : '+'}</span>
            </button>
          ))}
        </div>
        {selectedLab !== null && (
          <div className="cp-v2-selected-lab" key={`${lang}-${selectedLab}`}>
            <div className="cp-v2-selected-lab-bar"><strong>{c[`lab${selectedLab}`]}</strong><button type="button" onClick={() => setSelectedLab(null)}>{lang === 'es' ? 'Cerrar demostración' : 'Close demonstration'} <span aria-hidden="true">×</span></button></div>
            <Suspense fallback={<p role="status" aria-live="polite">{lang === 'en' ? 'Loading interactive lab…' : 'Cargando laboratorio interactivo…'}</p>}>
            {selectedLab === 1 && <NetworkEngineeringLab />}
            {selectedLab === 2 && <PowerReliabilityLab language={lang} />}
            {selectedLab === 3 && <LibertyTrafficLab lang={lang} />}
            {selectedLab === 4 && <InternetJourney language={lang} />}
            {selectedLab === 5 && <DataCenterContinuityLab language={lang} />}
            </Suspense>
          </div>
        )}
      </section>

      <section className="cp-v2-people">
        <div className="cp-v2-wrap cp-v2-people-grid">
          <div><h2>{c.teamTitle}</h2><p>{c.teamLead}</p></div>
          <blockquote>{c.teamQuote}</blockquote>
        </div>
      </section>

      <section className="cp-v2-beyond">
        <div className="cp-v2-wrap cp-v2-beyond-grid">
          <div className="cp-v2-beyond-mark" aria-hidden="true">“</div>
          <div><h2>{c.beyondTitle}</h2><p>{c.beyondText}</p></div>
        </div>
      </section>

      <section className="cp-v2-contact">
        <div className="cp-v2-wrap cp-v2-contact-grid">
          <div><h2>{c.endTitle}</h2><p>{c.endText}</p></div>
          <Link to="/contact" className="cp-v2-button">{c.cta}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
