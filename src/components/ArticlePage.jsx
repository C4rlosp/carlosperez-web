import { publicAsset } from '../utils/publicAsset';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './ArticlePage.css';

function Block({ block, index }) {
  switch (block.type) {
    case 'lead': return <p className="cp-article-lead">{block.text}</p>;
    case 'p': return <p>{block.text}</p>;
    case 'p_italic': return <blockquote className="cp-article-question">{block.text}</blockquote>;
    case 'p_bold': return <p className="cp-article-keypoint"><strong>{block.text}</strong></p>;
    case 'quote': return <blockquote className="cp-article-quote">{block.text}</blockquote>;
    case 'h2': return <h2 id={`section-${index}`} className="cp-article-heading">{block.text}</h2>;
    case 'h3': return <h2 id={`section-${index}`} className="cp-article-heading">{block.text}</h2>;
    case 'h4': return <h3 className="cp-article-subheading">{block.text}</h3>;
    case 'image': return (
      <figure className="cp-article-figure">
        <a href={publicAsset(block.src)} target="_blank" rel="noopener noreferrer" aria-label={block.alt || 'Abrir imagen en tamaño original'} className="cp-article-image-link">
          <img src={publicAsset(block.src)} alt={block.alt || ''} loading="lazy" decoding="async" />
        </a>
        {(block.caption || block.subcaption) && <figcaption>
          {block.caption && <span>{block.caption}</span>}
          {block.subcaption && <small>{block.subcaption}</small>}
        </figcaption>}
      </figure>
    );
    case 'list': return <ul className="cp-article-list">{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
    case 'conclusion': return <aside className="cp-article-conclusion"><span className="cp-article-eyebrow">{block.title}</span><p>{block.text}</p></aside>;
    case 'final_quote': return <blockquote className="cp-article-final">{block.text}</blockquote>;
    default: return null;
  }
}

export default function ArticlePage({ articleKey }) {
  const { t, i18n } = useTranslation();
  const content = t(`${articleKey}.content`, { returnObjects: true });
  const en = i18n.resolvedLanguage?.startsWith('en');
  const title = `${t(`${articleKey}.title_part1`)}${t(`${articleKey}.title_part2`)}`;
  const sections = Array.isArray(content) ? content.map((block, index) => ({ ...block, index })).filter(block => block.type === 'h2' || block.type === 'h3') : [];

  return (
    <main className="cp-article-page">
      <div className="cp-article-shell">
        <Link to="/ideas/" className="cp-article-back">← {en ? 'Back to ideas' : 'Volver a Ideas'}</Link>
        <article className="cp-article-layout">
          <header className="cp-article-hero">
            <span className="cp-article-eyebrow"><span className="cp-article-dot" />{t(`${articleKey}.label`)}</span>
            <h1>{title}</h1>
            <p className="cp-article-deck">{en ? 'When a validator appears healthy but its routing security data is no longer trustworthy.' : 'Cuando un validador parece funcionar, pero sus datos de seguridad del enrutamiento ya no son confiables.'}</p>
            <div className="cp-article-byline"><span>{t(`${articleKey}.author`)}</span><span className="cp-article-meta-dot" aria-hidden="true" /><time dateTime="2026-03">{t(`${articleKey}.date`)}</time></div>
          </header>
          {sections.length > 0 && <nav className="cp-article-toc" aria-label={en ? 'Article sections' : 'Secciones del artículo'}>
            <span className="cp-article-toc-title">{en ? 'IN THIS ARTICLE' : 'EN ESTE ARTÍCULO'}</span>
            <div>{sections.map(section => <a key={section.index} href={`#section-${section.index}`}>{section.text}</a>)}</div>
          </nav>}
          <div className="cp-article-prose">
            {Array.isArray(content) ? content.map((block, index) => <Block key={index} block={block} index={index} />) : <p>{en ? 'Content unavailable.' : 'Contenido no disponible.'}</p>}
          </div>
          <footer className="cp-article-end"><Link to="/ideas/" className="cp-article-back">← {en ? 'Explore more ideas' : 'Explorar más ideas'}</Link></footer>
        </article>
      </div>
    </main>
  );
}
