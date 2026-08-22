import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const Footer = () => {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rafRef = useRef(null)
  const pendingRef = useRef(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const computeProgress = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const windowH = window.innerHeight
    const elH = containerRef.current.offsetHeight
    const raw = (windowH - rect.top) / (windowH + elH)
    setProgress(Math.max(0, Math.min(1, raw)))
  }

  const handleScroll = () => {
    if (pendingRef.current) return
    pendingRef.current = true
    rafRef.current = requestAnimationFrame(() => {
      pendingRef.current = false
      computeProgress()
    })
  }

  useLayoutEffect(() => {
    computeProgress()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    const ro = new ResizeObserver(() => computeProgress())
    if (containerRef.current) ro.observe(containerRef.current)
    const t1 = setTimeout(computeProgress, 100)
    const t2 = setTimeout(computeProgress, 500)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      ro.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const reveal = (start, end) => {
    if (progress < start) return 0
    if (progress > end) return 1
    return (progress - start) / (end - start)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Content', href: '#content' },
    { label: 'Collaborations', href: '#collaborations' },
    { label: 'Media', href: '#media' },
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/daddy_oyoyo?igsh=bGh1d2Exb3QwOXZu',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@daddy_oyoyo?_r=1&_t=ZS-991WlSjQb4r',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/19VkVcBUe4/?mibextid=wwXIfr',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com/daddyoyoyoo?s=11',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Snapchat',
      href: 'https://snapchat.com/t/qQLsIhj1',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c3 0 5 2 5 5 0 1.5-.5 2.5-1 3.5.5.5 1.5 1 2.5 1 .5 0 1-.5 1.5-.5.5 0 .5.5.5.5 0 1.5-2 2.5-3 3 .5 1.5 2 2 3.5 2.5.5.5 0 1-.5 1.5-1.5.5-3 0-4.5-.5-.5 1-1.5 2-3 2.5-.5.5-1 .5-1.5.5s-1 0-1.5-.5c-1.5-.5-2.5-1.5-3-2.5-1.5.5-3 1-4.5.5-.5-.5-1-1-.5-1.5 1.5-.5 3-1 3.5-2.5-1-.5-3-1.5-3-3 0 0 0-.5.5-.5.5 0 1 .5 1.5.5 1 0 2-.5 2.5-1-.5-1-1-2-1-3.5 0-3 2-5 5-5z" />
        </svg>
      ),
    },
  ]

  const businessLinks = [
    { label: 'Contact', href: '#contact' },
    { label: 'Press Kit', href: '#' },
    { label: 'Media Kit', href: '#' },
  ]

  return (
    <footer
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F3E5D0 0%, #e8d5c0 100%)' }}
      aria-label="Footer"
    >
      {/* Ambient shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full bg-amber-900/[0.03]"
          style={{
            width: 'clamp(300px, 45vw, 500px)',
            height: 'clamp(300px, 45vw, 500px)',
            filter: 'blur(100px)',
            top: '-20%',
            left: '-10%',
            transform: `translateY(${progress * -20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute rounded-full bg-amber-900/[0.04]"
          style={{
            width: 'clamp(250px, 35vw, 400px)',
            height: 'clamp(250px, 35vw, 400px)',
            filter: 'blur(80px)',
            bottom: '-10%',
            right: '-5%',
            transform: `translateY(${progress * 15}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-10">

        {/* Top: Thank You */}
        <div
          className="text-center mb-16 lg:mb-20"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.1, 0.25),
            transform: reducedMotion ? 'translateY(0)' : `translateY(${(1 - reveal(0.1, 0.25)) * 40}px)`,
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-amber-800/40 mb-4">
            Daddy Oyoyo
          </p>
          <h2
            className="text-amber-900"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Thank You
          </h2>
          <div className="mx-auto mt-5 h-[1px] bg-amber-900/20 w-16" />
          <p
            className="mt-5 text-sm lg:text-base text-amber-900/60 max-w-sm mx-auto leading-relaxed font-semibold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            For brands, collaborators, and fans — the journey continues across every platform.
          </p>
        </div>

        {/* Link Columns */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 mb-16 lg:mb-20"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.2, 0.4),
            transform: reducedMotion ? 'translateY(0)' : `translateY(${(1 - reveal(0.2, 0.4)) * 30}px)`,
            transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="flex flex-col items-center gap-3.5">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-amber-800/45 mb-1">
              Navigate
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-amber-900/70 hover:text-amber-900 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3.5">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-amber-800/45 mb-1">
              Connect
            </span>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-amber-900/70 hover:text-amber-900 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3.5 col-span-2 md:col-span-1">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-amber-800/45 mb-1">
              Business
            </span>
            {businessLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-amber-900/70 hover:text-amber-900 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social Round Icons */}
        <div
          className="flex justify-center gap-4 lg:gap-5 mb-14 lg:mb-16"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.35, 0.5),
            transition: 'all 0.8s ease',
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="group w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-amber-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(120, 80, 40, 0.1)',
                boxShadow: '0 4px 16px rgba(120, 80, 40, 0.08)',
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-4 mb-8"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.45, 0.6),
            transition: 'opacity 1s ease',
          }}
        >
          <div className="h-[1px] w-12 bg-amber-900/15" />
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-amber-800/40">
            Daddy Oyoyo
          </span>
          <div className="h-[1px] w-12 bg-amber-900/15" />
        </div>

        {/* Copyright */}
        <div
          className="text-center space-y-1.5"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.5, 0.65),
            transition: 'opacity 1s ease',
          }}
        >
          <p className="text-xs text-amber-900/40 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            © 2026 Daddy Oyoyo. All rights reserved.
          </p>
          <p className="text-[11px] text-amber-900/30 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Managed by Zoey Vincent
          </p>
        </div>

        {/* Giant faded DO */}
        <div
          className="text-center mt-6"
          style={{
            opacity: reducedMotion ? 0.06 : reveal(0.55, 0.7) * 0.06,
            transition: 'opacity 1.2s ease',
          }}
        >
          <span
            className="text-[clamp(4rem,12vw,8rem)] text-amber-900/[0.06] leading-none select-none pointer-events-none block"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            DO
          </span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="absolute right-6 lg:right-12 bottom-10 w-10 h-10 rounded-full flex items-center justify-center text-amber-800/40 hover:text-amber-800/70 transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(120, 80, 40, 0.1)',
            boxShadow: '0 4px 12px rgba(120, 80, 40, 0.06)',
          }}
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </footer>
  )
}

export default Footer