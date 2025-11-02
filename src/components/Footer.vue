<template>
  <footer class="footer">

    <div class="footer-background">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>
    
    <div class="container">
      <div class="footer-content">
        <!-- About Section - Left -->
        <div class="footer-section about-section">
          <h3><img src="../assets/logo.png" alt="The Ethogram Logo" class="footer-logo-img" /> The Ethogram</h3>
          <p>Save the animals, save the planet through education, awareness, and community action. We believe in creating a compassionate world for all animals.</p>
          <div class="footer-badge">Save the Animals, Save the Planet</div>
        </div>

        <!-- Categories Section - Middle -->
        <div class="footer-section categories-section">
          <h4>Article Categories</h4>
          <ul class="categories-list">
            <li><a href="#" @click.prevent="handleCategoryClick('personal-experiences')">Personal Experiences</a></li>
            <li><a href="#" @click.prevent="handleCategoryClick('professional-perspectives')">Professional Perspectives</a></li>
            <li><a href="#" @click.prevent="handleCategoryClick('educational-articles')">Educational Articles</a></li>
            <li><a href="#" @click.prevent="handleCategoryClick('spotlight-initiatives')">Spotlight on Initiatives</a></li>
            <li><a href="#" @click.prevent="handleCategoryClick('creative-expressions')">Creative Expressions</a></li>
          </ul>
        </div>

        <!-- Connect Section - Right -->
        <div class="footer-section connect-section">
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
        <p>&copy; 2025 The Ethogram - Save the Animals, Save the Planet. All rights reserved.</p>
        <p class="footer-tagline">Made with <Heart class="heart-icon" :size="18" /> and compassion for all creatures</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Mail, Heart } from 'lucide-vue-next'

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
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 50%, #606C38 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

:root.light-mode .footer {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 50%, #606C38 100%);
}

:root.dark-mode .footer {
  background: linear-gradient(135deg, #7A3C0E 0%, #A8643A 50%, #3D4620 100%);
}

.community-section {
  background: linear-gradient(135deg, rgba(61, 92, 53, 0.3), rgba(221, 161, 94, 0.2));
  border-bottom: 2px solid rgba(221, 161, 94, 0.4);
  padding: 30px 40px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.community-title {
  font-size: 36px;
  font-weight: 700;
  color: #DDA15E;
  margin-bottom: 6px;
}

.community-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.community-button {
  padding: 14px 32px;
  background: linear-gradient(135deg, #4A6D42 0%, #3D5C35 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 109, 66, 0.3);
}

.community-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(74, 109, 66, 0.4);
}

.community-button:active {
  transform: translateY(0);
}

@media (prefers-color-scheme: light) {
  .community-section {
    background: linear-gradient(135deg, rgba(221, 161, 94, 0.15), rgba(74, 109, 66, 0.1));
    border-bottom: 2px solid rgba(188, 108, 37, 0.3);
  }

  .community-title {
    color: #bc6c25;
  }

  .community-subtitle {
    color: rgba(51, 51, 51, 0.8);
  }
}

.footer-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.15;
  z-index: 1;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  filter: blur(40px);
}

.blob-1 {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.8);
  top: 50%;
  left: -50px;
  animation: float 6s infinite ease-in-out;
}

.blob-2 {
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.6);
  bottom: 10%;
  right: -30px;
  animation: float 8s infinite ease-in-out 2s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, 20px); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 30px 40px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 25px;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.about-section {
  grid-column: 1;
}

.categories-section {
  grid-column: 2;
}

.connect-section {
  grid-column: 3;
}

.footer-logo-img {
  width: 44px;
  height: auto;
  margin-right: 12px;
  display: inline;
  vertical-align: middle;
}

.footer-section h3 {
  font-size: 26px;
  margin-bottom: 16px;
  color: #0A3B6E;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.footer-section h4 {
  font-size: 18px;
  margin-bottom: 24px;
  color: #0A3B6E;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-section p {
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.footer-badge {
  display: inline-block;
  padding: 10px 16px;
  background: linear-gradient(135deg, rgba(10, 59, 110, 0.2), rgba(10, 59, 110, 0.15));
  border: 2px solid #0A3B6E;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #0A3B6E;
  width: fit-content;
}

.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.categories-list li a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 0;
}

.categories-list li a:before {
  content: '→';
  margin-right: 10px;
  opacity: 0;
  transition: all 0.3s ease;
  color: #0A3B6E;
  font-weight: 600;
}

.categories-list li a:hover {
  color: #0A3B6E;
  padding-left: 8px;
}

.categories-list li a:hover:before {
  opacity: 1;
  margin-right: 6px;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.social-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-link:hover {
  color: #0A3B6E;
  padding-left: 8px;
}

.social-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 59, 110, 0.15);
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  color: #0A3B6E;
  transition: all 0.3s ease;
}

.social-link:hover .social-icon {
  background: rgba(10, 59, 110, 0.3);
  transform: scale(1.1);
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

.footer-bottom p {
  margin: 6px 0;
  line-height: 1.5;
}

.footer-tagline {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.heart-icon {
  color: #ff6b6b;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Light Mode */
@media (prefers-color-scheme: light) {
  .footer {
    background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 50%, #606C38 100%);
    color: white;
  }

  .footer-section h3,
  .footer-section h4 {
    color: #0A3B6E;
  }

  .footer-section h4 {
    color: #0A3B6E;
  }

  .footer-section p {
    color: rgba(255, 255, 255, 0.8);
  }

  .footer-badge {
    background: linear-gradient(135deg, rgba(10, 59, 110, 0.2), rgba(10, 59, 110, 0.15));
    border: 2px solid #0A3B6E;
    color: #0A3B6E;
  }

  .categories-list li a {
    color: rgba(255, 255, 255, 0.8);
  }

  .categories-list li a:before {
    color: #0A3B6E;
  }

  .categories-list li a:hover {
    color: #0A3B6E;
  }

  .social-link {
    color: rgba(255, 255, 255, 0.8);
  }

  .social-link:hover {
    color: #0A3B6E;
  }

  .social-icon {
    background: rgba(10, 59, 110, 0.2);
    color: #0A3B6E;
  }

  .social-link:hover .social-icon {
    background: rgba(10, 59, 110, 0.35);
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.6);
  }

  .footer-tagline {
    color: rgba(255, 255, 255, 0.5);
  }
}

/* Tablet Responsive */
@media (max-width: 768px) {
  .community-section {
    padding: 30px 30px;
  }

  .community-title {
    font-size: 28px;
  }

  .community-subtitle {
    font-size: 15px;
  }

  .container {
    padding: 30px 30px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .about-section,
  .categories-section,
  .connect-section {
    grid-column: auto;
  }

  .footer-section h3 {
    font-size: 22px;
    margin-bottom: 14px;
  }

  .footer-section h4 {
    font-size: 16px;
    margin-bottom: 18px;
  }

  .footer-section p {
    font-size: 13px;
    margin-bottom: 12px;
  }

  .categories-list,
  .social-links {
    gap: 12px;
  }

  .categories-list li a,
  .social-link {
    font-size: 13px;
  }

  .footer-bottom {
    padding-top: 20px;
    font-size: 12px;
  }

  .footer-tagline {
    margin-top: 8px;
  }
}

/* Mobile Responsive */
@media (max-width: 480px) {
  .community-section {
    padding: 30px 20px;
  }

  .community-title {
    font-size: 24px;
    margin-bottom: 6px;
  }

  .community-subtitle {
    font-size: 13px;
    margin-bottom: 15px;
  }

  .community-button {
    padding: 12px 24px;
    font-size: 14px;
  }

  .container {
    padding: 30px 20px;
  }

  .footer-content {
    gap: 30px;
  }

  .footer-section h3 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .footer-section h4 {
    font-size: 15px;
    margin-bottom: 16px;
  }

  .footer-section p {
    font-size: 12px;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  .footer-badge {
    padding: 8px 12px;
    font-size: 11px;
  }

  .categories-list li a,
  .social-link {
    font-size: 12px;
    gap: 10px;
  }

  .categories-list li a:before {
    margin-right: 8px;
  }

  .categories-list li a:hover {
    padding-left: 6px;
  }

  .categories-list li a:hover:before {
    margin-right: 4px;
  }

  .social-icon {
    width: 26px;
    height: 26px;
    font-size: 12px;
  }

  .social-link:hover {
    padding-left: 6px;
  }

  .footer-bottom {
    padding-top: 20px;
    font-size: 11px;
  }

  .footer-tagline {
    margin-top: 6px;
  }
}
</style>
