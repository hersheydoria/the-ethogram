<template>
  <section class="hero">
    <div class="hero-wrapper">
      <div class="hero-banner">
        <img src="../assets/banner1.png" alt="Animal Welfare" class="banner-image" />
      </div>
      
      <div class="hero-footer">
        <div class="hero-cta">
          <button class="cta-button primary" @click="$emit('explore-articles')">Explore Blogs</button>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <div class="stat-icon"><BookOpen /></div>
            <div class="stat-number">18+</div>
            <div class="stat-text">Blogs</div>
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
    </div>
  </section>
</template>

<script setup>
import { Sparkles, BookOpen, Globe, Lightbulb } from 'lucide-vue-next'

defineEmits(['explore-articles'])
</script>

<style scoped>
.hero {
  padding: 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: auto;
  display: block;
  background: transparent;
}

.hero-wrapper {
  padding: 0;
  margin: 0;
  width: 100%;
  background: transparent;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Banner Section */
.hero-banner {
  width: 100%;
  overflow: hidden;
  border-radius: 0;
  margin-bottom: 0;
  position: relative;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 70vh;
  image-rendering: high-quality;
  image-rendering: -webkit-optimize-contrast;
  filter: contrast(1.05) brightness(1.02) saturate(1.08);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0) scale(1);
  -webkit-transform: translateZ(0) scale(1);
  animation: bannerFadeInZoom 1s ease-out forwards, bannerFloat 6s ease-in-out infinite;
  animation-delay: 0s, 1s;
}

.banner-image:hover {
  animation-play-state: paused;
  filter: contrast(1.1) brightness(1.05) saturate(1.15);
}

@keyframes bannerFadeInZoom {
  from {
    opacity: 0;
    transform: translateZ(0) scale(0.95);
    filter: contrast(0.8) brightness(0.9) saturate(0.7);
  }
  to {
    opacity: 1;
    transform: translateZ(0) scale(1);
    filter: contrast(1.05) brightness(1.02) saturate(1.08);
  }
}

@keyframes bannerFloat {
  0%, 100% {
    transform: translateZ(0) scale(1) translateY(0px);
  }
  50% {
    transform: translateZ(0) scale(1) translateY(-8px);
  }
}

.hero-footer {
  padding: 3rem 2rem;
  text-align: center;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  background: rgba(90, 122, 148, 0.05);
  border-radius: 15px;
  border: 2px solid rgba(90, 122, 148, 0.15);
  max-width: 600px;
  margin: 1.5rem auto 0;
}

:root.light-mode .hero-stats {
  background: white;
  border: 2px solid rgba(90, 122, 148, 0.15);
}

:root.dark-mode .hero-stats {
  background: rgba(20, 30, 50, 0.8);
  border: 2px solid rgba(37, 99, 235, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon {
  font-size: 2rem;
  color: #4A6D42;
}

:root.dark-mode .stat-icon {
  color: white;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1F2937;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root.dark-mode .stat-number {
  color: white;
}

.stat-text {
  font-size: 0.9rem;
  color: #374151;
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root.dark-mode .stat-text {
  color: white;
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
  .hero-wrapper {
    box-shadow: none;
  }

  .hero-banner {
    border-radius: 0;
  }

  .banner-image {
    max-height: 60vh;
  }

  .hero {
    padding: 2.5rem 0;
    min-height: auto;
  }

  .hero-footer {
    padding: 2.5rem 1.5rem;
  }

  .hero-overlay {
    background: rgba(0, 0, 0, 0.75);
  }

  .hero-title {
    font-size: 2.3rem;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 1.8rem;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    padding: 1.8rem;
    border: none;
    background: transparent;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 600px) {
  .hero-wrapper {
    box-shadow: none;
  }

  .hero-banner {
    border-radius: 0;
    margin-bottom: 0;
  }

  .banner-image {
    max-height: 55vh;
    border-radius: 0;
  }

  .hero {
    padding: 2rem 0;
  }

  .hero-footer {
    padding: 2rem 1.2rem;
  }

  .hero-title {
    font-size: 2rem;
    margin-bottom: 1.2rem;
  }

  .hero-description {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1.3rem;
    border: none;
    background: transparent;
    margin: 1.2rem auto 0;
  }

  .stat-number {
    font-size: 1.3rem;
  }

  .stat-text {
    font-size: 0.8rem;
  }

  .cta-button {
    padding: 0.85rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-wrapper {
    box-shadow: none;
    margin: 0;
    padding: 0;
  }

  .hero-banner {
    border-radius: 0;
    margin-bottom: 0;
    overflow: hidden;
  }

  .banner-image {
    max-height: 50vh;
    border-radius: 0;
    margin: 0;
    padding: 0;
  }

  .hero {
    padding: 0;
    min-height: auto;
  }

  .hero-footer {
    padding: 1.5rem 1rem;
  }

  .hero-overlay {
    background: rgba(0, 0, 0, 0.75);
  }

  .hero-title {
    font-size: 1.7rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .hero-description {
    font-size: 0.9rem;
    margin-bottom: 1.3rem;
    line-height: 1.6;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
    padding: 1rem;
    border: none;
    background: transparent;
    margin: 1rem auto 0;
  }

  .stat {
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .stat-icon {
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .stat-number {
    font-size: 0.95rem;
    font-weight: 800;
  }

  .stat-text {
    font-size: 0.7rem;
  }

  .cta-button {
    width: 100%;
    padding: 0.7rem 1rem;
    font-size: 0.8rem;
  }

  .cta-button.primary {
    padding: 0.7rem 1rem;
  }

  .hero-cta {
    flex-direction: column;
    margin-bottom: 1.2rem;
    gap: 0.6rem;
  }
}
</style>

