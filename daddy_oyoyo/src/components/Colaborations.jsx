import { useEffect, useRef, useState } from 'react'

const brands = [
  { name: 'Dstv', category: 'Entertainment' },
  { name: 'BBN', category: 'Reality TV' },
  { name: 'Axe', category: 'Lifestyle' },
  { name: 'Indrive', category: 'Transport' },
  { name: 'Fan Yogo', category: 'Food & Beverage' },
  { name: 'Infinix', category: 'Technology' },
  { name: 'Moon Republic Academy', category: 'Education' },
  { name: 'Indomie', category: 'Food' },
  { name: 'Glover', category: 'Lifestyle' },
  { name: 'OgaBasssey', category: 'Entertainment' },
  { name: 'Tradewithjayy', category: 'Finance' },
  { name: 'Rites Food', category: 'Food' },
  { name: 'Temu', category: 'E-Commerce' },
  { name: 'Zowe Foods', category: 'Food' },
  { name: 'Itel', category: 'Technology' },
  { name: 'Pandar', category: 'Lifestyle' },
  { name: 'Sunset Drinks', category: 'Beverage' },
  { name: 'Adekunle Gold & Qing Madi', category: 'Music' },
]

const Collaborations = () => {
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

  useEffect(() => {
    const handleScroll = () => {
      if (pendingRef.current) return
      pendingRef.current = true
      rafRef.current = requestAnimationFrame(() => {
        pendingRef.current = false
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const windowH = window.innerHeight
        const elH = containerRef.current.offsetHeight
        const raw = (windowH - rect.top) / (windowH + elH)
        setProgress(Math.max(0, Math.min(1, raw)))
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const reveal = (start, end) => {
    if (progress < start) return 0
    if (progress > end) return 1
    return (progress - start) / (end - start)
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#F3E5D0', minHeight: '220vh' }}
      aria-label="Brand Collaborations"
    >
      {/* Ambient shapes — absolute (not fixed) so they stay inside overflow-hidden */}
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
            opacity: reducedMotion ? 1 : progress < 0.18 ? 1 : Math.max(0, 1 - (progress - 0.18) * 6),
            transform: reducedMotion
              ? 'translateY(0) scale(1)'
              : `translateY(${progress > 0.18 ? (progress - 0.18) * -80 : 0}px) scale(${progress > 0.18 ? 1 - (progress - 0.18) * 0.5 : 1})`,
            transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <p className="text-xs tracking-[0.5em] uppercase font-bold text-amber-800/50 mb-4">
            Trusted By Industry Leaders
          </p>
          <h1
            className="font-bold text-amber-950 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            BRANDS WE'VE
          </h1>
          <h2
            className="text-amber-900 mt-1"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Collaborated With
          </h2>
          <div className="mx-auto mt-6 h-[1px] bg-amber-900/20 w-20" />
        </div>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 0.5 - progress * 2), transition: 'opacity 0.5s' }}
        >
          <span className="text-xs tracking-[0.4em] uppercase font-bold text-amber-800/40">
            Scroll to see partners
          </span>
          <div className="w-[1px] h-6 bg-amber-900/20 animate-pulse" />
        </div>
      </div>

      {/* BRANDS GRID */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {brands.map((brand, i) => {
            const isLeft = i % 2 === 0
            const start = 0.12 + i * 0.035
            const end = start + 0.10
            const r = reveal(start, end)

            return (
              <div
                key={brand.name}
                style={{
                  opacity: reducedMotion ? 1 : r,
                  transform: reducedMotion
                    ? 'translateY(0)'
                    : `translateY(${(1 - r) * 30}px)`,
                  transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="group relative flex flex-col items-center justify-center p-5 lg:p-7 rounded-2xl bg-white/40 border border-amber-900/10 hover:bg-white/60 hover:border-amber-900/15 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 min-h-[130px]">

                  {/* Logo placeholder */}
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-amber-900/5 flex items-center justify-center mb-2 group-hover:bg-amber-900/10 transition-colors duration-300">
                    <span 
                      className="text-base lg:text-lg font-bold text-amber-900/40 text-center px-1 leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {brand.name.charAt(0)}
                    </span>
                  </div>

                  <h3 
                    className="text-sm lg:text-base font-bold text-amber-950 text-center leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {brand.name}
                  </h3>

                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-amber-800/40 mt-1">
                    {brand.category}
                  </span>

                  {/* Bottom hover accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-amber-800/30 rounded-full transition-all duration-500 w-0 group-hover:w-3/4" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
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
              And many more
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

export default Collaborations