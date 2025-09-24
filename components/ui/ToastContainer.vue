<template>
  <div class="fixed top-4 right-4 space-y-2 z-50">
    <TransitionGroup
      name="toast"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="max-w-sm w-full bg-white rounded-lg shadow-lg border overflow-hidden"
        :class="getToastClass(toast.type)"
      >
        <div class="p-4">
          <div class="flex items-start">
            <Icon
              :name="getToastIcon(toast.type)"
              class="flex-shrink-0 w-5 h-5 mt-0.5 mr-3"
              :class="getIconClass(toast.type)"
            />
            <div class="flex-1">
              <h4 v-if="toast.title" class="text-sm font-medium text-gray-900 mb-1">
                {{ toast.title }}
              </h4>
              <p class="text-sm text-gray-600">{{ toast.message }}</p>
            </div>
            <button
              @click="removeToast(toast.id)"
              class="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600"
            >
              <Icon name="heroicons:x-mark" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
}

const toasts = ref<Toast[]>([])

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Date.now().toString()
  const newToast: Toast = { ...toast, id }
  
  toasts.value.push(newToast)
  
  // Auto remove after duration
  const duration = toast.duration || 5000
  setTimeout(() => {
    removeToast(id)
  }, duration)
}

const removeToast = (id: string) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const getToastClass = (type: Toast['type']) => {
  const classes = {
    success: 'border-green-200',
    error: 'border-red-200',
    warning: 'border-yellow-200',
    info: 'border-blue-200'
  }
  return classes[type]
}

const getToastIcon = (type: Toast['type']) => {
  const icons = {
    success: 'heroicons:check-circle',
    error: 'heroicons:x-circle',
    warning: 'heroicons:exclamation-triangle',
    info: 'heroicons:information-circle'
  }
  return icons[type]
}

const getIconClass = (type: Toast['type']) => {
  const classes = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }
  return classes[type]
}

// Provide toast methods globally
provide('toast', { addToast, removeToast })

// Export for use in composables
defineExpose({ addToast, removeToast })
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>