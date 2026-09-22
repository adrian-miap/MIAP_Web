import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { ArrowLeft, ArrowRight, Mail, Menu, Phone, X } from 'lucide-react'
import { openCookiePreferences } from './cookiePreferences'
import './ContactFormPage.css'

const beaconSdkId = 'beacon-js-sdk'
const beaconSdkSource = 'https://static.beaconproducts.co.uk/js-sdk/production/beaconcrm.min.js'

interface ContactFormPageProps {
  asset: (path: string) => string
  onNavigateHome: (event: MouseEvent<HTMLAnchorElement>, id: string) => void
}

export default function ContactFormPage({ asset, onNavigateHome }: ContactFormPageProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [formError, setFormError] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const preventInitialFormScroll = (event: MessageEvent) => {
      if (event.origin === 'https://makeitaplan2.beaconforms.com' && event.data?.type === 'scroll_to') {
        event.stopImmediatePropagation()
      }
    }
    window.addEventListener('message', preventInitialFormScroll, true)
    const scrollGuard = window.setTimeout(() => {
      window.removeEventListener('message', preventInitialFormScroll, true)
    }, 2500)

    const form = formRef.current
    if (!form) return () => {
      window.clearTimeout(scrollGuard)
      window.removeEventListener('message', preventInitialFormScroll, true)
    }

    const detectForm = () => setFormLoaded(Boolean(form.querySelector('iframe')))
    const observer = new MutationObserver(detectForm)
    observer.observe(form, { childList: true, subtree: true })
    detectForm()

    let script = document.getElementById(beaconSdkId) as HTMLScriptElement | null
    const handleError = () => setFormError(true)
    if (!script) {
      script = document.createElement('script')
      script.id = beaconSdkId
      script.src = beaconSdkSource
      script.async = true
      document.head.appendChild(script)
    }
    script.addEventListener('error', handleError)

    return () => {
      window.clearTimeout(scrollGuard)
      window.removeEventListener('message', preventInitialFormScroll, true)
      observer.disconnect()
      script?.removeEventListener('error', handleError)
    }
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

  return <div className="site-shell contact-page">
    <a className="skip-link" href="#contact-form">Skip to contact form</a>
    <header className="site-header site-header--scrolled">
      <a className="brand" href="#top" aria-label="MakeITaplan home" onClick={(event) => onNavigateHome(event, 'top')}><img src={asset('makeitaplan-logo.png')} alt="MakeITaplan" /></a>
      <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
        <a href="#services" onClick={(event) => onNavigateHome(event, 'services')}>Services</a><a href="#approach" onClick={(event) => onNavigateHome(event, 'approach')}>Why us</a><a href="#reviews" onClick={(event) => onNavigateHome(event, 'reviews')}>Client stories</a><a href="#partners" onClick={(event) => onNavigateHome(event, 'partners')}>CRM partner</a><a href="#faq" onClick={(event) => onNavigateHome(event, 'faq')}>FAQs</a><a href="#legal" onClick={(event) => onNavigateHome(event, 'legal')}>Legal</a>
        <a className="nav__cta" href="#/contact">Start a conversation <ArrowRight size={17}/></a>
      </nav>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main id="contact-form" tabIndex={-1}>
      <section className="contact-page__hero">
        <a href="#top" onClick={(event) => onNavigateHome(event, 'top')}><ArrowLeft size={17}/> Back to home</a>
        <span>Start a conversation</span>
        <h1 ref={headingRef} tabIndex={-1}>Tell us what you’re planning.</h1>
        <p>Share a little about your charity, your systems and where you need support. We’ll get back to you with a clear next step.</p>
      </section>
      <section className="contact-form-layout">
        <aside>
          <span className="eyebrow">Contact MakeITaplan</span>
          <h2>Prefer to talk directly?</h2>
          <p>Our team is available Monday to Friday, 9:00 AM–5:00 PM.</p>
          <a href="mailto:enquiries@makeitaplan.com?subject=Website%20Enquiry"><Mail size={19}/> enquiries@makeitaplan.com</a>
          <a href="tel:+442036579666"><Phone size={19}/> +44 (0) 203 6579 666</a>
        </aside>
        <div className="contact-form-panel">
          {!formLoaded && !formError && <div className="contact-form-status" role="status">Loading secure enquiry form…</div>}
          {formError && <div className="contact-form-error" role="alert"><h2>The form could not load.</h2><p>Please email <a href="mailto:enquiries@makeitaplan.com?subject=Website%20Enquiry">enquiries@makeitaplan.com</a> instead.</p></div>}
          <div ref={formRef} className="beacon-form" data-account="makeitaplan2" data-form="66214a04" />
          <p className="contact-form-note">This form is securely provided by Beacon CRM and uses essential storage to process your enquiry. See our <a href="#/legal/privacy-policy">Privacy Policy</a>.</p>
        </div>
      </section>
    </main>

    <footer className="footer"><a className="brand" href="#top" onClick={(event) => onNavigateHome(event, 'top')}><img src={asset('makeitaplan-logo.png')} alt="MakeITaplan"/></a><p>Makeitaplan Ltd 47 Brook Road, Horsham, West Sussex RH12 5FS</p><p>© {new Date().getFullYear()} MakeITaplan Ltd. Registered no. 09012027</p><div className="footer__links"><a href="#faq" onClick={(event) => onNavigateHome(event, 'faq')}>FAQs</a><a href="#legal" onClick={(event) => onNavigateHome(event, 'legal')}>Legal</a><button type="button" className="cookie-settings-link" onClick={openCookiePreferences}>Cookie settings</button><a href="https://www.linkedin.com/company/makeitaplan/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></footer>
  </div>
}
