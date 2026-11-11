import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

const photo = (name) => `${import.meta.env.BASE_URL}${name}`;

const content = {
  es: {
    eyebrow: 'INGENIERÍA · INFRAESTRUCTURA · CONECTIVIDAD',
    greeting: 'Hola, soy',
    role: 'INGENIERO DE REDES',
    specialty: 'INFRAESTRUCTURA DE INTERNET',
    headline: 'De construir redes a',
    emphasis: 'transformar',
    ending: 'la manera en que conectamos.',
    intro: 'Ingeniero de redes especializado en infraestructura de Internet, interconexión y resiliencia, con una visión orientada a la innovación, automatización y transformación digital.',
    projects: 'Explorar proyectos',
    contact: 'Hablemos',
    explore: 'EXPLORAR',
    aboutLabel: 'SOBRE MÍ',
    aboutTitle: 'La tecnología conecta. Las personas transforman.',
    aboutText: 'Mi camino comenzó trabajando directamente con la infraestructura que hace posibles las comunicaciones. Con los años, esa experiencia evolucionó hacia nuevos desafíos, proyectos de mayor alcance y una forma de entender la ingeniería que va más allá de la tecnología. Hoy combino experiencia, liderazgo y una convicción que me acompaña desde siempre: el conocimiento tiene más valor cuando se comparte.',
    expertiseLabel: 'MI FILOSOFÍA',
    expertiseTitle: 'La experiencia cambia la forma de ver los desafíos.',
    areas: [
      ['01', 'Construir con propósito', 'Entender el problema antes de diseñar la solución. Crear infraestructura que responda a necesidades reales y pueda evolucionar.'],
      ['02', 'Decidir con criterio', 'La experiencia enseña que no siempre gana la solución más compleja, sino la que aporta mayor valor y confianza.'],
      ['03', 'Compartir para crecer', 'El conocimiento adquiere sentido cuando se comparte, abre oportunidades y ayuda a otros a avanzar.']
    ],
    journeyLabel: 'MI CAMINO',
    journeyTitle: 'Cada etapa ha dejado algo que vale la pena contar.',
    journeyText: 'Antes de llegar hasta aquí hubo desafíos, aprendizajes y decisiones que transformaron mi manera de entender la ingeniería.',
    viewProjects: 'Conocé mi historia',
    finalLabel: 'SIGAMOS CONECTANDO',
    finalTitle: 'Las mejores conexiones comienzan con una conversación.',
    finalButton: 'Contactarme'
  },
  en: {
    eyebrow: 'ENGINEERING · INFRASTRUCTURE · CONNECTIVITY',
    greeting: "Hi, I'm",
    role: 'NETWORK ENGINEER',
    specialty: 'INTERNET INFRASTRUCTURE',
    headline: 'From building networks to',
    emphasis: 'transforming',
    ending: 'the way we connect.',
    intro: 'Network engineer specializing in Internet infrastructure, interconnection, and resilience, with a focus on innovation, automation, and digital transformation.',
    projects: 'Explore projects',
    contact: "Let's talk",
    explore: 'EXPLORE',
    aboutLabel: 'ABOUT ME',
    aboutTitle: 'Technology connects. People transform.',
    aboutText: 'My journey began working directly with the infrastructure that makes communication possible. Over the years, that experience evolved into new challenges, larger projects, and a way of understanding engineering that goes beyond technology. Today, I bring together experience, leadership, and a belief that has always guided me: knowledge becomes more valuable when it is shared.',
    expertiseLabel: 'MY PHILOSOPHY',
    expertiseTitle: 'Experience changes how we approach challenges.',
    areas: [
      ['01', 'Build with purpose', 'Understand the problem before designing the solution. Create infrastructure that meets real needs and can evolve.'],
      ['02', 'Decide with judgment', 'Experience teaches us that the most complex solution is not always the best, but the one that delivers value and inspires confidence.'],
      ['03', 'Grow by sharing', 'Knowledge becomes meaningful when it is shared, creates opportunities, and helps others move forward.']
    ],
    journeyLabel: 'MY JOURNEY',
    journeyTitle: 'Every chapter has a story worth telling.',
    journeyText: 'Behind where I am today are challenges, lessons, and decisions that transformed the way I understand engineering.',
    viewProjects: 'Discover my story',
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
              <Link className="cp-btn cp-btn-primary" to="/projects/">{c.projects}<span aria-hidden="true">↗</span></Link>
              <Link className="cp-btn cp-btn-secondary" to="/contact/">{c.contact}<span aria-hidden="true">↗</span></Link>
            </div>

          </div>
          <div className="cp-hero-visual">
            <div className="cp-portrait-frame">
              <img src={photo('portrait-carlos.webp')} alt="Carlos Pérez, retrato profesional" />
            </div>
            <div className="cp-visual-caption">
              <img
                className="cp-signature-logo"
                src={photo('brand/logos/cp-isotipo-limpio.png')}
                alt="CP - Carlos Pérez"
              />
              <span className="cp-signature-text">
                <strong>{c.role}</strong>
                <small>{c.specialty}</small>
              </span>
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
                <h3>{title}</h3>
                <p>{description}</p>
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
          <Link to="/history/" className="cp-text-link">{c.viewProjects} <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="cp-contact-strip">
        <div className="cp-wrap cp-contact-inner">
          <div>
            <div className="cp-section-kicker">{c.finalLabel}</div>
            <h2>{c.finalTitle}</h2>
          </div>
          <Link className="cp-btn cp-btn-light" to="/contact/">{c.finalButton}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
