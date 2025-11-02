<template>
  <div class="landing">
    <Hero @explore-articles="$emit('navigate-to-articles')" />

    <!-- Featured Articles Carousel Section -->
    <section class="featured-carousel-section">
      <div class="container">
        <h2 class="carousel-title">Featured Blogs</h2>
        <div v-if="currentFeaturedArticle" class="featured-article">
          <div class="featured-image">
            <img 
              v-if="currentFeaturedArticle.imageUrl" 
              :src="currentFeaturedArticle.imageUrl" 
              :alt="currentFeaturedArticle.title" 
              class="featured-img"
            />
            <div v-else class="featured-emoji">{{ currentFeaturedArticle.image }}</div>
            <span class="featured-badge" :class="currentFeaturedArticle.category">{{ currentFeaturedArticle.category }}</span>
          </div>
          <div class="featured-content">
            <div class="featured-label">Featured Blog</div>
            <h2 class="featured-title">{{ currentFeaturedArticle.title }}</h2>
            <p class="featured-excerpt">{{ currentFeaturedArticle.excerpt }}</p>
            <div class="featured-meta">
              <span class="featured-date"><Calendar :size="18" /> {{ formatDate(currentFeaturedArticle.date) }}</span>
              <span class="featured-read-time"><Clock :size="18" /> {{ currentFeaturedArticle.readTime }}</span>
            </div>
            <div v-if="currentFeaturedArticle.tags" class="featured-tags">
              <span v-for="tag in currentFeaturedArticle.tags" :key="tag" class="featured-tag">
                {{ tag }}
              </span>
            </div>
            <button 
              class="featured-read-more" 
              @click="$emit('read-post', currentFeaturedArticle.id)"
            >
              Read Featured Blog →
            </button>
          </div>
        </div>

        <!-- Carousel Indicators -->
        <div v-if="carouselArticles.length > 1" class="carousel-indicators">
          <button 
            v-for="(article, index) in carouselArticles" 
            :key="article.id"
            class="carousel-dot"
            :class="{ active: index === currentCarouselIndex }"
            :title="article.category"
            @click="goToCarouselArticle(index)"
          >
            <span class="dot-category">{{ index + 1 }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="features-title">Why The Ethogram?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"><BookMarked /></div>
            <h3>Curated Blogs</h3>
            <p>18+ carefully researched blogs on animal behavior, welfare, ethics, veterinary science, and conservation.</p>
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

    <!-- Doctor Feature Section (Animal Welfare Week) -->
    <section class="doctor-feature-landing-section">
      <div class="container">
        <h2 class="featured-title-section">Featured This Week</h2>
        <DoctorFeature @navigate-to-articles="$emit('navigate-to-articles')" />
      </div>
    </section>

    <!-- Quick Links Section -->
    <section class="quick-links-section">
      <div class="container">
        <h2 class="quick-links-title">Explore More</h2>
        <div class="quick-links-grid">
          <button @click="$emit('navigate-paws')" class="quick-link-card">
            <Zap class="link-icon-component" :size="48" />
            <h3>Paws Behind The Scenes</h3>
            <p>Meet our beloved companions and discover fascinating facts about animals</p>
          </button>
          <button @click="$emit('navigate-to-articles')" class="quick-link-card">
            <BookMarked class="link-icon-component" :size="48" />
            <h3>Latest Blogs</h3>
            <p>Explore curated blogs on animal welfare, behavior, and conservation</p>
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import Hero from './Hero.vue'
import DoctorFeature from './DoctorFeature.vue'
import { BookMarked, Globe, Stethoscope, Users, GraduationCap, Lightbulb, Calendar, Clock, Zap } from 'lucide-vue-next'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  allPosts: {
    type: Array,
    default: () => []
  }
})

defineEmits(['navigate-to-articles', 'read-post', 'navigate-paws'])

const currentCarouselIndex = ref(0)
let carouselInterval = null

const formatDate = (date) => {
  if (!date) return ''
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

const featuredPost = computed(() => {
  return props.allPosts && props.allPosts.length > 0 ? props.allPosts[0] : {}
})

// Get carousel articles - one from each category in a specific order
const carouselArticles = computed(() => {
  const categories = new Map()
  props.allPosts.forEach(post => {
    if (!categories.has(post.category)) {
      categories.set(post.category, post)
    }
  })
  
  // Define the desired order
  const categoryOrder = [
    'personal-experiences',
    'professional-perspectives',
    'educational-articles',
    'spotlight-initiatives',
    'creative-expressions'
  ]
  
  // Sort by the defined order
  const sortedArticles = categoryOrder
    .map(category => categories.get(category))
    .filter(article => article !== undefined)
  
  return sortedArticles
})

const currentFeaturedArticle = computed(() => {
  if (carouselArticles.value.length === 0) return null
  return carouselArticles.value[currentCarouselIndex.value]
})

const goToCarouselArticle = (index) => {
  currentCarouselIndex.value = index
  // Reset carousel interval when user clicks
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
  startCarouselInterval()
}

const startCarouselInterval = () => {
  carouselInterval = setInterval(() => {
    if (carouselArticles.value.length > 0) {
      currentCarouselIndex.value = (currentCarouselIndex.value + 1) % carouselArticles.value.length
    }
  }, 4000) // Change featured article every 4 seconds
}

// Setup carousel auto-rotation
onMounted(() => {
  if (carouselArticles.value.length > 1) {
    startCarouselInterval()
  }
})

onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
})

</script>

<style scoped>
.landing {
  min-height: 100vh;
}

/* Featured Blog Section */
.featured-blog-section {
  padding: 4rem 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.featured-section-title {
  font-size: 2.2rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.featured-article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  background: var(--card-bg);
  padding: 3rem;
  border-radius: 15px;
  border: 1px solid var(--border-color);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 2rem;
}

.featured-article:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px var(--card-shadow);
}

.featured-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  min-height: 350px;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.featured-emoji {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  background: linear-gradient(135deg, rgba(90, 122, 148, 0.1), rgba(74, 109, 66, 0.1));
  border-radius: 12px;
}

.featured-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.featured-badge.creative-expressions {
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
}

.featured-badge.educational-articles {
  background: linear-gradient(135deg, #4A6D42, #5C8452);
  color: white;
}

.featured-badge.personal-experiences {
  background: linear-gradient(135deg, #9B59B6, #B973D9);
  color: white;
}

.featured-badge.professional-perspectives {
  background: linear-gradient(135deg, #3498DB, #5DADE2);
  color: white;
}

.featured-badge.spotlight-initiatives {
  background: linear-gradient(135deg, #F39C12, #F5B041);
  color: white;
}

.featured-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.featured-label {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #4A6D42;
}

.featured-title {
  font-size: 2.2rem;
  color: var(--text-primary);
  font-weight: 800;
  line-height: 1.3;
}

.featured-excerpt {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.featured-meta {
  display: flex;
  gap: 2rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
  flex-wrap: wrap;
}

.featured-date,
.featured-read-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.featured-tag {
  background: rgba(90, 122, 148, 0.15);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.featured-tag:hover {
  background: rgba(90, 122, 148, 0.25);
}

.featured-read-more {
  align-self: flex-start;
  padding: 0.9rem 2rem;
  background: #4A6D42;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 25px rgba(74, 109, 66, 0.3);
}

.featured-read-more:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(74, 109, 66, 0.4);
  background: #3D5C35;
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

@media (max-width: 768px) {
  .features-section {
    padding: 2.5rem 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .features-section {
    padding: 2rem 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .feature-card h3 {
    font-size: 1.2rem;
  }

  .feature-card p {
    font-size: 0.9rem;
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
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
  position: relative;
  padding: 2rem 2.5rem 3rem 2.5rem;
  display: inline-block;
  width: 100%;
  background: #DDA15E;
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root.dark-mode .features-title {
  background: #bc6c25;
}

.features-title::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #DDA15E;
  animation: slideDown 0.6s ease-out;
}

:root.dark-mode .features-title::after {
  border-top-color: #bc6c25;
}

@media (max-width: 768px) {
  .features-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    padding: 1.5rem 2rem 2rem 2rem;
  }
}

@media (max-width: 480px) {
  .features-title {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }
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
  background: var(--card-bg);
  color: #FFFFFF;
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
  color: #FFFFFF;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  text-align: justify;
  transition: color 0.3s ease;
}

:root.light-mode .feature-card p {
  color: #FFFFFF;
}

@media (max-width: 768px) {
  .featured-blog-section {
    padding: 3rem 1.5rem;
  }

  .featured-section-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .featured-article {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .featured-image {
    min-height: 250px;
  }

  .featured-title {
    font-size: 1.6rem;
  }

  .featured-content {
    gap: 1rem;
  }

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

@media (max-width: 480px) {
  .featured-blog-section {
    padding: 2rem 1rem;
  }

  .featured-section-title {
    font-size: 1.5rem;
  }

  .featured-article {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .featured-image {
    min-height: 200px;
  }

  .featured-title {
    font-size: 1.3rem;
  }

  .featured-excerpt {
    font-size: 0.95rem;
  }

  .featured-meta {
    gap: 1rem;
    font-size: 0.85rem;
  }

  .featured-read-more {
    width: 100%;
    text-align: center;
  }
}

/* Featured Carousel Section */
.featured-carousel-section {
  padding: 5rem 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.featured-carousel-section .featured-article {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #E5E7EB;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

:root.dark-mode .featured-carousel-section .featured-article {
  background: var(--card-bg);
  border-color: var(--border-color);
  box-shadow: 0 10px 40px var(--card-shadow);
}

.featured-carousel-section .featured-article:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

:root.dark-mode .featured-carousel-section .featured-article:hover {
  box-shadow: 0 15px 40px var(--card-shadow);
}

.featured-carousel-section .featured-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 350px;
  width: 100%;
}

.featured-carousel-section .featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.featured-carousel-section .featured-emoji {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: linear-gradient(135deg, rgba(90, 122, 148, 0.1), rgba(74, 109, 66, 0.1));
  border-radius: 12px;
}

.featured-carousel-section .featured-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  justify-content: flex-start;
}

.featured-carousel-section .featured-label {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #4A6D42;
}

:root.dark-mode .featured-carousel-section .featured-label {
  color: #DDA15E;
}

.featured-carousel-section .featured-title {
  font-size: 1.6rem;
  color: #1F2937;
  font-weight: 800;
  line-height: 1.3;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root.dark-mode .featured-carousel-section .featured-title {
  color: var(--text-primary);
}

.featured-carousel-section .featured-excerpt {
  font-size: 0.95rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root.dark-mode .featured-carousel-section .featured-excerpt {
  color: var(--text-secondary);
}

.featured-carousel-section .featured-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: #9CA3AF;
  flex-wrap: wrap;
}

:root.dark-mode .featured-carousel-section .featured-meta {
  color: var(--text-secondary);
}

.featured-carousel-section .featured-date,
.featured-carousel-section .featured-read-time {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.featured-carousel-section .featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.featured-carousel-section .featured-tag {
  background: #F3F4F6;
  color: #4B5563;
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

:root.dark-mode .featured-carousel-section .featured-tag {
  background: rgba(188, 108, 37, 0.2);
  color: #DDA15E;
  border-color: rgba(188, 108, 37, 0.3);
}

.featured-carousel-section .featured-tag:hover {
  background: #E5E7EB;
}

.featured-carousel-section .featured-read-more {
  align-self: flex-start;
  padding: 0.75rem 1.8rem;
  background: #4A6D42;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(74, 109, 66, 0.2);
  margin-top: auto;
}

.featured-carousel-section .featured-read-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(74, 109, 66, 0.3);
  background: #3D5C35;
}

.carousel-title {
  font-size: 2.8rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  position: relative;
  padding: 2rem 2.5rem 3rem 2.5rem;
  display: inline-block;
  width: 100%;
  background: #DDA15E;
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root.dark-mode .carousel-title {
  background: #bc6c25;
}

.carousel-title::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #DDA15E;
  animation: slideDown 0.6s ease-out;
}

:root.dark-mode .carousel-title::after {
  border-top-color: #bc6c25;
}

@media (max-width: 768px) {
  .carousel-title {
    font-size: 2.2rem;
    margin-bottom: 2rem;
    padding: 1.5rem 2rem 2rem 2rem;
  }
}

@media (max-width: 480px) {
  .carousel-title {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  position: relative;
  z-index: 2;
  width: 100%;
  margin-top: 2rem;
}

.carousel-dot {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(107, 114, 128, 0.2);
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  color: #6B7280;
  position: relative;
}

.carousel-dot:hover {
  border-color: #6B7280;
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(107, 114, 128, 0.2);
}

.carousel-dot.active {
  background: #3D7D40;
  color: white;
  border-color: #3D7D40;
  box-shadow: 0 6px 20px rgba(61, 125, 64, 0.4);
  transform: scale(1.15);
}

:root.light-mode .carousel-dot.active {
  background: #4A6D42;
  border-color: #4A6D42;
  box-shadow: 0 6px 20px rgba(74, 109, 66, 0.4);
}

.dot-category {
  display: block;
}

@media (max-width: 768px) {
  .featured-carousel-section {
    padding: 2.5rem 1.5rem;
  }

  .featured-carousel-section .featured-article {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .featured-carousel-section .featured-image {
    height: 280px;
  }

  .featured-carousel-section .featured-title {
    font-size: 1.4rem;
  }

  .featured-carousel-section .featured-excerpt {
    font-size: 0.9rem;
  }

  .carousel-indicators {
    gap: 0.75rem;
    padding: 1rem;
  }

  .carousel-dot {
    width: 35px;
    height: 35px;
    font-size: 0.75rem;
  }

  .quick-links-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .quick-link-card {
    padding: 1.5rem;
  }

  .quick-link-card h3 {
    font-size: 1.2rem;
  }

  .quick-link-card p {
    font-size: 0.9rem;
  }

  .doctor-feature-landing-section {
    padding: 2.5rem 1.5rem;
  }

  .quick-links-section {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .carousel-title {
    font-size: 1.4rem;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    margin-bottom: 1.5rem;
  }

  .featured-title-section,
  .quick-links-title {
    font-size: 1.4rem;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    margin-bottom: 1.5rem;
  }

  .featured-carousel-section {
    padding: 2rem 1rem;
  }

  .featured-carousel-section .featured-article {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
    max-width: 100%;
  }

  .featured-carousel-section .featured-image {
    height: 220px;
  }

  .featured-carousel-section .featured-title {
    font-size: 1.2rem;
  }

  .featured-carousel-section .featured-excerpt {
    font-size: 0.85rem;
  }

  .featured-carousel-section .featured-label {
    font-size: 0.75rem;
  }

  .featured-carousel-section .featured-meta {
    gap: 1rem;
    font-size: 0.8rem;
  }

  .featured-carousel-section .featured-read-more {
    width: 100%;
    text-align: center;
    padding: 0.7rem 1.5rem;
  }

  .carousel-indicators {
    gap: 0.5rem;
    padding: 0.8rem;
  }

  .carousel-dot {
    width: 30px;
    height: 30px;
    font-size: 0.7rem;
  }

  .quick-links-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .quick-link-card {
    padding: 1.2rem;
  }

  .link-icon-component {
    margin-bottom: 0.8rem;
  }

  .quick-link-card h3 {
    font-size: 1.1rem;
  }

  .quick-link-card p {
    font-size: 0.85rem;
  }

  .doctor-feature-landing-section {
    padding: 2rem 1rem;
  }

  .quick-links-section {
    padding: 2rem 1rem;
  }
}

/* Doctor Feature Landing Section */
.doctor-feature-landing-section {
  padding: 5rem 2rem;
  background: transparent;
  text-align: center;
}

.doctor-feature-landing-section .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Quick Links Section */
.quick-links-section {
  padding: 5rem 2rem;
  background: transparent;
  text-align: center;
}

.quick-links-section .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.quick-links-title,
.featured-title-section {
  font-size: 2.8rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  position: relative;
  padding: 2rem 2.5rem 3rem 2.5rem;
  display: inline-block;
  width: 100%;
  background: #DDA15E;
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root.dark-mode .quick-links-title,
:root.dark-mode .featured-title-section {
  background: #bc6c25;
}

.quick-links-title::after,
.featured-title-section::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #DDA15E;
  animation: slideDown 0.6s ease-out;
}

:root.dark-mode .quick-links-title::after,
:root.dark-mode .featured-title-section::after {
  border-top-color: #bc6c25;
}

@media (max-width: 768px) {
  .quick-links-title,
  .featured-title-section {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    padding: 1.5rem 2rem 2rem 2rem;
  }
}

@media (max-width: 480px) {
  .quick-links-title,
  .featured-title-section {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }
}

.quick-links-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 769px) {
  .quick-links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.quick-link-card {
  background: var(--card-bg);
  border: none;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
  font-family: inherit;
}

.quick-link-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px var(--card-shadow);
}

.link-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.link-icon-component {
  color: white;
  margin-bottom: 1rem;
}

.quick-link-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.quick-link-card p {
  font-size: 0.95rem;
  color: white;
  line-height: 1.6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>