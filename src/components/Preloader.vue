<template>
  <div v-if="isLoading" class="preloader-container">
    <div class="preloader-content">
      <!-- Animated paw prints -->
      <div class="paw-prints">
        <div class="paw paw-1"><Heart :size="28" fill="currentColor" /></div>
        <div class="paw paw-2"><Heart :size="28" fill="currentColor" /></div>
        <div class="paw paw-3"><Heart :size="28" fill="currentColor" /></div>
        <div class="paw paw-4"><Heart :size="28" fill="currentColor" /></div>
      </div>
      
      <!-- Loading text -->
      <div class="loading-text">
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
      </div>
      
      <!-- Animated heart -->
      <div class="heart-pulse"><Heart :size="32" fill="currentColor" /></div>
      
      <!-- Loading message -->
      <p class="loading-message">Connecting hearts to save animals</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Heart } from 'lucide-vue-next'

const isLoading = ref(true)

onMounted(() => {
  // Hide preloader after page loads
  window.addEventListener('load', () => {
    isLoading.value = false
  })
  
  // Fallback: hide after 3 seconds
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})
</script>

<style scoped>
.preloader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeOut 0.6s ease-out 2.4s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

.preloader-content {
  text-align: center;
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Paw prints animation */
.paw-prints {
  position: relative;
  height: 80px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.paw {
  font-size: 2.5rem;
  animation: pawWalk 2s ease-in-out infinite;
  opacity: 0.6;
}

.paw-1 {
  animation-delay: 0s;
}

.paw-2 {
  animation-delay: 0.3s;
}

.paw-3 {
  animation-delay: 0.6s;
}

.paw-4 {
  animation-delay: 0.9s;
}

@keyframes pawWalk {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) scale(1.1);
    opacity: 1;
  }
}

/* Loading dots animation */
.loading-text {
  margin: 20px 0;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  animation: dotBounce 1.4s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Heart pulse animation */
.heart-pulse {
  font-size: 3rem;
  margin: 20px 0;
  animation: heartBeat 1.2s ease-in-out infinite;
}

@keyframes heartBeat {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  20% {
    transform: scale(1.2);
    opacity: 1;
  }
  40% {
    transform: scale(1);
    opacity: 0.6;
  }
}

/* Loading message */
.loading-message {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-top: 30px;
  opacity: 0.9;
  animation: textFade 2s ease-in-out infinite;
}

@keyframes textFade {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .paw {
    font-size: 2rem;
  }

  .heart-pulse {
    font-size: 2.5rem;
  }

  .loading-message {
    font-size: 0.9rem;
  }
}
</style>
