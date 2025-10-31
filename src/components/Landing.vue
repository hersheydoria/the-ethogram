<template>
  <div class="landing">
    <Hero @explore-articles="$emit('navigate-to-articles')" />
    
    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="features-title">Why Living Links?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📖</div>
            <h3>Comprehensive Content</h3>
            <p>Explore 18+ carefully curated articles covering animal behavior, welfare, ethics, and conservation.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌍</div>
            <h3>Global Perspective</h3>
            <p>Articles covering local initiatives, national campaigns, and international wildlife conservation efforts.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💡</div>
            <h3>Expert Insights</h3>
            <p>Learn from veterinary students, wildlife experts, and animal welfare professionals sharing their experiences.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🤝</div>
            <h3>Community Action</h3>
            <p>Discover how to get involved in animal rescue, education, and welfare initiatives in your community.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎓</div>
            <h3>Educational Resources</h3>
            <p>From responsible pet ownership to wildlife protection - comprehensive guides for all levels.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">✨</div>
            <h3>Inspiring Stories</h3>
            <p>Read creative expressions, success stories, and real-world examples of animal welfare in action.</p>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
import Hero from './Hero.vue'
</script>

<style scoped>
.landing {
  min-height: 100vh;
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-title {
  font-size: 2.8rem;
  color: #2c3e50;
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
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  padding: 2.5rem;
  border-radius: 15px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
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
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
}

.feature-card p {
  color: #666;
  line-height: 1.7;
  font-size: 0.95rem;
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
