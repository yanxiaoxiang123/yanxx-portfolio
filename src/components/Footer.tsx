import { email, github, profile } from '../data/profile';
import { copy, type Locale } from '../lib/i18n';

export default function Footer({ lang }: { lang: Locale }) {
  const p = profile[lang];
  return <footer id="contact" className="section foot" aria-labelledby="contact-heading">
    <div className="contact-card" data-reveal>
      <h2 id="contact-heading">{p.contactTitle}</h2>
      <p className="sub">{p.contactText}</p>
      <div className="contact-links">
        <a className="contact-link" href={`mailto:${email}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="m4 7.5 8 5.5 8-5.5" /></svg>
          {email}
        </a>
        <a className="contact-link" href={github} rel="me">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg>
          {copy[lang].github}
        </a>
      </div>
      <p className="footer-name" aria-hidden="true">yanxx.</p>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {p.name}</span><span>{p.rights}</span></div>
    </div>
  </footer>;
}
