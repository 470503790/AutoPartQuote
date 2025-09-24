<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
              {{ $t('products.title') }}
            </h1>
            <p class="mt-1 text-sm text-gray-500 sm:text-base">
              Discover quality auto parts from trusted suppliers worldwide
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-4 lg:gap-8">
        <!-- Filters Sidebar -->
        <div class="hidden lg:block">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ $t('products.filter') }}</h3>
            
            <!-- Search -->
            <div class="mb-6">
              <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('common.search') }}
              </label>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :placeholder="$t('products.search_placeholder')"
              >
            </div>

            <!-- Categories -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">{{ $t('products.categories') }}</h4>
              <div class="space-y-2">
                <label v-for="category in categories" :key="category.id" class="flex items-center">
                  <input
                    v-model="selectedCategories"
                    :value="category.id"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                  <span class="ml-auto text-xs text-gray-500">({{ category.count }})</span>
                </label>
              </div>
            </div>

            <!-- Brands -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">{{ $t('products.brands') }}</h4>
              <div class="space-y-2">
                <label v-for="brand in brands" :key="brand.id" class="flex items-center">
                  <input
                    v-model="selectedBrands"
                    :value="brand.id"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <span class="ml-2 text-sm text-gray-700">{{ brand.name }}</span>
                  <span class="ml-auto text-xs text-gray-500">({{ brand.count }})</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">{{ $t('products.price_range') }}</h4>
              <div class="space-y-3">
                <div>
                  <input
                    v-model.number="priceRange.min"
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  >
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <input
                    v-model.number="priceRange.min"
                    type="number"
                    placeholder="Min"
                    class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                  <input
                    v-model.number="priceRange.max"
                    type="number"
                    placeholder="Max"
                    class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                </div>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {{ $t('products.clear_filters') }}
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Sort and View Options -->
          <div class="bg-white rounded-lg shadow p-4 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center space-x-4 mb-4 sm:mb-0">
                <span class="text-sm text-gray-700">
                  {{ filteredProducts.length }} {{ $t('products.results_count').replace('{count}', filteredProducts.length) }}
                </span>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <label class="text-sm text-gray-700">{{ $t('products.sort') }}:</label>
                  <select
                    v-model="sortBy"
                    class="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
                
                <!-- View Toggle -->
                <div class="flex border border-gray-300 rounded overflow-hidden">
                  <button
                    @click="viewMode = 'grid'"
                    class="px-3 py-1 text-sm"
                    :class="viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  >
                    Grid
                  </button>
                  <button
                    @click="viewMode = 'list'"
                    class="px-3 py-1 text-sm border-l border-gray-300"
                    :class="viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Products -->
          <div v-if="filteredProducts.length > 0">
            <!-- Grid View -->
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <ProductCard
                v-for="product in paginatedProducts"
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
              <ProductListItem
                v-for="product in paginatedProducts"
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- Pagination -->
            <div class="mt-8 flex justify-center">
              <nav class="flex items-center space-x-2">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  {{ $t('common.previous') }}
                </button>
                
                <span class="px-4 py-2 text-sm text-gray-700">
                  {{ $t('common.page') }} {{ currentPage }} of {{ totalPages }}
                </span>
                
                <button
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  {{ $t('common.next') }}
                </button>
              </nav>
            </div>
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-12">
            <div class="max-w-md mx-auto">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.477-.773-6.204-2.075l.004-.015-.001-.004A5.97 5.97 0 015 12v-4h2v4a4 4 0 108 0v-4h2v4c0 .627-.067 1.239-.188 1.829.13-.15.263-.305.404-.459z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $t('products.no_results') }}</h3>
              <p class="text-gray-500">Try adjusting your search criteria or filters</p>
              <button
                @click="clearFilters"
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {{ $t('products.clear_filters') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO
useHead({
  title: t('products.title'),
  meta: [
    { name: 'description', content: 'Browse our extensive catalog of quality auto parts from trusted suppliers worldwide.' }
  ]
})

// State
const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const priceRange = ref({ min: 0, max: 1000 })
const sortBy = ref('name')
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)
const itemsPerPage = 12

// Mock data
const categories = [
  { id: '1', name: 'Engine Parts', count: 156 },
  { id: '2', name: 'Brakes', count: 89 },
  { id: '3', name: 'Suspension', count: 72 },
  { id: '4', name: 'Electrical', count: 134 },
  { id: '5', name: 'Filters', count: 45 }
]

const brands = [
  { id: '1', name: 'Bosch', count: 89 },
  { id: '2', name: 'Continental', count: 67 },
  { id: '3', name: 'Mahle', count: 45 },
  { id: '4', name: 'Febi', count: 34 },
  { id: '5', name: 'Gates', count: 28 }
]

const products = ref([
  {
    id: '1',
    name: 'Brake Pad Set - Front',
    partNumber: 'BP-F-001',
    brand: 'Bosch',
    category: 'Brakes',
    price: 89.99,
    currency: 'USD',
    availability: 'in_stock',
    image: '/images/products/brake-pad.jpg',
    description: 'High-quality ceramic brake pads for superior stopping power'
  },
  {
    id: '2',
    name: 'Engine Oil Filter',
    partNumber: 'OF-E-002',
    brand: 'Mahle',
    category: 'Filters',
    price: 24.99,
    currency: 'USD',
    availability: 'in_stock',
    image: '/images/products/oil-filter.jpg',
    description: 'Premium oil filter for extended engine life'
  },
  {
    id: '3',
    name: 'Spark Plug Set',
    partNumber: 'SP-S-003',
    brand: 'Bosch',
    category: 'Engine Parts',
    price: 45.99,
    currency: 'USD',
    availability: 'limited',
    image: '/images/products/spark-plugs.jpg',
    description: 'Iridium spark plugs for improved performance'
  }
  // Add more mock products as needed
])

// Computed
const filteredProducts = computed(() => {
  let filtered = products.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.partNumber.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    )
  }

  // Filter by categories
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(product => 
      selectedCategories.value.includes(product.category)
    )
  }

  // Filter by brands
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter(product => 
      selectedBrands.value.includes(product.brand)
    )
  }

  // Filter by price range
  filtered = filtered.filter(product => 
    product.price >= priceRange.value.min && 
    product.price <= priceRange.value.max
  )

  // Sort
  switch (sortBy.value) {
    case 'price_low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price_high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
      // Assuming newer products have higher IDs
      filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
      break
  }

  return filtered
})

const totalPages = computed(() => 
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// Methods
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedBrands.value = []
  priceRange.value = { min: 0, max: 1000 }
  currentPage.value = 1
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedCategories, selectedBrands, priceRange, sortBy], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Add any specific styles for the products page */
</style>