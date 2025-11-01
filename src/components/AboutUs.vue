<template>
  <section class="about-us">
    <div class="about-container">
      <!-- Header -->
      <div class="about-header">
        <h1 class="about-title">About Living Links</h1>
        <p class="about-subtitle">Connecting hearts, changing lives, one article at a time</p>
      </div>

      <!-- Mission Section -->
      <div class="about-section">
        <Target :size="48" class="section-icon" />
        <h2 class="section-title">Our Mission</h2>
        <p class="section-content">
          Living Links is dedicated to promoting animal welfare through educational content, professional insights, and compassionate perspectives. We believe that knowledge and empathy are the foundations for creating a more humane world for all living beings.
        </p>
      </div>

      <!-- Vision Section -->
      <div class="about-section">
        <Globe :size="48" class="section-icon" />
        <h2 class="section-title">Our Vision</h2>
        <p class="section-content">
          We envision a world where animal welfare is prioritized, where veterinary professionals are supported in their work, and where every individual understands their role in creating a more compassionate society. Through our articles, we aim to bridge the gap between clinical practice, personal experiences, and community action.
        </p>
      </div>

      <!-- What We Cover Section -->
      <div class="about-section">
        <BookOpen :size="48" class="section-icon" />
        <h2 class="section-title">What We Cover</h2>
        <div class="category-list">
          <div class="category-item">
            <span class="category-badge personal-experiences">Personal Experiences</span>
            <p>Stories and insights from veterinary professionals and animal care workers</p>
          </div>
          <div class="category-item">
            <span class="category-badge professional-perspectives">Professional Perspectives</span>
            <p>Expert discussions on veterinary medicine, ethics, and best practices</p>
          </div>
          <div class="category-item">
            <span class="category-badge educational-articles">Educational Articles</span>
            <p>Comprehensive guides on animal welfare, pet ownership, and care</p>
          </div>
          <div class="category-item">
            <span class="category-badge spotlight-initiatives">Spotlight Initiatives</span>
            <p>Highlighting impactful programs and organizations in animal welfare</p>
          </div>
          <div class="category-item">
            <span class="category-badge creative-expressions">Creative Expressions</span>
            <p>Artistic works and creative advocacy for animal welfare</p>
          </div>
        </div>
      </div>

      <!-- Our Team Section -->
      <div class="about-section">
        <Users :size="48" class="section-icon" />
        <h2 class="section-title">Our Team</h2>
        <p class="section-content">
          Living Links brings together veterinarians, animal welfare advocates, educators, and passionate individuals who believe in the power of information and compassion. Our diverse team ensures that the content we share is accurate, insightful, and meaningful.
        </p>
      </div>

      <!-- Commitment Section -->
      <div class="about-section">
        <Heart :size="48" class="section-icon" />
        <h2 class="section-title">Our Commitment</h2>
        <p class="section-content">
          We are committed to:
        </p>
        <ul class="commitment-list">
          <li>Providing accurate, evidence-based information about animal welfare</li>
          <li>Amplifying diverse voices in the animal care community</li>
          <li>Supporting veterinary professionals and students</li>
          <li>Promoting sustainable and humane practices</li>
          <li>Building a compassionate community around animal welfare</li>
        </ul>
      </div>

      <!-- Call to Action -->
      <div class="about-cta">
        <h3>Join Our Community</h3>
        <p>Explore our articles and become part of the Living Links movement for animal welfare.</p>
        <button @click="$emit('navigate-to-articles')" class="cta-button">
          Explore Articles →
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Target, Globe, BookOpen, Users, Heart } from 'lucide-vue-next'

defineEmits(['navigate-to-articles'])
</script>

<style scoped>
.about-us {
  min-height: 100vh;
  padding: 5rem 2rem;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

:root.light-mode .about-us {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.about-us::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(37, 52, 79, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(97, 120, 145, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInDown 0.6s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-title {
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-subtitle {
  font-size: 1.3rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.about-section {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 40px var(--card-shadow);
  border: 2px solid var(--border-color);
  animation: fadeInUp 0.6s ease-out;
  transition: all 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-section:hover {
  box-shadow: 0 15px 50px rgba(37, 99, 235, 0.15);
  border-color: rgba(37, 99, 235, 0.2);
  transform: translateY(-5px);
}

.section-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  color: #2563eb;
  transition: all 0.3s ease;
}

.section-title {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
}

.section-content {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.category-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.category-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  border-left: 4px solid #2563eb;
  border-radius: 8px;
  background: var(--bg-secondary);
  transition: all 0.3s ease;
}

.category-item:hover {
  background: var(--card-bg);
  border-left-color: #f97316;
  transform: translateX(5px);
}

.category-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: capitalize;
  color: white;
  white-space: nowrap;
  flex-shrink: 0;
}

.category-badge.personal-experiences {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
}

.category-badge.professional-perspectives {
  background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
}

.category-badge.educational-articles {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.category-badge.spotlight-initiatives {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.category-badge.creative-expressions {
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
}

.category-item p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
}

.commitment-list {
  list-style: none;
  margin-top: 1.5rem;
  padding-left: 0;
}

.commitment-list li {
  font-size: 1.05rem;
  color: var(--text-primary);
  line-height: 1.8;
  padding: 0.8rem 0 0.8rem 2rem;
  position: relative;
  transition: color 0.3s ease;
}

.commitment-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 700;
  font-size: 1.2rem;
}

.about-cta {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
  box-shadow: 0 15px 50px rgba(37, 99, 235, 0.3);
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.about-cta h3 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.about-cta p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  transition: opacity 0.3s ease;
}

.cta-button {
  background: white;
  color: #2563eb;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 25px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  background: #f0f0f0;
}

.cta-button:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .about-us {
    padding: 3rem 1.5rem;
  }

  .about-title {
    font-size: 2.5rem;
  }

  .about-subtitle {
    font-size: 1.1rem;
  }

  .about-section {
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .section-content {
    font-size: 0.95rem;
  }

  .category-list {
    grid-template-columns: 1fr;
  }

  .about-cta {
    padding: 2rem;
  }

  .about-cta h3 {
    font-size: 1.8rem;
  }

  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 1.8rem;
  }

  .about-subtitle {
    font-size: 0.95rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .about-section {
    padding: 1.5rem;
  }

  .category-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .category-item:hover {
    transform: translateX(0);
  }

  .commitment-list li {
    padding-left: 1.5rem;
  }
}
</style>
