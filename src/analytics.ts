const googleAnalyticsId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? '').trim()
const clarityProjectId = (import.meta.env.VITE_CLARITY_PROJECT_ID ?? '').trim()

interface ClarityFunction {
  (...args: unknown[]): void
  q?: unknown[][]
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: ClarityFunction
  }
}

const validGoogleAnalyticsId = /^G-[A-Z0-9]+$/.test(googleAnalyticsId)
const validClarityProjectId = /^[a-z0-9]+$/i.test(clarityProjectId)

const appendScript = (id: string, source: string) => {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = source
  document.head.appendChild(script)
}

const setGoogleDisabled = (disabled: boolean) => {
  if (!validGoogleAnalyticsId) return
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${googleAnalyticsId}`] = disabled
}

const deleteCookie = (name: string) => {
  const hostname = window.location.hostname
  const domains = ['', hostname, `.${hostname}`]
  for (const domain of domains) {
    const domainPart = domain ? `; domain=${domain}` : ''
    document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`
  }
}

const clearAnalyticsCookies = () => {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim()
    if (name && (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat' || name === '_clck' || name === '_clsk')) {
      deleteCookie(name)
    }
  }
}

const configureGoogleAnalytics = (marketing: boolean) => {
  if (!validGoogleAnalyticsId) return
  setGoogleDisabled(false)
  window.dataLayer ??= []
  window.gtag ??= (...args: unknown[]) => window.dataLayer?.push(args)
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', googleAnalyticsId, { anonymize_ip: true })
  appendScript('google-analytics', `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`)
}

const configureClarity = (marketing: boolean) => {
  if (!validClarityProjectId) return
  if (!window.clarity) {
    const clarity: ClarityFunction = (...args: unknown[]) => {
      clarity.q ??= []
      clarity.q.push(args)
    }
    window.clarity = clarity
  }
  window.clarity('consentv2', {
    analytics_Storage: 'granted',
    ad_Storage: marketing ? 'granted' : 'denied',
  })
  appendScript('microsoft-clarity', `https://www.clarity.ms/tag/${encodeURIComponent(clarityProjectId)}`)
}

export const applyAnalyticsConsent = (analytics: boolean, marketing: boolean) => {
  if (analytics) {
    configureGoogleAnalytics(marketing)
    configureClarity(marketing)
    return
  }

  setGoogleDisabled(true)
  window.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.clarity?.('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' })
  clearAnalyticsCookies()
}
