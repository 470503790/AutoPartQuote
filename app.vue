<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  font-weight: 600;
}

p {
  margin-bottom: 1rem;
}

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Utility classes for text direction support */
.rtl {
  direction: rtl;
}

.ltr {
  direction: ltr;
}

/* Responsive text sizing for different languages */
@media (max-width: 768px) {
  html[lang="zh"] body,
  html[lang="ja"] body {
    font-size: 14px;
  }
  
  html[lang="ar"] body,
  html[lang="he"] body {
    font-size: 15px;
  }
}

/* Language-specific font stacks */
html[lang="zh"] body {
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

html[lang="ja"] body {
  font-family: 'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'Meiryo', sans-serif;
}

html[lang="ar"] body {
  font-family: 'Tahoma', 'Arial Unicode MS', sans-serif;
  direction: rtl;
}

html[lang="he"] body {
  font-family: 'Arial Hebrew', 'Tahoma', sans-serif;
  direction: rtl;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>