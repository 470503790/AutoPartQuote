<template>
  <div class="search-page">
    <h1>{{ $t('search.title') }}</h1>
    
    <div class="search-container">
      <aside class="filters">
        <h3>{{ $t('search.filters') }}</h3>
        
        <div class="filter-group">
          <label>{{ $t('search.category') }}</label>
          <select v-model="filters.category">
            <option value="">All Categories</option>
            <option value="engine">Engine</option>
            <option value="brakes">Brakes</option>
            <option value="filters">Filters</option>
            <option value="electrical">Electrical</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>{{ $t('search.brand') }}</label>
          <select v-model="filters.brand">
            <option value="">All Brands</option>
            <option value="bosch">Bosch</option>
            <option value="denso">Denso</option>
            <option value="fram">Fram</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>{{ $t('search.priceRange') }}</label>
          <input type="range" min="0" max="500" v-model="filters.maxPrice" />
          <span>$0 - ${{ filters.maxPrice }}</span>
        </div>
      </aside>
      
      <main class="results">
        <div class="results-header">
          <span>{{ $t('search.results') }} ({{ filteredParts.length }})</span>
          <div class="sort-controls">
            <label>{{ $t('search.sortBy') }}:</label>
            <select v-model="sortBy">
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div v-if="filteredParts.length === 0" class="no-results">
          {{ $t('search.noResults') }}
        </div>
        
        <div v-else class="results-grid">
          <div v-for="part in sortedParts" :key="part.id" class="result-card">
            <img :src="part.image" :alt="part.name" />
            <div class="part-info">
              <h3>{{ part.name }}</h3>
              <p class="part-number">{{ part.partNumber }}</p>
              <p class="description">{{ part.description }}</p>
              <div class="price-section">
                <span class="price">${{ part.price }}</span>
                <button class="add-to-quote" @click="addToQuote(part)">
                  {{ $t('search.addToQuote') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      filters: {
        category: '',
        brand: '',
        maxPrice: 500
      },
      sortBy: 'name',
      parts: [
        {
          id: 1,
          name: 'Brake Pads Set',
          partNumber: 'BP-001',
          description: 'High-quality ceramic brake pads',
          price: 89.99,
          category: 'brakes',
          brand: 'bosch',
          image: '/images/brake-pads.jpg'
        },
        {
          id: 2,
          name: 'Air Filter',
          partNumber: 'AF-002',
          description: 'Premium air filter for better engine performance',
          price: 24.99,
          category: 'filters',
          brand: 'fram',
          image: '/images/air-filter.jpg'
        },
        {
          id: 3,
          name: 'Oil Filter',
          partNumber: 'OF-003',
          description: 'High-efficiency oil filter',
          price: 12.99,
          category: 'filters',
          brand: 'bosch',
          image: '/images/oil-filter.jpg'
        },
        {
          id: 4,
          name: 'Spark Plugs Set',
          partNumber: 'SP-004',
          description: 'Iridium spark plugs for optimal ignition',
          price: 45.99,
          category: 'engine',
          brand: 'denso',
          image: '/images/spark-plugs.jpg'
        }
      ]
    }
  },
  computed: {
    filteredParts() {
      return this.parts.filter(part => {
        const categoryMatch = !this.filters.category || part.category === this.filters.category
        const brandMatch = !this.filters.brand || part.brand === this.filters.brand
        const priceMatch = part.price <= this.filters.maxPrice
        return categoryMatch && brandMatch && priceMatch
      })
    },
    sortedParts() {
      const sorted = [...this.filteredParts]
      switch (this.sortBy) {
        case 'price-low':
          return sorted.sort((a, b) => a.price - b.price)
        case 'price-high':
          return sorted.sort((a, b) => b.price - a.price)
        case 'name':
        default:
          return sorted.sort((a, b) => a.name.localeCompare(b.name))
      }
    }
  },
  methods: {
    addToQuote(part) {
      console.log('Adding to quote:', part)
      // This would typically save to store or send to API
      this.$router.push('/quote')
    }
  }
}
</script>

<style scoped>
.search-page h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.search-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.filters {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
}

.filters h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.filter-group select,
.filter-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-controls select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

.results-grid {
  display: grid;
  gap: 1.5rem;
}

.result-card {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  transition: box-shadow 0.3s;
}

.result-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.result-card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
}

.part-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.part-info h3 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
}

.part-number {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem;
}

.description {
  flex: 1;
  margin: 0 0 1rem;
  color: #555;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
}

.add-to-quote {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-quote:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .search-container {
    grid-template-columns: 1fr;
  }
  
  .result-card {
    flex-direction: column;
  }
  
  .result-card img {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>