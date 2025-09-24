<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            {{ $t('inquiry.title') }}
          </h1>
          <p class="mt-2 text-sm text-gray-500 sm:text-base">
            Fill out the form below to get quotes from our trusted suppliers
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form @submit.prevent="submitInquiry" class="space-y-8">
        <!-- Contact Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-6">
            {{ $t('inquiry.contact_info') }}
          </h2>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="companyName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('inquiry.company_name') }} *
              </label>
              <input
                id="companyName"
                v-model="inquiryForm.contactInfo.companyName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :placeholder="$t('inquiry.company_name')"
              >
            </div>

            <div>
              <label for="contactPerson" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('inquiry.contact_person') }} *
              </label>
              <input
                id="contactPerson"
                v-model="inquiryForm.contactInfo.contactPerson"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :placeholder="$t('inquiry.contact_person')"
              >
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('inquiry.email') }} *
              </label>
              <input
                id="email"
                v-model="inquiryForm.contactInfo.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :placeholder="$t('inquiry.email')"
              >
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('inquiry.phone') }}
              </label>
              <input
                id="phone"
                v-model="inquiryForm.contactInfo.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :placeholder="$t('inquiry.phone')"
              >
            </div>

            <div class="sm:col-span-2">
              <label for="country" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('inquiry.country') }} *
              </label>
              <select
                id="country"
                v-model="inquiryForm.contactInfo.country"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CN">China</option>
                <option value="DE">Germany</option>
                <option value="JP">Japan</option>
                <option value="GB">United Kingdom</option>
                <!-- Add more countries as needed -->
              </select>
            </div>
          </div>
        </div>

        <!-- Parts List -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-medium text-gray-900">
              {{ $t('inquiry.parts_list') }}
            </h2>
            <button
              type="button"
              @click="addPart"
              class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              {{ $t('inquiry.add_part') }}
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="(part, index) in inquiryForm.parts"
              :key="part.id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-medium text-gray-900">Part {{ index + 1 }}</h3>
                <button
                  v-if="inquiryForm.parts.length > 1"
                  type="button"
                  @click="removePart(index)"
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  {{ $t('inquiry.remove_part') }}
                </button>
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label :for="`partNumber-${index}`" class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('inquiry.part_number') }} *
                  </label>
                  <input
                    :id="`partNumber-${index}`"
                    v-model="part.partNumber"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    :placeholder="$t('inquiry.part_number')"
                  >
                </div>

                <div>
                  <label :for="`quantity-${index}`" class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('inquiry.quantity') }} *
                  </label>
                  <input
                    :id="`quantity-${index}`"
                    v-model.number="part.quantity"
                    type="number"
                    min="1"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    :placeholder="$t('inquiry.quantity')"
                  >
                </div>

                <div>
                  <label :for="`targetPrice-${index}`" class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('inquiry.target_price') }}
                  </label>
                  <input
                    :id="`targetPrice-${index}`"
                    v-model.number="part.targetPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    :placeholder="$t('inquiry.target_price')"
                  >
                </div>
              </div>

              <div class="mt-4">
                <label :for="`description-${index}`" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('inquiry.description') }}
                </label>
                <textarea
                  :id="`description-${index}`"
                  v-model="part.description"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  style="resize: vertical;"
                  :placeholder="$t('inquiry.description')"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- File Attachments -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-6">
            {{ $t('inquiry.attachments') }}
          </h2>
          
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              ref="fileInput"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
              class="hidden"
              @change="handleFileSelect"
            >
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.477-.773-6.204-2.075l.004-.015-.001-.004A5.97 5.97 0 015 12v-4h2v4a4 4 0 108 0v-4h2v4c0 .627-.067 1.239-.188 1.829.13-.15.263-.305.404-.459z"></path>
            </svg>
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {{ $t('inquiry.upload_files') }}
            </button>
            <p class="mt-2 text-sm text-gray-500">
              Supported formats: PDF, DOC, XLS, JPG, PNG (Max 10MB each)
            </p>
          </div>

          <!-- Selected Files -->
          <div v-if="selectedFiles.length > 0" class="mt-4">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Selected Files:</h3>
            <div class="space-y-2">
              <div
                v-for="(file, index) in selectedFiles"
                :key="index"
                class="flex items-center justify-between p-2 bg-gray-50 rounded border"
              >
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.477-.773-6.204-2.075l.004-.015-.001-.004A5.97 5.97 0 015 12v-4h2v4a4 4 0 108 0v-4h2v4c0 .627-.067 1.239-.188 1.829.13-.15.263-.305.404-.459z"></path>
                  </svg>
                  <span class="text-sm text-gray-700">{{ file.name }}</span>
                  <span class="ml-2 text-xs text-gray-500">({{ formatFileSize(file.size) }})</span>
                </div>
                <button
                  type="button"
                  @click="removeFile(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Notes -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-6">
            {{ $t('inquiry.additional_notes') }}
          </h2>
          <textarea
            v-model="inquiryForm.additionalNotes"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style="resize: vertical;"
            :placeholder="$t('inquiry.additional_notes')"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isSubmitting"
              class="w-5 h-5 mr-2 inline animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            {{ isSubmitting ? $t('common.loading') : $t('inquiry.submit_inquiry') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

// SEO
useHead({
  title: t('inquiry.title'),
  meta: [
    { name: 'description', content: 'Submit your auto parts inquiry and get quotes from trusted suppliers worldwide.' }
  ]
})

// State
const isSubmitting = ref(false)
const selectedFiles = ref<File[]>([])

// Form data
const inquiryForm = ref({
  contactInfo: {
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: ''
  },
  parts: [
    {
      id: Date.now().toString(),
      partNumber: '',
      description: '',
      quantity: 1,
      targetPrice: undefined as number | undefined
    }
  ],
  additionalNotes: ''
})

// Methods
const addPart = () => {
  inquiryForm.value.parts.push({
    id: Date.now().toString(),
    partNumber: '',
    description: '',
    quantity: 1,
    targetPrice: undefined
  })
}

const removePart = (index: number) => {
  inquiryForm.value.parts.splice(index, 1)
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const newFiles = Array.from(target.files)
    
    // Check file size (10MB limit)
    const validFiles = newFiles.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return false
      }
      return true
    })
    
    selectedFiles.value = [...selectedFiles.value, ...validFiles]
    target.value = '' // Reset input
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const submitInquiry = async () => {
  if (isSubmitting.value) return
  
  try {
    isSubmitting.value = true
    
    // Validate form
    if (!inquiryForm.value.contactInfo.companyName || 
        !inquiryForm.value.contactInfo.contactPerson || 
        !inquiryForm.value.contactInfo.email || 
        !inquiryForm.value.contactInfo.country) {
      alert(t('inquiry.required_field'))
      return
    }
    
    // Validate parts
    for (const part of inquiryForm.value.parts) {
      if (!part.partNumber || part.quantity < 1) {
        alert('Please fill in all required part information.')
        return
      }
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate inquiry ID
    const inquiryId = 'INQ-' + Date.now()
    
    // Redirect to success page
    await router.push(`/inquiry/success?id=${inquiryId}`)
    
  } catch (error) {
    console.error('Inquiry submission error:', error)
    alert('An error occurred while submitting your inquiry. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Load quick inquiry data if available
onMounted(() => {
  if (process.client) {
    const quickData = sessionStorage.getItem('quickInquiryData')
    if (quickData) {
      try {
        const data = JSON.parse(quickData)
        if (data.parts && data.parts.length > 0) {
          inquiryForm.value.parts = data.parts.map((part: any) => ({
            id: Date.now().toString() + Math.random(),
            partNumber: part.partNumber || '',
            description: part.description || '',
            quantity: part.quantity || 1,
            targetPrice: part.targetPrice
          }))
        }
        if (data.contactInfo?.email) {
          inquiryForm.value.contactInfo.email = data.contactInfo.email
        }
        // Clear the stored data
        sessionStorage.removeItem('quickInquiryData')
      } catch (e) {
        console.warn('Failed to parse quick inquiry data:', e)
      }
    }
  }
})
</script>

<style scoped>
/* Form specific styles */
input:invalid {
  border-color: #ef4444;
}

input:invalid:focus {
  ring-color: #ef4444;
  border-color: #ef4444;
}
</style>