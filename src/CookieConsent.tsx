import { useEffect, useRef, useState } from 'react'
import { Cookie, Settings2, X } from 'lucide-react'
import { applyAnalyticsConsent } from './analytics'
import { cookiePreferencesEvent } from './cookiePreferences'
import './CookieConsent.css'

const storageKey = 'miap-cookie-consent-v1'

interface ConsentPreferences {
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

type ConsentView = 'hidden' | 'banner' | 'preferences'

const readConsent = (): ConsentPreferences | null => {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return null
    const preferences = JSON.parse(saved) as Partial<ConsentPreferences>
    return {
      necessary: true,
      analytics: preferences.analytics === true,
      marketing: preferences.marketing === true,
      updatedAt: typeof preferences.updatedAt === 'string' ? preferences.updatedAt : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

const saveConsent = (analytics: boolean, marketing: boolean) => {
  const preferences: ConsentPreferences = {
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  }

  try {
    localStorage.setItem(storageKey, JSON.stringify(preferences))
  } catch {
    // Consent remains valid for this page view if storage is unavailable.
  }

  window.dispatchEvent(new CustomEvent('miap:consent-changed', { detail: preferences }))
}

export default function CookieConsent() {
  const [initialConsent] = useState(readConsent)
  const [view, setView] = useState<ConsentView>(initialConsent ? 'hidden' : 'banner')
  const [analytics, setAnalytics] = useState(initialConsent?.analytics ?? false)
  const [marketing, setMarketing] = useState(initialConsent?.marketing ?? false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialConsent) applyAnalyticsConsent(initialConsent.analytics, initialConsent.marketing)
  }, [initialConsent])

  useEffect(() => {
    const openPreferences = () => setView('preferences')
    window.addEventListener(cookiePreferencesEvent, openPreferences)
    return () => window.removeEventListener(cookiePreferencesEvent, openPreferences)
  }, [])

  useEffect(() => {
    if (view !== 'preferences') return
    const previousFocus = document.activeElement as HTMLElement | null
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setView('hidden')
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
      previousFocus?.focus()
    }
  }, [view])

  const choose = (allowAnalytics: boolean, allowMarketing: boolean) => {
    setAnalytics(allowAnalytics)
    setMarketing(allowMarketing)
    saveConsent(allowAnalytics, allowMarketing)
    applyAnalyticsConsent(allowAnalytics, allowMarketing)
    setView('hidden')
  }

  if (view === 'hidden') return null

  if (view === 'banner') {
    return <section className="cookie-banner" aria-label="Cookie consent" aria-live="polite">
      <div className="cookie-banner__message">
        <Cookie size={24} aria-hidden="true" />
        <div><h2>Your privacy choices</h2><p>We use cookies to improve your experience and understand how our website is used. You can accept all cookies, reject non-essential cookies, or manage your preferences. <a href="#/legal/cookie-policy">Read our Cookie Policy</a>.</p></div>
      </div>
      <div className="cookie-banner__actions">
        <button type="button" className="cookie-button cookie-button--secondary" onClick={() => choose(false, false)}>Reject non-essential</button>
        <button type="button" className="cookie-button cookie-button--secondary" onClick={() => setView('preferences')}><Settings2 size={17} /> Manage preferences</button>
        <button type="button" className="cookie-button cookie-button--primary" onClick={() => choose(true, true)}>Accept all</button>
      </div>
    </section>
  }

  return <div className="cookie-modal" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) setView('hidden')
  }}>
    <div className="cookie-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title" tabIndex={-1}>
      <button type="button" className="cookie-dialog__close" aria-label="Close cookie preferences" onClick={() => setView('hidden')}><X /></button>
      <span className="cookie-dialog__eyebrow"><Cookie size={17} /> Privacy preferences</span>
      <h2 id="cookie-dialog-title">Manage cookie preferences</h2>
      <p>Choose which optional cookies you allow. Necessary cookies and storage support core website functions and cannot be switched off.</p>
      <div className="cookie-options">
        <label className="cookie-option cookie-option--locked"><span><strong>Necessary</strong><small>Required for security and remembering your privacy choice.</small></span><input type="checkbox" checked disabled aria-label="Necessary cookies always enabled" /></label>
        <label className="cookie-option"><span><strong>Analytics</strong><small>Helps us understand website use so we can improve it.</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
        <label className="cookie-option"><span><strong>Marketing</strong><small>Allows relevant campaign measurement and advertising features.</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} /></label>
      </div>
      <a className="cookie-policy-link" href="#/legal/cookie-policy" onClick={() => setView('hidden')}>View the full Cookie Policy</a>
      <div className="cookie-dialog__actions">
        <button type="button" className="cookie-button cookie-button--secondary" onClick={() => choose(false, false)}>Reject non-essential</button>
        <button type="button" className="cookie-button cookie-button--primary" onClick={() => choose(analytics, marketing)}>Save preferences</button>
      </div>
    </div>
  </div>
}
