import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaYoutube, FaExternalLinkAlt, FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim();
  const emailAddress = t('contact.email');
  const socials = [
    { name: 'GitHub', description: '@C4rlosp', url: t('contact.github'), icon: <FaGithub /> },
    { name: 'LinkedIn', description: 'Carlos Pérez', url: t('contact.linkedin'), icon: <FaLinkedin /> },
    { name: 'YouTube', description: '@CarlosPerezP', url: t('contact.youtube'), icon: <FaYoutube /> },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('_gotcha')) return;
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || message.length < 10) return;
    setFeedback(null);
    if (!endpoint) {
      const subject = encodeURIComponent(`Contacto web - ${name}`);
      const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\n${message}`);
      window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
      setFeedback({ type: 'info', message: t('contact.email_fallback') });
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Contact request failed');
      form.reset();
      setFeedback({ type: 'success', message: t('contact.success_message') });
    } catch {
      setFeedback({ type: 'error', message: t('contact.error_message') });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="cp-contact-v2">
      <section className="cp-contact-v2-section">
        <div className="cp-contact-v2-container">
          <div className="cp-contact-v2-grid">
            <div className="cp-contact-v2-intro">
              <p className="cp-contact-v2-eyebrow">{t('contact.v2_eyebrow')}</p>
              <h1 className="cp-contact-v2-title">
                {t('contact.v2_title_first')}
                <span>{t('contact.v2_title_second')}</span>
              </h1>
              <p className="cp-contact-v2-description">{t('contact.v2_description')}</p>
              <div className="cp-contact-v2-direct">
                <span className="cp-contact-v2-small-label">{t('contact.v2_direct_label')}</span>
                <a href={`mailto:${emailAddress}`}><FaEnvelope aria-hidden="true" />{emailAddress}<FaExternalLinkAlt aria-hidden="true" /></a>
              </div>
              <div className="cp-contact-v2-social">
                <span className="cp-contact-v2-small-label">{t('contact.v2_social_label')}</span>
                <div className="cp-contact-v2-social-list">
                  {socials.map((social) => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.name} — ${social.description}`} className="cp-contact-v2-social-link">
                      <span className="cp-contact-v2-social-icon">{social.icon}</span>
                      <span>{social.name}</span>
                      <FaExternalLinkAlt className="cp-contact-v2-social-arrow" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="cp-contact-v2-form-column">
              <div className="cp-contact-v2-form-heading">
                <p className="cp-contact-v2-eyebrow">{t('contact.v2_form_eyebrow')}</p>
                <h2>{t('contact.v2_form_title')}</h2>
                <p>{t('contact.v2_form_description')}</p>
              </div>
              <form className="cp-contact-v2-form" onSubmit={handleSubmit} aria-label={t('contact.form_label')}>
                <input type="hidden" name="_subject" value="Contacto desde carlosperez.cr" />
                <div className="cp-contact-honeypot" aria-hidden="true">
                  <label htmlFor="cp-contact-website">Website</label>
                  <input id="cp-contact-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="cp-contact-v2-field">
                  <label htmlFor="cp-v2-name">{t('contact.form_name')}</label>
                  <input id="cp-v2-name" name="name" type="text" autoComplete="name" maxLength={120} placeholder={t('contact.v2_name_placeholder')} required />
                </div>
                <div className="cp-contact-v2-field">
                  <label htmlFor="cp-v2-email">{t('contact.form_email')}</label>
                  <input id="cp-v2-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="nombre@empresa.com" required />
                </div>
                <div className="cp-contact-v2-field">
                  <label htmlFor="cp-v2-message">{t('contact.form_message')}</label>
                  <textarea id="cp-v2-message" name="message" minLength={10} maxLength={4000} rows={6} placeholder={t('contact.v2_message_placeholder')} required />
                </div>
                <button type="submit" className="cp-contact-v2-submit" disabled={isSending}>
                  <span>{isSending ? t('contact.sending') : t('contact.send_btn')}</span><FaPaperPlane aria-hidden="true" />
                </button>
                <p className="cp-contact-v2-privacy">{endpoint ? t('contact.form_privacy') : t('contact.form_not_configured')}</p>
                {feedback && <p className={`cp-contact-v2-feedback cp-contact-v2-feedback--${feedback.type}`} role="status" aria-live="polite">{feedback.message}</p>}
              </form>
            </div>
          </div>
          <div className="cp-contact-v2-bottom"><span>{t('contact.v2_bottom_left')}</span><span>{t('contact.v2_bottom_right')}</span></div>
        </div>
      </section>
    </main>
  );
}
