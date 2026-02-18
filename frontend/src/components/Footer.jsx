import { useNavigate, useLocation } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Map', href: '/venue-map' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const PUBLISHER_LINKS = [
  { label: 'Register', href: '/register' },
  { label: 'Reserve', href: '/venue-map' },
  { label: 'Login', href: '/login' },
  { label: 'Employee Portal', href: '/login' }, // Redirect to login as placeholder
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = localStorage.getItem('token');

  const handleNavigation = (e, href) => {
    e.preventDefault();

    // Protected links check
    if ((href === '/venue-map') && !userToken) {
      navigate('/login');
      return;
    }

    navigate(href);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-[#1e3a5f] text-white pt-12 pb-8 px-6" role="contentinfo">
      <div className="container mx-auto">
        <p className="text-center font-semibold text-base mb-8 text-[#c9a227]">
          Organized by: Sri Lanka Book Publishers&apos; Association
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[900px] mx-auto mb-8 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="list-none p-0">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label} className="mb-2 last:mb-0">
                  <button
                    onClick={(e) => handleNavigation(e, href)}
                    className="text-white/85 transition-colors duration-200 hover:text-[#c9a227] font-medium bg-transparent border-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Publisher Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white uppercase tracking-wider">For Publishers</h3>
            <ul className="list-none p-0">
              {PUBLISHER_LINKS.map(({ label, href }) => (
                <li key={label} className="mb-2 last:mb-0">
                  <button
                    onClick={(e) => handleNavigation(e, href)}
                    className="text-white/85 transition-colors duration-200 hover:text-[#c9a227] font-medium bg-transparent border-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="text-base font-semibold mb-4 text-white uppercase tracking-wider">Contact</h3>
            <address className="not-italic">
              <p className="mb-2 text-white/85">BMICH, Bauddhaloka Mawatha, Colombo 07</p>
              <p className="mb-2 text-white/85">
                <a href="tel:+94112345678" className="text-white/85 transition-colors duration-200 hover:text-[#c9a227]">+94 11 234 5678</a>
              </p>
              <p className="text-white/85">
                <a href="mailto:info@colombobookfair.lk" className="text-white/85 transition-colors duration-200 hover:text-[#c9a227]">info@colombobookfair.lk</a>
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/15 text-center md:text-left">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Colombo International Bookfair. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm justify-center md:justify-start">
            <a href="#" className="text-white/85 transition-colors duration-200 hover:text-[#c9a227]">Privacy Policy</a>
            <span className="text-white/50">|</span>
            <a href="#" className="text-white/85 transition-colors duration-200 hover:text-[#c9a227]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
