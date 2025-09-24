<template>
  <div class="language-switcher">
    <label for="language-select">Language:</label>
    <select 
      id="language-select"
      @change="switchLanguage"
      class="language-select"
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
      <option value="es">Español</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  methods: {
    switchLanguage(event) {
      const newLocale = event.target.value
      
      if (this.$i18n && this.$i18n.setLocale) {
        this.$i18n.setLocale(newLocale)
      }
      
      // Try to navigate to the same page but with new locale
      if (this.switchLocalePath) {
        try {
          this.$router.push(this.switchLocalePath(newLocale))
        } catch (e) {
          console.warn('Could not switch locale path:', e)
        }
      }
    }
  }
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.language-switcher label {
  font-size: 0.9rem;
}

.language-select {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: #2c3e50;
  font-size: 0.9rem;
  cursor: pointer;
}

.language-select:focus {
  outline: 2px solid #3498db;
}
</style>