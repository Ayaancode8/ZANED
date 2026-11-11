import logo from '../../assets/ZANED-symbol.svg';
import GlassSurface from './GlassSurface.jsx';
import './SiteHeader.css';

// Add destination URLs here as the rest of the website is built.
const navigation = [
  { label: 'Work', href: null },
  { label: 'Services', href: null },
  { label: 'Contact', href: null },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <img className="site-header__logo" src={logo} width="462" height="425" alt="ZANED" />
      <GlassSurface as="nav" className="site-header__nav" aria-label="Main navigation">
        <ul className="site-header__links">
          {navigation.map(({ label, href }) => (
            <li key={label}>
              {href ? (
                <a className="site-header__link" href={href}>{label}</a>
              ) : (
                <button className="site-header__link" type="button">
                  {label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </GlassSurface>
    </header>
  );
}
