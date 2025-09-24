<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full">
      <!-- Success Icon -->
      <div class="text-center mb-8">
        <div class="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {{ $t('success.title') }}
        </h1>
        
        <p class="text-lg text-gray-600 mb-8">
          {{ $t('success.message') }}
        </p>
      </div>

      <!-- Inquiry Details Card -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="border-b border-gray-200 pb-4 mb-6">
          <h2 class="text-lg font-semibold text-gray-900">
            Inquiry Details
          </h2>
        </div>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-500">{{ $t('success.inquiry_id') }}:</span>
            <span class="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{{ inquiryId }}</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-500">Submission Date:</span>
            <span class="text-sm text-gray-900">{{ submissionDate }}</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-500">Status:</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Processing
            </span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-500">Expected Response:</span>
            <span class="text-sm text-gray-900">Within 24 hours</span>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          {{ $t('success.next_steps') }}
        </h2>
        
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span class="text-xs font-medium text-blue-600">1</span>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">{{ $t('success.step1') }}</h3>
              <p class="text-sm text-gray-500 mt-1">We'll verify all part numbers and specifications</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span class="text-xs font-medium text-blue-600">2</span>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">{{ $t('success.step2') }}</h3>
              <p class="text-sm text-gray-500 mt-1">Our team will contact multiple suppliers for the best prices</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span class="text-xs font-medium text-blue-600">3</span>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">{{ $t('success.step3') }}</h3>
              <p class="text-sm text-gray-500 mt-1">Compare offers and negotiate the best deals for you</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="bg-blue-50 rounded-lg p-6 mb-8">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-900">Need Help?</h3>
            <p class="text-sm text-blue-700 mt-1">
              If you have any questions about your inquiry, please don't hesitate to contact us:
            </p>
            <ul class="text-sm text-blue-700 mt-2 space-y-1">
              <li>Email: <a href="mailto:support@autopartquote.com" class="underline">support@autopartquote.com</a></li>
              <li>Phone: <a href="tel:+1-555-012-3456" class="underline">+1 (555) 012-3456</a></li>
              <li>Reference ID: {{ inquiryId }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/"
          class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          {{ $t('success.return_home') }}
        </NuxtLink>
        
        <NuxtLink
          to="/inquiry"
          class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          {{ $t('success.submit_another') }}
        </NuxtLink>
        
        <button
          @click="trackInquiry"
          class="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
        >
          Track Inquiry Status
        </button>
      </div>

      <!-- Email Confirmation Notice -->
      <div class="mt-8 text-center">
        <p class="text-sm text-gray-500">
          A confirmation email has been sent to the address provided in your inquiry.
          Please check your spam/junk folder if you don't see it in your inbox.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// SEO
useHead({
  title: t('success.title'),
  meta: [
    { name: 'description', content: 'Your auto parts inquiry has been submitted successfully.' },
    { name: 'robots', content: 'noindex, nofollow' } // Don't index success pages
  ]
})

// Get inquiry ID from query params
const inquiryId = computed(() => 
  route.query.id as string || 'INQ-' + Date.now()
)

// Format submission date
const submissionDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Methods
const trackInquiry = () => {
  // Redirect to tracking page (to be implemented)
  router.push(`/inquiry/track?id=${inquiryId.value}`)
}

// Analytics tracking
onMounted(() => {
  if (!route.query.id) {
    // Could redirect to home or inquiry page
    console.warn('No inquiry ID provided')
  }
  
  // Analytics tracking
  if (process.client && window.gtag) {
    window.gtag('event', 'inquiry_submitted', {
      'inquiry_id': inquiryId.value,
      'event_category': 'engagement',
      'event_label': 'Auto Parts Inquiry'
    })
  }
})
</script>

<style scoped>
/* Success page specific styles */
.animate-bounce-slow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>