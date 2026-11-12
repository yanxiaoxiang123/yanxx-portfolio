import { email, github, profile } from '../data/profile';
import { copy, type Locale } from '../lib/i18n';
export default function Footer({ lang }: { lang: Locale }) {
  const p = profile[lang];
  return <footer id="contact" className="site-footer">
    <div className="contact-top"><h2 data-reveal>{p.contactTitle}</h2><p data-reveal>{p.contactText}</p></div>
    <div className="contact-links" data-reveal><a className="email-link" href={`mailto:${email}`}>{email}</a><a href={github}>{copy[lang].github}</a></div>
    <p className="footer-name" aria-hidden="true">yanxx.</p>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {p.name}</span><span>{p.rights}</span></div>
  </footer>;
}
