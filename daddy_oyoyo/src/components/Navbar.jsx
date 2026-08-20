import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'AUDIENCE', path: '/audience' },
  { name: 'CONTENT', path: '/content' },
  { name: 'COLLABORATIONS', path: '/collaborations' },
  { name: 'MEDIA', path: '/media' },
  { name: 'GALLERY', path: '/gallery' },
  { name: 'CONTACT', path: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="w-full">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#F3E5D0]/90 backdrop-blur-md shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between w-full">
          {/* LOGO */}
          <NavLink
            to="/"
            aria-label="Daddy Oyoyo Home"
            className="relative group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3E5D0] rounded-sm"
          >
            <span
              className="text-3xl sm:text-4xl lg:text-5xl text-amber-950 leading-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              DO
            </span>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3E5D0] rounded-sm ${
                    isActive
                      ? 'text-amber-950'
                      : 'text-amber-900/70 hover:text-amber-950'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-amber-800 transition-all duration-500 ease-out w-0 group-hover:w-full" />
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-amber-900 w-3/4" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="lg:hidden relative w-11 h-11 shrink-0 flex items-center justify-center text-amber-900 hover:text-amber-700 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3E5D0] rounded-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-6 h-4 flex flex-col justify-between" aria-hidden="true">
              <span className={`block h-[2px] bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-[2px] bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ${menuOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div
          className={`absolute inset-0 bg-[#F3E5D0]/95 backdrop-blur-2xl transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />

        <div className="relative h-full flex flex-col items-center justify-center px-8">
          {/* Decorative line top */}
          <div className={`absolute top-24 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-amber-800/40 transition-all duration-700 delay-100 ${menuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />

          {/* Nav Links with stagger */}
          <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
            {navItems.map((item, i) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-bold tracking-[0.3em] uppercase transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F3E5D0] rounded-sm ${
                    isActive ? 'text-amber-950' : 'text-amber-800/60 hover:text-amber-950'
                  }`
                }
                style={{
                  transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                  opacity: menuOpen ? 1 : 0,
                  transitionDelay: menuOpen ? `${150 + i * 60}ms` : '0ms',
                }}
              >
                {({ isActive }) => (
                  <span className={isActive ? 'border-b-2 border-amber-900 pb-1' : ''}>
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Decorative line bottom */}
          <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-amber-800/40 transition-all duration-700 delay-500 ${menuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />

          {/* Cursive signature at bottom */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-amber-800/30 text-3xl"
            style={{
              fontFamily: "'Great Vibes', cursive",
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'all 0.6s ease-out',
              transitionDelay: menuOpen ? '600ms' : '0ms',
            }}
            aria-hidden="true"
          >
            DO
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar