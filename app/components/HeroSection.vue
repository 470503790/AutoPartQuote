<template>
  <section class="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="space-y-8">
          <div>
            <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {{ $t('home.title') }}
            </h1>
            <p class="text-xl text-blue-100 mb-8 leading-relaxed">
              {{ $t('home.subtitle') }}
            </p>
          </div>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              to="/inquiry"
              class="btn btn-lg bg-white text-blue-900 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
              {{ $t('home.quick_inquiry') }}
            </NuxtLink>
            <NuxtLink
              to="/products"
              class="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 rounded-lg transition-all duration-200"
            >
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 mr-2" />
              {{ $t('nav.products') }}
            </NuxtLink>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 pt-8 border-t border-blue-600/30">
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">10K+</div>
              <div class="text-blue-200 text-sm">Parts Available</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">500+</div>
              <div class="text-blue-200 text-sm">Trusted Suppliers</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">24h</div>
              <div class="text-blue-200 text-sm">Response Time</div>
            </div>
          </div>
        </div>
        
        <!-- Hero Image/Illustration -->
        <div class="relative">
          <div class="relative z-10">
            <!-- Placeholder for hero image/illustration -->
            <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white/20 rounded-lg p-4 text-center">
                  <Icon name="heroicons:cog-6-tooth" class="w-8 h-8 mx-auto mb-2" />
                  <div class="text-sm font-medium">Engine Parts</div>
                </div>
                <div class="bg-white/20 rounded-lg p-4 text-center">
                  <Icon name="heroicons:wrench-screwdriver" class="w-8 h-8 mx-auto mb-2" />
                  <div class="text-sm font-medium">Tools & Equipment</div>
                </div>
                <div class="bg-white/20 rounded-lg p-4 text-center">
                  <Icon name="heroicons:bolt" class="w-8 h-8 mx-auto mb-2" />
                  <div class="text-sm font-medium">Electrical</div>
                </div>
                <div class="bg-white/20 rounded-lg p-4 text-center">
                  <Icon name="heroicons:shield-check" class="w-8 h-8 mx-auto mb-2" />
                  <div class="text-sm font-medium">Safety Parts</div>
                </div>
              </div>
              <div class="text-center">
                <div class="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full">
                  <Icon name="heroicons:check-circle" class="w-4 h-4" />
                  <span class="text-sm font-medium">Quality Verified</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Background decorative elements -->
          <div class="absolute inset-0 -z-10">
            <div class="absolute top-4 left-4 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
            <div class="absolute bottom-8 right-8 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-300/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Wave divider -->
    <div class="relative">
      <svg
        class="absolute bottom-0 left-0 w-full h-12 text-gray-50 transform rotate-180"
        viewBox="0 0 1440 54"
        fill="currentColor"
      >
        <path d="M0,0 C720,54 720,54 1440,0 L1440,54 L0,54 Z" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-float {
  animation: float 6s ease-in-out infinite;
}

/* Gradient text effect */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Smooth transitions */
.btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
  transform: translateY(-2px);
}
</style>