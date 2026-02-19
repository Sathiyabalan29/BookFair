import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import authService from '../services/authService'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Stalls', href: '/stalls' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

    useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [location])


  const handleNavigation = (href, e) => {
    e.preventDefault()
    setIsMenuOpen(false)

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    const id = href.substring(1) // remove "#"
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // If element not on current page, navigate home first
      if (location.pathname !== '/') {
        navigate('/', { replace: false })
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100) // wait for render
      }
    }
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1e3a5f] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-6 min-h-[4rem] py-2 px-6">
        <Link to="/" className="font-bold text-xl text-white hover:text-[#c9a227]" onClick={(e) => handleNavigation('#home', e)}>
          Colombo Bookfair 2026
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 list-none">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleNavigation(href, e)}
                  className="text-white/90 font-medium transition-colors duration-200 hover:text-[#c9a227]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* User auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Link
                  to="/profile"
                  className="text-white/90 font-medium flex items-center gap-2 hover:text-[#c9a227] transition-colors py-2"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
                  <span>{user.name || user.email}</span>
                </Link>

                {/* Hover Tooltip */}
                <div
                  onClick={() => navigate('/profile')}
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-4 px-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 border-t-4 border-[#c9a227] cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                    <div className="h-10 w-10 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center text-lg font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-[#1e3a5f] text-sm leading-tight">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[140px]">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Role</div>
                    <div className="text-sm text-gray-700 font-medium bg-gray-50 px-2 py-1 rounded inline-block">
                      {user.role || 'User'}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                    <span className="text-xs text-[#c9a227] font-medium">Click to view full profile</span>
                  </div>

                  {/* Triangle pointer */}
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-semibold rounded-md text-white bg-transparent border border-white/15 hover:bg-white/10">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-semibold rounded-md text-[#1e3a5f] bg-[#c9a227] hover:bg-[#d4af37] hover:text-[#152a47]">
                Register Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-11 h-11 bg-transparent border border-white/15 rounded-md text-white text-xl hover:bg-white/10"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-[#152a47] overflow-hidden transition-max-height duration-300 ${isMenuOpen ? 'max-h-[80vh]' : 'max-h-0'}`}>
        <nav className="p-4 pb-6">
          <ul className="list-none border-b border-white/15 pb-4 mb-4">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleScroll(href, e)}
                  className="block py-3 text-white font-medium hover:text-[#c9a227]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
