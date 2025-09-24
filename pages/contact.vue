<template>
  <div class="contact-page">
    <h1>{{ $t('contact.title') }}</h1>
    
    <div class="contact-container">
      <section class="contact-info">
        <h2>Get in Touch</h2>
        
        <div class="info-item">
          <div class="info-icon">📍</div>
          <div>
            <h3>{{ $t('contact.address') }}</h3>
            <p>123 Auto Parts Street<br>Auto City, AC 12345<br>United States</p>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">📞</div>
          <div>
            <h3>{{ $t('contact.phone') }}</h3>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">✉️</div>
          <div>
            <h3>{{ $t('contact.email') }}</h3>
            <p>info@autopartquote.com</p>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">🕒</div>
          <div>
            <h3>{{ $t('contact.hours') }}</h3>
            <p>Monday - Friday: 8:00 AM - 6:00 PM<br>
               Saturday: 9:00 AM - 4:00 PM<br>
               Sunday: Closed</p>
          </div>
        </div>
      </section>
      
      <section class="contact-form">
        <h2>Send us a Message</h2>
        
        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="name">{{ $t('contact.form.name') }} *</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="email">{{ $t('contact.form.email') }} *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="subject">{{ $t('contact.form.subject') }} *</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              required 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="message">{{ $t('contact.form.message') }} *</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              required 
              rows="6" 
              class="form-input"
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? $t('common.loading') : $t('contact.form.send') }}
          </button>
        </form>
      </section>
    </div>
    
    <!-- Success Modal -->
    <div v-if="showSuccess" class="modal-overlay" @click="closeSuccess">
      <div class="modal-content" @click.stop>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We will get back to you soon.</p>
        <button @click="closeSuccess" class="close-btn">{{ $t('common.close') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      showSuccess: false
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app, send data to API
      console.log('Submitting contact form:', this.form)
      
      this.isSubmitting = false
      this.showSuccess = true
      
      // Reset form
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    },
    closeSuccess() {
      this.showSuccess = false
    }
  }
}
</script>

<style scoped>
.contact-page h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-info h2,
.contact-form h2 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-icon {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.info-item h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.info-item p {
  color: #555;
  line-height: 1.6;
}

.contact-form {
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
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2980b9;
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
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .info-item {
    margin-bottom: 1.5rem;
  }
  
  .contact-form {
    padding: 1.5rem;
  }
}
</style>