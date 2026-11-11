import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './i18n';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import History from './pages/History';
import Ideas from './pages/Ideas';
import Contact from './pages/Contact';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArticleDetail from './pages/ArticleDetail';
import { Navigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function DocumentLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language || 'es';
  }, [i18n.language]);

  return null;
}

function PageMetadata() {
  const { pathname } = useLocation();
  const routePath = pathname.replace(/\/$/, '') || '/';
  const { i18n } = useTranslation();
  const en = i18n.language?.startsWith('en');
  useEffect(() => {
    const metadata = {
      '/': en
        ? ['Carlos Pérez | Technology & Critical Infrastructure', 'Engineering experience, technology, and strategic vision for critical telecommunications infrastructure.']
        : ['Carlos Pérez | Tecnología e infraestructura crítica', 'Experiencia en ingeniería, tecnología y visión estratégica para infraestructura crítica de telecomunicaciones.'],
      '/history': en
        ? ['My Story | Carlos Pérez', 'A career shaped by field engineering, international projects, leadership, and critical infrastructure.']
        : ['Mi historia | Carlos Pérez', 'Una trayectoria construida en campo, proyectos internacionales, liderazgo e infraestructura crítica.'],
      '/projects': en
        ? ['Projects | Carlos Pérez', 'Real-world telecommunications engineering cases and interactive educational demonstrations.']
        : ['Proyectos | Carlos Pérez', 'Casos reales de ingeniería de telecomunicaciones y demostraciones educativas interactivas.'],
      '/ideas': en
        ? ['Ideas | Carlos Pérez', 'Perspectives on Internet infrastructure, routing security, and international collaboration.']
        : ['Ideas | Carlos Pérez', 'Perspectivas sobre infraestructura de Internet, seguridad del enrutamiento y colaboración internacional.'],
      '/contact': en
        ? ['Contact | Carlos Pérez', 'Let’s talk about technology, infrastructure, and engineering collaboration.']
        : ['Contacto | Carlos Pérez', 'Conversemos sobre tecnología, infraestructura y colaboración en ingeniería.']
    };
    const [title, description] = metadata[routePath] || (en
      ? ['Carlos Pérez | Technology & Infrastructure', 'Technology, infrastructure, and engineering experience.']
      : ['Carlos Pérez | Tecnología e infraestructura', 'Tecnología, infraestructura y experiencia en ingeniería.']);
    document.title = title;
    const prefix = en ? '/en' : '';
    const canonicalUrl = `https://carlosperez.cr${prefix}${routePath === '/' ? '/' : `${routePath}/`}`;
    const esUrl = `https://carlosperez.cr${routePath === '/' ? '/' : `${routePath}/`}`;
    const enUrl = `https://carlosperez.cr/en${routePath === '/' ? '/' : `${routePath}/`}`;
    document.querySelector('link[rel="alternate"][hreflang="es"]')?.setAttribute('href', esUrl);
    document.querySelector('link[rel="alternate"][hreflang="en"]')?.setAttribute('href', enUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    for (const [selector, attribute] of [
      ['meta[name="description"]', 'content'],
      ['meta[property="og:description"]', 'content'],
      ['meta[name="twitter:description"]', 'content']
    ]) {
      document.querySelector(selector)?.setAttribute(attribute, description);
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
  }, [routePath, en]);
  return null;
}

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>{t('hero.name')} © {year}</span>
        <div className="footer-social">
          <span className="footer-social-label">{t('footer.follow')}</span>
          <div className="footer-social-icons">
            <a
              href={t('contact.github')}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={t('contact.linkedin')}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={t('contact.youtube')}
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AppContent() {
  return (
    <>
      <DocumentLanguage />
      <PageMetadata />
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/" element={<Projects />} />
        <Route path="/history/" element={<History />} />
        <Route path="/ideas/" element={<Ideas />} />
        <Route path="/talks" element={<Navigate to="/ideas/" replace />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/articles" element={<Navigate to="/ideas/" replace />} />
        <Route path="/article/rpki-ghost/" element={<ArticleDetail />} />
      </Routes>

      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default function App() {
  const basename = typeof window !== 'undefined' && /^\/en(?:\/|$)/.test(window.location.pathname) ? '/en' : '/';
  return <BrowserRouter basename={basename}><AppContent /></BrowserRouter>;
}