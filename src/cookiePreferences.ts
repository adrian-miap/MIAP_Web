export const cookiePreferencesEvent = 'miap:open-cookie-preferences'

export const openCookiePreferences = () => window.dispatchEvent(new Event(cookiePreferencesEvent))
