import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './History.css';

const asset = (name) => `${import.meta.env.BASE_URL}${name}`;

const content = {
  es: {
    eyebrow: 'CARLOS PÉREZ / MI HISTORIA',
    title: 'El camino también',
    highlight: 'define lo que construimos.',
    lead: 'Mi historia no se resume en los lugares donde he estado ni en los puestos que he ocupado. Está en lo que he aprendido, en las decisiones que he tomado y en la manera en que sigo evolucionando.',
    nowLabel: 'MI VISIÓN HOY',
    nowTitle: 'Hoy miro más allá de lo técnico.',
    nowText: 'Con los años entendí que construir soluciones es solo una parte del desafío. También importa comprender su propósito, anticipar lo que viene y tomar decisiones que generen valor. Esa perspectiva guía hoy mi manera de trabajar y de liderar.',
    transition: 'Pero esa forma de pensar no apareció de la noche a la mañana.',
    evolutionLabel: 'MI EVOLUCIÓN',
    evolutionTitle: 'Aprendí a ver el panorama completo.',
    evolutionText: 'Los desafíos se hicieron más grandes y las responsabilidades también. Aprendí a escuchar otras perspectivas, a conectar ideas y a comprender que la ingeniería no consiste únicamente en resolver problemas, sino en tomar buenas decisiones.',
    originLabel: 'MIS ORÍGENES',
    originTitle: 'Todo comenzó haciendo.',
    originText: 'Antes de pensar en estrategias y grandes soluciones, estuve ahí: trabajando directamente con infraestructura, aprendiendo de los errores y enfrentando situaciones reales. Fue en el terreno donde descubrí el valor de la responsabilidad, la perseverancia y el trabajo bien hecho.',
    originQuote: 'Antes de aprender a diseñar soluciones, aprendí lo que significa hacerlas funcionar.',
    futureLabel: 'LO QUE SIGUE',
    futureTitle: 'No he llegado al final de mi historia.',
    futureText: 'Todavía hay mucho por aprender, ideas por explorar y desafíos por asumir. La experiencia me dio perspectiva; la curiosidad sigue marcando el camino.',
    nextButton: 'Descubrí lo que construyo'
  },
  en: {
    eyebrow: 'CARLOS PÉREZ / MY STORY',
    title: 'The journey also',
    highlight: 'shapes what we build.',
    lead: 'My story is not defined by the places I have been or the positions I have held. It lives in what I have learned, the decisions I have made, and the way I continue to evolve.',
    nowLabel: 'MY PERSPECTIVE TODAY',
    nowTitle: 'Today, I look beyond technology.',
    nowText: 'Over the years, I came to understand that building solutions is only part of the challenge. Understanding their purpose, anticipating what comes next, and making decisions that create value matter just as much. That perspective guides how I work and lead today.',
    transition: 'But that way of thinking did not emerge overnight.',
    evolutionLabel: 'MY EVOLUTION',
    evolutionTitle: 'I learned to see the bigger picture.',
    evolutionText: 'The challenges grew, and so did the responsibilities. I learned to listen to different perspectives, connect ideas, and understand that engineering is not only about solving problems, but also about making sound decisions.',
    originLabel: 'MY BEGINNINGS',
    originTitle: 'It all started by doing.',
    originText: 'Before thinking about strategy and large-scale solutions, I was there: working directly with infrastructure, learning from mistakes, and facing real-world situations. The field taught me the value of responsibility, perseverance, and doing things well.',
    originQuote: 'Before learning to design solutions, I learned what it takes to make them work.',
    futureLabel: 'WHAT COMES NEXT',
    futureTitle: 'My story is far from finished.',
    futureText: 'There is still so much to learn, ideas to explore, and challenges to embrace. Experience gave me perspective; curiosity continues to lead the way.',
    nextButton: 'Explore what I build'
  }
};

export default function History() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'es';
  const c = content[lang];

  return (
    <main className="cp-history-v2">
      <section className="cp-story-hero">
        <div className="cp-story-container">
          <p className="cp-story-kicker">{c.eyebrow}</p>
          <h1>{c.title}<span>{c.highlight}</span></h1>
          <p className="cp-story-lead">{c.lead}</p>
        </div>
      </section>

      <section className="cp-story-now">
        <div className="cp-story-container cp-story-now-grid">
          <div className="cp-story-now-copy">
            <p className="cp-story-kicker">{c.nowLabel}</p>
            <h2>{c.nowTitle}</h2>
            <p>{c.nowText}</p>
          </div>
          <div className="cp-story-now-photo">
            <img
              src={asset('portrait-carlos.webp')}
              alt="Carlos Pérez"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="cp-story-transition">
        <div className="cp-story-container">
          <span aria-hidden="true">↘</span>
          <p>{c.transition}</p>
        </div>
      </section>

      <section className="cp-story-evolution">
        <div className="cp-story-container cp-story-evolution-grid">
          <div className="cp-story-evolution-visual">
            <img
              src={asset('05-ericsson-equipment-web.webp')}
              alt={lang === 'es'
                ? 'Carlos durante una experiencia de trabajo en telecomunicaciones'
                : 'Carlos during telecommunications fieldwork'}
              loading="lazy"
            />
          </div>
          <div className="cp-story-evolution-copy">
            <p className="cp-story-kicker">{c.evolutionLabel}</p>
            <h2>{c.evolutionTitle}</h2>
            <p>{c.evolutionText}</p>
          </div>
        </div>
      </section>

      <section className="cp-story-origin">
        <div className="cp-story-origin-photo">
          <img
            src={asset('08-tower-climb-web.webp')}
            alt={lang === 'es'
              ? 'Carlos trabajando en una torre de telecomunicaciones'
              : 'Carlos working on a telecommunications tower'}
            loading="lazy"
          />
        </div>
        <div className="cp-story-origin-content">
          <p className="cp-story-kicker">{c.originLabel}</p>
          <h2>{c.originTitle}</h2>
          <p>{c.originText}</p>
          <blockquote>{c.originQuote}</blockquote>
        </div>
      </section>

      <section className="cp-story-future">
        <div className="cp-story-container">
          <p className="cp-story-kicker">{c.futureLabel}</p>
          <h2>{c.futureTitle}</h2>
          <p>{c.futureText}</p>
          <Link to="/projects" className="cp-story-next">
            {c.nextButton}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
