<template>
  <section class="section-padding bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('home.quick_inquiry') }}
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Get instant quotes for your auto parts needs. Simply enter the part details and we'll connect you with the best suppliers.
        </p>
      </div>
      
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="handleQuickInquiry" class="card">
          <div class="card-body space-y-6">
            <!-- Part Number Input -->
            <div class="form-group">
              <label for="partNumber" class="form-label">
                {{ $t('inquiry.part_number') }} *
              </label>
              <input
                id="partNumber"
                v-model="quickInquiry.partNumber"
                type="text"
                class="form-input"
                :placeholder="$t('inquiry.part_number')"
                required
              >
            </div>
            
            <!-- Description Input -->
            <div class="form-group">
              <label for="description" class="form-label">
                {{ $t('inquiry.description') }}
              </label>
              <textarea
                id="description"
                v-model="quickInquiry.description"
                class="form-textarea"
                rows="3"
                :placeholder="$t('inquiry.description')"
              ></textarea>
            </div>
            
            <!-- Quantity and Email Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label for="quantity" class="form-label">
                  {{ $t('inquiry.quantity') }} *
                </label>
                <input
                  id="quantity"
                  v-model.number="quickInquiry.quantity"
                  type="number"
                  min="1"
                  class="form-input"
                  :placeholder="$t('inquiry.quantity')"
                  required
                >
              </div>
              <div class="form-group">
                <label for="email" class="form-label">
                  {{ $t('inquiry.email') }} *
                </label>
                <input
                  id="email"
                  v-model="quickInquiry.email"
                  type="email"
                  class="form-input"
                  :placeholder="$t('inquiry.email')"
                  required
                >
              </div>
            </div>
            
            <!-- Submit Button -->
            <div class="text-center pt-4">
              <button
                type="submit"
                class="btn btn-primary btn-lg w-full md:w-auto px-8"
                :disabled="isSubmitting"
              >
                <Icon
                  v-if="isSubmitting"
                  name="heroicons:arrow-path"
                  class="w-5 h-5 mr-2 animate-spin"
                />
                <Icon
                  v-else
                  name="heroicons:paper-airplane"
                  class="w-5 h-5 mr-2"
                />
                {{ isSubmitting ? $t('common.loading') : $t('inquiry.submit_inquiry') }}
              </button>
            </div>
            
            <!-- Alternative Actions -->
            <div class="text-center border-t border-gray-200 pt-6">
              <p class="text-gray-600 mb-4">Need more options?</p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink
                  to="/inquiry"
                  class="btn btn-outline"
                >
                  <Icon name="heroicons:document-plus" class="w-4 h-4 mr-2" />
                  Detailed Inquiry
                </NuxtLink>
                <NuxtLink
                  to="/batch-inquiry"
                  class="btn btn-outline"
                >
                  <Icon name="heroicons:document-arrow-up" class="w-4 h-4 mr-2" />
                  {{ $t('nav.batch_inquiry') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { InquiryPart } from '~/types'

const { t } = useI18n()
const router = useRouter()

// Form state
const isSubmitting = ref(false)
const quickInquiry = ref({
  partNumber: '',
  description: '',
  quantity: 1,
  email: ''
})

// Handle form submission
const handleQuickInquiry = async () => {
  if (isSubmitting.value) return
  
  try {
    isSubmitting.value = true
    
    // Create inquiry part object
    const inquiryPart: Partial<InquiryPart> = {
      partNumber: quickInquiry.value.partNumber,
      description: quickInquiry.value.description,
      quantity: quickInquiry.value.quantity
    }
    
    // Store the inquiry data and redirect to full inquiry form
    const inquiryData = {
      parts: [inquiryPart],
      contactInfo: {
        email: quickInquiry.value.email
      }
    }
    
    // Store in session storage for the inquiry page
    if (process.client) {
      sessionStorage.setItem('quickInquiryData', JSON.stringify(inquiryData))
    }
    
    // Redirect to inquiry page
    await router.push('/inquiry?from=quick')
    
  } catch (error) {
    console.error('Quick inquiry error:', error)
    // Handle error - show toast notification
  } finally {
    isSubmitting.value = false
  }
}

// Reset form after successful submission
const resetForm = () => {
  quickInquiry.value = {
    partNumber: '',
    description: '',
    quantity: 1,
    email: ''
  }
}
</script>

<style scoped>
/* Form animations */
.form-input:focus,
.form-textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Button hover effects */
.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Card hover effect */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
</style>