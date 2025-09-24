<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">AutoPartQuote</span>
            </NuxtLink>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">{{ $t('nav.home') }}</NuxtLink>
            <NuxtLink to="/products" class="text-gray-600 hover:text-gray-900">{{ $t('nav.products') }}</NuxtLink>
            <NuxtLink to="/inquiry" class="text-gray-600 hover:text-gray-900">{{ $t('nav.inquiry') }}</NuxtLink>
            <NuxtLink to="/batch-inquiry" class="text-gray-600 hover:text-gray-900">{{ $t('nav.batch_inquiry') }}</NuxtLink>
            <NuxtLink to="/about" class="text-gray-600 hover:text-gray-900">{{ $t('nav.about') }}</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-600 hover:text-gray-900">{{ $t('nav.contact') }}</NuxtLink>
          </nav>

          <!-- Language Selector -->
          <div class="flex items-center space-x-4">
            <select 
              v-model="$i18n.locale.value" 
              class="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="en">🇺🇸 English</option>
              <option value="zh">🇨🇳 中文</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <span class="text-xl font-bold">AutoPartQuote</span>
            </div>
            <p class="text-gray-300 mb-4">{{ $t('home.subtitle') }}</p>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-gray-300">
              <li><NuxtLink to="/" class="hover:text-white">{{ $t('nav.home') }}</NuxtLink></li>
              <li><NuxtLink to="/products" class="hover:text-white">{{ $t('nav.products') }}</NuxtLink></li>
              <li><NuxtLink to="/inquiry" class="hover:text-white">{{ $t('nav.inquiry') }}</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-white">{{ $t('nav.about') }}</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">{{ $t('nav.contact') }}</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Email: info@autopartquote.com</li>
              <li>Phone: +1 (555) 012-3456</li>
              <li>Mon-Fri: 9:00 AM - 6:00 PM EST</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} AutoPartQuote. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Set HTML lang attribute
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>