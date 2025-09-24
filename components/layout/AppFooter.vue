<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold">AutoPartQuote</span>
          </div>
          <p class="text-gray-300 mb-6 max-w-md">
            {{ $t('home.subtitle') }}
          </p>
          <div class="flex space-x-4">
            <a
              href="https://facebook.com/autopartquote"
              class="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="fa6-brands:facebook" class="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/autopartquote"
              class="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="fa6-brands:twitter" class="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/company/autopartquote"
              class="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="fa6-brands:linkedin" class="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/autopartquote"
              class="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="fa6-brands:instagram" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.quick_links') }}</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.href">
              <NuxtLink
                :to="link.href"
                class="text-gray-300 hover:text-white transition-colors"
              >
                {{ $t(link.name) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('nav.contact') }}</h3>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center space-x-2">
              <Icon name="heroicons:envelope" class="w-4 h-4" />
              <a href="mailto:info@autopartquote.com" class="hover:text-white transition-colors">
                info@autopartquote.com
              </a>
            </li>
            <li class="flex items-center space-x-2">
              <Icon name="heroicons:phone" class="w-4 h-4" />
              <a href="tel:+1-555-0123" class="hover:text-white transition-colors">
                +1 (555) 012-3456
              </a>
            </li>
            <li class="flex items-start space-x-2">
              <Icon name="heroicons:map-pin" class="w-4 h-4 mt-0.5" />
              <span>
                123 Auto Parts Street<br>
                Commerce City, CC 12345<br>
                United States
              </span>
            </li>
            <li class="flex items-center space-x-2">
              <Icon name="heroicons:clock" class="w-4 h-4" />
              <span>Mon-Fri: 9:00 AM - 6:00 PM EST</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 text-sm mb-4 md:mb-0">
            © {{ currentYear }} AutoPartQuote. {{ $t('footer.rights_reserved') }}
          </div>
          <div class="flex space-x-6 text-sm">
            <NuxtLink
              to="/privacy"
              class="text-gray-400 hover:text-white transition-colors"
            >
              {{ $t('footer.privacy_policy') }}
            </NuxtLink>
            <NuxtLink
              to="/terms"
              class="text-gray-400 hover:text-white transition-colors"
            >
              {{ $t('footer.terms_of_service') }}
            </NuxtLink>
            <NuxtLink
              to="/cookies"
              class="text-gray-400 hover:text-white transition-colors"
            >
              {{ $t('footer.cookie_policy') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types'

const { t } = useI18n()

// Current year for copyright
const currentYear = new Date().getFullYear()

// Quick links
const quickLinks: NavItem[] = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.products', href: '/products' },
  { name: 'nav.inquiry', href: '/inquiry' },
  { name: 'nav.batch_inquiry', href: '/batch-inquiry' },
  { name: 'nav.about', href: '/about' },
  { name: 'nav.contact', href: '/contact' }
]
</script>

<style scoped>
/* Custom styles for footer */
a:hover {
  text-decoration: none;
}

/* Social icon hover effects */
a:hover .icon {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
</style>