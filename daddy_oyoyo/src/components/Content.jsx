import { useEffect, useRef, useState } from 'react'

const pillars = [
  {
    title: 'RELATABLE',
    body: 'His content taps into experiences audiences already understand and want to share.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'ENGAGING',
    body: 'His strongest content consistently encourages reactions, comments and shares.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    title: 'MULTI-PLATFORM',
    body: 'Brands can reach his audience across Instagram, TikTok, X and Facebook.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'AUTHENTIC',
    body: 'Brand integrations can be built naturally around his existing personality and content style.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

const Content = () => {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowH = window.innerHeight
      const elH = containerRef.current.offsetHeight
      const raw = (windowH - rect.top) / (windowH + elH)
      setProgress(Math.max(0, Math.min(1, raw)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const reveal = (start, end) => {
    if (progress < start) return 0
    if (progress > end) return 1
    return (progress - start) / (end - start)
  }

  // Heading zips out left, then zips back in from left
 const getHeadingStyle = () => {
  if (progress < 0.20) {
    return { transform: 'translateX(0)', opacity: 1 }
  }
  if (progress < 0.28) {
    const t = (progress - 0.20) / 0.08
    return {
      transform: `translateX(${-t * 120}vw)`,
      opacity: 1 - t * 0.3,
    }
  }
  // After it leaves, it stays gone — no return
  return { transform: 'translateX(-120vw)', opacity: 0 }
}

  const headingStyle = getHeadingStyle()

  return (
    <div ref={containerRef} style={{ backgroundColor: '#F3E5D0', minHeight: '200vh' }}>
      {/* Ambient floating shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full bg-amber-900/5"
          style={{
            width: '500px', height: '500px',
            filter: 'blur(100px)',
            top: '10%', left: '-10%',
            transform: `translateY(${progress * -60}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute rounded-full bg-amber-900/5"
          style={{
            width: '400px', height: '400px',
            filter: 'blur(80px)',
            bottom: '20%', right: '-5%',
            transform: `translateY(${progress * 40}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* STICKY HERO — Heading zips in/out */}
      <div className="sticky top-0 h-full w-full overflow-hidden flex items-center justify-center px-6">
        <div
          className="relative z-10 max-w-5xl mx-auto text-center w-full"
          style={{
            ...headingStyle,
            transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
          }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-amber-800/50 mb-4">
            The Value Proposition
          </p>
          <h1
            className="font-bold text-amber-950 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            WHY YOU WORK WITH
          </h1>
          <h2
            className="text-amber-900 mt-1"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Daddy Oyoyo?
          </h2>
          <div className="mx-auto mt-6 h-[1px] bg-amber-900/20 w-20" />
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 0.5 - progress * 2), transition: 'opacity 0.5s' }}
        >
          <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-amber-800/40">
            Scroll to discover
          </span>
          <div className="w-[1px] h-6 bg-amber-900/20 animate-pulse" />
        </div>
      </div>

      {/* PILLARS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => {
            const start = 0.22 + i * 0.10
            const end = start + 0.12
            const r = reveal(start, end)
            return (
              <div
                key={pillar.title}
                style={{
                  opacity: r,
                  transform: `translateY(${(1 - r) * 50}px) scale(${0.97 + r * 0.03})`,
                  transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="group relative p-8 lg:p-10 rounded-2xl bg-white/30 border border-amber-900/8 hover:bg-white/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 overflow-hidden">
                  <div
                    className="absolute -right-4 -bottom-6 text-[8rem] font-bold leading-none select-none pointer-events-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(120, 80, 40, 0.04)' }}
                  >
                    0{i + 1}
                  </div>

                  <div
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mb-5 text-amber-800"
                    style={{
                      background: 'rgba(120, 80, 40, 0.08)',
                      opacity: r,
                      transform: `scale(${0.8 + r * 0.2})`,
                      transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
                    }}
                  >
                    <div className="w-6 h-6 lg:w-7 lg:h-7">{pillar.icon}</div>
                  </div>

                  <h3
                    className="text-xl lg:text-2xl font-bold text-amber-950 tracking-wide mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      letterSpacing: '0.15em',
                      opacity: r,
                      transform: `translateX(${(1 - r) * 20}px)`,
                      transition: 'all 0.7s ease 0.15s',
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    className="text-amber-900/70 leading-relaxed text-sm lg:text-base"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500,
                      lineHeight: 1.7,
                      opacity: r,
                      transform: `translateY(${(1 - r) * 15}px)`,
                      transition: 'all 0.7s ease 0.25s',
                    }}
                  >
                    {pillar.body}
                  </p>

                  <div className="absolute bottom-0 left-0 h-[2px] bg-amber-800/30 transition-all duration-500 w-0 group-hover:w-full rounded-full" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-16"
          style={{
            opacity: reveal(0.75, 0.90),
            transform: `translateY(${(1 - reveal(0.75, 0.90)) * 30}px)`,
            transition: 'all 0.8s ease',
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-900/20" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-amber-800/40">
              Ready to collaborate?
            </span>
            <div className="h-[1px] w-12 bg-amber-900/20" />
          </div>
          <span className="text-5xl text-amber-900/10" style={{ fontFamily: "'Great Vibes', cursive" }}>
            DO
          </span>
        </div>
      </div>
    </div>
  )
}

export default Content