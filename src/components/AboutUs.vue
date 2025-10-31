<template>
  <div class="about-page">
    <button class="back-btn" @click="$emit('back')">← Back to Articles</button>
    
    <article class="about-content">
      <header class="about-header">
        <h1>About Living Links</h1>
        <p class="subtitle">Connecting Hearts for Animal Welfare</p>
      </header>

      <section class="about-section">
        <h2>Our Mission</h2>
        <p>
          Living Links is dedicated to advancing animal welfare through education, awareness, and community action. 
          We believe that understanding and compassion are the foundations for creating a more humane world for all animals.
        </p>
      </section>

      <section class="about-section">
        <h2>What We Do</h2>
        <p>
          We provide comprehensive information and resources across multiple areas of animal welfare, including:
        </p>
        <ul>
          <li><strong>Clinical Care:</strong> Best practices in veterinary medicine and animal health</li>
          <li><strong>Education:</strong> Learning resources to build animal welfare knowledge</li>
          <li><strong>Ethics:</strong> Exploring moral considerations in our relationship with animals</li>
          <li><strong>Wellness:</strong> Holistic approaches to animal wellbeing</li>
          <li><strong>Conservation:</strong> Wildlife protection and ecosystem preservation</li>
          <li><strong>Rescue & Rehabilitation:</strong> Supporting animals in need</li>
          <li><strong>Community Engagement:</strong> Building awareness and driving action</li>
        </ul>
      </section>

      <section class="about-section">
        <h2>Our Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <span class="value-icon">🤝</span>
            <h3>Compassion</h3>
            <p>We approach all animals with empathy and kindness</p>
          </div>
          <div class="value-card">
            <span class="value-icon">📚</span>
            <h3>Education</h3>
            <p>Knowledge empowers meaningful change</p>
          </div>
          <div class="value-card">
            <span class="value-icon">🌍</span>
            <h3>Sustainability</h3>
            <p>Creating lasting positive impact for all creatures</p>
          </div>
          <div class="value-card">
            <span class="value-icon">👥</span>
            <h3>Community</h3>
            <p>United action creates the strongest change</p>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h2>Our Content</h2>
        <p>
          Living Links offers articles across 16 categories covering diverse aspects of animal welfare. From clinical 
          veterinary insights to creative storytelling, from wildlife conservation to one health approaches, our content 
          is designed to inform, inspire, and empower readers to make compassionate choices.
        </p>
      </section>

      <section class="about-section">
        <h2>Join Our Community</h2>
        <p>
          Whether you're a veterinary professional, animal enthusiast, educator, or simply someone who cares about 
          animal welfare, Living Links welcomes you. Explore our articles, share your knowledge, and become part of 
          a community dedicated to creating positive change for animals worldwide.
        </p>
      </section>

      <div class="cta-section">
        <p>Ready to explore our resources?</p>
        <button class="explore-btn" @click="$emit('navigate-to-articles')">Explore Articles</button>
      </div>
    </article>
  </div>
</template>

<script setup>
defineEmits(['back', 'navigate-to-articles'])
</script>

<style scoped>
.about-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-btn {
  background: linear-gradient(135deg, #25344F 0%, #6F4D38 100%);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 52, 79, 0.3);
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: slideDown 0.6s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-header h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #25344F 0%, #6F4D38 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.2rem;
  color: #8D957E;
  font-style: italic;
  font-weight: 500;
}

.about-content {
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  border: 1px solid rgba(37, 52, 79, 0.1);
}

.about-section {
  margin-bottom: 2.5rem;
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-section:nth-child(1) { animation-delay: 0.1s; }
.about-section:nth-child(2) { animation-delay: 0.2s; }
.about-section:nth-child(3) { animation-delay: 0.3s; }
.about-section:nth-child(4) { animation-delay: 0.4s; }
.about-section:nth-child(5) { animation-delay: 0.5s; }
.about-section:nth-child(6) { animation-delay: 0.6s; }

.about-section h2 {
  font-size: 1.6rem;
  color: #25344F;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #6F4D38;
}

.about-section p {
  color: #555;
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.about-section ul {
  list-style: none;
  padding: 0;
}

.about-section li {
  color: #555;
  line-height: 1.8;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.about-section li::before {
  content: '🐾';
  position: absolute;
  left: 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.value-card {
  background: linear-gradient(135deg, rgba(141, 149, 126, 0.1) 0%, rgba(111, 77, 56, 0.1) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(141, 149, 126, 0.2);
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(141, 149, 126, 0.2);
  background: linear-gradient(135deg, rgba(141, 149, 126, 0.15) 0%, rgba(111, 77, 56, 0.15) 100%);
}

.value-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.value-card h3 {
  color: #25344F;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.value-card p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0;
}

.cta-section {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
}

.cta-section p {
  font-size: 1.1rem;
  color: #25344F;
  margin-bottom: 1rem;
  font-weight: 600;
}

.explore-btn {
  background: linear-gradient(135deg, #8D957E 0%, #7a8669 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(141, 149, 126, 0.4);
}

@media (max-width: 768px) {
  .about-page {
    padding: 1rem;
  }

  .about-content {
    padding: 1.5rem;
  }

  .about-header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .about-section h2 {
    font-size: 1.3rem;
  }

  .about-section p {
    font-size: 0.95rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
