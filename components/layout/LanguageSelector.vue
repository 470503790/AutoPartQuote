<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <Icon name="heroicons:language" class="w-4 h-4" />
      <span class="hidden sm:inline">{{ currentLanguage.name }}</span>
      <Icon name="heroicons:chevron-down" class="w-3 h-3 ml-1" />
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
      >
        <div class="py-1">
          <button
            v-for="language in languages"
            :key="language.code"
            @click="switchLanguage(language.code)"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            :class="{ 'bg-blue-50 text-blue-700': language.code === currentLocale }"
          >
            <span class="text-lg mr-3">{{ language.flag }}</span>
            <span>{{ language.name }}</span>
            <Icon
              v-if="language.code === currentLocale"
              name="heroicons:check"
              class="w-4 h-4 ml-auto text-blue-600"
            />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Language } from '~/types'

const { locale, locales, setLocale } = useI18n()
const dropdownOpen = ref(false)

// Available languages with flags
const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

// Current language
const currentLocale = computed(() => locale.value)
const currentLanguage = computed(() => 
  languages.find(lang => lang.code === currentLocale.value) || languages[0]
)

// Methods
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const switchLanguage = async (languageCode: string) => {
  if (languageCode !== currentLocale.value) {
    await setLocale(languageCode)
    // Store preference in localStorage
    if (process.client) {
      localStorage.setItem('preferred-language', languageCode)
    }
  }
  dropdownOpen.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element
    if (dropdownOpen.value && !target.closest('.relative')) {
      dropdownOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

// Close dropdown on escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && dropdownOpen.value) {
      dropdownOpen.value = false
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

// Load preferred language on mount
onMounted(() => {
  if (process.client) {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && savedLanguage !== locale.value) {
      setLocale(savedLanguage)
    }
  }
})
</script>

<style scoped>
/* Custom styles for language selector */
.language-flag {
  font-size: 1.2em;
  line-height: 1;
}

/* Focus states for accessibility */
button:focus-visible {
  @apply ring-2 ring-blue-500 ring-offset-2;
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>