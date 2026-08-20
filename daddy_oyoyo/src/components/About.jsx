import { useState, useEffect } from 'react'
import aboutImage from '../assets/about page.png'

const About = () => {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const beats = [300, 600, 900, 1200, 1500, 1800, 2200, 2600, 3000, 3500, 4000]
    beats.forEach((t, i) => {
      setTimeout(() => setPhase(i + 1), t)
    })
  }, [])

  const getMood = (p) => {
    if (p < 4) return { bg: '#1a1209', accent: '#d4a574', glow: 'rgba(212,165,116,0.2)', textOp: 0.9 }
    if (p < 7) return { bg: '#2d1f12', accent: '#e8c9a0', glow: 'rgba(232,201,160,0.25)', textOp: 0.95 }
    if (p < 10) return { bg: '#3d2b1a', accent: '#f3e5d0', glow: 'rgba(243,229,208,0.3)', textOp: 1 }
    return { bg: '#F3E5D0', accent: '#5c3d1e', glow: 'rgba(184,212,227,0.25)', textOp: 1 }
  }

  const mood = getMood(phase)

  const imageScale = 0.5 + Math.min(1, phase / 8) * 0.5
  const imageBlur = Math.max(0, 10 - phase * 1.2)
  const borderRadius = `${Math.max(5, 50 - phase * 4)}% ${Math.max(5, 50 - phase * 3)}% ${Math.max(5, 45 - phase * 3)}% ${Math.max(5, 40 - phase * 3)}%`
  const imageRotate = (Math.min(1, phase / 10) - 0.5) * 8

  return (
    <div
      className="relative h-screen w-full overflow-hidden transition-colors duration-1000 ease-out"
      style={{ backgroundColor: mood.bg }}
    >
      {/* Ambient floating orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full transition-all duration-1000"
          style={{
            width: '500px', height: '500px',
            background: mood.glow,
            filter: 'blur(90px)',
            top: '-10%', left: '-10%',
            transform: `translateY(${phase * -8}px) scale(${1 + phase * 0.05})`,
          }}
        />
        <div
          className="absolute rounded-full transition-all duration-1000"
          style={{
            width: '350px', height: '350px',
            background: mood.glow,
            filter: 'blur(70px)',
            bottom: '-5%', right: '-5%',
            transform: `translateY(${phase * 5}px) scale(${1 + phase * 0.03})`,
          }}
        />
      </div>

      {/* Decorative rotating rings behind image */}
      <div className="absolute right-[5%] lg:right-[8%] top-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div
          className="absolute rounded-full border border-current transition-all duration-700"
          style={{
            color: mood.accent,
            opacity: phase > 2 ? 0.12 : 0,
            width: 'clamp(320px, 42vw, 520px)',
            height: 'clamp(320px, 42vw, 520px)',
            transform: `rotate(${phase * 5}deg) translate(-50%, -50%)`,
            left: '50%', top: '50%',
          }}
        />
        <div
          className="absolute rounded-full border border-dashed border-current transition-all duration-700"
          style={{
            color: mood.accent,
            opacity: phase > 2 ? 0.08 : 0,
            width: 'clamp(360px, 48vw, 580px)',
            height: 'clamp(360px, 48vw, 580px)',
            transform: `rotate(${-phase * 3}deg) translate(-50%, -50%)`,
            left: '50%', top: '50%',
          }}
        />
      </div>

      {/* MAIN CONTENT — All within 100vh */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* LEFT: Text Story */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-5 lg:space-y-6">
            
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-bold"
              style={{
                color: mood.accent,
                opacity: phase > 0 ? 0.5 : 0,
                transform: `translateY(${phase > 0 ? 0 : 20}px)`,
                transition: 'all 0.8s ease-out',
              }}
            >
              The Story Begins
            </p>

            <div className="space-y-0">
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  fontWeight: 700,
                  lineHeight: 0.9,
                  color: mood.accent,
                  opacity: phase > 1 ? 1 : 0,
                  transform: `translateY(${phase > 1 ? 0 : 50}px) scale(${phase > 1 ? 1 : 0.9})`,
                  transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                MEET
              </h1>
              <h2
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  color: mood.accent,
                  opacity: phase > 2 ? 1 : 0,
                  transform: `translateY(${phase > 2 ? 0 : 30}px)`,
                  transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  marginTop: '-0.2em',
                }}
              >
                Daddy Oyoyo
              </h2>
            </div>

            <div
              className="h-[1px] bg-current"
              style={{
                color: mood.accent,
                width: phase > 3 ? '80px' : '0px',
                opacity: 0.3,
                transition: 'width 1s ease-out 0.3s',
              }}
            />

            <p
              className="text-base lg:text-lg max-w-md"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: mood.accent,
                fontWeight: 600,
                lineHeight: 1.7,
                opacity: phase > 5 ? mood.textOp : 0,
                transform: `translateX(${phase > 5 ? 0 : -40}px)`,
                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              Daddy Oyoyo is a Nigerian digital creator and personality known for his relatable, humorous content and entertaining reactions to everyday experiences.
            </p>

            <p
              className="text-base lg:text-lg max-w-md"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: mood.accent,
                fontWeight: 600,
                lineHeight: 1.7,
                opacity: phase > 6 ? mood.textOp * 0.85 : 0,
                transform: `translateX(${phase > 6 ? 0 : -40}px)`,
                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              With a growing community across multiple social platforms, he connects with audiences through content that feels familiar, authentic and genuinely entertaining.
            </p>

            {/* Stats + Quote */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 pt-2"
              style={{
                opacity: phase > 7 ? 1 : 0,
                transform: `translateY(${phase > 7 ? 0 : 30}px)`,
                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <div className="flex gap-8">
                {[
                  { num: '1M+', label: 'Followers' },
                  { num: '500+', label: 'Videos' },
                  { num: 'NG', label: 'Nigeria' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl lg:text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: mood.accent }}>
                      {stat.num}
                    </div>
                    <div className="text-[8px] tracking-[0.3em] uppercase font-bold mt-0.5" style={{ color: mood.accent, opacity: 0.5 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block w-[1px] h-10 bg-current" style={{ color: mood.accent, opacity: 0.2 }} />

              <p
                className="text-sm italic"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: mood.accent,
                  opacity: phase > 8 ? 0.7 : 0,
                  transition: 'opacity 1s ease 0.5s',
                }}
              >
                "Making people laugh is connection."
              </p>
            </div>
          </div>

          {/* RIGHT: The Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center items-center" style={{ perspective: '1000px' }}>
            <div
              className="relative overflow-hidden"
              style={{
                width: 'clamp(220px, 32vw, 400px)',
                height: 'clamp(280px, 40vw, 500px)',
                borderRadius: borderRadius,
                transform: `scale(${imageScale}) rotateY(${imageRotate}deg)`,
                filter: `blur(${imageBlur}px)`,
                boxShadow: `0 30px 60px -15px ${mood.glow}, 0 0 0 1px ${mood.accent}18`,
                opacity: phase > 2 ? 1 : 0,
                transition: 'border-radius 1.2s ease-out, box-shadow 1s ease, opacity 1s ease',
              }}
            >
              <img
                src={aboutImage}
                alt="Daddy Oyoyo"
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${1.15 - phase * 0.015})`,
                  transition: 'transform 0.5s ease-out',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, transparent 30%, ${mood.bg}95 100%)`,
                  transition: 'background 1s ease',
                }}
              />
            </div>

            {/* Vertical caption */}
            <div
              className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 hidden lg:block"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: `translateY(-50%) translateX(${phase > 4 ? 0 : 30}px)`,
                opacity: phase > 4 ? 0.4 : 0,
                transition: 'all 1s ease-out',
              }}
            >
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: mood.accent }}>
                The Man Behind The Laughs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom signature */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4"
        style={{
          opacity: phase > 9 ? 0.5 : 0,
          transition: 'opacity 1.5s ease',
        }}
      >
        <div className="h-[1px] w-10 bg-current" style={{ color: mood.accent }} />
        <span className="text-[9px] tracking-[0.4em] uppercase font-bold" style={{ color: mood.accent }}>
          Daddy Oyoyo
        </span>
        <div className="h-[1px] w-10 bg-current" style={{ color: mood.accent }} />
      </div>
    </div>
  )
}

export default About