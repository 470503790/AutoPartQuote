<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
    <div class="flex">
      <!-- Product Image -->
      <div class="w-32 h-32 bg-gray-100 flex-shrink-0">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover"
          @error="handleImageError"
        >
        <div v-else class="w-full h-full flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex-1 p-4">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <!-- Brand and Part Number -->
            <div class="flex items-center space-x-2 mb-1">
              <span class="text-sm font-medium text-blue-600">{{ product.brand }}</span>
              <span class="text-sm text-gray-500">•</span>
              <span class="text-sm text-gray-500">Part #: {{ product.partNumber }}</span>
            </div>

            <!-- Product Name -->
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              <NuxtLink 
                :to="`/products/${product.id}`"
                class="hover:text-blue-600 transition-colors"
              >
                {{ product.name }}
              </NuxtLink>
            </h3>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ product.description }}
            </p>

            <!-- Category and Availability -->
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">{{ product.category }}</span>
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getAvailabilityClass(product.availability)"
              >
                {{ getAvailabilityLabel(product.availability) }}
              </span>
            </div>
          </div>

          <!-- Price and Actions -->
          <div class="flex flex-col items-end space-y-3 ml-4">
            <!-- Price -->
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-900">
                ${{ product.price }}
              </div>
              <div class="text-sm text-gray-500">{{ product.currency }}</div>
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-2">
              <button
                @click="addToInquiry"
                class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                :disabled="product.availability === 'discontinued'"
              >
                Add to Inquiry
              </button>
              <button
                @click="toggleWishlist"
                class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                :class="{ 'text-red-500': isInWishlist }"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: string
  name: string
  partNumber: string
  brand: string
  category: string
  price: number
  currency: string
  availability: 'in_stock' | 'out_of_stock' | 'limited' | 'discontinued'
  image?: string
  description: string
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

// State
const isInWishlist = ref(false)

// Methods
const getAvailabilityClass = (availability: Product['availability']) => {
  const classes = {
    in_stock: 'bg-green-100 text-green-800',
    limited: 'bg-yellow-100 text-yellow-800',
    out_of_stock: 'bg-red-100 text-red-800',
    discontinued: 'bg-gray-100 text-gray-800'
  }
  return classes[availability]
}

const getAvailabilityLabel = (availability: Product['availability']) => {
  const labels = {
    in_stock: 'In Stock',
    limited: 'Limited',
    out_of_stock: 'Out of Stock',
    discontinued: 'Discontinued'
  }
  return labels[availability]
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}

const addToInquiry = () => {
  // Add to inquiry logic
  console.log('Adding to inquiry:', props.product)
}

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value
  console.log('Toggling wishlist:', props.product.id, isInWishlist.value)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>