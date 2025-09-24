// Product Types
export interface Product {
  id: string
  partNumber: string
  name: string
  description: string
  brand: string
  category: string
  price?: number
  currency?: string
  availability: 'in_stock' | 'out_of_stock' | 'limited' | 'discontinued'
  images: string[]
  specifications: ProductSpecification[]
  compatibleVehicles: CompatibleVehicle[]
  alternativeParts: AlternativePart[]
  weight?: number
  dimensions?: Dimensions
  warranty?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductSpecification {
  name: string
  value: string
  unit?: string
}

export interface CompatibleVehicle {
  make: string
  model: string
  year: string
  engine?: string
  transmission?: string
  trim?: string
}

export interface AlternativePart {
  id: string
  partNumber: string
  brand: string
  name: string
  price?: number
  availability: string
  compatibility: number // percentage
}

export interface Dimensions {
  length: number
  width: number
  height: number
  unit: string
}

// Inquiry Types
export interface InquiryPart {
  id: string
  partNumber: string
  description: string
  quantity: number
  targetPrice?: number
  currency?: string
  brand?: string
  notes?: string
}

export interface ContactInfo {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  country: string
  address?: string
  city?: string
  postalCode?: string
}

export interface Inquiry {
  id: string
  contactInfo: ContactInfo
  parts: InquiryPart[]
  attachments: FileAttachment[]
  additionalNotes?: string
  status: 'draft' | 'submitted' | 'processing' | 'quoted' | 'completed' | 'cancelled'
  submittedAt?: string
  responseDeadline?: string
  totalEstimatedValue?: number
  currency?: string
}

export interface FileAttachment {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
}

// Batch Inquiry Types
export interface BatchInquiry {
  id: string
  contactInfo: ContactInfo
  files: UploadedFile[]
  extractedParts: ExtractedPart[]
  status: 'uploading' | 'parsing' | 'reviewing' | 'submitted' | 'processing' | 'completed'
  submittedAt?: string
  confidence: number
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
  parseStatus: 'pending' | 'parsing' | 'completed' | 'error'
  parseResults?: ExtractedPart[]
}

export interface ExtractedPart {
  id: string
  partNumber: string
  description?: string
  quantity?: number
  brand?: string
  targetPrice?: number
  confidence: number
  sourceFile: string
  verified: boolean
  notes?: string
}

// Filter and Search Types
export interface ProductFilters {
  categories: string[]
  brands: string[]
  priceRange: {
    min?: number
    max?: number
  }
  availability: string[]
  compatibleWith?: {
    make?: string
    model?: string
    year?: string
  }
}

export interface SearchParams {
  query?: string
  filters: ProductFilters
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest'
  page: number
  perPage: number
}

export interface SearchResults<T> {
  items: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Category and Brand Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: Category[]
  productCount: number
  featured: boolean
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  website?: string
  country?: string
  productCount: number
  featured: boolean
}

// UI State Types
export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ErrorState {
  hasError: boolean
  message?: string
  code?: string
}

export interface PaginationState {
  page: number
  perPage: number
  total: number
  totalPages: number
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'file' | 'checkbox'
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    pattern?: string
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
  }
}

export interface FormError {
  field: string
  message: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: FormError[]
  meta?: {
    page?: number
    perPage?: number
    total?: number
    totalPages?: number
  }
}

// Navigation Types
export interface NavItem {
  name: string
  href: string
  icon?: string
  children?: NavItem[]
  external?: boolean
}

// SEO Types
export interface SEOMeta {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  siteName?: string
  locale?: string
}

// Language Types
export interface Language {
  code: string
  name: string
  flag?: string
  rtl?: boolean
}

// Theme Types
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
    }
  }
}

// Configuration Types
export interface AppConfig {
  name: string
  version: string
  api: {
    baseUrl: string
    timeout: number
  }
  features: {
    multiLanguage: boolean
    darkMode: boolean
    offline: boolean
  }
  seo: {
    defaultTitle: string
    titleTemplate: string
    defaultDescription: string
  }
  upload: {
    maxFileSize: number
    allowedTypes: string[]
    maxFiles: number
  }
}

// Event Types
export interface AppEvent {
  type: string
  payload?: any
  timestamp: number
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Status Types
export type Status = 'idle' | 'loading' | 'success' | 'error'
export type InquiryStatus = 'draft' | 'submitted' | 'processing' | 'quoted' | 'completed' | 'cancelled'
export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'limited' | 'discontinued'
export type FileParseStatus = 'pending' | 'parsing' | 'completed' | 'error'

// Locale Types
export type Locale = 'en' | 'zh' | 'es'
export type Currency = 'USD' | 'EUR' | 'CNY' | 'GBP' | 'JPY'
export type WeightUnit = 'kg' | 'lb' | 'g' | 'oz'
export type DimensionUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft'