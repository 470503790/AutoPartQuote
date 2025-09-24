# AutoPartQuote - Multilingual Auto Parts Quote System

A modern, multilingual auto parts quotation system built with Nuxt.js and Vue I18n.

## Features

- ✅ **Multilingual Support**: English, Chinese (中文), and Spanish (Español)
- ✅ **Route-based Localization**: URL prefixes for different languages (/zh, /es)
- ✅ **Language Detection**: Automatic browser language detection with manual override
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Modern Framework**: Built with Nuxt.js 4.x and Vue I18n

## Pages Implemented

### 🏠 Home Page (`/`)
- Hero section with search functionality
- Featured auto parts grid
- Popular brands showcase
- Fully translated content

### 🔍 Search Page (`/search`)
- Advanced filtering (category, brand, price range)
- Sortable results
- Add to quote functionality
- Multilingual search interface

### 📋 Quote Page (`/quote`)
- Shopping cart-style quote management
- Contact form for quote requests
- Quantity adjustments
- Total calculations

### ℹ️ About Page (`/about`)
- Company information
- Mission statement
- Feature highlights with icons
- Statistics section

### 📞 Contact Page (`/contact`)
- Contact information display
- Contact form
- Business hours
- Address details

## Language Support

### English (Default)
- URL: `/` (root)
- Full navigation and content

### Chinese (中文)
- URL: `/zh`
- Simplified Chinese translations
- Chinese typography considerations

### Spanish (Español)
- URL: `/es`
- Complete Spanish translations
- Longer text adaptations

## Technical Implementation

### Stack
- **Frontend**: Nuxt.js 4.1.2
- **Internationalization**: @nuxtjs/i18n 10.1.0
- **Styling**: CSS3 with responsive design
- **Language Detection**: Browser-based with cookie persistence

### Project Structure
```
├── components/
│   └── LanguageSwitcher.vue    # Language selection component
├── layouts/
│   └── default.vue             # Main layout with navigation
├── locales/
│   ├── en.json                 # English translations
│   ├── zh.json                 # Chinese translations
│   └── es.json                 # Spanish translations
├── pages/
│   ├── index.vue               # Home page
│   ├── search.vue              # Search functionality  
│   ├── quote.vue               # Quote management
│   ├── about.vue               # About page
│   └── contact.vue             # Contact page
├── assets/css/
│   └── main.css                # Global styles with i18n adaptations
├── i18n.config.ts              # I18n configuration
└── nuxt.config.ts              # Main Nuxt configuration
```

## SEO & Accessibility

- **hreflang Support**: Automatic generation of hreflang meta tags
- **Language-specific Meta**: Dynamic title and description per locale
- **Text Direction**: RTL support ready for future languages
- **Responsive Typography**: Font adjustments per language

## Development

### Setup
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

### Language Configuration
Languages are configured in `nuxt.config.ts`:
- Route strategy: `prefix_except_default`
- Default locale: `en`
- Browser detection: Enabled with cookie persistence

## Current Status

✅ **Implemented**:
- Nuxt.js project structure with i18n module
- All main pages with responsive layouts
- Language switcher with route prefixes
- Translation files for 3 languages
- Browser language detection
- Mobile-responsive design

🔧 **In Progress**:
- Fine-tuning translation loading
- SEO hreflang implementation
- Long text layout optimizations

📋 **Next Steps**:
- Complete translation loading fix
- Add search functionality backend
- Implement quote persistence
- Add product images
- Testing with different content lengths

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Tested on desktop Chrome, Firefox, Safari, Edge

## License

MIT License - see LICENSE file for details.