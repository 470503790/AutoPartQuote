<template>
  <div>
    <header class="header">
      <nav class="nav">
        <div class="nav-brand">
          <NuxtLink to="/">{{ $t('home.title') }}</NuxtLink>
        </div>
        <div class="nav-links">
          <NuxtLink to="/">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink to="/search">{{ $t('nav.search') }}</NuxtLink>
          <NuxtLink to="/quote">{{ $t('nav.quote') }}</NuxtLink>
          <NuxtLink to="/about">{{ $t('nav.about') }}</NuxtLink>
          <NuxtLink to="/contact">{{ $t('nav.contact') }}</NuxtLink>
        </div>
        <LanguageSwitcher />
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer class="footer">
      <p>&copy; 2025 AutoPartQuote</p>
    </footer>
  </div>
</template>

<style scoped>
.header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-brand a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background-color: #34495e;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
}

main {
  min-height: calc(100vh - 200px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>