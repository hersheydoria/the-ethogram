<template>
  <section class="hero">
    <div class="hero-background">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>
    
    <div class="hero-content">
      <div class="hero-badge"><Sparkles class="badge-icon" /> Welcome to Living Links</div>
      <h2 class="hero-title">Connecting Knowledge for<br><span class="highlight">Animal Welfare & Conservation</span></h2>
      <p class="hero-description">
        Explore in-depth articles on animal behavior, veterinary science, ethical practices, 
        and wildlife conservation. Learn from experts and discover actionable insights that 
        create meaningful change for animals and communities worldwide.
      </p>
      
      <div class="hero-stats">
        <div class="stat">
          <div class="stat-icon"><BookOpen /></div>
          <div class="stat-number">18+</div>
          <div class="stat-text">Articles</div>
        </div>
        <div class="stat">
          <div class="stat-icon"><Globe /></div>
          <div class="stat-number">5</div>
          <div class="stat-text">Categories</div>
        </div>
        <div class="stat">
          <div class="stat-icon"><Lightbulb /></div>
          <div class="stat-number">100%</div>
          <div class="stat-text">Compassion</div>
        </div>
      </div>

      <div class="hero-cta">
        <button class="cta-button primary" @click="$emit('explore-articles')">Explore Articles</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Sparkles, BookOpen, Globe, Lightbulb } from 'lucide-vue-next'

defineEmits(['explore-articles'])
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animated Background Blobs */
.hero-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: white;
  bottom: -100px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: white;
  top: -50px;
  left: -50px;
  animation: float 10s ease-in-out infinite reverse;
}

.blob-3 {
  width: 250px;
  height: 250px;
  background: white;
  top: 50%;
  left: 50%;
  animation: float 12s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -1px;
}

.hero-title .highlight {
  background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
}

.hero-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Stats Section */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.stat-icon {
  font-size: 2.rem;
  color: white;
  animation: bounce 2s ease-in-out infinite;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
}

.stat-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* CTA Buttons */
.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-button.primary {
  background: white;
  color: #667eea;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-button.secondary:hover {
  background: white;
  color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem;
    min-height: 50vh;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .blob-1 {
    width: 250px;
    height: 250px;
  }

  .blob-2 {
    width: 200px;
    height: 200px;
  }

  .blob-3 {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2rem 1rem;
    min-height: 45vh;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .cta-button {
    width: 100%;
    padding: 0.8rem 1rem;
  }

  .hero-cta {
    gap: 1rem;
  }
}
</style>
