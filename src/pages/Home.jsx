import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

const photo = (name) => `${import.meta.env.BASE_URL}${name}`;

const content = {
  es: {
    eyebrow: 'INGENIERÍA · INFRAESTRUCTURA · CONECTIVIDAD',
    greeting: 'Hola, soy',
    headline: 'De construir redes a',
    emphasis: 'transformar',
    ending: 'la manera en que conectamos.',
    intro: 'Ingeniero de redes enfocado en infraestructura de Internet, interconexión, resiliencia y evolución tecnológica.',
    projects: 'Explorar proyectos',
    contact: 'Hablemos',
    explore: 'EXPLORAR',
    aboutLabel: '01 / PERFIL',
    aboutTitle: 'La tecnología conecta. Las personas transforman.',
    aboutText: 'Mi trayectoria combina experiencia práctica en infraestructura de telecomunicaciones, ingeniería de redes y colaboración con la comunidad técnica. Me interesa construir soluciones confiables y contribuir a un Internet más resiliente.',
    expertiseLabel: '02 / ENFOQUE',
    expertiseTitle: 'Donde la experiencia se convierte en impacto.',
    areas: [
      ['01', 'Infraestructura de Internet', 'Arquitectura de redes, interconexión y operación de infraestructura crítica.'],
      ['02', 'Routing y resiliencia', 'BGP, seguridad de enrutamiento, RPKI y continuidad operativa.'],
      ['03', 'Innovación y automatización', 'Herramientas, observabilidad y procesos que hacen las redes más eficientes.']
    ],
    journeyLabel: '03 / TRAYECTORIA',
    journeyTitle: 'Del trabajo en campo a la infraestructura que conecta redes.',
    journeyText: 'Una trayectoria construida entre equipos, torres, centros de datos y comunidades técnicas.',
    viewProjects: 'Conocer mis proyectos',
    finalLabel: 'SIGAMOS CONECTANDO',
    finalTitle: 'Las mejores conexiones comienzan con una conversación.',
    finalButton: 'Contactarme'
  },
  en: {
    eyebrow: 'ENGINEERING · INFRASTRUCTURE · CONNECTIVITY',
    greeting: "Hi, I'm",
    headline: 'From building networks to',
    emphasis: 'transforming',
    ending: 'the way we connect.',
    intro: 'Network engineer focused on Internet infrastructure, interconnection, resilience, and technological evolution.',
    projects: 'Explore projects',
    contact: "Let's talk",
    explore: 'EXPLORE',
    aboutLabel: '01 / PROFILE',
    aboutTitle: 'Technology connects. People transform.',
    aboutText: 'My journey combines hands-on telecommunications infrastructure experience, network engineering, and collaboration with the technical community. I care about building reliable solutions and contributing to a more resilient Internet.',
    expertiseLabel: '02 / FOCUS',
    expertiseTitle: 'Where experience becomes impact.',
    areas: [
      ['01', 'Internet infrastructure', 'Network architecture, interconnection, and critical infrastructure operations.'],
      ['02', 'Routing and resilience', 'BGP, routing security, RPKI, and operational continuity.'],
      ['03', 'Innovation and automation', 'Tools, observability, and processes that make networks more efficient.']
    ],
    journeyLabel: '03 / JOURNEY',
    journeyTitle: 'From fieldwork to the infrastructure connecting networks.',
    journeyText: 'A journey built across equipment, towers, data centers, and technical communities.',
    viewProjects: 'Explore my projects',
    finalLabel: "LET'S CONNECT",
    finalTitle: 'The best connections start with a conversation.',
    finalButton: 'Get in touch'
  }
};

export default function Home() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'es';
  const c = content[lang];

  return (
    <main className="cp-home">
      <section className="cp-hero">
        <div className="cp-hero-glow" aria-hidden="true" />
        <div className="cp-wrap cp-hero-grid">
          <div className="cp-hero-copy">
            <div className="cp-eyebrow"><span className="cp-dot" />{c.eyebrow}</div>
            <p className="cp-hello">{c.greeting}</p>
            <h1 className="cp-name">Carlos <span>Pérez.</span></h1>
            <div className="cp-statement">
              {c.headline} <strong>{c.emphasis}</strong> {c.ending}
            </div>
            <p className="cp-intro">{c.intro}</p>
            <div className="cp-actions">
              <Link className="cp-btn cp-btn-primary" to="/projects">{c.projects}<span aria-hidden="true">↗</span></Link>
              <Link className="cp-btn cp-btn-secondary" to="/contact">{c.contact}<span aria-hidden="true">↗</span></Link>
            </div>
            <div className="cp-hero-bottom">
              <span>CP / 2026</span>
              <span>{c.explore} ↓</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-portrait-frame">
              <img src={photo('portrait-carlos.webp')} alt="Carlos Pérez, retrato profesional" />
            </div>
            <div className="cp-visual-caption">
              <span className="cp-monogram" aria-label="Carlos Pérez">CP<span>.</span></span>
              <span>NETWORK ENGINEERING<br />& INTERNET INFRASTRUCTURE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cp-about cp-section">
        <div className="cp-wrap cp-about-grid">
          <div className="cp-section-kicker">{c.aboutLabel}</div>
          <div>
            <h2>{c.aboutTitle}</h2>
            <p>{c.aboutText}</p>
          </div>
        </div>
      </section>

      <section className="cp-expertise cp-section">
        <div className="cp-wrap">
          <div className="cp-section-kicker">{c.expertiseLabel}</div>
          <h2>{c.expertiseTitle}</h2>
          <div className="cp-expertise-grid">
            {c.areas.map(([number, title, description]) => (
              <article className="cp-expertise-card" key={number}>
                <span className="cp-card-number">{number} /</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="cp-card-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-journey cp-section">
        <div className="cp-wrap">
          <div className="cp-section-kicker">{c.journeyLabel}</div>
          <div className="cp-journey-heading">
            <h2>{c.journeyTitle}</h2>
            <p>{c.journeyText}</p>
          </div>
          <div className="cp-photo-grid">
            <div className="cp-photo cp-photo-tall">
              <img src={photo('08-tower-climb-web.webp')} alt="Trabajo en torre de telecomunicaciones" loading="lazy" />
            </div>
            <div className="cp-photo">
              <img src={photo('05-ericsson-equipment-web.webp')} alt="Carlos Pérez trabajando con infraestructura Ericsson" loading="lazy" />
            </div>
            <div className="cp-photo">
              <img src={photo('04-tower-field-web.webp')} alt="Experiencia de campo en telecomunicaciones" loading="lazy" />
            </div>
          </div>
          <Link to="/projects" className="cp-text-link">{c.viewProjects} <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="cp-contact-strip">
        <div className="cp-wrap cp-contact-inner">
          <div>
            <div className="cp-section-kicker">{c.finalLabel}</div>
            <h2>{c.finalTitle}</h2>
          </div>
          <Link className="cp-btn cp-btn-light" to="/contact">{c.finalButton}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
