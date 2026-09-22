import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { ArrowRight, ArrowUp, BarChart3, Check, Database, GraduationCap, Headphones, Menu, Quote, Settings2, ShieldCheck, Sparkles, Star, X } from 'lucide-react'
import reviewData from './reviews.json'
import MainInformationSections from './MainInformationSections'
import LegalDocumentPage from './LegalDocumentPage'
import ContactFormPage from './ContactFormPage'
import { openCookiePreferences } from './cookiePreferences'
import './App.css'

const services = [
  { icon: Database, title: 'CRM implementation', text: 'Practical guidance from discovery and data migration through to a confident launch.' },
  { icon: GraduationCap, title: 'Training that sticks', text: 'Engaging remote and in-person training shaped around your team and real workflows.' },
  { icon: Settings2, title: 'Data & administration', text: 'Reliable database administration, data cleansing, Gift Aid and process improvements.' },
  { icon: BarChart3, title: 'Reporting & insight', text: 'Clear reporting, SSRS expertise and useful dashboards that support better decisions.' },
  { icon: Headphones, title: 'Technical support', text: 'Friendly, responsive support from people who understand charities and their systems.' },
  { icon: ShieldCheck, title: 'Project delivery', text: 'Calm, experienced project management that keeps complex change moving forward.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [route, setRoute] = useState(window.location.hash)
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 80)
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])
  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])
  useEffect(() => {
    if (!menuOpen) return
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeMenu)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeMenu)
    }
  }, [menuOpen])
  const scrollAndFocus = (id: string) => {
    const target = document.getElementById(id)
    target?.scrollIntoView({ behavior: 'smooth' })
    target?.setAttribute('tabindex', '-1')
    target?.focus({ preventScroll: true })
  }
  const returnToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    window.history.pushState(null, '', `#${id}`)
    setRoute(`#${id}`)
    window.setTimeout(() => scrollAndFocus(id), 100)
  }

  const legalSlug = route.match(/^#\/legal\/(.+)$/)?.[1]
  if (legalSlug) return <LegalDocumentPage slug={legalSlug} asset={asset} onNavigateHome={returnToSection} />
  if (route === '#/contact') return <ContactFormPage asset={asset} onNavigateHome={returnToSection} />

  const refreshed = new Date(reviewData.updatedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    window.history.pushState(null, '', `#${id}`)
    scrollAndFocus(id)
    setMenuOpen(false)
  }

  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className={isScrolled ? 'site-header site-header--scrolled' : 'site-header'}>
      <a className="brand" href="#top" aria-label="MakeITaplan home" onClick={(event) => navigateToSection(event, 'top')}><img src={asset('makeitaplan-logo.png')} alt="MakeITaplan" /></a>
      <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
        <a href="#services" onClick={(event) => navigateToSection(event, 'services')}>Services</a><a href="#approach" onClick={(event) => navigateToSection(event, 'approach')}>Why us</a><a href="#reviews" onClick={(event) => navigateToSection(event, 'reviews')}>Client stories</a><a href="#partners" onClick={(event) => navigateToSection(event, 'partners')}>CRM partner</a><a href="#faq" onClick={(event) => navigateToSection(event, 'faq')}>FAQs</a><a href="#legal" onClick={(event) => navigateToSection(event, 'legal')}>Legal</a>
        <a className="nav__cta" href="#/contact">Start a conversation <ArrowRight size={17}/></a>
      </nav>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top"><div className="hero__shade"/><div className="hero__content">
        <span className="eyebrow eyebrow--light"><Sparkles size={16}/> Charity technology, made human</span>
        <h1>The missing piece for your charity.</h1><p>Expert CRM implementation, migration and training that helps your people do more of the work that matters.</p>
        <div className="hero__actions"><a className="button button--primary" href="#/contact">Plan your next step <ArrowRight size={18}/></a><a className="button button--ghost" href="#services" onClick={(event) => navigateToSection(event, 'services')}>Explore our services</a></div>
      </div><div className="hero__proof"><div><strong>10+</strong><span>years established</span></div><div><strong>30+</strong><span>years' experience</span></div><div><strong>5.0</strong><span>Beacon rating</span></div></div></section>

      <section className="intro section"><div><span className="eyebrow">Consultancy with purpose</span><h2>Technology should make your mission easier, not get in its way.</h2></div><p>We bring technical know-how, charity sector experience and patient support together. The result is a system your team understands, trusts and actually wants to use.</p></section>

      <section className="services section" id="services"><div className="section-heading"><div><span className="eyebrow">What we do</span><h2>Support for every stage of change.</h2></div><p>From first questions to long-term support, we meet your team where they are.</p></div><div className="service-grid">
        {services.map(({icon:Icon,title,text},i)=><article className="service" key={title}><span className="service__number">0{i+1}</span><Icon className="service__icon" size={27}/><h3>{title}</h3><p>{text}</p><a href="#/contact">Talk to an expert <ArrowRight size={16}/></a></article>)}
      </div></section>

      <section className="approach" id="approach"><div className="approach__image" role="img" aria-label="The final piece being placed into a jigsaw puzzle"/><div className="approach__content"><span className="eyebrow eyebrow--light">The MakeITaplan difference</span><h2>Clear thinking. Careful delivery. No unnecessary complexity.</h2><p>We translate technical decisions into plain English and build a plan around your people, your goals and your capacity.</p><ul><li><Check/>A CRM that fits the way your charity works</li><li><Check/>Clean, trustworthy data your team can use</li><li><Check/>Confident people, not just new software</li></ul><a className="button button--light" href="#/contact">Meet your consultancy partner <ArrowRight size={18}/></a></div></section>

      <section className="reviews section" id="reviews"><div className="reviews__heading"><div><span className="eyebrow">In our clients' words</span><h2>Partnerships people recommend.</h2></div><div className="rating"><div role="img" aria-label="5 out of 5 stars">{[1,2,3,4,5].map(n=><Star key={n} size={18} fill="currentColor" aria-hidden="true"/>)}</div><strong>{reviewData.rating} from {reviewData.total} verified reviews</strong><span>Live from Beacon · refreshed {refreshed}</span></div></div><div className="review-grid">
        {reviewData.reviews.slice(0,3).map(review=><figure className="review" key={`${review.author}-${review.date}`}><Quote className="review__quote" aria-hidden="true"/><div className="review__stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{review.quote}”</blockquote><figcaption><strong>{review.author}</strong><span>{review.title} · {review.date}</span></figcaption></figure>)}
      </div><a className="beacon-link" href={reviewData.source} target="_blank" rel="noopener noreferrer">Read all verified reviews on Beacon <ArrowRight size={17}/></a></section>

      <section className="partners section" id="partners"><div><span className="eyebrow">Certified CRM partner</span><h2>Platform expertise. Independent advice.</h2><p>We know the tools, but start with your needs. Our certified Beacon partnership means informed guidance and a smoother implementation.</p></div><div className="partner-logos"><a href="https://partners.beaconcrm.org/makeitaplan" target="_blank" rel="noopener noreferrer"><img src={asset('beacon-partner.webp')} alt="Beacon certified partner" width="840" height="288" loading="lazy" decoding="async"/></a></div></section>

      <section className="contact" id="plan"><div><span className="eyebrow eyebrow--light">Ready when you are</span><h2>Let’s make a plan that works.</h2><p>Tell us what you’re trying to achieve. We’ll help you find the clearest next step.</p></div><div className="contact__actions"><a href="#/contact">Start a conversation <ArrowRight size={19}/></a></div></section>

      <MainInformationSections />

      <section className="contact" id="contact"><div><span className="eyebrow eyebrow--light">Ready when you are</span><h2>Let’s make a plan that works.</h2><p>Tell us what you’re trying to achieve. We’ll help you find the clearest next step.</p></div><div className="contact__actions"><a href="#/contact">Start a conversation <ArrowRight size={19}/></a></div></section>
    </main>
    <a className={isScrolled ? 'back-to-top back-to-top--visible' : 'back-to-top'} href="#top" aria-label="Back to top" title="Back to top" onClick={(event) => navigateToSection(event, 'top')}><ArrowUp size={22}/></a>
    <footer className="footer"><a className="brand" href="#top" onClick={(event) => navigateToSection(event, 'top')}><img src={asset('makeitaplan-logo.png')} alt="MakeITaplan"/></a><p>Makeitaplan Ltd 47 Brook Road, Horsham, West Sussex RH12 5FS</p><p>© {new Date().getFullYear()} MakeITaplan Ltd. Registered no. 09012027</p><div className="footer__links"><a href="#faq" onClick={(event) => navigateToSection(event, 'faq')}>FAQs</a><a href="#legal" onClick={(event) => navigateToSection(event, 'legal')}>Legal</a><button type="button" className="cookie-settings-link" onClick={openCookiePreferences}>Cookie settings</button><a href="https://www.linkedin.com/company/makeitaplan/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></footer>
  </div>
}
export default App
