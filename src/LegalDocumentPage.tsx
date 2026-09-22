import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react'
import legalData from './legalDocuments'
import { openCookiePreferences } from './cookiePreferences'
import './InformationPages.css'

interface LegalDocumentPageProps {
  slug: string
  asset: (path: string) => string
  onNavigateHome: (event: MouseEvent<HTMLAnchorElement>, id: string) => void
}

export default function LegalDocumentPage({ slug, asset, onNavigateHome }: LegalDocumentPageProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const legalDocument = legalData.documents.find((item) => item.slug === slug) ?? legalData.documents[0]
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
    headingRef.current?.focus({ preventScroll: true })
    const resetFrame = window.requestAnimationFrame(() => window.scrollTo(0, 0))
    return () => window.cancelAnimationFrame(resetFrame)
  }, [slug])
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

  return <div className="site-shell legal-page">
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="site-header site-header--scrolled">
      <a className="brand" href="#top" aria-label="MakeITaplan home" onClick={(event) => onNavigateHome(event, 'top')}><img src={asset('makeitaplan-logo.png')} alt="MakeITaplan" /></a>
      <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
        <a href="#services" onClick={(event) => onNavigateHome(event, 'services')}>Services</a><a href="#approach" onClick={(event) => onNavigateHome(event, 'approach')}>Why us</a><a href="#reviews" onClick={(event) => onNavigateHome(event, 'reviews')}>Client stories</a><a href="#partners" onClick={(event) => onNavigateHome(event, 'partners')}>CRM partner</a><a href="#faq" onClick={(event) => onNavigateHome(event, 'faq')}>FAQs</a><a href="#legal" onClick={(event) => onNavigateHome(event, 'legal')}>Legal</a>
        <a className="nav__cta" href="#/contact">Start a conversation <ArrowRight size={17}/></a>
      </nav>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <main id="main-content" tabIndex={-1}>
      <section className="document-hero"><a href="#legal" onClick={(event) => onNavigateHome(event, 'legal')}><ArrowLeft size={17}/> Back to legal policies</a><span>Legal document</span><h1 ref={headingRef} tabIndex={-1}>{legalDocument.title}</h1><p>MakeITaplan’s published policy and terms.</p></section>
      <div className="document-layout">
        <aside><span>Legal policies</span>{legalData.documents.map((item) => <a className={item.slug === legalDocument.slug ? 'active' : ''} href={`#/legal/${item.slug}`} key={item.slug}>{item.title}</a>)}</aside>
        <article className="legal-document" dangerouslySetInnerHTML={{ __html: legalDocument.html }}/>
      </div>
    </main>
    <footer className="footer"><a className="brand" href="#top" onClick={(event) => onNavigateHome(event, 'top')}><img src={asset('makeitaplan-logo.png')} alt="MakeITaplan"/></a><p>Makeitaplan Ltd 47 Brook Road, Horsham, West Sussex RH12 5FS</p><p>© {new Date().getFullYear()} MakeITaplan Ltd. Registered no. 09012027</p><div className="footer__links"><a href="#faq" onClick={(event) => onNavigateHome(event, 'faq')}>FAQs</a><a href="#legal" onClick={(event) => onNavigateHome(event, 'legal')}>Legal</a><button type="button" className="cookie-settings-link" onClick={openCookiePreferences}>Cookie settings</button><a href="https://www.linkedin.com/company/makeitaplan/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></footer>
  </div>
}
