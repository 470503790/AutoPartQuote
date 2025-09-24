export default defineNuxtPlugin((nuxtApp) => {
  const { $i18n } = nuxtApp

  // Watch for locale changes and update document attributes
  watch(() => $i18n.locale.value, (newLocale) => {
    if (process.client) {
      // Update html lang attribute
      document.documentElement.lang = newLocale
      
      // Update html class for CSS targeting
      document.documentElement.className = document.documentElement.className
        .replace(/lang-\w+/g, '')
      document.documentElement.classList.add(`lang-${newLocale}`)
      
      // Update text direction for RTL languages
      const rtlLanguages = ['ar', 'he', 'fa', 'ur']
      document.documentElement.dir = rtlLanguages.includes(newLocale) ? 'rtl' : 'ltr'
    }
  }, { immediate: true })

  // Helper function to generate hreflang alternates
  const generateHreflangAlternates = (route) => {
    const alternates = []
    const locales = $i18n.locales.value
    
    for (const locale of locales) {
      const localizedRoute = $i18n.switchLocalePath(locale.code, route)
      alternates.push({
        hid: `alternate-hreflang-${locale.code}`,
        rel: 'alternate',
        href: `${$i18n.baseUrl}${localizedRoute}`,
        hreflang: locale.iso
      })
    }
    
    // Add x-default
    const defaultRoute = $i18n.switchLocalePath($i18n.defaultLocale, route)
    alternates.push({
      hid: 'alternate-hreflang-x-default',
      rel: 'alternate',
      href: `${$i18n.baseUrl}${defaultRoute}`,
      hreflang: 'x-default'
    })
    
    return alternates
  }

  // Add to nuxtApp context for use in pages
  nuxtApp.provide('generateHreflangAlternates', generateHreflangAlternates)
})