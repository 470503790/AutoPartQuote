// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/icon'
  ],
  
  // Internationalization configuration
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'zh', name: '中文' },
      { code: 'es', name: 'Español' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root'
    },
    messages: {
      en: {
        nav: {
          home: 'Home',
          products: 'Products',
          inquiry: 'Inquiry',
          batch_inquiry: 'Batch Inquiry',
          about: 'About',
          contact: 'Contact',
          language: 'Language'
        },
        home: {
          title: 'Professional Auto Parts Inquiry System',
          subtitle: 'Find compatible parts, get instant quotes, and connect with trusted suppliers worldwide',
          quick_inquiry: 'Quick Inquiry'
        },
        common: {
          loading: 'Loading...'
        }
      },
      zh: {
        nav: {
          home: '首页',
          products: '产品',
          inquiry: '询价',
          batch_inquiry: '批量询价',
          about: '关于我们',
          contact: '联系我们',
          language: '语言'
        },
        home: {
          title: '专业汽配询价系统',
          subtitle: '寻找兼容配件，获取即时报价，连接全球可信供应商',
          quick_inquiry: '快速询价'
        },
        common: {
          loading: '加载中...'
        }
      },
      es: {
        nav: {
          home: 'Inicio',
          products: 'Productos',
          inquiry: 'Consulta',
          batch_inquiry: 'Consulta por Lotes',
          about: 'Acerca de',
          contact: 'Contacto',
          language: 'Idioma'
        },
        home: {
          title: 'Sistema Profesional de Consulta de Autopartes',
          subtitle: 'Encuentra partes compatibles, obtén cotizaciones instantáneas y conéctate con proveedores confiables',
          quick_inquiry: 'Consulta Rápida'
        },
        common: {
          loading: 'Cargando...'
        }
      }
    }
  },
  
  // SEO configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'AutoPartQuote - Professional Auto Parts Inquiry System',
      meta: [
        { name: 'description', content: 'Professional auto parts inquiry and quotation system. Find compatible parts, get instant quotes, and connect with trusted suppliers worldwide.' },
        { name: 'keywords', content: 'auto parts, car parts, automotive, spare parts, inquiry, quotation, OEM, aftermarket' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'AutoPartQuote - Professional Auto Parts Inquiry System' },
        { property: 'og:description', content: 'Professional auto parts inquiry and quotation system' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // CSS configuration
  css: ['~/assets/css/main.css'],
  
  // Sitemap configuration
  sitemap: {
    hostname: 'https://autopartquote.com',
    gzip: true,
    routes: [
      '/',
      '/products',
      '/inquiry',
      '/batch-inquiry',
      '/about',
      '/contact'
    ]
  },
  
  // SSR configuration for SEO
  ssr: true,
  
  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || '/api'
    }
  }
})
