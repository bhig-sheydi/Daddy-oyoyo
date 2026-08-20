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

  return (
    <div ref={containerRef} style={{ backgroundColor: '#F3E5D0', minHeight: '250vh' }}>
      {/* Ambient shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full bg-amber-900/5"
          style={{
            width: '500px', height: '500px',
            filter: 'blur(100px)',
            top: '5%', left: '-10%',
            transform: `translateY(${progress * -50}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute rounded-full bg-amber-900/5"
          style={{
            width: '400px', height: '400px',
            filter: 'blur(80px)',
            bottom: '10%', right: '-5%',
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
            opacity: progress < 0.18 ? 1 : Math.max(0, 1 - (progress - 0.18) * 6),
            transform: `translateY(${progress > 0.18 ? (progress - 0.18) * -80 : 0}px) scale(${progress > 0.18 ? 1 - (progress - 0.18) * 0.5 : 1})`,
            transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-amber-800/50 mb-4">
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
          <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-amber-800/40">
            Scroll to see partners
          </span>
          <div className="w-[1px] h-6 bg-amber-900/20 animate-pulse" />
        </div>
      </div>

      {/* BRANDS GRID — alternating left/right slide */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {brands.map((brand, i) => {
            const isLeft = i % 2 === 0
            const start = 0.15 + i * 0.035
            const end = start + 0.10
            const r = reveal(start, end)

            return (
              <div
                key={brand.name}
                style={{
                  opacity: r,
                  transform: `translateX(${(1 - r) * (isLeft ? -80 : 80)}px) translateY(${(1 - r) * 20}px)`,
                  transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="group relative flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/30 border border-amber-900/8 hover:bg-white/50 hover:border-amber-900/15 hover:-translate-y-1 hover:shadow-lg transition-all duration-400 min-h-[140px]">
                  
                  {/* LOGO PLACEHOLDER — replace with actual logo image */}
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-amber-900/5 flex items-center justify-center mb-3 group-hover:bg-amber-900/10 transition-colors duration-300">
                    <span 
                      className="text-lg lg:text-xl font-bold text-amber-900/40 text-center px-2 leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {brand.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>

                  <h3 
                    className="text-sm lg:text-base font-bold text-amber-950 text-center"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {brand.name}
                  </h3>

                  <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-amber-800/40 mt-1">
                    {brand.category}
                  </span>

                  {/* Side accent line on hover */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 h-0 w-[2px] bg-amber-800/20 rounded-full transition-all duration-500 group-hover:h-1/2"
                    style={{ [isLeft ? 'right' : 'left']: '0' }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <div
          className="text-center mt-16"
          style={{
            opacity: reveal(0.82, 0.95),
            transform: `translateY(${(1 - reveal(0.82, 0.95)) * 30}px)`,
            transition: 'all 0.8s ease',
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-900/20" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-amber-800/40">
              And many more
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

export default Collaborations