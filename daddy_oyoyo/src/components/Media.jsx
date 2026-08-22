import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const services = [
  'Brand Campaigns',
  'Sponsored Content',
  'Product Launches',
  'Event Appearances',
  'Long-Term Partnerships',
  'PR & Media',
  'Podcasts',
  'Interviews',
  'Creator Collaborations',
]

const Media = () => {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef(null)
  const pendingRef = useRef(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
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

  const fadeStart = isMobile ? 0.30 : 0.18
  const fadeSpeed = isMobile ? 4 : 6
  const moveY = isMobile ? 100 : 80
  const scaleAmt = isMobile ? 0.4 : 0.5

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#F3E5D0', minHeight: '220vh' }}
      aria-label="Media and Appearances"
    >
      {/* Ambient shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full bg-amber-900/5"
          style={{
            width: 'clamp(280px, 40vw, 500px)',
            height: 'clamp(280px, 40vw, 500px)',
            filter: 'blur(100px)',
            top: '5%',
            left: '-5%',
            transform: `translateY(${progress * -50}px)`,
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
            right: '-5%',
            transform: `translateY(${progress * 30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* STICKY HEADER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6">
        <div
          className="relative z-10 max-w-4xl mx-auto text-center"
          style={{
            opacity: reducedMotion ? 1 : progress < fadeStart ? 1 : Math.max(0, 1 - (progress - fadeStart) * fadeSpeed),
            transform: reducedMotion
              ? 'translateY(0) scale(1)'
              : `translateY(${progress > fadeStart ? (progress - fadeStart) * -moveY : 0}px) scale(${progress > fadeStart ? 1 - (progress - fadeStart) * scaleAmt : 1})`,
            transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <p className="text-xs tracking-[0.5em] uppercase font-bold text-amber-800/50 mb-4">
            Available For
          </p>
          <h1
            className="font-bold text-amber-950 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            MEDIA &
          </h1>
          <h2
            className="text-amber-900 mt-1"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Appearances
          </h2>
          <div className="mx-auto mt-6 h-[1px] bg-amber-900/20 w-20" />
        </div>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 0.5 - progress * 2), transition: 'opacity 0.5s' }}
        >
          <span className="text-xs tracking-[0.4em] uppercase font-bold text-amber-800/40">
            Scroll to explore
          </span>
          <div className="w-[1px] h-6 bg-amber-900/20 animate-pulse" />
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, i) => {
            const start = 0.12 + i * 0.035
            const end = start + 0.10
            const r = reveal(start, end)

            return (
              <div
                key={service}
                style={{
                  opacity: reducedMotion ? 1 : r,
                  transform: reducedMotion
                    ? 'translateY(0)'
                    : `translateY(${(1 - r) * 30}px)`,
                  transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="group relative flex items-center gap-4 p-5 lg:p-6 rounded-2xl bg-white/50 border border-amber-900/10 hover:bg-white/70 hover:border-amber-900/15 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 min-h-[80px]">

                  {/* Bullet accent */}
                  <div
                    className="w-2 h-2 rounded-full bg-amber-800/30 group-hover:bg-amber-800/50 group-hover:scale-125 transition-all duration-300 flex-shrink-0"
                  />

                  <h3
                    className="text-sm lg:text-base font-bold text-amber-950 leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {service}
                  </h3>

                  {/* Bottom hover accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-amber-800/30 rounded-full transition-all duration-500 w-0 group-hover:w-3/4" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-12"
          style={{
            opacity: reducedMotion ? 1 : reveal(0.72, 0.85),
            transform: reducedMotion ? 'translateY(0)' : `translateY(${(1 - reveal(0.72, 0.85)) * 30}px)`,
            transition: 'all 0.8s ease',
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-900/20" />
            <span className="text-xs tracking-[0.4em] uppercase font-bold text-amber-800/40">
              Let's work together
            </span>
            <div className="h-[1px] w-12 bg-amber-900/20" />
          </div>
          <span className="text-5xl text-amber-900/10" style={{ fontFamily: "'Great Vibes', cursive" }}>
            DO
          </span>
        </div>
      </div>
    </section>
  )
}

export default Media