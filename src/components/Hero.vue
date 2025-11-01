<template>
  <section class="hero">
    <div class="hero-background">
      <img src="../assets/animal-welfare.png" alt="Animal Welfare" class="hero-bg-image" />
      <div class="hero-overlay"></div>
    </div>
    
    <div class="hero-content">
      <div class="hero-badge"><Sparkles class="badge-icon" /> Welcome to The Ethogram</div>
      <h2 class="hero-title">Compassion in Motion for<br><span class="highlight">a Kinder World</span></h2>
      <p class="hero-description">
        Explore in-depth articles on animal behavior, veterinary science, ethical practices, 
        and wildlife conservation. Learn from experts and discover actionable insights that 
        create meaningful change for animals and communities worldwide.
      </p>
      
      <div class="hero-cta">
        <button class="cta-button primary" @click="$emit('explore-articles')">Explore Articles</button>
      </div>

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
    </div>
  </section>
</template>

<script setup>
import { Sparkles, BookOpen, Globe, Lightbulb } from 'lucide-vue-next'

defineEmits(['explore-articles'])
</script>

<style scoped>
.hero {
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
}

/* Background Image Section */
.hero-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-bg-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  right: 0;
  top: 0;
}

.hero-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
}

.hero-content {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
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
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(188, 108, 37, 0.3);
}

.badge-icon {
  display: inline;
  margin-right: 0.5rem;
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
  background: linear-gradient(135deg, #BC6C25 0%, #606C38 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
}

.hero-description {
  font-size: 1.15rem;
  color: white;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
}

/* CTA Buttons */
.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
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
  background: #4A6D42;
  color: white;
  box-shadow: 0 8px 25px rgba(74, 109, 66, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(74, 109, 66, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: #4A6D42;
  border: 2px solid #4A6D42;
}

.cta-button.secondary:hover {
  background: #4A6D42;
  color: white;
  transform: translateY(-3px);
}

/* Stats Section */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  max-width: 600px;
  margin: 0 auto;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon {
  font-size: 2rem;
  color: white;
  animation: bounce 2s ease-in-out infinite;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 800;
  color: white;
}

.stat-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.8rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem;
    min-height: 60vh;
  }

  .hero-overlay {
    background: rgba(0, 0, 0, 0.75);
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 1.3rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2rem 1rem;
    min-height: 50vh;
  }

  .hero-overlay {
    background: rgba(0, 0, 0, 0.75);
  }

  .hero-title {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 0.85rem;
    margin-bottom: 1.2rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 1rem;
  }

  .stat {
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
  }

  .stat-icon {
    font-size: 1.5rem;
  }

  .stat-number {
    font-size: 1.1rem;
  }

  .stat-text {
    font-size: 0.8rem;
  }

  .cta-button {
    width: 100%;
    padding: 0.8rem 1rem;
  }

  .cta-button.primary {
    padding: 1rem 1.5rem;
  }

  .hero-cta {
    flex-direction: column;
    margin-bottom: 2rem;
  }
}
</style>

