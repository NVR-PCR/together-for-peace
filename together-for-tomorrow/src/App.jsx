import { useEffect, useState } from 'react'
import './App.css'

// SVG Icon Components
const SvgIcon = ({ name, className = "", width = 24, height = 24 }) => {
  const icons = {
    olive: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20 C9 13 14 8 21 4"/><path d="M9 14 C6 13.5 4.5 11 5.5 8.5 C8 9 9.5 11.5 9 14 Z" fill="currentColor" stroke="none"/><path d="M13 10 C10.5 9 9.5 6.5 10.5 4 C13 4.5 14 7 13 10 Z" fill="currentColor" stroke="none"/><path d="M16.5 7 C16 9.5 17 12 19.5 12.5 C20 10 19 7.5 16.5 7 Z" fill="currentColor" stroke="none"/><circle cx="7" cy="16.5" r="1.4" fill="currentColor" stroke="none"/></g>,
    globe: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9z"/></g>,
    leaf: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 C5 9 12 4 20 4 C20 12 15 19 5 19 Z"/><path d="M5 19 C8 14 12 10 16 8"/></g>,
    users: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7.5" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 5.8M17.5 14.6c2 .9 3.5 2.8 3.5 5.4"/></g>,
    heart: <path d="M12 20.5C7.2 16.6 3.5 13.4 3.5 9.3 3.5 6.7 5.5 4.5 8 4.5c1.6 0 3.1.9 4 2.3.9-1.4 2.4-2.3 4-2.3 2.5 0 4.5 2.2 4.5 4.8 0 4.1-3.7 7.3-8.5 11.2z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>,
    bulb: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 3.6 10.8c-.7.6-1.1 1.3-1.3 2.2h-4.6c-.2-.9-.6-1.6-1.3-2.2A6 6 0 0 1 12 3z"/></g>,
    book: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></g>,
    dice: <g fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.7" cy="8.7" r="1.4" fill="currentColor" stroke="none"/><circle cx="15.3" cy="8.7" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="8.7" cy="15.3" r="1.4" fill="currentColor" stroke="none"/><circle cx="15.3" cy="15.3" r="1.4" fill="currentColor" stroke="none"/></g>,
    chart: <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 20h16"/><path d="M7 20v-6M12 20V8M17 20v-9"/></g>,
    trophy: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4"/><path d="M12 13v4M8 21h8M9.5 17h5"/></g>,
    medal: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5"/><path d="M9 13.2 7 21l5-2.8L17 21l-2-7.8"/></g>,
    news: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12v15.5a1.5 1.5 0 0 1-3 0"/><path d="M16 8h3v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4"/><path d="M8 9h5M8 13h5M8 17h3"/></g>,
    mega: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 5 6 9H3v6h3l8 4V5z"/><path d="M18 9a4 4 0 0 1 0 6"/><path d="M7 15.5 8 21h2.5l-1-5.5"/></g>,
    star: <path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>,
    spark: <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="currentColor"/>,
    cal: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/></g>,
    check: <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>,
    arrow: <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>,
    up: <path d="M12 20V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>,
    mail: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 7.5l9 6 9-6"/></g>,
    phone: <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>,
    pin: <g fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></g>,
    clock: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></g>,
    pen: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5l4 4L7 21l-5 1 1-5z"/></g>,
    doc: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9.5 12h5M9.5 16h5"/></g>,
    eye: <g fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></g>,
    flag: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2.5 3.5L16 11H5"/></g>,
    seed: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21v-8"/><path d="M12 13C12 9 9 7 5 7c0 4 3 6 7 6z"/><path d="M12 11c0-3.5 3-5.5 7-5.5 0 3.5-3 5.5-7 5.5z"/></g>,
    hat: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5z"/><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 9v5"/></g>,
    cam: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13" r="3.5"/></g>,
    plus: <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>,
    quote: <path d="M9.5 6C6.5 7.5 5 10 5 13.5c0 2.5 1.5 4 3.4 4 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.7-3 .3-1.8 1.3-3.2 2.8-4.2L9.5 6zm9 0c-3 1.5-4.5 4-4.5 7.5 0 2.5 1.5 4 3.4 4 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.7-3 .3-1.8 1.3-3.2 2.8-4.2L18.5 6z" fill="currentColor"/>,
    info: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/></g>,
    share: <g fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="12" r="2.5"/><circle cx="17.5" cy="5.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/><path d="M8.3 10.8l7-4M8.3 13.2l7 4"/></g>,
  }
  
  return (
    <svg className={className} viewBox="0 0 24 24" width={width} height={height} aria-hidden="true">
      {icons[name] || null}
    </svg>
  )
}

// Logo Mark Component
const LogoMark = () => (
  <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
    <rect x="2" y="2" width="44" height="44" rx="14" fill="#21409A"/>
    <path d="M13.5 34 C18 26 24 19 34.5 13.5" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
    <path d="M20.5 26.5 C17.5 25.5 16 22.5 17 19.5 C20 20.5 21.5 23.5 20.5 26.5 Z" fill="#fff"/>
    <path d="M26 21 C23.5 19 23 15.8 25 13.2 C27.5 15 28 18.4 26 21 Z" fill="#F4C542"/>
    <path d="M30.5 16 C30.8 19 33 21 36 20.8 C35.5 17.8 33.4 15.9 30.5 16 Z" fill="#fff"/>
    <circle cx="17.5" cy="30.5" r="2.3" fill="#F4C542"/>
  </svg>
)

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'programme', 'projects', 'competitions', 'roadmap', 'gallery', 'testimonials', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#programme', label: 'Programme' },
    { href: '#projects', label: 'Projects' },
    { href: '#competitions', label: 'Competitions' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="nav" aria-label="Main navigation">
      <div className="nav-inner">
        <a className="brand" href="#home" aria-label="Together for Tomorrow — home">
          <LogoMark />
          <span className="brand-name">Together <em>for</em> Tomorrow<span className="brand-sub">Inspiring Minds · Building Peace</span></span>
        </a>
        <button 
          className="burger" 
          id="burger" 
          aria-expanded={mobileMenuOpen} 
          aria-controls="navLinks" 
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="navLinks">
          {navLinks.map(link => (
            <a 
              key={link.href} 
              href={link.href}
              className={activeSection === link.href.slice(1) ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setMobileMenuOpen(false)}>Join the Initiative</a>
        </div>
      </div>
    </nav>
  )
}

// Hero Section Component
const HeroSection = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0])
  const targets = [40, 3, 4, 2, 1]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const duration = 1400
            const startTime = performance.now()
            
            const animate = (currentTime) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const ease = 1 - Math.pow(1 - progress, 3)
              
              setCounts(targets.map(target => Math.round(target * ease)))
              
              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }
            
            requestAnimationFrame(animate)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.6 }
    )

    const statsElement = document.querySelector('.stats')
    if (statsElement) observer.observe(statsElement)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero" id="home">
      <span className="deco" style={{top:'12%',left:'3%',width:'34px',height:'34px',color:'var(--lav)'}} aria-hidden="true">
        <SvgIcon name="spark" width={34} height={34} />
      </span>
      <span className="deco" style={{top:'58%',left:'1.5%',width:'26px',height:'26px',color:'var(--green)',animationDelay:'1.4s'}} aria-hidden="true">
        <SvgIcon name="leaf" width={26} height={26} />
      </span>
      <span className="deco" style={{top:'16%',right:'2.5%',width:'28px',height:'28px',color:'var(--gold-700)',animationDelay:'0.8s'}} aria-hidden="true">
        <SvgIcon name="spark" width={28} height={28} />
      </span>
      <div className="container">
        <div className="hero-grid">
          <div data-reveal="left">
            <span className="hero-badge">
              <LogoMark /> Navrachana Higher Secondary School · Sama
            </span>
            <h1>
              Together<br />
              for <span className="hl">Tomorrow
                <svg viewBox="0 0 220 22" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M6 16 C60 5 160 5 214 12" />
                </svg>
              </span>
            </h1>
            <p className="hero-tag">
              <span className="tm1">Inspiring Minds</span>
              <span className="tdot">.</span>{' '}
              <span className="tm2">Building Peace</span>
              <span className="tdot">.</span>
            </p>
            <p className="hero-copy">
              Together for Tomorrow is the Peace Education initiative of Navrachana Higher Secondary School, Sama. Through experiential learning, collaborative projects and creative expression, students explore peace, global citizenship and sustainable development while developing empathy, leadership and lifelong values.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">
                Join the Initiative <SvgIcon name="arrow" />
              </a>
              <a className="btn btn-ghost" href="#programme">
                Explore the Programme <SvgIcon name="arrow" />
              </a>
            </div>
            <div className="hero-meta" aria-label="Programme highlights">
              <span><i style={{background:'var(--blue)'}}></i>3 Workshops</span>
              <span><i style={{background:'var(--green)'}}></i>4 Learning Projects</span>
              <span><i style={{background:'var(--gold)'}}></i>2 Competitions</span>
              <span><i style={{background:'var(--lav)'}}></i>1 Showcase</span>
            </div>
          </div>
          <div className="hero-art-wrap" data-reveal="right" style={{'--d':'0.15s'}}>
            {/* Simplified hero illustration */}
            <svg className="hero-art" viewBox="0 0 560 480" role="img" aria-labelledby="heroArtT">
              <title id="heroArtT">Illustration of students collaborating around a table, with a dove, speech bubbles and celebration bunting</title>
              <circle cx="285" cy="235" r="200" fill="#DCEEFB"/>
              <circle cx="285" cy="235" r="222" fill="none" stroke="#21409A" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="3 11" strokeLinecap="round"/>
              <ellipse cx="285" cy="428" rx="240" ry="32" fill="#DDF0E3"/>
              {/* Students at table */}
              <g>
                <circle cx="190" cy="246" r="23" fill="#C68B59"/>
                <rect x="161" y="266" width="58" height="66" rx="27" fill="#2E8B57"/>
              </g>
              <g>
                <circle cx="280" cy="232" r="25" fill="#F1C39B"/>
                <rect x="249" y="254" width="62" height="72" rx="29" fill="#21409A"/>
              </g>
              <g>
                <circle cx="370" cy="246" r="23" fill="#9C6644"/>
                <rect x="341" y="266" width="58" height="66" rx="27" fill="#F4C542"/>
              </g>
              {/* Table */}
              <ellipse cx="285" cy="332" rx="152" ry="24" fill="#FFFFFF" stroke="#D9E4F6" strokeWidth="2"/>
            </svg>
          </div>
        </div>

        {/* Animated stats */}
        <div className="stats" data-reveal="pop" style={{'--d':'0.25s'}} role="list" aria-label="Programme at a glance">
          <div className="stat" role="listitem"><b>{counts[0]}+</b><span>Student Participants</span></div>
          <div className="stat" role="listitem"><b>{counts[1]}</b><span>Core Workshops</span></div>
          <div className="stat" role="listitem"><b>{counts[2]}</b><span>Learning Projects</span></div>
          <div className="stat" role="listitem"><b>{counts[3]}</b><span>Competitions</span></div>
          <div className="stat" role="listitem"><b>{counts[4]}</b><span>Culmination Event</span></div>
        </div>
      </div>
    </section>
  )
}

// About Section Component
const AboutSection = () => (
  <section className="about" id="about">
    <div className="container">
      <div className="about-grid">
        <div className="about-art" data-reveal="left">
          <svg viewBox="0 0 480 430" role="img" aria-labelledby="aboutArtT">
            <title id="aboutArtT">Illustration of a sapling growing from an open book, with a dove and a globe</title>
            <circle cx="240" cy="215" r="185" fill="#E7E0F7"/>
            <circle cx="240" cy="215" r="205" fill="none" stroke="#6F5BB5" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="3 11" strokeLinecap="round"/>
            <g transform="translate(240,318)">
              <path d="M-118 8 C-70 -6 -20 -6 0 4 C20 -6 70 -6 118 8 L118 26 C70 12 20 12 0 22 C-20 12 -70 12 -118 26 Z" fill="#21409A"/>
              <path d="M-112 2 C-68 -10 -22 -10 0 0 L0 16 C-22 6 -68 6 -112 18 Z" fill="#fff" stroke="#D9E4F6" strokeWidth="1.5"/>
              <path d="M112 2 C68 -10 22 -10 0 0 L0 16 C22 6 68 6 112 18 Z" fill="#fff" stroke="#D9E4F6" strokeWidth="1.5"/>
            </g>
            <path d="M240 316 C238 282 242 250 240 208" stroke="#2E8B57" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M239 284 C222 282 210 270 210 254 C226 256 238 268 239 284 Z" fill="#2E8B57"/>
            <path d="M241 260 C258 258 270 246 270 230 C254 232 242 244 241 260 Z" fill="#3FA46C"/>
            <path d="M240 238 C226 236 216 226 216 212 C230 214 240 224 240 238 Z" fill="#6FB7E8"/>
            <path d="M241 218 C254 216 262 207 262 195 C250 197 242 206 241 218 Z" fill="#F4C542"/>
          </svg>
        </div>
        <div data-reveal="right">
          <span className="eyebrow"><i className="dot"></i>About the Initiative</span>
          <h2>About <span className="hl">Together for Tomorrow
            <svg viewBox="0 0 220 22" preserveAspectRatio="none" aria-hidden="true">
              <path d="M6 16 C60 5 160 5 214 12" />
            </svg>
          </span></h2>
          <p>Together for Tomorrow is an experiential learning initiative that introduces students to the values of <strong>peace, empathy, cooperation and responsible global citizenship</strong>. Through workshops, classroom activities, projects and competitions, the programme encourages students to become thoughtful individuals who contribute positively to their communities and the world around them.</p>
          <p>Rather than a one-time event, the initiative weaves peace education into the rhythm of the school year — one workshop at a time, one project at a time, one act of kindness at a time.</p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="vm-grid">
        <article className="vm-card" data-reveal style={{'--d':'0.05s'}}>
          <div className="vm-icon" style={{background:'var(--green-100)',color:'var(--green)'}}>
            <SvgIcon name="eye" />
          </div>
          <h3>Our Vision</h3>
          <p>To nurture compassionate, resilient and globally responsible citizens who contribute towards peaceful communities and a sustainable future.</p>
        </article>
        <article className="vm-card mission" data-reveal style={{'--d':'0.15s'}}>
          <div className="vm-icon" style={{background:'var(--sky-100)',color:'var(--blue)'}}>
            <SvgIcon name="flag" />
          </div>
          <h3>Our Mission</h3>
          <p>To integrate peace education into everyday learning through meaningful experiences that inspire kindness, collaboration, critical thinking and responsible action.</p>
        </article>
      </div>
    </div>
  </section>
)

// Pillars Section Component
const PillarsSection = () => {
  const pillars = [
    { num: '01', icon: 'heart', title: 'Peace Education', desc: 'Helping students understand empathy, peaceful communication and conflict resolution.', color: 'pc-blue' },
    { num: '02', icon: 'globe', title: 'Global Citizenship Education', desc: 'Encouraging learners to appreciate diversity and become responsible global citizens.', color: 'pc-green' },
    { num: '03', icon: 'leaf', title: 'Education for Sustainable Development', desc: 'Introducing sustainability through the lens of SDG 4.7 and responsible living.', color: 'pc-gold' },
    { num: '04', icon: 'users', title: 'Student Engagement', desc: 'Learning through collaborative activities, creative projects and reflective experiences.', color: 'pc-lav' },
  ]

  return (
    <section className="pillars" id="pillars">
      <div className="container">
        <div className="sec-head center" data-reveal>
          <span className="eyebrow lav"><i className="dot"></i>What Guides Us</span>
          <h2>Programme Pillars</h2>
          <p>Four interconnected pillars give the initiative its shape — each one feeding into the workshops, projects and competitions across the year.</p>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar, index) => (
            <article key={index} className={`pillar ${pillar.color}`} data-reveal style={{'--d':`${0.05 + index * 0.07}s`}}>
              <span className="num">{pillar.num}</span>
              <div className="p-icon">
                <SvgIcon name={pillar.icon} />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Workshops Section Component
const WorkshopsSection = () => {
  const workshops = [
    { num: '01', icon: 'olive', title: 'Culture of Peace', desc: 'Understanding empathy, peaceful coexistence and positive relationships.', date: '12 August 2026', color: 'ac-blue' },
    { num: '02', icon: 'globe', title: 'Global Citizenship Education', desc: 'Exploring diversity, inclusion and our responsibilities as global citizens.', date: '19 August 2026', color: 'ac-green' },
    { num: '03', icon: 'leaf', title: 'Education for Sustainable Development', desc: 'Understanding sustainability through education and the principles of SDG 4.7.', date: '26 August 2026', color: 'ac-gold' },
  ]

  return (
    <section className="workshops" id="programme">
      <div className="container">
        <div className="sec-head" data-reveal>
          <span className="eyebrow"><i className="dot"></i>The Programme</span>
          <h2>Core Workshops</h2>
          <p>Three workshops, one for each week in August, introduce the ideas that the projects and competitions build upon. All dates are tentative.</p>
        </div>
        <div className="ws-grid">
          {workshops.map((ws, index) => (
            <article key={index} className={`ws-card ${ws.color}`} data-reveal style={{'--d':`${0.05 + index * 0.1}s`}}>
              <div className="ws-top">
                <span className="ws-num">{ws.num}</span>
                <span className="status"><i></i>Upcoming</span>
              </div>
              <div className="ws-icon">
                <SvgIcon name={ws.icon} />
              </div>
              <h3>{ws.title}</h3>
              <p>{ws.desc}</p>
              <div className="ws-date">
                <SvgIcon name="cal" />
                {ws.date} <span className="tag tag-warm">Tentative</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => (
  <footer>
    <div className="container">
      <div className="f-grid">
        <div className="f-brand">
          <a className="brand" href="#home">
            <LogoMark />
            <span className="brand-name">Together <em style={{color:'var(--gold)',fontStyle:'normal'}}>for</em> Tomorrow<span className="brand-sub" style={{color:'#7B90C0'}}>Inspiring Minds · Building Peace</span></span>
          </a>
          <p>The Peace Education initiative of Navrachana Higher Secondary School, Sama — nurturing empathy, global citizenship and sustainable development through experiential learning.</p>
          <div className="f-social">
            <a href="#contact" aria-label="Social media placeholder — Facebook"><SvgIcon name="users" /></a>
            <a href="#contact" aria-label="Social media placeholder — Instagram"><SvgIcon name="cam" /></a>
            <a href="#contact" aria-label="Social media placeholder — YouTube"><SvgIcon name="mega" /></a>
            <a href="#contact" aria-label="Social media placeholder — Share"><SvgIcon name="share" /></a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul className="f-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#programme">Programme</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#competitions">Competitions</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
          </ul>
        </div>
        <div>
          <h4>Programme</h4>
          <ul className="f-links">
            <li><a href="#timeline">Timeline</a></li>
            <li><a href="#publications">Student Publications</a></li>
            <li><a href="#recognition">Recognition</a></li>
            <li><a href="#showcase">Showcase</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="f-news">
          <h4>Newsletter</h4>
          <p>Follow the journey — workshop updates, student articles and showcase news.</p>
          <form data-demo noValidate>
            <input type="email" placeholder="Your email address" aria-label="Email for newsletter" required />
            <button type="submit">Subscribe</button>
          </form>
          <p className="f-note">Demo form — no emails are sent. Social links are placeholders.</p>
        </div>
      </div>
      <div className="f-bottom">
        <span>© 2026 <b>Navrachana Higher Secondary School, Sama</b> · Together for Tomorrow</span>
        <span>Inspiring Minds. Building Peace. 🕊</span>
      </div>
    </div>
  </footer>
)

// Back to Top Button Component
const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button 
      className={`to-top ${visible ? 'show' : ''}`} 
      id="toTop" 
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <SvgIcon name="up" />
    </button>
  )
}

// Progress Bar Component
const ProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className="progress" id="progress" aria-hidden="true" style={{width: `${progress}%`}}></div>
}

function App() {
  return (
    <>
      <a className="skip" href="#home">Skip to content</a>
      <ProgressBar />
      <Navigation />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <PillarsSection />
        <WorkshopsSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
