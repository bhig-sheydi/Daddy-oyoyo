import { useState, useEffect } from 'react'
import heroPic from '../assets/hero image.png'

// ===== FIXED: Champagne Gold Background =====
const BG_COLOR = '#F3E5D0'
const TEXT_COLOR = 'text-amber-900'
const ACCENT_COLOR = 'bg-amber-600'

// ===== FIXED: Sky Burst Gradient =====
const skyBurstSplashes = [
  { bg: 'radial-gradient(circle, rgba(184,212,227,0.9) 0%, transparent 70%)', w: '500px', h: '500px', top: '5%', left: '-5%', blur: '60px' },
  { bg: 'radial-gradient(circle, rgba(200,230,255,0.5) 0%, transparent 60%)', w: '350px', h: '350px', top: '50%', left: '10%', blur: '70px' },
  { bg: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 50%)', w: '300px', h: '300px', top: '20%', left: '30%', blur: '50px' },
]

const Hero = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: BG_COLOR }}
    >
      {/* SKY BURST GRADIENT SPLASHES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {skyBurstSplashes.map((splash, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              background: splash.bg,
              width: splash.w,
              height: splash.h,
              top: splash.top,
              left: splash.left,
              filter: `blur(${splash.blur})`,
              opacity: 0.9,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12">
        
        {/* IMAGE — Falls into frame */}
        <div className="relative w-full lg:w-1/2 flex justify-center overflow-hidden">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${BG_COLOR}dd 0%, transparent 70%)`,
              filter: 'blur(40px)',
              transform: 'scale(1.2)',
            }}
          />
          <img
            src={heroPic}
            alt="Client"
            className="relative z-10 w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
            style={{
              transform: loaded ? 'translateY(0) scale(1)' : 'translateY(-120%) scale(0.8)',
              opacity: loaded ? 1 : 0,
              transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease-out',
            }}
          />
        </div>

        {/* TEXT — Comes from bottom with stagger */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1
            className={`text-5xl lg:text-7xl font-bold ${TEXT_COLOR} tracking-tight`}
            style={{
              transform: loaded ? 'translateY(0)' : 'translateY(100px)',
              opacity: loaded ? 1 : 0,
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, opacity 0.8s ease-out 0.3s',
            }}
          >
            Daddy Oyoyo
          </h1>
          <p
            className={`text-xl ${TEXT_COLOR} opacity-80 max-w-md mx-auto lg:mx-0`}
            style={{
              transform: loaded ? 'translateY(0)' : 'translateY(80px)',
              opacity: loaded ? 1 : 0,
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s, opacity 0.8s ease-out 0.5s',
            }}
          >
            Digital Creator • Entertainer • Personality
          </p>
          <div
            style={{
              transform: loaded ? 'translateY(0)' : 'translateY(60px)',
              opacity: loaded ? 1 : 0,
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.7s, opacity 0.8s ease-out 0.7s',
            }}
          >
            <button className={`px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 ${ACCENT_COLOR}`}>
              Follow Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero