<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Quick Inquiry Section -->
    <QuickInquirySection />
    
    <!-- Featured Products Section -->
    <FeaturedProductsSection />
    
    <!-- Popular Categories Section -->
    <PopularCategoriesSection />
    
    <!-- Trusted Brands Section -->
    <TrustedBrandsSection />
    
    <!-- Why Choose Us Section -->
    <WhyChooseUsSection />
  </div>
</template>

<script setup lang="ts">
import type { SEOMeta } from '~/types'

const { t } = useI18n()

// SEO Meta
const seoMeta: SEOMeta = {
  title: t('home.title'),
  description: t('home.subtitle'),
  keywords: 'auto parts, car parts, automotive, spare parts, inquiry, quotation, OEM, aftermarket',
  type: 'website'
}

// Set page meta
useHead({
  title: seoMeta.title,
  meta: [
    { name: 'description', content: seoMeta.description },
    { name: 'keywords', content: seoMeta.keywords },
    { property: 'og:title', content: seoMeta.title },
    { property: 'og:description', content: seoMeta.description },
    { property: 'og:type', content: seoMeta.type },
    { name: 'twitter:title', content: seoMeta.title },
    { name: 'twitter:description', content: seoMeta.description }
  ]
})

// JSON-LD structured data for homepage
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AutoPartQuote',
  description: seoMeta.description,
  url: 'https://autopartquote.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://autopartquote.com/products?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
})
</script>

<style scoped>
/* Homepage specific styles */
</style>