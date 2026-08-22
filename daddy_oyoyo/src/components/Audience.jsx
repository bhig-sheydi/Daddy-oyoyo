import { useState, useEffect, useRef } from 'react'

const platforms = [
  { name: 'Instagram', handle: '@daddyoyoyo', followers: '80K+', icon: 'instagram', color: '#E4405F' },
  { name: 'TikTok', handle: '@daddyoyoyo', followers: '238K+', icon: 'tiktok', color: '#000000' },
  { name: 'X', handle: '@daddyoyoyo', followers: '41K+', icon: 'x', color: '#0f0f0f' },
  { name: 'Facebook', handle: 'Daddy Oyoyo', followers: '60K+', icon: 'facebook', color: '#1877F2' },
  { name: 'Snapchat', handle: 'daddyoyoyo', followers: '31K+', icon: 'snapchat', color: '#FFFC00' },
]

const stats = [
  { label: 'Total/Monthly Reach', value: 7, suffix: 'M+' },
  { label: 'Average Video Views', value: 90, suffix: 'K+' },
  { label: 'Highest Video Views', value: 10, suffix: 'M+' },
  { label: 'Average Engagements', value: 10, suffix: '%' },
]

const useCounter = (target, phase, delay) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (phase < delay) return
    const duration = 1500
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [phase, target, delay])
  return count
}

const PlatformIcon = ({ name, className, phase }) => {
  // TikTok is black — invisible on dark backgrounds. Lighten it when bg is dark.
  const tiktokColor = phase < 9 ? '#e8c9a0' : '#000000'
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.2 0 .39.02.58.06V9.15a6.33 6.33 0 00-.58-.03A6.34 6.34 0 003.11 15.46a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.26 8.26 0 004.83 1.55V7.08a4.85 4.85 0 01-1.02-.39z"/>
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    snapchat: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.42.42 0 01.17-.029c.105 0 .268.048.365.811.06.529.144 1.252.288 1.493.114.188.535.506 1.007.792.483.292 1.018.612 1.29.86.405.365.492.602.492.753 0 .186-.163.467-.648.636-1.26.431-2.472.985-3.25 1.65-.558.478-.694.708-.694.969 0 .127.046.258.138.405.383.6 1.193 1.348 2.32 1.348.363 0 .69-.075.976-.226.24-.127.454-.183.638-.183.28 0 .5.15.667.45.24.42.24 1.02.002 1.68-.36.96-1.26 1.86-2.52 2.52-.96.51-2.16.87-3.48 1.02-.18.03-.36.06-.54.06-.3 0-.6-.03-.9-.09-.42-.09-.84-.27-1.26-.54-.42-.27-.84-.48-1.26-.63-.42-.15-.78-.21-1.08-.21-.3 0-.66.06-1.08.21-.42.15-.84.36-1.26.63-.42.27-.84.45-1.26.54-.3.06-.6.09-.9.09-.18 0-.36-.03-.54-.06-1.32-.15-2.52-.51-3.48-1.02-1.26-.66-2.16-1.56-2.52-2.52-.238-.66-.238-1.26.002-1.68.167-.3.387-.45.667-.45.184 0 .398.056.638.183.286.151.613.226.976.226 1.127 0 1.937-.748 2.32-1.348.092-.147.138-.278.138-.405 0-.261-.136-.491-.694-.969-.778-.665-1.99-1.219-3.25-1.65-.485-.169-.648-.45-.648-.636 0-.151.087-.388.492-.753.272-.248.807-.568 1.29-.86.472-.286.893-.604 1.007-.792.144-.241.228-.964.288-1.493.097-.763.26-.811.365-.811.067 0 .117.01.17.029.374.181.733.285 1.033.301.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.661 1.069 11.018.793 12.008.793z"/>
      </svg>
    ),
  }
  const icon = icons[name]
  if (!icon) return null
  if (name === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color: tiktokColor }}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.2 0 .39.02.58.06V9.15a6.33 6.33 0 00-.58-.03A6.34 6.34 0 003.11 15.46a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.26 8.26 0 004.83 1.55V7.08a4.85 4.85 0 01-1.02-.39z"/>
      </svg>
    )
  }
  return icon
}

const Audience = () => {
  const [phase, setPhase] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setPhase(13)
      return
    }
    const beats = [200, 500, 800, 1100, 1400, 1700, 2000, 2400, 2800, 3200, 3600, 4000, 4400]
    beats.forEach((t, i) => {
      const id = setTimeout(() => setPhase(i + 1), t)
      timersRef.current.push(id)
    })
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [reducedMotion])

  const getMood = (p) => {
    if (p < 3) return { bg: '#1a1209', accent: '#d4a574', glow: 'rgba(212,165,116,0.2)', cardBg: 'rgba(212,165,116,0.06)' }
    if (p < 6) return { bg: '#2d1f12', accent: '#e8c9a0', glow: 'rgba(232,201,160,0.25)', cardBg: 'rgba(232,201,160,0.06)' }
    if (p < 9) return { bg: '#3d2b1a', accent: '#f3e5d0', glow: 'rgba(243,229,208,0.3)', cardBg: 'rgba(243,229,208,0.06)' }
    return { bg: '#F3E5D0', accent: '#5c3d1e', glow: 'rgba(184,212,227,0.25)', cardBg: 'rgba(92,61,30,0.04)' }
  }

  const mood = getMood(phase)

  const reachCount = useCounter(7, phase, 9)
  const avgViewsCount = useCounter(90, phase, 10)
  const highViewsCount = useCounter(10, phase, 11)
  const engagementCount = useCounter(10, phase, 12)

  const counterValues = [reachCount, avgViewsCount, highViewsCount, engagementCount]

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden transition-colors duration-1000 ease-out"
      style={{ backgroundColor: mood.bg }}
      aria-label="Audience and Social Reach"
    >
      {/* Ambient orbs — clamped to prevent spill */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full transition-all duration-1000"
          style={{
            width: 'clamp(300px, 50vw, 600px)',
            height: 'clamp(300px, 50vw, 600px)',
            background: mood.glow,
            filter: 'blur(100px)',
            top: '-15%',
            right: '-5%',
            transform: `scale(${1 + phase * 0.04})`,
          }}
        />
        <div
          className="absolute rounded-full transition-all duration-1000"
          style={{
            width: 'clamp(220px, 35vw, 400px)',
            height: 'clamp(220px, 35vw, 400px)',
            background: mood.glow,
            filter: 'blur(80px)',
            bottom: '-10%',
            left: '-5%',
            transform: `scale(${1 + phase * 0.03})`,
          }}
        />
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-8 left-8 w-16 h-16 border-l border-t transition-colors duration-1000"
        style={{ borderColor: mood.accent, opacity: phase > 1 ? 0.2 : 0 }}
      />
      <div
        className="absolute bottom-8 right-8 w-16 h-16 border-r border-b transition-colors duration-1000"
        style={{ borderColor: mood.accent, opacity: phase > 1 ? 0.2 : 0 }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center py-16 lg:py-6 pb-20">

        {/* SOCIAL REACH HEADER */}
        <div className="text-center mb-5 lg:mb-6">
          <p
            className="text-xs tracking-[0.5em] uppercase font-bold mb-2"
            style={{
              color: mood.accent,
              opacity: phase > 0 ? 0.5 : 0,
              transform: `translateY(${phase > 0 ? 0 : 20}px)`,
              transition: 'all 0.8s ease-out',
            }}
          >
            A Community That Spans Platforms
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
              fontWeight: 700,
              color: mood.accent,
              opacity: phase > 1 ? 1 : 0,
              transform: `translateY(${phase > 1 ? 0 : 40}px) scale(${phase > 1 ? 1 : 0.95})`,
              transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            SOCIAL REACH
          </h1>
          <div
            className="mx-auto mt-2 h-[1px] bg-current"
            style={{
              color: mood.accent,
              width: phase > 2 ? '60px' : '0px',
              opacity: 0.4,
              transition: 'width 1s ease-out 0.3s',
            }}
          />
        </div>

        {/* PLATFORM CARDS */}
        <div className="flex justify-center gap-2.5 lg:gap-4 mb-6 lg:mb-8 flex-wrap">
          {platforms.map((platform, i) => (
            <div
              key={platform.name}
              className="group relative"
              style={{
                opacity: phase > 3 + i * 0.35 ? 1 : 0,
                transform: `translateY(${phase > 3 + i * 0.35 ? 0 : 50}px) rotateX(${phase > 3 + i * 0.35 ? 0 : 15}deg)`,
                transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms`,
              }}
            >
              <div
                className="relative px-3 py-3 lg:px-5 lg:py-4 rounded-2xl border transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                style={{
                  background: mood.cardBg,
                  borderColor: `${mood.accent}15`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 8px 32px -8px ${mood.glow}`,
                }}
              >
                <div className="flex justify-center mb-2">
                  <div
                    className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ background: `${platform.color}15`, color: platform.color }}
                  >
                    <PlatformIcon name={platform.icon} className="w-4 h-4 lg:w-5 lg:h-5" phase={phase} />
                  </div>
                </div>

                <div
                  className="text-center text-lg lg:text-xl font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: mood.accent }}
                >
                  {platform.followers}
                </div>

                <div
                  className="text-center text-xs tracking-[0.15em] uppercase font-bold mt-0.5"
                  style={{ color: mood.accent, opacity: 0.6 }}
                >
                  {platform.name}
                </div>

                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-500 w-0 group-hover:w-3/4"
                  style={{ background: platform.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="flex items-center justify-center gap-4 mb-4 lg:mb-5">
          <div
            className="h-[1px] bg-current transition-all duration-1000"
            style={{ color: mood.accent, width: phase > 6 ? '80px' : '0px', opacity: 0.25 }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-current transition-all duration-700"
            style={{ color: mood.accent, opacity: phase > 6 ? 0.4 : 0, transform: `scale(${phase > 6 ? 1 : 0})` }}
          />
          <div
            className="h-[1px] bg-current transition-all duration-1000"
            style={{ color: mood.accent, width: phase > 6 ? '80px' : '0px', opacity: 0.25 }}
          />
        </div>

        {/* AUDIENCE & PERFORMANCE HEADER */}
        <div className="text-center mb-3 lg:mb-4">
          <p
            className="text-xs tracking-[0.5em] uppercase font-bold mb-1.5"
            style={{
              color: mood.accent,
              opacity: phase > 6 ? 0.5 : 0,
              transform: `translateY(${phase > 6 ? 0 : 15}px)`,
              transition: 'all 0.8s ease-out',
            }}
          >
            We know you are interested in the numbers, so here they are
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.3rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: mood.accent,
              opacity: phase > 7 ? 1 : 0,
              transform: `translateY(${phase > 7 ? 0 : 30}px)`,
              transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            AUDIENCE & PERFORMANCE
          </h2>
        </div>

        {/* THE NUMBERS — Heading */}
        <div className="text-center mb-4 lg:mb-5">
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
              fontWeight: 600,
              letterSpacing: '0.35em',
              color: mood.accent,
              opacity: phase > 8 ? 0.7 : 0,
              transform: `translateY(${phase > 8 ? 0 : 20}px)`,
              transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            THE NUMBERS
          </h3>
          <div
            className="mx-auto mt-2 h-[1px] bg-current"
            style={{
              color: mood.accent,
              width: phase > 8 ? '40px' : '0px',
              opacity: 0.35,
              transition: 'width 0.8s ease-out 0.2s',
            }}
          />
        </div>

        {/* THE NUMBERS — Stats Cards */}
        <div className="flex justify-center gap-3 lg:gap-5 flex-wrap">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center px-3 py-3 lg:px-6 lg:py-4 rounded-xl border"
              style={{
                background: mood.cardBg,
                borderColor: `${mood.accent}12`,
                opacity: phase > 9 + i * 0.25 ? 1 : 0,
                transform: `translateY(${phase > 9 + i * 0.25 ? 0 : 40}px) scale(${phase > 9 + i * 0.25 ? 1 : 0.9})`,
                transition: `all 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${i * 100}ms`,
                minWidth: 'clamp(100px, 22vw, 180px)',
              }}
            >
              {/* Big Number */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  color: mood.accent,
                  lineHeight: 1,
                }}
              >
                {counterValues[i]}
                <span style={{ fontSize: '0.55em', opacity: 0.8 }}>{stat.suffix}</span>
              </div>

              {/* Label */}
              <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${mood.accent}15` }}>
                <div
                  className="text-xs lg:text-xs tracking-[0.2em] uppercase font-bold"
                  style={{ color: mood.accent, opacity: 0.7 }}
                >
                  {stat.label}
                </div>
              </div>

              {/* Decorative dot */}
              <div
                className="mx-auto mt-2 w-1 h-1 rounded-full"
                style={{
                  background: mood.accent,
                  opacity: phase > 10 + i * 0.25 ? 0.4 : 0,
                  transform: `scale(${phase > 10 + i * 0.25 ? 1 : 0})`,
                  transition: `all 0.5s ease ${i * 80}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cursive Signature — sits in padding, not absolute */}
      <div
        className="relative z-10 text-center pb-8"
        style={{
          opacity: phase > 12 ? 0.15 : 0,
          transition: 'opacity 1.5s ease',
        }}
      >
        <span
          className="text-4xl"
          style={{ fontFamily: "'Great Vibes', cursive", color: mood.accent }}
        >
          DO
        </span>
      </div>
    </section>
  )
}

export default Audience