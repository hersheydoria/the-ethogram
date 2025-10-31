<template>
  <div class="contribute-page">
    <button class="back-btn" @click="$emit('back')">← Back to Articles</button>
    
    <article class="contribute-content">
      <header class="contribute-header">
        <h1>Contribute</h1>
        <p class="subtitle">Join Us in Making a Difference for Animal Welfare</p>
      </header>

      <section class="contribute-section">
        <h2>Why Your Contribution Matters</h2>
        <p>
          Living Links thrives because of contributors like you. Whether you're a veterinarian, researcher, educator, 
          advocate, or animal enthusiast, your insights and expertise help us create more comprehensive resources for 
          the animal welfare community.
        </p>
      </section>

      <section class="contribute-section">
        <h2>Ways to Contribute</h2>
        <div class="contribution-cards">
          <div class="contribution-card">
            <span class="contribution-icon">✍️</span>
            <h3>Write Articles</h3>
            <p>Share your expertise by writing original articles on topics you're passionate about. We welcome clinical 
              insights, research findings, educational content, and personal stories.</p>
            <button class="contribute-btn" @click="handleContributionClick('articles')">Learn More</button>
          </div>
          
          <div class="contribution-card">
            <span class="contribution-icon">🔬</span>
            <h3>Share Research</h3>
            <p>Contribute academic research, case studies, and data that advance our understanding of animal welfare 
              and health.</p>
            <button class="contribute-btn" @click="handleContributionClick('research')">Learn More</button>
          </div>
          
          <div class="contribution-card">
            <span class="contribution-icon">📚</span>
            <h3>Create Resources</h3>
            <p>Develop guides, checklists, templates, or educational materials that help professionals and enthusiasts 
              make better decisions for animals.</p>
            <button class="contribute-btn" @click="handleContributionClick('resources')">Learn More</button>
          </div>
          
          <div class="contribution-card">
            <span class="contribution-icon">🎨</span>
            <h3>Creative Content</h3>
            <p>Submit photography, illustrations, videos, or creative storytelling that brings animal welfare topics 
              to life.</p>
            <button class="contribute-btn" @click="handleContributionClick('creative')">Learn More</button>
          </div>
          
          <div class="contribution-card">
            <span class="contribution-icon">🤝</span>
            <h3>Partner With Us</h3>
            <p>Work with Living Links on projects, campaigns, or initiatives to amplify the impact of animal welfare 
              education and advocacy.</p>
            <button class="contribute-btn" @click="handleContributionClick('partner')">Learn More</button>
          </div>
          
          <div class="contribution-card">
            <span class="contribution-icon">💡</span>
            <h3>Feedback & Ideas</h3>
            <p>Help us improve by sharing your feedback, suggestions, and ideas for new topics or resources you'd like 
              to see.</p>
            <button class="contribute-btn" @click="handleContributionClick('feedback')">Share Ideas</button>
          </div>
        </div>
      </section>

      <section class="contribute-section">
        <h2>Contribution Guidelines</h2>
        <div class="guidelines-list">
          <div class="guideline-item">
            <h3>✓ Original Content</h3>
            <p>Ensure all contributions are original or properly attributed. We respect copyright and intellectual property.</p>
          </div>
          <div class="guideline-item">
            <h3>✓ Accuracy & Research</h3>
            <p>All information should be accurate, well-researched, and based on credible sources. Please cite references 
              where applicable.</p>
          </div>
          <div class="guideline-item">
            <h3>✓ Respectful & Inclusive</h3>
            <p>Content should be respectful, inclusive, and promote compassionate approaches to animal welfare.</p>
          </div>
          <div class="guideline-item">
            <h3>✓ Clear & Engaging</h3>
            <p>Write clearly for our diverse audience. Avoid excessive jargon, or explain technical terms when used.</p>
          </div>
          <div class="guideline-item">
            <h3>✓ Relevant & Focused</h3>
            <p>Contributions should align with our mission of advancing animal welfare through education and awareness.</p>
          </div>
          <div class="guideline-item">
            <h3>✓ Proper Attribution</h3>
            <p>You'll receive credit for your contributions, and we'll work with you to ensure proper attribution.</p>
          </div>
        </div>
      </section>

      <section class="contribute-section">
        <h2>Content Categories</h2>
        <p>We're particularly interested in contributions across these areas:</p>
        <div class="categories-showcase">
          <div class="category-badge">Clinical</div>
          <div class="category-badge">Education</div>
          <div class="category-badge">Welfare</div>
          <div class="category-badge">Ethics</div>
          <div class="category-badge">Wellbeing</div>
          <div class="category-badge">Lifestyle</div>
          <div class="category-badge">Interviews</div>
          <div class="category-badge">Creative</div>
          <div class="category-badge">Campaigns</div>
          <div class="category-badge">Initiatives</div>
          <div class="category-badge">Livestock</div>
          <div class="category-badge">Wildlife</div>
          <div class="category-badge">Awareness</div>
          <div class="category-badge">Rescue</div>
          <div class="category-badge">Outreach</div>
          <div class="category-badge">One Health</div>
        </div>
      </section>

      <section class="contribute-section highlight-section">
        <h2>Our Promise to You</h2>
        <div class="promise-items">
          <div class="promise-item">
            <span class="promise-icon">🎯</span>
            <p>We'll review your contribution thoughtfully and provide feedback</p>
          </div>
          <div class="promise-item">
            <span class="promise-icon">👏</span>
            <p>Your work will be properly credited and highlighted</p>
          </div>
          <div class="promise-item">
            <span class="promise-icon">🌍</span>
            <p>Your contribution reaches a global community of animal welfare advocates</p>
          </div>
          <div class="promise-item">
            <span class="promise-icon">🤝</span>
            <p>We'll support you throughout the contribution process</p>
          </div>
        </div>
      </section>

      <div class="cta-section">
        <h2>Ready to Contribute?</h2>
        <p>Get in touch with our team to discuss your ideas and get started on your contribution.</p>
        <button class="contact-btn" @click="handleGetStarted">Get Started</button>
      </div>
    </article>
  </div>
</template>

<script setup>
const emit = defineEmits(['back', 'navigate-to-articles'])

const handleContributionClick = (type) => {
  alert(`${type.charAt(0).toUpperCase() + type.slice(1)} contribution guidelines coming soon!`)
}

const handleGetStarted = () => {
  alert('Contact form coming soon! Email: contribute@livinglinks.org')
}
</script>

<style scoped>
.contribute-page {
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

.contribute-header {
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

.contribute-header h1 {
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

.contribute-content {
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  border: 1px solid rgba(37, 52, 79, 0.1);
}

.contribute-section {
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

.contribute-section:nth-child(1) { animation-delay: 0.1s; }
.contribute-section:nth-child(2) { animation-delay: 0.2s; }
.contribute-section:nth-child(3) { animation-delay: 0.3s; }
.contribute-section:nth-child(4) { animation-delay: 0.4s; }
.contribute-section:nth-child(5) { animation-delay: 0.5s; }

.contribute-section h2 {
  font-size: 1.6rem;
  color: #25344F;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #6F4D38;
}

.contribute-section p {
  color: #555;
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.contribution-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.contribution-card {
  background: linear-gradient(135deg, rgba(141, 149, 126, 0.08) 0%, rgba(111, 77, 56, 0.08) 100%);
  padding: 1.8rem;
  border-radius: 12px;
  border: 1px solid rgba(141, 149, 126, 0.2);
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.contribution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(141, 149, 126, 0.15);
  border-color: rgba(141, 149, 126, 0.4);
}

.contribution-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.8rem;
}

.contribution-card h3 {
  color: #25344F;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
}

.contribution-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  flex-grow: 1;
}

.contribute-btn {
  background: linear-gradient(135deg, #8D957E 0%, #7a8669 100%);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.contribute-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(141, 149, 126, 0.3);
}

.guidelines-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.guideline-item {
  background: linear-gradient(135deg, rgba(99, 126, 234, 0.08) 0%, rgba(141, 149, 126, 0.08) 100%);
  padding: 1.3rem;
  border-radius: 8px;
  border-left: 4px solid #8D957E;
}

.guideline-item h3 {
  color: #25344F;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.guideline-item p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0;
}

.categories-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.category-badge {
  background: linear-gradient(135deg, #8D957E 0%, #7a8669 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.category-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(141, 149, 126, 0.3);
}

.highlight-section {
  background: linear-gradient(135deg, rgba(141, 149, 126, 0.1) 0%, rgba(212, 214, 197, 0.1) 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(141, 149, 126, 0.2);
}

.promise-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.promise-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(141, 149, 126, 0.2);
  transition: all 0.3s ease;
}

.promise-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(141, 149, 126, 0.1);
}

.promise-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.8rem;
}

.promise-item p {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
}

.cta-section {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
}

.cta-section h2 {
  font-size: 1.6rem;
  color: #25344F;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.contact-btn {
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

.contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(141, 149, 126, 0.4);
}

@media (max-width: 768px) {
  .contribute-page {
    padding: 1rem;
  }

  .contribute-content {
    padding: 1.5rem;
  }

  .contribute-header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .contribute-section h2 {
    font-size: 1.3rem;
  }

  .contribution-cards {
    grid-template-columns: 1fr;
  }

  .categories-showcase {
    justify-content: center;
  }

  .promise-items {
    grid-template-columns: 1fr;
  }
}
</style>
