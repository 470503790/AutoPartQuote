<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900">AutoPartQuote</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 border-b-2 border-blue-600': isActiveRoute(item.href) }"
          >
            {{ $t(item.name) }}
          </NuxtLink>
        </nav>

        <!-- Right side items -->
        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <LanguageSelector />
          
          <!-- Quick Inquiry Button -->
          <NuxtLink
            to="/inquiry"
            class="btn btn-primary hidden sm:inline-flex"
          >
            <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
            {{ $t('home.quick_inquiry') }}
          </NuxtLink>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Icon
              :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div
      v-show="mobileMenuOpen"
      class="md:hidden bg-white border-t border-gray-200"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          :class="{ 'text-blue-600 bg-blue-50': isActiveRoute(item.href) }"
          @click="closeMobileMenu"
        >
          {{ $t(item.name) }}
        </NuxtLink>
        
        <!-- Mobile Quick Inquiry Button -->
        <NuxtLink
          to="/inquiry"
          class="block w-full mt-4 btn btn-primary text-center"
          @click="closeMobileMenu"
        >
          <Icon name="heroicons:plus" class="w-4 h-4 mr-2 inline" />
          {{ $t('home.quick_inquiry') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types'

const { t } = useI18n()
const route = useRoute()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Navigation items
const navigation: NavItem[] = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.products', href: '/products' },
  { name: 'nav.inquiry', href: '/inquiry' },
  { name: 'nav.batch_inquiry', href: '/batch-inquiry' },
  { name: 'nav.about', href: '/about' },
  { name: 'nav.contact', href: '/contact' }
]

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const isActiveRoute = (href: string) => {
  if (href === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(href)
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  closeMobileMenu()
})

// Close mobile menu when clicking outside
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element
    if (mobileMenuOpen.value && !target.closest('header')) {
      closeMobileMenu()
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
/* Additional header styles */
.router-link-active {
  @apply text-blue-600;
}

/* Smooth transitions */
nav a {
  @apply transition-all duration-200;
}

/* Mobile menu animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  @apply transition-all duration-200;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  @apply opacity-0 -translate-y-2;
}
</style>