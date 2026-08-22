import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const Contact = () => {
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

  const contacts = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      href: 'mailto:daddyoyoyomanagement@gmail.com',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'Call / WhatsApp',
      href: 'tel:+2349064331257',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/zoey-vincent-socialmediamanager',
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#F3E5D0', minHeight: '100vh' }}
      aria-label="Contact"
    >
      {/* Ambient shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full bg-amber-900/5"
          style={{
            width: 'clamp(280px, 40vw, 500px)',
            height: 'clamp(280px, 40vw, 500px)',
            filter: 'blur(100px)',
            top: '10%',
            left: '-10%',
            transform: `translateY(${progress * -30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute rounded-full bg-amber-900/5"
          style={{
            width: 'clamp(220px, 35vw, 400px)',
            height: 'clamp(220px, 35vw, 400px)',
            filter: 'blur(80px)',
            bottom: '10%',
            right: '-10%',
            transform: `translateY(${progress * 20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-32 lg:py-40 flex flex-col items-center text-center">

        {/* Heading */}
        <div
          style={{
            opacity: reducedMotion ? 1 : reveal(0.1, 0.25),
            transform: reducedMotion ? 'translateY(0)' : `translateY(${(1 - reveal(0.1, 0.25)) * 40}px)`,
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <p className="text-xs tracking-[0.5em] uppercase font-bold text-amber-800/50 mb-6">
            Let's Create Something Great
          </p>
          <h2
            className="font-bold text-amber-950 leading-tight mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            WANT TO WORK WITH
          </h2>
          <h3
            className="text-amber-900"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Daddy Oyoyo?
          </h3>
          <div className="mx-auto mt-6 h-[1px] bg-amber-900/20 w-16" />
        </div>

        {/* Round Icon Buttons */}
        <div
          className="flex flex-wrap justify-center gap-10 lg:gap-14 mt-16 lg:mt-20 w-full max-w-xl"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.25, 0.45),
            transform: reducedMotion ? 'translateY(0)' : `translateY(${(1 - reveal(0.25, 0.45)) * 40}px)`,
            transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
          }}
        >
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center gap-3"
            >
              <div
                className="w-[72px] h-[72px] lg:w-[80px] lg:h-[80px] rounded-full flex items-center justify-center text-amber-900 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-active:scale-95"
                style={{
                  background: 'rgba(255, 255, 255, 0.45)',
                  border: '1px solid rgba(120, 80, 40, 0.1)',
                  boxShadow: '0 8px 24px rgba(120, 80, 40, 0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {c.icon}
              </div>
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-bold text-amber-800/50 group-hover:text-amber-800/70 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Click me
              </span>
            </a>
          ))}
        </div>

        {/* Name */}
        <div
          className="mt-14 lg:mt-16"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.4, 0.55),
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
          }}
        >
          <h4
            className="text-xl lg:text-2xl font-bold text-amber-950"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em' }}
          >
            Zoey Vincent
          </h4>
          <p className="text-[11px] tracking-[0.2em] uppercase font-bold text-amber-800/50 mt-1">
            Talent Manager & Brand Partnerships
          </p>
        </div>

        {/* Bottom flourish */}
        <div
          className="mt-16 flex items-center gap-4"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.5, 0.65),
            transition: 'opacity 1s ease',
          }}
        >
          <div className="h-[1px] w-12 bg-amber-900/20" />
          <span className="text-xs tracking-[0.4em] uppercase font-bold text-amber-800/40">
            Daddy Oyoyo
          </span>
          <div className="h-[1px] w-12 bg-amber-900/20" />
        </div>
      </div>
    </section>
  )
}

export default Contact