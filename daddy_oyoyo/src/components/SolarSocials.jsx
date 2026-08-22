import { useState, useEffect, useCallback } from 'react'

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/daddy_oyoyo?igsh=bGh1d2Exb3QwOXZu',
    logo: 'https://kimi-web-img.kimi.ai/img/1000logos.net/939eff5801f9386c0d1a245da0fe55a664878cf7.png',
    handle: '@daddy_oyoyo',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@daddy_oyoyo?_r=1&_t=ZS-991WlSjQb4r',
    logo: 'https://kimi-web-img.kimi.ai/img/assets.stickpng.com/a1cce22f2aabd55de82bb259805adcd6ee5a0aac.png',
    handle: '@daddy_oyoyo',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/19VkVcBUe4/?mibextid=wwXIfr',
    logo: 'https://kimi-web-img.kimi.ai/img/upload.wikimedia.org/e014b576de2794d70d92e977ca254cda7841648e.png',
    handle: 'Daddy Oyoyo',
  },
  {
    name: 'X',
    url: 'https://x.com/daddyoyoyoo?s=11',
    logo: 'https://kimi-web-img.kimi.ai/img/upload.wikimedia.org/98435d43f7b03dff36e65487ea7b8ea708173979.png',
    handle: '@daddyoyoyoo',
  },
  {
    name: 'Snapchat',
    url: 'https://snapchat.com/t/qQLsIhj1',
    logo: 'https://kimi-web-img.kimi.ai/img/www.citypng.com/8352429e1943fa11066f184b3a7c20b8864b6edb.png',
    handle: 'Daddy Oyoyo',
  },
]

const SocialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const angleStep = 360 / socials.length
  const radius = 280

  const goTo = useCallback((index) => {
    if (isAnimating || index === activeIndex) return
    setIsAnimating(true)
    setActiveIndex(index)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating, activeIndex])

  const next = useCallback(() => goTo((activeIndex + 1) % socials.length), [activeIndex, goTo])
  const prev = useCallback(() => goTo((activeIndex - 1 + socials.length) % socials.length), [activeIndex, goTo])

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) next()
    }, 5000)
    return () => clearInterval(interval)
  }, [next, isAnimating])

  const active = socials[activeIndex]

  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center py-20 select-none"
      style={{ background: 'linear-gradient(180deg, #0f0a06 0%, #1a1209 50%, #0d0804 100%)' }}
      aria-label="Social Media"
    >
      {/* Warm ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 'clamp(300px, 50vw, 600px)',
            height: 'clamp(300px, 50vw, 600px)',
            background: 'rgba(212, 165, 116, 0.04)',
            filter: 'blur(100px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '250px',
            height: '250px',
            background: 'rgba(180, 120, 60, 0.06)',
            filter: 'blur(80px)',
            bottom: '15%',
            right: '15%',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '180px',
            height: '180px',
            background: 'rgba(212, 165, 116, 0.03)',
            filter: 'blur(60px)',
            top: '20%',
            left: '10%',
          }}
        />
      </div>

      {/* Section header */}
      <div className="relative z-10 text-center mb-8 lg:mb-12">
        <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#d4a574]/40 mb-3">
          Stay Connected
        </p>
        <h2
          className="text-[#d4a574] leading-tight"
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Follow The Journey
        </h2>
        <div className="mx-auto mt-4 h-[1px] bg-[#d4a574]/20 w-16" />
      </div>

      {/* 3D Carousel */}
      <div
        className="relative z-10 w-full max-w-3xl mx-auto flex items-center justify-center"
        style={{ perspective: '1200px', height: 'clamp(320px, 50vh, 500px)' }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Orbit rings */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d4a574]/10 pointer-events-none"
            style={{ width: `${radius * 2}px`, height: `${radius * 2}px`, transform: 'translate(-50%, -50%) translateZ(-60px)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a574]/5 pointer-events-none"
            style={{ width: `${radius * 2.4}px`, height: `${radius * 2.4}px`, transform: 'translate(-50%, -50%) translateZ(-120px)' }}
          />

          {/* Center glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(212,165,116,0.12), transparent 70%)',
              filter: 'blur(20px)',
              transform: 'translate(-50%, -50%) translateZ(0px)',
            }}
          />

          {/* Medallions */}
          {socials.map((social, i) => {
            let offset = i - activeIndex
            // Normalize to shortest path
            if (offset > socials.length / 2) offset -= socials.length
            if (offset < -socials.length / 2) offset += socials.length

            const angle = offset * angleStep
            const rad = (angle * Math.PI) / 180
            const depth = Math.cos(rad) // -1 (back) to 1 (front)
            const isActive = offset === 0

            return (
              <div
                key={social.name}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  transform: `
                    translate(-50%, -50%)
                    rotateY(${angle}deg)
                    translateZ(${radius}px)
                    rotateY(${-angle}deg)
                    translateZ(${isActive ? 140 : 0}px)
                    scale(${isActive ? 1.35 : 0.72 + depth * 0.18})
                  `,
                  zIndex: Math.round(depth * 25) + 25,
                  opacity: isActive ? 1 : Math.max(0.2, 0.35 + depth * 0.45),
                  filter: isActive
                    ? `brightness(1.1) drop-shadow(0 0 30px rgba(212,165,116,0.35))`
                    : `brightness(${0.45 + depth * 0.55})`,
                  transition: 'all 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => goTo(i)}
              >
                {/* Coin body */}
                <div
                  className="relative flex items-center justify-center rounded-full overflow-hidden"
                  style={{
                    width: 'clamp(64px, 10vw, 88px)',
                    height: 'clamp(64px, 10vw, 88px)',
                    background: 'radial-gradient(circle at 35% 35%, #3d2b1a 0%, #1a1209 60%, #0f0a06 100%)',
                    border: '3px solid transparent',
                    backgroundClip: 'padding-box',
                    boxShadow: `
                      inset 0 0 20px rgba(0,0,0,0.7),
                      0 0 0 1.5px #8b6914,
                      0 0 0 3.5px #d4a574,
                      0 0 0 4.5px #5c3d1e,
                      ${isActive ? '0 0 40px rgba(212,165,116,0.3), 0 0 80px rgba(212,165,116,0.15)' : '0 12px 40px rgba(0,0,0,0.5)'}
                    `,
                    transition: 'box-shadow 800ms ease',
                  }}
                >
                  {/* Inner bevel ring */}
                  <div
                    className="absolute inset-[6px] rounded-full pointer-events-none"
                    style={{
                      border: '1px solid rgba(212, 165, 116, 0.15)',
                      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                  />
                  
                  {/* Logo */}
                  <img
                    src={social.logo}
                    alt={social.name}
                    className="relative z-10 w-[55%] h-[55%] object-contain pointer-events-none"
                    draggable={false}
                    style={{
                      filter: isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' : 'none',
                      transition: 'filter 800ms ease',
                    }}
                  />

                  {/* Warm face sheen */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(212,165,116,0.08), transparent 60%)',
                    }}
                  />
                </div>

                {/* Label - only visible when active or near front */}
                <div
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                  style={{
                    opacity: isActive ? 1 : Math.max(0, depth - 0.3),
                    transform: `translateX(-50%) translateY(${isActive ? 0 : 6}px)`,
                    transition: 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4a574]/90 block"
                    style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
                  >
                    {social.name}
                  </span>
                  <span
                    className="text-[10px] tracking-wider text-[#d4a574]/50 block mt-0.5"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {social.handle}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Glassmorphic Controls */}
      <div className="relative z-20 flex items-center gap-6 mt-16 lg:mt-20">
        <button
          onClick={prev}
          aria-label="Previous"
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-3">
          {socials.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.name}`}
              className="relative rounded-full transition-all duration-500 overflow-hidden"
              style={{
                width: i === activeIndex ? '36px' : '7px',
                height: '7px',
                background: i === activeIndex
                  ? 'linear-gradient(90deg, #d4a574, #8b6914)'
                  : 'rgba(255, 255, 255, 0.15)',
                boxShadow: i === activeIndex ? '0 0 12px rgba(212, 165, 116, 0.4)' : 'none',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next"
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Follow Button */}
      <div className="relative z-20 mt-8 lg:mt-10">
        <a
          href={active.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-[#1a1209] font-bold text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #d4a574 0%, #b8945f 50%, #8b6914 100%)',
            boxShadow: '0 8px 32px rgba(212, 165, 116, 0.25), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          <span>Follow on {active.name}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* Handle text */}
      <p
        className="relative z-10 mt-4 text-xs tracking-[0.3em] uppercase text-[#d4a574]/30"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {active.handle}
      </p>
    </section>
  )
}

export default SocialsCarousel