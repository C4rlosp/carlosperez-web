import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { publicAsset } from '../utils/publicAsset';
import './Ideas.css';

const FEATURED_EVENTS = ['Euro-IX 43', 'LACNIC 44 LAC-IX Technical Meeting', 'Texas Tech University'];

function EventLinks({ talk, view, slides, video }) {
  const links = [
    talk.Publicacion && { href: talk.Publicacion, text: view },
    talk.slides && { href: talk.slides, text: slides },
    talk.video && { href: talk.video, text: video },
  ].filter(Boolean);
  return links.length ? <div className="ideas-v2-links">{links.map(link => (
    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.text} <span aria-hidden="true">↗</span></a>
  ))}</div> : null;
}

export default function Ideas() {
  const { t, i18n } = useTranslation();
  const en = i18n.resolvedLanguage?.startsWith('en');
  const items = t('talks.items', { returnObjects: true });
  const talks = Array.isArray(items) ? FEATURED_EVENTS.map(event => items.find(item => item.event === event)).filter(Boolean) : [];
  const [mainTalk, ...otherTalks] = talks;

  return (
    <main className="ideas-v2">
      <header className="ideas-v2-hero">
        <div className="ideas-v2-hero-photo" aria-hidden="true"><img src={publicAsset('/euro-ix-45-NL.jpeg')} alt="" fetchPriority="high" /></div>
        <div className="ideas-v2-hero-shade" aria-hidden="true" />
        <div className="container ideas-v2-hero-layout">
          <div className="ideas-v2-hero-copy">
            <p className="ideas-v2-overline">{t('ideas.eyebrow')}</p>
            <h1>{t('ideas.title')}</h1>
            <p>{t('ideas.intro')}</p>
            <a className="ideas-v2-textlink" href="#lecturas">{en ? 'Explore the stories' : 'Explorar las historias'} <span aria-hidden="true">↘</span></a>
          </div>
          <p className="ideas-v2-hero-note">{en ? 'Ideas / Engineering / Community' : 'Ideas / Ingeniería / Comunidad'} <span>© {new Date().getFullYear()}</span></p>
        </div>
      </header>

      <section id="lecturas" className="ideas-v2-feature" aria-labelledby="ideas-v2-feature-title">
        <div className="container">
          <div className="ideas-v2-section-top"><span>01 — {t('ideas.featured')}</span><span>{en ? 'Perspective' : 'Perspectiva'}</span></div>
          <Link to="/article/rpki-ghost/" className="ideas-v2-feature-link">
            <div className="ideas-v2-feature-art"><img src={publicAsset('/rpki-ghost-cover.png')} alt="" loading="lazy"/><span className="ideas-v2-art-caption">RPKI / BGP / ROUTING SECURITY</span></div>
            <div className="ideas-v2-feature-copy">
              <p className="ideas-v2-overline">{en ? 'Featured story' : 'Lectura destacada'}</p>
              <h2 id="ideas-v2-feature-title">{t('article.title')}</h2>
              <p>{t('article.description')}</p>
              <span className="ideas-v2-read">{t('ideas.read')} <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="ideas-v2-community" aria-labelledby="ideas-v2-community-title">
        <div className="container">
          <div className="ideas-v2-section-top"><span>02 — {en ? 'Community' : 'Comunidad'}</span><span>{en ? 'Shared experience' : 'Experiencia compartida'}</span></div>
          <div className="ideas-v2-community-intro">
            <h2 id="ideas-v2-community-title">{t('ideas.participation')}</h2>
            <p>{t('ideas.participationIntro')}</p>
          </div>
          {mainTalk && <article className="ideas-v2-main-event">
            <div className="ideas-v2-main-photo"><img src={publicAsset(mainTalk.images?.[0] || '/euroix43.jpg')} alt={mainTalk.event} loading="lazy"/><span className="ideas-v2-photo-index">01 / 03</span></div>
            <div className="ideas-v2-main-description">
              <p className="ideas-v2-overline">{mainTalk.event} <span>·</span> {mainTalk.year}</p>
              <h3>{mainTalk.title}</h3>
              <p>{mainTalk.description}</p>
              <EventLinks talk={mainTalk} view={t('ideas.view')} slides={t('talks.slides')} video={t('talks.video')}/>
            </div>
          </article>}
          <div className="ideas-v2-other-events">{otherTalks.map((talk, index) => <article className="ideas-v2-small-event" key={talk.event}>
            <div className="ideas-v2-small-photo"><img src={publicAsset(talk.images?.[0])} alt={talk.event} loading="lazy"/><span className="ideas-v2-photo-index">0{index + 2} / 03</span></div>
            <div className="ideas-v2-small-copy"><p className="ideas-v2-overline">{talk.event} <span>·</span> {talk.year}</p><h3>{talk.title}</h3><EventLinks talk={talk} view={t('ideas.view')} slides={t('talks.slides')} video={t('talks.video')}/></div>
          </article>)}</div>
        </div>
      </section>

      <section className="ideas-v2-outro"><div className="container ideas-v2-outro-inner"><p className="ideas-v2-overline">{en ? 'The conversation continues' : 'La conversación continúa'}</p><h2>{t('ideas.closing')}</h2><Link to="/contact/">{t('ideas.contact')} <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
