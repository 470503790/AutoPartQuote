<template>
  <div class="home">
    <section class="hero">
      <h1>{{ $t ? $t('home.title') : 'Auto Parts Quote System' }}</h1>
      <p>{{ $t ? $t('home.subtitle') : 'Find the right parts for your vehicle at the best prices' }}</p>
      <div class="search-box">
        <input
          type="text"
          :placeholder="$t ? $t('home.searchPlaceholder') : 'Enter part number or description'"
          v-model="searchQuery"
          class="search-input"
        />
        <button class="search-button" @click="performSearch">
          {{ $t ? $t('home.searchButton') : 'Search' }}
        </button>
      </div>
    </section>

    <section class="featured-parts">
      <h2>{{ $t ? $t('home.featuredParts') : 'Featured Parts' }}</h2>
      <div class="parts-grid">
        <div v-for="part in featuredParts" :key="part.id" class="part-card">
          <img :src="part.image" :alt="part.name" />
          <h3>{{ part.name }}</h3>
          <p class="price">${{ part.price }}</p>
          <button class="add-to-quote-btn" @click="addToQuote(part)">
            {{ $t ? $t('search.addToQuote') : 'Add to Quote' }}
          </button>
        </div>
      </div>
    </section>

    <section class="popular-brands">
      <h2>{{ $t ? $t('home.popularBrands') : 'Popular Brands' }}</h2>
      <div class="brands-grid">
        <div v-for="brand in popularBrands" :key="brand.id" class="brand-card">
          <img :src="brand.logo" :alt="brand.name" />
          <span>{{ brand.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  head() {
    return {
      title: this.$t ? this.$t('home.title') : 'Auto Parts Quote System',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t ? this.$t('home.subtitle') : 'Find the right parts for your vehicle at the best prices'
        }
      ]
    }
  },
  data() {
    return {
      searchQuery: '',
      featuredParts: [
        {
          id: 1,
          name: 'Brake Pads Set',
          price: 89.99,
          image: '/images/brake-pads.jpg'
        },
        {
          id: 2,
          name: 'Air Filter',
          price: 24.99,
          image: '/images/air-filter.jpg'
        },
        {
          id: 3,
          name: 'Oil Filter',
          price: 12.99,
          image: '/images/oil-filter.jpg'
        }
      ],
      popularBrands: [
        { id: 1, name: 'Bosch', logo: '/images/bosch-logo.jpg' },
        { id: 2, name: 'Denso', logo: '/images/denso-logo.jpg' },
        { id: 3, name: 'Fram', logo: '/images/fram-logo.jpg' }
      ]
    }
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/search',
          query: { q: this.searchQuery }
        })
      }
    },
    addToQuote(part) {
      // This would typically interact with a store or API
      console.log('Adding to quote:', part)
      // Navigate to quote page or show confirmation
      this.$router.push('/quote')
    }
  }
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  margin: -2rem -1rem 2rem -1rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.search-box {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
}

.search-button {
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.search-button:hover {
  background-color: #c0392b;
}

.featured-parts,
.popular-brands {
  margin: 3rem 0;
}

.featured-parts h2,
.popular-brands h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.parts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.part-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s;
}

.part-card:hover {
  transform: translateY(-5px);
}

.part-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.part-card h3 {
  margin: 1rem 0 0.5rem;
  color: #2c3e50;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 1rem;
}

.add-to-quote-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-quote-btn:hover {
  background-color: #2980b9;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.brand-card {
  text-align: center;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.brand-card img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}
</style>