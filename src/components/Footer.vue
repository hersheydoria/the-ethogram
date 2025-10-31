<template>
  <footer class="footer">
    <div class="footer-background">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>
    
    <div class="container">
      <div class="footer-content">
        <!-- About Section -->
        <div class="footer-section about-section">
          <h3><Heart :size="24" fill="currentColor" /> Living Links</h3>
          <p>Linking hearts to save animals and the planet through education, awareness, and community action. We believe in creating a compassionate world for all animals.</p>
          <div class="footer-badge">Dedicated to Animal Welfare</div>
        </div>

        <!-- Categories Section -->
        <div class="footer-section">
          <h4>Article Categories</h4>
          <ul class="categories-grid">
            <li><a href="#" @click.prevent="handleCategoryClick('personal-experiences')">Personal Experiences</a></li>
            <li><a href="#" @click.prevent="handleCategoryClick('personal-perspectives')">Personal Perspectives</a></li>
            <li><a href="#" @click.prevent="handleCategoryClick('educational-articles')">Educational Articles</a></li>
            <li><a href="#" @click.prevent="handleCategoryClick('spotlight-initiatives')">Spotlight on Initiatives</a></li>
            <li><a href="#" @click.prevent="handleCategoryClick('creative-expressions')">Creative Expressions</a></li>
          </ul>
        </div>

        <!-- Connect Section -->
        <div class="footer-section">
          <h4>Connect With Us</h4>
          <div class="social-links">
            <a href="#" @click.prevent="handleSocialLink('facebook')" class="social-link">
              <span class="social-icon">f</span> Facebook
            </a>
            <a href="#" @click.prevent="handleSocialLink('email')" class="social-link">
              <span class="social-icon"><Mail :size="18" /></span> Email
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p>&copy; 2025 Living Links - Connecting Hearts for Animal Welfare. All rights reserved.</p>
        <p class="footer-tagline">Made with <Heart :size="16" style="display: inline; margin: 0 0.25rem;" /> and compassion for all creatures</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Heart, Mail } from 'lucide-vue-next'

const emit = defineEmits(['navigate', 'category-filter'])

const handleCategoryClick = (category) => {
  emit('category-filter', category)
}

const handleSocialLink = (platform) => {
  // Social links would typically open external URLs
  const urls = {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    email: 'mailto:hello@livinglinks.org'
  }
  window.open(urls[platform], '_blank')
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  color: white;
  padding: 2rem 2rem 1rem;
  margin-top: 2rem;
  box-shadow: 
    0 -4px 20px rgba(37, 99, 235, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border-top: 3px solid rgba(37, 99, 235, 0.4);
}

/* Animated Background Blobs */
.footer-background {
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
  opacity: 0.12;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: white;
  top: -100px;
  left: -100px;
  animation: float 8s ease-in-out infinite;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: white;
  bottom: -50px;
  right: -50px;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%),
    radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.footer::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  pointer-events: none;
  z-index: 1;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

/* About Section */
.about-section {
  grid-column: 1;
}

/* Categories Section - Center */
.footer-section:nth-child(2) {
  grid-column: 2;
  text-align: center;
}

/* Connect Section - Left */
.footer-section:nth-child(3) {
  grid-column: 3;
  text-align: left;
}

.about-section h3 {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
}

.about-section p {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  text-align: justify;
}

.footer-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* General Section Styling */
.footer-section h4 {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: white;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.footer-section p {
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  text-align: justify;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.categories-grid li {
  margin-bottom: 0.2rem;
}

.footer-section ul li a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.footer-section ul li a:hover {
  color: #2563eb;
  padding-left: 5px;
  font-weight: 600;
}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.1rem;
  justify-items: center;
}

.categories-grid li {
  margin-bottom: 0.1rem;
}

.categories-grid li a {
  display: block;
  padding: 0.2rem 0;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.categories-grid li a:hover {
  color: #2563eb;
  padding-left: 5px;
  font-weight: 600;
}

/* Social Links */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  padding-left: 0;
}

.social-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  padding: 0.4rem;
  border-radius: 8px;
}

.social-icon {
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.social-link:hover {
  color: #2563eb;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%);
  padding-left: 0.8rem;
  font-weight: 600;
}

/* Footer Bottom */
.footer-bottom {
  text-align: center;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  margin: 0.2rem 0;
}

.footer-tagline {
  font-style: italic;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 1.5rem 1rem 0.8rem;
    margin-top: 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .about-section {
    grid-column: 1;
  }

  .footer-section h4 {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
    align-items: center;
  }

  .categories-grid {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.2rem;
  }

  .footer-section ul li a {
    font-size: 0.85rem;
  }

  .social-link {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1rem 0.8rem 0.6rem;
  }

  .footer-content {
    gap: 0.8rem;
  }

  .about-section h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .about-section p {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .footer-section h4 {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .categories-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.2rem;
  }

  .footer-bottom {
    padding-top: 0.8rem;
  }

  .footer-bottom p {
    font-size: 0.75rem;
    margin: 0.15rem 0;
  }
}
</style>
