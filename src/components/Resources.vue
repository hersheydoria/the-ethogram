<template>
  <div class="resources-page">
    <button class="back-btn" @click="$emit('back')">← Back to Articles</button>
    
    <article class="resources-content">
      <header class="resources-header">
        <h1>Resources</h1>
        <p class="subtitle">Tools, Guides, and Information for Animal Welfare</p>
      </header>

      <section class="resource-section">
        <h2>Educational Resources</h2>
        <div class="resource-cards">
          <div class="resource-card">
            <span class="resource-icon">📚</span>
            <h3>Veterinary Guides</h3>
            <p>Comprehensive guides on clinical care, diagnosis, and treatment protocols for common animal health conditions.</p>
          </div>
          <div class="resource-card">
            <span class="resource-icon">🎓</span>
            <h3>Learning Modules</h3>
            <p>Structured educational content covering animal behavior, welfare standards, and ethical considerations.</p>
          </div>
          <div class="resource-card">
            <span class="resource-icon">📖</span>
            <h3>Research Papers</h3>
            <p>Curated scientific research and studies on animal welfare, health, and conservation topics.</p>
          </div>
        </div>
      </section>

      <section class="resource-section">
        <h2>Practical Tools</h2>
        <div class="resource-cards">
          <div class="resource-card">
            <span class="resource-icon">🔍</span>
            <h3>Checklist Library</h3>
            <p>Downloadable checklists for animal care, welfare assessment, and facility standards compliance.</p>
          </div>
          <div class="resource-card">
            <span class="resource-icon">📊</span>
            <h3>Assessment Tools</h3>
            <p>Interactive tools to evaluate animal welfare conditions and identify areas for improvement.</p>
          </div>
          <div class="resource-card">
            <span class="resource-icon">📋</span>
            <h3>Template Collection</h3>
            <p>Ready-to-use templates for animal records, health tracking, and welfare documentation.</p>
          </div>
        </div>
      </section>

      <section class="resource-section">
        <h2>Community Resources</h2>
        <div class="resource-cards">
          <div class="resource-card">
            <span class="resource-icon">🌐</span>
            <h3>Directory</h3>
            <p>Connect with veterinarians, organizations, and experts in animal welfare and conservation.</p>
          </div>
          <div class="resource-card">
            <span class="resource-icon">👥</span>
            <h3>Discussion Forums</h3>
            <p>Join conversations with professionals and enthusiasts to share knowledge and best practices.</p>
          </div>
          <div class="resource-card">
            <span class="resource-icon">🔗</span>
            <h3>External Links</h3>
            <p>Curated links to reputable organizations, government resources, and partner websites.</p>
          </div>
        </div>
      </section>

      <section class="resource-section">
        <h2>By Category</h2>
        <div class="categories-list">
          <div class="category-item">
            <h3>🏥 Clinical Resources</h3>
            <p>Medical protocols, diagnostic guides, and treatment recommendations</p>
          </div>
          <div class="category-item">
            <h3>🎯 Education Materials</h3>
            <p>Curriculum guides, training modules, and educational content</p>
          </div>
          <div class="category-item">
            <h3>⚖️ Ethics & Policy</h3>
            <p>Guidelines, standards, and ethical frameworks for animal welfare</p>
          </div>
          <div class="category-item">
            <h3>🐾 Lifestyle & Care</h3>
            <p>Pet care guides, nutrition information, and wellness tips</p>
          </div>
          <div class="category-item">
            <h3>🌍 Wildlife & Conservation</h3>
            <p>Conservation strategies, species information, and habitat guides</p>
          </div>
          <div class="category-item">
            <h3>🆘 Rescue & Rehabilitation</h3>
            <p>Emergency protocols, rescue guidelines, and rehabilitation techniques</p>
          </div>
        </div>
      </section>

      <section class="resource-section highlight-section">
        <h2>Quick Tips</h2>
        <div class="tips-grid">
          <div class="tip-card">
            <span class="tip-number">1</span>
            <p><strong>Start with basics:</strong> Familiarize yourself with animal welfare fundamentals</p>
          </div>
          <div class="tip-card">
            <span class="tip-number">2</span>
            <p><strong>Stay updated:</strong> Follow our blog for the latest in animal welfare topics</p>
          </div>
          <div class="tip-card">
            <span class="tip-number">3</span>
            <p><strong>Connect:</strong> Join our community for support and knowledge sharing</p>
          </div>
          <div class="tip-card">
            <span class="tip-number">4</span>
            <p><strong>Take action:</strong> Use resources to make informed decisions for animal welfare</p>
          </div>
        </div>
      </section>

      <div class="cta-section">
        <p>Explore our full collection of articles and resources</p>
        <button class="explore-btn" @click="$emit('navigate-to-articles')">Browse Articles</button>
      </div>
    </article>
  </div>
</template>

<script setup>
defineEmits(['back', 'navigate-to-articles'])
</script>

<style scoped>
.resources-page {
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

.resources-header {
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

.resources-header h1 {
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

.resources-content {
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  border: 1px solid rgba(37, 52, 79, 0.1);
}

.resource-section {
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

.resource-section:nth-child(1) { animation-delay: 0.1s; }
.resource-section:nth-child(2) { animation-delay: 0.2s; }
.resource-section:nth-child(3) { animation-delay: 0.3s; }
.resource-section:nth-child(4) { animation-delay: 0.4s; }
.resource-section:nth-child(5) { animation-delay: 0.5s; }

.resource-section h2 {
  font-size: 1.6rem;
  color: #25344F;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #6F4D38;
}

.resource-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.resource-card {
  background: linear-gradient(135deg, rgba(141, 149, 126, 0.08) 0%, rgba(111, 77, 56, 0.08) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(141, 149, 126, 0.2);
  transition: all 0.3s ease;
  text-align: center;
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(141, 149, 126, 0.15);
  border-color: rgba(141, 149, 126, 0.4);
}

.resource-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.8rem;
}

.resource-card h3 {
  color: #25344F;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.resource-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0;
}

.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
}

.category-item {
  background: linear-gradient(135deg, rgba(99, 126, 234, 0.08) 0%, rgba(141, 149, 126, 0.08) 100%);
  padding: 1.2rem;
  border-radius: 8px;
  border-left: 4px solid #6F4D38;
  transition: all 0.3s ease;
}

.category-item:hover {
  border-left-color: #8D957E;
  box-shadow: 0 4px 12px rgba(141, 149, 126, 0.1);
}

.category-item h3 {
  color: #25344F;
  font-size: 1rem;
  margin-bottom: 0.4rem;
  font-weight: 700;
}

.category-item p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0;
}

.highlight-section {
  background: linear-gradient(135deg, rgba(141, 149, 126, 0.1) 0%, rgba(212, 214, 197, 0.1) 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(141, 149, 126, 0.2);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tip-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(141, 149, 126, 0.2);
  transition: all 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(141, 149, 126, 0.1);
}

.tip-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8D957E 0%, #7a8669 100%);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.tip-card p {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.6;
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
  .resources-page {
    padding: 1rem;
  }

  .resources-content {
    padding: 1.5rem;
  }

  .resources-header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .resource-section h2 {
    font-size: 1.3rem;
  }

  .resource-cards {
    grid-template-columns: 1fr;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
