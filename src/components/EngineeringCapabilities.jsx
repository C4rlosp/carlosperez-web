import { useTranslation } from 'react-i18next';
import './EngineeringCapabilities.css';

const copy = {
  es: {
    eyebrow: 'INGENIERÍA · SOFTWARE · OPERACIÓN',
    title: 'Ingeniería que se convierte en soluciones.',
    intro: 'Mi trabajo conecta tres perspectivas: comprender la infraestructura, resolver desafíos operativos y desarrollar herramientas que contribuyen a construir sistemas más confiables, eficientes y sostenibles.',
    labels: ['EL DESAFÍO', 'MI INTERVENCIÓN', 'EL ENFOQUE'],
    cases: [
      { n:'01', category:'AUTOMATIZACIÓN Y DESARROLLO', title:'Transformar procesos técnicos en soluciones automatizadas', lead:'Diseño y desarrollo de soluciones orientadas a estructurar procesos operativos, mejorar la consistencia de las verificaciones y fortalecer la trazabilidad de las actividades técnicas.', problem:'Los procesos técnicos complejos requieren consistencia, coordinación y mecanismos que permitan reducir errores, facilitar su seguimiento y mantener el control sobre las decisiones operativas.', contribution:'Concebí y desarrollé una solución de automatización, desde su arquitectura y lógica de funcionamiento hasta la integración y evolución de su interfaz. El trabajo incluyó la colaboración de un estudiante en práctica durante una etapa inicial del desarrollo.', proof:'Combinar automatización, validaciones técnicas y supervisión humana para construir procesos más eficientes, confiables y auditables.', tags:['Backend','Automatización','Validaciones','Ingeniería de redes'], accent:'cyan' },
      { n:'02', category:'DIAGNÓSTICO Y OBSERVABILIDAD', title:'Convertir datos de red en información para tomar decisiones', lead:'Desarrollo de herramientas orientadas a facilitar el análisis de eventos de red, mejorar la observabilidad y apoyar el diagnóstico técnico.', problem:'Las infraestructuras de red generan información distribuida entre múltiples sistemas. Interpretarla de forma eficiente requiere herramientas que faciliten su análisis y permitan comprender el comportamiento operativo.', contribution:'Desarrollé herramientas para consultar, organizar y analizar información técnica relacionada con el comportamiento de protocolos de enrutamiento, contribuyendo a simplificar las tareas de investigación y diagnóstico.', proof:'Transformar información técnica dispersa en conocimiento útil para el análisis, la resolución de problemas y la mejora continua de las operaciones.', tags:['Linux','BGP','Observabilidad','Desarrollo de herramientas'], accent:'violet' },
      { n:'03', category:'DESARROLLO DE MONITOREO', title:'Ampliar las capacidades de monitoreo de redes', lead:'Desarrollo de soluciones de monitoreo adaptadas a necesidades técnicas específicas, aprovechando plataformas existentes y ampliando sus capacidades.', problem:'Las herramientas de monitoreo generales no siempre ofrecen el nivel de visibilidad necesario para determinados entornos de red, por lo que requieren adaptaciones y desarrollos especializados.', contribution:'Diseñé y desarrollé plantillas de monitoreo para sesiones BGP IPv4 e IPv6 utilizando Zabbix, incorporando capacidades de supervisión adaptadas a los requerimientos técnicos del entorno.', proof:'Aprovechar y extender plataformas existentes mediante soluciones reutilizables, orientadas a mejorar la visibilidad y facilitar la operación de redes.', tags:['Zabbix','BGP','IPv4','IPv6'], accent:'blue' },
      { n:'04', category:'INFRAESTRUCTURA Y RESILIENCIA', title:'Diseñar continuidad más allá de la redundancia', lead:'Una visión integral de la disponibilidad, considerando las relaciones entre infraestructura física, conectividad, sistemas de soporte y operación.', problem:'La continuidad de los servicios de telecomunicaciones depende de múltiples factores técnicos y operativos. La redundancia es importante, pero debe complementarse con planificación, mantenimiento y una comprensión integral de las dependencias entre sistemas.', contribution:'He participado en el diagnóstico, operación y evolución de infraestructuras de telecomunicaciones, colaborando con equipos multidisciplinarios para evaluar riesgos, fortalecer la confiabilidad y desarrollar estrategias de mejora.', proof:'Abordar la resiliencia desde una perspectiva integral, combinando ingeniería, análisis de riesgos y coordinación operativa para contribuir a infraestructuras más confiables.', tags:['Resiliencia','Infraestructura','Conectividad','Continuidad'], accent:'green' }
    ],
    footer:'No son proyectos aislados. Son distintas expresiones de una misma forma de trabajar: comprender el sistema completo, construir con criterio y mejorar la operación.'
  },
  en: {
    eyebrow: 'ENGINEERING · SOFTWARE · OPERATIONS',
    title: 'Engineering turned into practical solutions.',
    intro: 'My work connects three perspectives: understanding infrastructure, addressing operational challenges, and developing tools that help make systems more reliable, efficient, and sustainable.',
    labels: ['THE CHALLENGE', 'MY ROLE', 'THE APPROACH'],
    cases: [
      { n:'01', category:'AUTOMATION & DEVELOPMENT', title:'Turning technical processes into automated solutions', lead:'Designing and developing solutions that structure operational processes, improve the consistency of technical checks, and strengthen traceability.', problem:'Complex technical processes require consistency, coordination, and mechanisms to reduce errors, support follow-up, and maintain control over operational decisions.', contribution:'I conceived and developed an automation solution, from its architecture and core logic to integrating and evolving its interface. The work included collaboration with a student intern during an early stage of development.', proof:'Combine automation, technical validation, and human oversight to build more efficient, reliable, and auditable processes.', tags:['Backend','Automation','Validation','Network engineering'], accent:'cyan' },
      { n:'02', category:'DIAGNOSTICS & OBSERVABILITY', title:'Turning network data into information for better decisions', lead:'Developing tools that support network-event analysis, improve observability, and assist technical diagnosis.', problem:'Network infrastructures generate information across multiple systems. Interpreting it efficiently calls for tools that help analyze data and understand operational behavior.', contribution:'I developed tools to query, organize, and analyze technical information related to routing-protocol behavior, helping simplify investigation and troubleshooting.', proof:'Turn scattered technical information into useful knowledge for analysis, problem-solving, and continuous operational improvement.', tags:['Linux','BGP','Observability','Tool development'], accent:'violet' },
      { n:'03', category:'MONITORING DEVELOPMENT', title:'Extending network monitoring capabilities', lead:'Developing monitoring solutions for specific technical needs by extending the capabilities of existing platforms.', problem:'General-purpose monitoring tools do not always provide the visibility needed in specialized network environments, making adaptations and custom development valuable.', contribution:'I designed and developed Zabbix monitoring templates for IPv4 and IPv6 BGP sessions, tailoring visibility to technical requirements.', proof:'Extend existing platforms with reusable solutions that improve visibility and support network operations.', tags:['Zabbix','BGP','IPv4','IPv6'], accent:'blue' },
      { n:'04', category:'INFRASTRUCTURE & RESILIENCE', title:'Designing continuity beyond redundancy', lead:'An integrated view of availability, considering relationships among physical infrastructure, connectivity, supporting systems, and operations.', problem:'Telecommunications service continuity depends on multiple technical and operational factors. Redundancy matters, but it must be complemented by planning, maintenance, and a comprehensive understanding of system dependencies.', contribution:'I have contributed to diagnosing, operating, and evolving telecommunications infrastructure, collaborating with multidisciplinary teams to assess risks, improve reliability, and develop improvement strategies.', proof:'Approach resilience holistically by combining engineering, risk analysis, and operational coordination to support more dependable infrastructure.', tags:['Resilience','Infrastructure','Connectivity','Continuity'], accent:'green' }
    ],
    footer:'These are not isolated projects. They reflect one consistent approach: understand the entire system, build with sound judgment, and improve operations.'
  }

};

export default function EngineeringCapabilities() {
  const { i18n } = useTranslation();
  const c = copy[i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'es'];
  return (
    <section className="cp-cap" aria-labelledby="cp-cap-title">
      <div className="cp-cap__wrap">
        <div className="cp-cap__heading"><p className="cp-cap__eyebrow">{c.eyebrow}</p><h2 id="cp-cap-title">{c.title}</h2><p>{c.intro}</p></div>
        <div className="cp-cap__grid">
          {c.cases.map(item => (
            <article className={`cp-cap__card cp-cap__card--${item.accent}`} key={item.n}>
              <div className="cp-cap__top"><span className="cp-cap__category">{item.category}</span></div>
              <h3>{item.title}</h3><p className="cp-cap__lead">{item.lead}</p>
              <div className="cp-cap__details">
                <div><h4>{c.labels[0]}</h4><p>{item.problem}</p></div>
                <div><h4>{c.labels[1]}</h4><p>{item.contribution}</p></div>
                <div><h4>{c.labels[2]}</h4><p>{item.proof}</p></div>
              </div>
              <div className="cp-cap__tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
        <p className="cp-cap__closing">{c.footer}</p>
      </div>
    </section>
  );
}
