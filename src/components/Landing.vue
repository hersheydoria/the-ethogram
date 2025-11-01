<template>
  <div class="landing">
    <Hero @explore-articles="$emit('navigate-to-articles')" />
    
    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="features-title">Why The Ethogram?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"><BookMarked /></div>
            <h3>Curated Articles</h3>
            <p>18+ carefully researched articles on animal behavior, welfare, ethics, veterinary science, and conservation.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Globe /></div>
            <h3>Global Perspective</h3>
            <p>Discover local initiatives, national campaigns, and international efforts in animal welfare and protection.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Stethoscope /></div>
            <h3>Expert Contributions</h3>
            <p>Learn from veterinarians, wildlife specialists, and animal welfare professionals sharing real experiences.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Users /></div>
            <h3>Community Driven</h3>
            <p>Explore rescue operations, educational outreach, and local initiatives making tangible differences.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><GraduationCap /></div>
            <h3>Educational Content</h3>
            <p>Comprehensive guides covering responsible pet ownership, wildlife protection, and ethical practices.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Lightbulb /></div>
            <h3>Inspiring Voices</h3>
            <p>Amplifying creative expressions, success stories, and personal perspectives on animal advocacy.</p>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
import Hero from './Hero.vue'
import { BookMarked, Globe, Stethoscope, Users, GraduationCap, Lightbulb } from 'lucide-vue-next'
</script>

<style scoped>
.landing {
  min-height: 100vh;
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-title {
  font-size: 2.8rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.feature-card {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 15px;
  border: 1px solid var(--border-color);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  color: var(--text-primary);
}

:root.light-mode .feature-card {
  background: #CBD5E1;
  color: #1F2937;
  border-color: #9CA3AF;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 15px 40px var(--card-shadow);
}

:root.light-mode .feature-card:hover {
  border-color: #6B7280;
  box-shadow: 0 15px 40px rgba(107, 114, 128, 0.3);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.2rem;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.feature-card h3 {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

:root.light-mode .feature-card h3 {
  color: #1F2937;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  text-align: justify;
  transition: color 0.3s ease;
}

:root.light-mode .feature-card p {
  color: #4B5563;
}

@media (max-width: 768px) {
  .features-section {
    padding: 3rem 1.5rem;
  }

  .features-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
