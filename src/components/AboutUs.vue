<template>
  <section class="about-us">
    <div class="about-container">
      <!-- Header -->
      <div class="about-header">
        <h1 class="about-title">About The Ethogram</h1>
        <p class="about-subtitle">Compassion in Motion for a Kinder World</p>
      </div>

      <!-- Mission Section -->
      <div class="about-section">
        <Target :size="48" class="section-icon" />
        <h2 class="section-title">Our Mission</h2>
        <p class="section-content">
          The Ethogram is dedicated to promoting animal welfare through educational content, professional insights, and compassionate perspectives. We believe that knowledge and empathy are the foundations for creating a more humane world for all living beings.
        </p>
      </div>

      <!-- Vision Section -->
      <div class="about-section">
        <Globe :size="48" class="section-icon" />
        <h2 class="section-title">Our Vision</h2>
        <p class="section-content">
          We envision a world where animal welfare is prioritized, where veterinary professionals are supported in their work, and where every individual understands their role in creating a more compassionate society. Through our blogs, we aim to bridge the gap between clinical practice, personal experiences, and community action.
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
          The Ethogram brings together veterinarians, animal welfare advocates, educators, and passionate individuals who believe in the power of information and compassion. Our diverse team ensures that the content we share is accurate, insightful, and meaningful.
        </p>
        <button @click="$emit('navigate-to-team')" class="team-btn">
          Meet Our Team →
        </button>
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
        <p>Explore our blogs and become part of The Ethogram movement for animal welfare.</p>
        <button @click="$emit('navigate-to-articles')" class="cta-button">
          Explore Blogs →
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Target, Globe, BookOpen, Users, Heart } from 'lucide-vue-next'

defineEmits(['navigate-to-articles', 'navigate-to-team'])
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

:root.light-mode .about-section {
  background: #FFFFFF;
  border-color: #E5E7EB;
  box-shadow: 0 10px 40px rgba(155, 163, 175, 0.15);
  color: #1F2937;
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

:root.light-mode .about-section:hover {
  box-shadow: 0 15px 50px rgba(90, 122, 148, 0.3);
  border-color: #5A7A94;
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

:root.light-mode .section-title {
  color: #1F3A52;
}

.section-content {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

:root.light-mode .section-content {
  color: #3D5A7D;
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
  border-left: 4px solid #BC6C25;
  border-radius: 8px;
  background: rgba(188, 108, 37, 0.1);
  transition: all 0.3s ease;
}

:root.dark-mode .category-item {
  background: rgba(188, 108, 37, 0.15);
  border-left-color: #DDA15E;
}

:root.light-mode .category-item {
  background: rgba(45, 81, 130, 0.08);
  border-left-color: #7FA8C9;
}

.category-item:hover {
  border-left-color: #BC6C25;
  transform: translateX(5px);
}

:root.dark-mode .category-item:hover {
  border-left-color: #DDA15E;
}

:root.light-mode .category-item:hover {
  border-left-color: #5B8EC9;
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
  background: linear-gradient(135deg, #BC6C25 0%, #A55A1F 100%);
}

.category-badge.professional-perspectives {
  background: linear-gradient(135deg, #DDA15E 0%, #CC8F48 100%);
}

.category-badge.educational-articles {
  background: linear-gradient(135deg, #C49A36 0%, #A67C2F 100%);
  color: white;
}

.category-badge.spotlight-initiatives {
  background: linear-gradient(135deg, #4A6D42 0%, #3D5C35 100%);
}

.category-badge.creative-expressions {
  background: linear-gradient(135deg, #606C38 0%, #4D5829 100%);
}

.category-item p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
}

:root.light-mode .category-item p {
  color: #4B5563;
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

:root.light-mode .commitment-list li {
  color: #1F3A52;
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
  background: #5A7A94;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
  box-shadow: 0 15px 50px rgba(90, 122, 148, 0.3);
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

:root.dark-mode .about-cta {
  background: rgba(20, 30, 50, 0.8);
  border: 2px solid rgba(37, 99, 235, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.cta-button {
  background: #4A6D42;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 25px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(74, 109, 66, 0.3);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(74, 109, 66, 0.4);
}

.cta-button:active {
  transform: translateY(-1px);
}

.team-btn {
  background: #4A6D42;
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 109, 66, 0.25);
  margin-top: 1rem;
  display: inline-block;
}

.team-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 109, 66, 0.35);
}

.team-btn:active {
  transform: translateY(0px);
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
