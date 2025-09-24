<template>
  <div class="about-page">
    <h1>{{ $t('about.title') }}</h1>
    
    <div class="about-content">
      <section class="intro">
        <p class="description">{{ $t('about.description') }}</p>
      </section>
      
      <section class="mission">
        <h2>{{ $t('about.mission') }}</h2>
        <p>{{ $t('about.missionText') }}</p>
      </section>
      
      <section class="features">
        <h2>Why Choose Us?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>Quality Parts</h3>
            <p>We source only genuine and high-quality aftermarket parts from trusted manufacturers.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>Competitive Prices</h3>
            <p>Our extensive network allows us to offer competitive pricing on all auto parts.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping to get your parts when you need them.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>Expert Support</h3>
            <p>Our knowledgeable team helps you find the right parts for your vehicle.</p>
          </div>
        </div>
      </section>
      
      <section class="stats">
        <h2>Our Numbers</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">10,000+</div>
            <div class="stat-label">Parts Available</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-number">5,000+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-number">15+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Brands Supported</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.about-content {
  max-width: 1000px;
  margin: 0 auto;
}

.intro {
  text-align: center;
  margin-bottom: 3rem;
}

.description {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
}

.mission {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  text-align: center;
}

.mission h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.mission p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

.features {
  margin-bottom: 3rem;
}

.features h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #555;
  line-height: 1.6;
}

.stats {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
}

.stats h2 {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>