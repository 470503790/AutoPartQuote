export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      nav: {
        home: 'Home',
        search: 'Search Parts',
        quote: 'Get Quote',
        about: 'About',
        contact: 'Contact'
      },
      home: {
        title: 'Auto Parts Quote System',
        subtitle: 'Find the right parts for your vehicle at the best prices',
        searchPlaceholder: 'Enter part number or description',
        searchButton: 'Search',
        featuredParts: 'Featured Parts',
        popularBrands: 'Popular Brands'
      },
      search: {
        title: 'Search Auto Parts',
        addToQuote: 'Add to Quote'
      },
      common: {
        languageSelector: 'Language'
      }
    },
    zh: {
      nav: {
        home: '首页',
        search: '搜索配件',
        quote: '获取报价',
        about: '关于我们',
        contact: '联系我们'
      },
      home: {
        title: '汽车配件报价系统',
        subtitle: '为您的车辆找到合适的配件，价格最优',
        searchPlaceholder: '输入配件编号或描述',
        searchButton: '搜索',
        featuredParts: '精选配件',
        popularBrands: '热门品牌'
      },
      search: {
        title: '搜索汽车配件',
        addToQuote: '添加到报价单'
      },
      common: {
        languageSelector: '语言'
      }
    },
    es: {
      nav: {
        home: 'Inicio',
        search: 'Buscar Repuestos',
        quote: 'Obtener Cotización',
        about: 'Acerca de',
        contact: 'Contacto'
      },
      home: {
        title: 'Sistema de Cotización de Repuestos de Auto',
        subtitle: 'Encuentre los repuestos correctos para su vehículo a los mejores precios',
        searchPlaceholder: 'Ingrese número de repuesto o descripción',
        searchButton: 'Buscar',
        featuredParts: 'Repuestos Destacados',
        popularBrands: 'Marcas Populares'
      },
      search: {
        title: 'Buscar Repuestos de Auto',
        addToQuote: 'Agregar a Cotización'
      },
      common: {
        languageSelector: 'Idioma'
      }
    }
  }
}))