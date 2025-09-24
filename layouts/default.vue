<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Loading Overlay -->
    <LoadingOverlay v-if="$fetchState.pending" />
    
    <!-- Toast Notifications -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
// SEO and meta tags
useHead({
  htmlAttrs: {
    lang: () => useNuxtApp().$i18n.locale.value
  }
})

// JSON-LD structured data for homepage
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AutoPartQuote',
  description: 'Professional auto parts inquiry and quotation system',
  url: 'https://autopartquote.com',
  logo: 'https://autopartquote.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-0123',
    contactType: 'customer service',
    availableLanguage: ['English', 'Chinese', 'Spanish']
  },
  sameAs: [
    'https://www.facebook.com/autopartquote',
    'https://www.twitter.com/autopartquote',
    'https://www.linkedin.com/company/autopartquote'
  ]
})
</script>

<style scoped>
/* Scoped styles for layout */
</style>