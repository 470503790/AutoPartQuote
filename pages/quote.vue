<template>
  <div class="quote-page">
    <h1>{{ $t('quote.title') }}</h1>
    
    <div class="quote-container">
      <section class="quote-items">
        <h2>{{ $t('quote.yourItems') }}</h2>
        
        <div v-if="quoteItems.length === 0" class="empty-quote">
          <p>No items in your quote yet.</p>
          <NuxtLink to="/search" class="browse-link">Browse Parts</NuxtLink>
        </div>
        
        <div v-else>
          <table class="quote-table">
            <thead>
              <tr>
                <th>{{ $t('quote.itemName') }}</th>
                <th>{{ $t('quote.quantity') }}</th>
                <th>{{ $t('quote.unitPrice') }}</th>
                <th>{{ $t('quote.totalPrice') }}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in quoteItems" :key="item.id">
                <td>
                  <div class="item-info">
                    <img :src="item.image" :alt="item.name" class="item-image" />
                    <div>
                      <div class="item-name">{{ item.name }}</div>
                      <div class="item-number">{{ item.partNumber }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <input 
                    type="number" 
                    v-model.number="item.quantity" 
                    min="1" 
                    class="quantity-input"
                    @change="updateTotal"
                  />
                </td>
                <td>${{ item.price.toFixed(2) }}</td>
                <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                <td>
                  <button @click="removeItem(item.id)" class="remove-btn">
                    {{ $t('common.delete') }}
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="3"><strong>Total:</strong></td>
                <td><strong>${{ totalAmount.toFixed(2) }}</strong></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      
      <section class="contact-form" v-if="quoteItems.length > 0">
        <h2>{{ $t('quote.contactInfo') }}</h2>
        
        <form @submit.prevent="submitQuote" class="quote-form">
          <div class="form-group">
            <label for="name">{{ $t('quote.name') }} *</label>
            <input 
              type="text" 
              id="name" 
              v-model="contactInfo.name" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="email">{{ $t('quote.email') }} *</label>
            <input 
              type="email" 
              id="email" 
              v-model="contactInfo.email" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="phone">{{ $t('quote.phone') }} *</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="contactInfo.phone" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="company">{{ $t('quote.company') }}</label>
            <input 
              type="text" 
              id="company" 
              v-model="contactInfo.company" 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="message">{{ $t('quote.message') }}</label>
            <textarea 
              id="message" 
              v-model="contactInfo.message" 
              rows="4" 
              class="form-input"
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? $t('common.loading') : $t('quote.submitQuote') }}
          </button>
        </form>
      </section>
    </div>
    
    <!-- Success Modal -->
    <div v-if="showSuccess" class="modal-overlay" @click="closeSuccess">
      <div class="modal-content" @click.stop>
        <h3>{{ $t('quote.success') }}</h3>
        <p>We will contact you shortly with your quote.</p>
        <button @click="closeSuccess" class="close-btn">{{ $t('common.close') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotePage',
  data() {
    return {
      quoteItems: [
        // Sample items - in real app this would come from store/API
        {
          id: 1,
          name: 'Brake Pads Set',
          partNumber: 'BP-001',
          price: 89.99,
          quantity: 1,
          image: '/images/brake-pads.jpg'
        },
        {
          id: 2,
          name: 'Air Filter',
          partNumber: 'AF-002',
          price: 24.99,
          quantity: 2,
          image: '/images/air-filter.jpg'
        }
      ],
      contactInfo: {
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      },
      isSubmitting: false,
      showSuccess: false
    }
  },
  computed: {
    totalAmount() {
      return this.quoteItems.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    }
  },
  methods: {
    updateTotal() {
      // Force reactivity update
      this.$forceUpdate()
    },
    removeItem(itemId) {
      this.quoteItems = this.quoteItems.filter(item => item.id !== itemId)
    },
    async submitQuote() {
      this.isSubmitting = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app, send data to API
      const quoteData = {
        items: this.quoteItems,
        contact: this.contactInfo,
        total: this.totalAmount
      }
      
      console.log('Submitting quote:', quoteData)
      
      this.isSubmitting = false
      this.showSuccess = true
      
      // Reset form
      this.contactInfo = {
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      }
      this.quoteItems = []
    },
    closeSuccess() {
      this.showSuccess = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.quote-page h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.quote-container {
  display: grid;
  gap: 2rem;
  max-width: 1000px;
}

.quote-items h2,
.contact-form h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.empty-quote {
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.browse-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.quote-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.quote-table th,
.quote-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.quote-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.item-name {
  font-weight: 500;
}

.item-number {
  font-size: 0.9rem;
  color: #666;
}

.quantity-input {
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.remove-btn:hover {
  background-color: #c0392b;
}

.total-row {
  background-color: #f8f9fa;
  font-size: 1.1rem;
}

.quote-form {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
}

.submit-btn:hover:not(:disabled) {
  background-color: #27ae60;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  color: #2ecc71;
  margin-bottom: 1rem;
}

.close-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .quote-table {
    font-size: 0.9rem;
  }
  
  .quote-table th,
  .quote-table td {
    padding: 0.5rem;
  }
  
  .item-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .item-image {
    width: 40px;
    height: 40px;
  }
}
</style>