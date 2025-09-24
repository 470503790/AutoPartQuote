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
        products: {
          title: 'Auto Parts Catalog',
          search_placeholder: 'Search by part number, brand, or description...',
          filter: 'Filter',
          sort: 'Sort by',
          categories: 'Categories',
          brands: 'Brands',
          price_range: 'Price Range',
          availability: 'Availability',
          clear_filters: 'Clear Filters',
          results_count: 'results found',
          no_results: 'No products found matching your criteria'
        },
        inquiry: {
          title: 'Request Quote',
          contact_info: 'Contact Information',
          parts_list: 'Parts List',
          add_part: 'Add Part',
          remove_part: 'Remove Part',
          part_number: 'Part Number',
          description: 'Description',
          quantity: 'Quantity',
          target_price: 'Target Price',
          attachments: 'Attachments',
          upload_files: 'Upload Files',
          additional_notes: 'Additional Notes',
          submit_inquiry: 'Submit Inquiry',
          company_name: 'Company Name',
          contact_person: 'Contact Person',
          email: 'Email',
          phone: 'Phone',
          country: 'Country',
          required_field: 'This field is required'
        },
        success: {
          title: 'Inquiry Submitted Successfully',
          message: 'Thank you for your inquiry. We will review your request and respond within 24 hours.',
          inquiry_id: 'Inquiry ID',
          next_steps: 'Next Steps',
          step1: 'Our team will review your parts list',
          step2: 'We\'ll source quotes from our supplier network',
          step3: 'You\'ll receive detailed quotations via email',
          return_home: 'Return to Home',
          submit_another: 'Submit Another Inquiry'
        },
        common: {
          loading: 'Loading...',
          search: 'Search',
          filter: 'Filter',
          sort: 'Sort',
          page: 'Page',
          previous: 'Previous',
          next: 'Next'
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
        products: {
          title: '汽配产品目录',
          search_placeholder: '按配件号、品牌或描述搜索...',
          filter: '筛选',
          sort: '排序',
          categories: '分类',
          brands: '品牌',
          price_range: '价格范围',
          availability: '可用性',
          clear_filters: '清除筛选',
          results_count: '个结果',
          no_results: '未找到符合条件的产品'
        },
        inquiry: {
          title: '询价报价',
          contact_info: '联系信息',
          parts_list: '配件清单',
          add_part: '添加配件',
          remove_part: '移除配件',
          part_number: '配件号',
          description: '描述',
          quantity: '数量',
          target_price: '目标价格',
          attachments: '附件',
          upload_files: '上传文件',
          additional_notes: '备注信息',
          submit_inquiry: '提交询价',
          company_name: '公司名称',
          contact_person: '联系人',
          email: '邮箱',
          phone: '电话',
          country: '国家',
          required_field: '此字段为必填项'
        },
        success: {
          title: '询价提交成功',
          message: '感谢您的询价。我们将审查您的请求并在24小时内回复。',
          inquiry_id: '询价编号',
          next_steps: '后续步骤',
          step1: '我们的团队将审查您的配件清单',
          step2: '我们将从供应商网络获取报价',
          step3: '您将通过邮件收到详细报价',
          return_home: '返回首页',
          submit_another: '提交另一个询价'
        },
        common: {
          loading: '加载中...',
          search: '搜索',
          filter: '筛选',
          sort: '排序',
          page: '页面',
          previous: '上一页',
          next: '下一页'
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
        products: {
          title: 'Catálogo de Autopartes',
          search_placeholder: 'Buscar por número de parte, marca o descripción...',
          filter: 'Filtrar',
          sort: 'Ordenar por',
          categories: 'Categorías',
          brands: 'Marcas',
          price_range: 'Rango de Precio',
          availability: 'Disponibilidad',
          clear_filters: 'Limpiar Filtros',
          results_count: 'resultados encontrados',
          no_results: 'No se encontraron productos que coincidan con sus criterios'
        },
        inquiry: {
          title: 'Solicitar Cotización',
          contact_info: 'Información de Contacto',
          parts_list: 'Lista de Partes',
          add_part: 'Agregar Parte',
          remove_part: 'Quitar Parte',
          part_number: 'Número de Parte',
          description: 'Descripción',
          quantity: 'Cantidad',
          target_price: 'Precio Objetivo',
          attachments: 'Archivos Adjuntos',
          upload_files: 'Subir Archivos',
          additional_notes: 'Notas Adicionales',
          submit_inquiry: 'Enviar Consulta',
          company_name: 'Nombre de la Empresa',
          contact_person: 'Persona de Contacto',
          email: 'Correo Electrónico',
          phone: 'Teléfono',
          country: 'País',
          required_field: 'Este campo es obligatorio'
        },
        success: {
          title: 'Consulta Enviada Exitosamente',
          message: 'Gracias por su consulta. Revisaremos su solicitud y responderemos dentro de 24 horas.',
          inquiry_id: 'ID de Consulta',
          next_steps: 'Próximos Pasos',
          step1: 'Nuestro equipo revisará su lista de partes',
          step2: 'Obtendremos cotizaciones de nuestra red de proveedores',
          step3: 'Recibirá cotizaciones detalladas por correo electrónico',
          return_home: 'Volver al Inicio',
          submit_another: 'Enviar Otra Consulta'
        },
        common: {
          loading: 'Cargando...',
          search: 'Buscar',
          filter: 'Filtro',
          sort: 'Ordenar',
          page: 'Página',
          previous: 'Anterior',
          next: 'Siguiente'
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
