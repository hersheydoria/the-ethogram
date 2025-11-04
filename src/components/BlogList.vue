<template>
  <Navbar />
  <section class="blog-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Latest Blogs</h2>
        <p class="article-count">{{ filteredPosts.length }} blog<span v-if="filteredPosts.length !== 1">s</span> found</p>
      </div>

      <!-- Filter Info Bar -->
      <div v-if="selectedCategory !== 'all'" class="filter-info" :class="selectedCategory">
        <p class="category-display">{{ formatCategoryName(selectedCategory) }}</p>
      </div>

      <!-- More Articles List Section -->
      <div v-if="remainingArticles.length > 0" class="articles-list-section">
        <div class="articles-by-category">
          <div v-for="(articles, category) in articlesByCategory" :key="category" class="category-section">
            <h4 v-if="selectedCategory === 'all'" class="category-section-title" :class="category">{{ formatCategoryName(category) }}</h4>
            <div class="articles-list">
              <article 
                v-for="(post, index) in expandedCategories.has(category) ? articles : articles.slice(0, 2)" 
                :key="post.id"
                class="list-article"
                :style="{ animationDelay: `${index * 0.1}s` }"
                @click="handleReadPost(post.id)"
              >
                <div class="list-article-number">{{ index + 1 }}</div>
                <div class="list-article-image">
                  <img 
                    v-if="post.imageUrl" 
                    :src="post.imageUrl" 
                    :alt="post.title" 
                    class="list-img"
                  />
                  <div v-else class="list-emoji">{{ post.image }}</div>
                </div>
                <div class="list-article-content">
                  <div class="list-article-header">
                    <span class="list-category" :class="post.category">{{ post.category }}</span>
                    <span class="list-date">{{ formatDate(post.date) }}</span>
                  </div>
                  <h4 class="list-article-title">{{ post.title }}</h4>
                  <p class="list-article-excerpt">{{ post.excerpt }}</p>
                  <div v-if="post.tags" class="list-article-tags">
                    <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="list-article-tag">
                      {{ tag }}
                    </span>
                    <span v-if="post.tags.length > 3" class="list-article-tag-more">+{{ post.tags.length - 3 }}</span>
                  </div>
                  <div class="list-article-footer">
                    <span class="list-read-time">{{ post.readTime }}</span>
                    <span class="read-link">Read More →</span>
                  </div>
                </div>
              </article>
            </div>
            <button 
              v-if="articles.length > 2" 
              class="see-more-btn"
              @click="toggleCategoryExpanded(category)"
            >
              {{ expandedCategories.has(category) ? 'Show Less ↑' : `See More (${articles.length - 2}) ↓` }}
            </button>
          </div>
        </div>
      </div>

      <!-- No Results Message -->
      <div v-if="filteredPosts.length === 0" class="no-posts">
        <div class="no-posts-icon"><Search :size="48" /></div>
        <p class="no-posts-title">No blogs found</p>
        <p class="no-posts-subtitle">
          Try adjusting your search or category filters
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, inject } from 'vue'
import { X, Calendar, Clock, Search } from 'lucide-vue-next'
import Navbar from './Navbar.vue'

// Get blog data from parent
const blogData = inject('blogData')
const { 
  allBlogPosts, 
  selectedCategory, 
  searchQuery, 
  selectedTags, 
  handleCategoryChange,
  handleTagFilterChange,
  handleSearchQuery,
  handleReadPost
} = blogData

// Local state
const expandedCategories = ref(new Set())

const handleClearFilter = () => {
  selectedCategory.value = 'all'
  selectedTags.value = []
}

const handleClearSearch = () => {
  searchQuery.value = ''
  selectedTags.value = []
}

const toggleCategoryExpanded = (category) => {
  if (expandedCategories.value.has(category)) {
    expandedCategories.value.delete(category)
  } else {
    expandedCategories.value.add(category)
  }
}

const filteredPosts = computed(() => {
  let posts = allBlogPosts.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  // Filter by tags (only apply when tags are selected)
  if (selectedTags.value.length > 0) {
    posts = posts.filter(post => {
      if (!post.tags || !Array.isArray(post.tags)) return false
      // Check if post has ANY of the selected tags
          return selectedTags.value.some(tag => post.tags.includes(tag))
    })
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    )
  }

  return posts
})

// Get remaining articles
const remainingArticles = computed(() => {
  return filteredPosts.value
})

const activeFilters = computed(() => {
  const filters = []
  if (selectedCategory.value !== 'all') {
    filters.push(`Category: ${capitalize(selectedCategory.value)}`)
  }
  if (searchQuery.value.trim()) {
    filters.push(`Search: "${props.searchQuery}"`)
  }
  return filters
})

const articlesByCategory = computed(() => {
  const grouped = {}
  
  remainingArticles.value.forEach(post => {
    const category = post.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(post)
  })
  
  return grouped
})

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const formatCategoryName = (category) => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const clearFilter = (filter) => {
  if (filter.startsWith('Category:')) {
    emit('clear-filter')
  } else if (filter.startsWith('Search:')) {
    emit('clear-search')
  }
}
</script>

<style scoped>
.blog-section {
  padding: 5rem 2rem;
  background: transparent;
  color: var(--text-primary);
  flex: 1;
  min-height: 60vh;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.blog-section::before {
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
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

.section-title {
  font-size: 3.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root.dark-mode .section-title {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.article-count {
  font-size: 1.1rem;
  color: #f97316;
  font-weight: 600;
}

/* Filter Info Bar */
.filter-info {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 1.8rem 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 6px 20px rgba(188, 108, 37, 0.3);
  animation: slideInDown 0.6s ease-out;
  transition: all 0.3s ease;
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-transform: capitalize;
  position: relative;
  width: 100%;
  text-align: center;
  color: white;
  display: block;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.3;
}

.filter-info:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(188, 108, 37, 0.4);
}

.filter-info.personal-experiences {
  background: linear-gradient(135deg, #BC6C25 0%, #A55A1F 100%);
}

.filter-info.personal-experiences:hover {
  box-shadow: 0 10px 30px rgba(188, 108, 37, 0.5);
}

.filter-info.professional-perspectives {
  background: linear-gradient(135deg, #DDA15E 0%, #CC8F48 100%);
}

.filter-info.professional-perspectives:hover {
  box-shadow: 0 10px 30px rgba(204, 143, 72, 0.5);
}

.filter-info.educational-articles {
  background: linear-gradient(135deg, #C49A36 0%, #A67C2F 100%);
}

.filter-info.educational-articles:hover {
  box-shadow: 0 10px 30px rgba(166, 124, 47, 0.5);
}

.filter-info.spotlight-initiatives {
  background: linear-gradient(135deg, #4A6D42 0%, #3D5C35 100%);
}

.filter-info.spotlight-initiatives:hover {
  box-shadow: 0 10px 30px rgba(61, 92, 53, 0.5);
}

.filter-info.creative-expressions {
  background: linear-gradient(135deg, #606C38 0%, #4D5829 100%);
}

.filter-info.creative-expressions:hover {
  box-shadow: 0 10px 30px rgba(77, 88, 41, 0.5);
}

/* Speech bubble tail effect for filter info */
.filter-info::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid rgba(188, 108, 37, 0.8);
}

.filter-info.professional-perspectives::after {
  border-top-color: rgba(204, 143, 72, 0.8);
}

.filter-info.educational-articles::after {
  border-top-color: rgba(166, 124, 47, 0.8);
}

.filter-info.spotlight-initiatives::after {
  border-top-color: rgba(61, 92, 53, 0.8);
}

.filter-info.creative-expressions::after {
  border-top-color: rgba(77, 88, 41, 0.8);
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-display {
  font-weight: 700;
  color: white;
  margin: 0;
  font-size: 1.8rem;
  text-transform: capitalize;
  letter-spacing: -0.5px;
}

.filter-info.personal-experiences .category-display {
  color: white;
}

.filter-info.professional-perspectives .category-display {
  color: white;
}

.filter-info.educational-articles .category-display {
  color: white;
}

.filter-info.spotlight-initiatives .category-display {
  color: white;
}

.filter-info.creative-expressions .category-display {
  color: white;
}

/* Featured Article Layout */
.featured-article {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px var(--card-shadow);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-bottom: 4rem;
  border: 2px solid var(--border-color);
  animation: fadeInUp 0.6s ease-out;
  min-height: 500px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

:root.light-mode .featured-article {
  background: #FFFFFF;
  border-color: #E5E7EB;
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

.featured-image {
  position: relative;
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
  transition: transform 0.3s ease;
  display: block;
  margin: 0;
  padding: 0;
}

.featured-article:hover .featured-img {
  transform: scale(1.05);
}

.featured-emoji {
  font-size: 5rem;
  animation: float 3s ease-in-out infinite;
  margin: 0;
  padding: 0;
  line-height: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.featured-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.6rem 1.4rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: capitalize;
  color: white;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 3;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.featured-badge.personal-experiences {
  background: linear-gradient(135deg, #BC6C25 0%, #A55A1F 100%);
}

.featured-badge.professional-perspectives {
  background: linear-gradient(135deg, #DDA15E 0%, #CC8F48 100%);
}

.featured-badge.educational-articles {
  background: linear-gradient(135deg, #C49A36 0%, #A67C2F 100%);
  color: white;
}

.featured-badge.spotlight-initiatives {
  background: linear-gradient(135deg, #4A6D42 0%, #3D5C35 100%);
}

.featured-badge.creative-expressions {
  background: linear-gradient(135deg, #606C38 0%, #4D5829 100%);
}

.featured-content {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.featured-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.4rem;
}

:root.light-mode .featured-label {
  color: #7FA8C9;
}

.featured-title {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.5px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 5rem;
}

:root.light-mode .featured-title {
  color: #1F3A52;
}

.featured-excerpt {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.7rem;
  margin-top: 0.5rem;
}

:root.light-mode .featured-excerpt {
  color: #3D5A7D;
}

.featured-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.7rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

:root.light-mode .featured-meta {
  color: #3D5A7D;
}

.featured-date,
.featured-read-time {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.featured-tag {
  background: rgba(37, 99, 235, 0.15);
  color: #2563eb;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  border: 1px solid rgba(37, 99, 235, 0.3);
  transition: all 0.3s ease;
}

:root.light-mode .featured-tag {
  background: rgba(45, 81, 130, 0.15);
  color: #2D5182;
  border-color: rgba(45, 81, 130, 0.3);
}

:root.dark-mode .featured-tag {
  background: rgba(221, 161, 94, 0.2);
  color: #DDA15E;
  border-color: rgba(221, 161, 94, 0.4);
}

.featured-tag:hover {
  background: rgba(37, 99, 235, 0.25);
  border-color: #2563eb;
  transform: translateY(-2px);
}

:root.light-mode .featured-tag:hover {
  background: rgba(45, 81, 130, 0.25);
  border-color: #2D5182;
}

:root.dark-mode .featured-tag:hover {
  background: rgba(221, 161, 94, 0.3);
  border-color: #DDA15E;
  transform: translateY(-2px);
}

.featured-read-more {
  background: #4A6D42;
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  box-shadow: 0 6px 20px rgba(74, 109, 66, 0.4);
}

:root.light-mode .featured-read-more {
  background: #4A6D42;
  color: white;
  box-shadow: 0 6px 20px rgba(74, 109, 66, 0.4);
}

.featured-read-more:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(74, 109, 66, 0.6);
  background: #1F2912;
}

:root.light-mode .featured-read-more:hover {
  box-shadow: 0 10px 30px rgba(40, 54, 24, 0.6);
  background: #1F2912;
  color: white;
}

.featured-read-more:active {
  transform: translateY(-1px);
}

/* Featured Carousel Section */
.featured-carousel-section {
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
}

.featured-carousel-section .featured-article {
  border-radius: 20px;
  margin-bottom: 0;
  width: 100%;
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

/* Articles List Section */
.articles-list-section {
  margin-top: 4rem;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandWidth {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Articles By Category */
.articles-by-category {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.category-section {
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 2px solid #e5e7eb;
  padding-top: 1.5rem;
}

.category-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.category-section-title {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: white;
  text-transform: capitalize;
  margin-bottom: 2.5rem;
  padding: 1.8rem 2rem;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
  line-height: 1.3;
  position: relative;
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  width: 100%;
  animation: slideInDown 0.6s ease-out;
  box-shadow: 0 6px 20px rgba(188, 108, 37, 0.3);
  transition: all 0.3s ease;
}

.category-section-title:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(188, 108, 37, 0.4);
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Category-specific background colors matching BlogCard */
.category-section-title.personal-experiences {
  background: linear-gradient(135deg, #BC6C25 0%, #A55A1F 100%);
  color: white;
}

.category-section-title.personal-experiences:hover {
  box-shadow: 0 10px 30px rgba(188, 108, 37, 0.5);
}

.category-section-title.professional-perspectives {
  background: linear-gradient(135deg, #DDA15E 0%, #CC8F48 100%);
  color: white;
}

.category-section-title.professional-perspectives:hover {
  box-shadow: 0 10px 30px rgba(204, 143, 72, 0.5);
}

.category-section-title.educational-articles {
  background: linear-gradient(135deg, #C49A36 0%, #A67C2F 100%);
  color: white;
}

.category-section-title.educational-articles:hover {
  box-shadow: 0 10px 30px rgba(166, 124, 47, 0.5);
}

.category-section-title.spotlight-initiatives {
  background: linear-gradient(135deg, #4A6D42 0%, #3D5C35 100%);
  color: white;
}

.category-section-title.spotlight-initiatives:hover {
  box-shadow: 0 10px 30px rgba(61, 92, 53, 0.5);
}

.category-section-title.creative-expressions {
  background: linear-gradient(135deg, #606C38 0%, #4D5829 100%);
  color: white;
}

.category-section-title.creative-expressions:hover {
  box-shadow: 0 10px 30px rgba(77, 88, 41, 0.5);
}

/* Speech bubble tail effect */
.category-section-title::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid rgba(188, 108, 37, 0.8);
}

.category-section-title.professional-perspectives::after {
  border-top-color: rgba(204, 143, 72, 0.8);
}

.category-section-title.educational-articles::after {
  border-top-color: rgba(166, 124, 47, 0.8);
}

.category-section-title.spotlight-initiatives::after {
  border-top-color: rgba(61, 92, 53, 0.8);
}

.category-section-title.creative-expressions::after {
  border-top-color: rgba(77, 88, 41, 0.8);
}

.see-more-btn {
  background: #4A6D42;
  border: none;
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 1.5rem;
  margin-left: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  box-shadow: 0 4px 12px rgba(40, 54, 24, 0.3);
}

.see-more-btn:hover {
  background: #1F2912;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 54, 24, 0.5);
}

.see-more-btn:active {
  transform: translateY(0);
}

/* Articles List Layout */
.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin-bottom: 3rem;
}

/* List Article Item */
.list-article {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--card-shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInLeft 0.6s ease-out backwards;
  color: var(--text-primary);
}

:root.light-mode .list-article {
  background: #FFFFFF;
  color: #1F2937;
  border-color: #E5E7EB;
}

:root.dark-mode .list-article {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%);
  border-color: rgba(221, 161, 94, 0.15);
  color: #f1f5f9;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.list-article:nth-child(1) { animation-delay: 0.1s; }
.list-article:nth-child(2) { animation-delay: 0.2s; }
.list-article:nth-child(3) { animation-delay: 0.3s; }
.list-article:nth-child(4) { animation-delay: 0.4s; }
.list-article:nth-child(5) { animation-delay: 0.5s; }

.list-article {
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 180px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(37, 99, 235, 0.08);
  align-items: center;
  position: relative;
  overflow: hidden;
}

.list-article::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  pointer-events: none;
}

.list-article:hover::before {
  left: 100%;
}

.list-article:hover {
  box-shadow: 0 12px 32px var(--card-shadow);
  border-color: var(--border-color);
  background: var(--card-bg);
  transform: translateY(-4px);
}

:root.light-mode .list-article:hover {
  border-color: #5A7A94;
  box-shadow: 0 12px 32px rgba(90, 122, 148, 0.3);
}

:root.dark-mode .list-article:hover {
  border-color: rgba(221, 161, 94, 0.3);
  box-shadow: 0 12px 32px rgba(221, 161, 94, 0.2);
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%);
}

:root.light-mode .list-article:hover .list-article-title {
  color: #1F2937;
}

:root.light-mode .list-article:hover .list-article-excerpt {
  color: #4B5563;
}

:root.light-mode .list-article:hover .list-date {
  color: #4B5563;
}

:root.light-mode .list-article:hover .list-read-time {
  color: #4B5563;
}

:root.light-mode .list-article:hover .list-article-tag {
  background: rgba(90, 122, 148, 0.1);
  color: #475569;
  border-color: rgba(90, 122, 148, 0.3);
}

:root.light-mode .list-article:hover .list-article-tag-more {
  background: rgba(90, 122, 148, 0.08);
  color: #475569;
  border-color: rgba(90, 122, 148, 0.2);
}

:root.light-mode .list-article:hover .read-link {
  color: #475569;
}

/* Article Number */
.list-article-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #5A7A94;
  min-width: 60px;
  text-align: center;
  line-height: 1;
  transition: all 0.3s ease;
  position: relative;
}

:root.light-mode .list-article-number {
  color: #5A7A94;
}

:root.dark-mode .list-article-number {
  color: #ffffff;
}

.list-article:hover .list-article-number {
  transform: scale(1.1) rotate(5deg);
}

:root.light-mode .list-article:hover .list-article-number {
  color: #4A6D7F;
}

:root.dark-mode .list-article:hover .list-article-number {
  color: #e0e0e0;
}

/* Article Image */
.list-article-image {
  width: 180px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
  transition: box-shadow 0.3s ease;
}

.list-article:hover .list-article-image {
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.4);
}

.list-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-article:hover .list-img {
  transform: scale(1.15) rotate(2deg);
}

.list-emoji {
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Article Content */
.list-article-content {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 0;
}

.list-article-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.list-category {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: capitalize;
  color: white;
  background: rgba(37, 99, 235, 0.8);
  white-space: nowrap;
}

.list-category.personal-experiences {
  background: linear-gradient(135deg, #BC6C25 0%, #A55A1F 100%);
}

.list-category.professional-perspectives {
  background: linear-gradient(135deg, #DDA15E 0%, #CC8F48 100%);
}

.list-category.educational-articles {
  background: linear-gradient(135deg, #C49A36 0%, #A67C2F 100%);
  color: white;
}

.list-category.spotlight-initiatives {
  background: linear-gradient(135deg, #4A6D42 0%, #3D5C35 100%);
}

.list-category.creative-expressions {
  background: linear-gradient(135deg, #606C38 0%, #4D5829 100%);
}

.list-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-left: auto;
  transition: color 0.3s ease;
}

:root.light-mode .list-date {
  color: #4B5563;
}

.list-article-title {
  font-size: 1.35rem;
  color: var(--text-primary);
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease, transform 0.3s ease;
}

:root.light-mode .list-article-title {
  color: #1F2937;
}

.list-article-excerpt {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

:root.light-mode .list-article-excerpt {
  color: #4B5563;
}

.list-article:hover .list-article-excerpt {
  color: #DDA15E;
}

:root.light-mode .list-article:hover .list-article-excerpt {
  color: #2563eb;
}

.list-article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
}

.list-article-tag {
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
  padding: 0.3rem 0.7rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  border: 1px solid rgba(37, 99, 235, 0.2);
  transition: all 0.3s ease;
  white-space: nowrap;
}

:root.dark-mode .list-article-tag {
  background: rgba(188, 108, 37, 0.2);
  color: #DDA15E;
  border-color: rgba(188, 108, 37, 0.3);
}

:root.light-mode .list-article-tag {
  background: rgba(71, 85, 105, 0.15);
  color: #475569;
  border-color: rgba(71, 85, 105, 0.2);
}

.list-article-tag:hover {
  background: rgba(37, 99, 235, 0.2);
  border-color: #2563eb;
  transform: translateY(-1px);
}

:root.dark-mode .list-article-tag:hover {
  background: rgba(188, 108, 37, 0.3);
  border-color: #BC6C25;
}

:root.light-mode .list-article-tag:hover {
  background: rgba(71, 85, 105, 0.25);
  border-color: #475569;
}

.list-article-tag-more {
  background: rgba(188, 108, 37, 0.2);
  color: #DDA15E;
  padding: 0.3rem 0.7rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
  border: 1px solid rgba(188, 108, 37, 0.3);
}

:root.light-mode .list-article-tag-more {
  background: rgba(71, 85, 105, 0.1);
  color: #475569;
  border-color: rgba(71, 85, 105, 0.15);
}

.list-article-footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--border-color);
  transition: border-color 0.3s ease;
}

.list-article:hover .list-article-footer {
  border-top-color: #2563eb;
}

.list-read-time {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.3s ease;
}

:root.light-mode .list-read-time {
  color: #4B5563;
}

.read-link {
  font-size: 0.9rem;
  color: #DDA15E;
  font-weight: 600;
  margin-left: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  white-space: nowrap;
}

:root.light-mode .read-link {
  color: #475569;
}

.read-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  transition: width 0.3s ease;
}

:root.light-mode .read-link::after {
  background: linear-gradient(90deg, #475569 0%, #334155 100%);
}

.list-article:hover .read-link::after {
  width: 100%;
}

/* Responsive Articles List */
@media (max-width: 992px) {
  .featured-article {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .featured-image {
    min-height: 350px;
  }

  .featured-content {
    padding: 1.5rem;
  }

  .featured-title {
    font-size: 1.3rem;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    max-height: 4.7rem;
  }

  .featured-excerpt {
    font-size: 0.9rem;
    margin-top: 0.4rem;
  }

  .carousel-indicators {
    gap: 0.8rem;
    padding: 1.2rem;
  }

  .carousel-dot {
    width: 45px;
    height: 45px;
    font-size: 0.85rem;
  }

  .list-article {
    grid-template-columns: auto 150px 1fr;
    gap: 1.2rem;
    padding: 1.2rem;
  }

  .list-article-image {
    width: 150px;
    height: 120px;
  }

  .list-article-title {
    font-size: 1.15rem;
  }

  .list-article-excerpt {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .featured-article {
    grid-template-columns: 1fr;
    border-radius: 15px;
    min-height: auto;
  }

  .featured-image {
    height: 280px;
    min-height: 280px;
  }

  .featured-content {
    padding: 1rem;
  }

  .featured-title {
    font-size: 1.2rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    max-height: 2.8rem;
  }

  .featured-excerpt {
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }

  .featured-meta {
    gap: 1rem;
    font-size: 0.8rem;
  }

  .carousel-indicators {
    gap: 0.6rem;
    padding: 1rem;
  }

  .carousel-dot {
    width: 40px;
    height: 40px;
    font-size: 0.8rem;
  }

  .carousel-dot.active {
    transform: scale(1.1);
  }

  .list-article {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .list-article-number {
    display: none;
  }

  .list-article-image {
    width: 100%;
    height: 150px;
  }

  .list-article-title {
    font-size: 1.1rem;
  }

  .list-article-excerpt {
    font-size: 0.9rem;
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }

  .list-date {
    margin-left: 0;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .list-article {
    padding: 1rem;
  }

  .list-article-image {
    height: 120px;
  }

  .list-article-title {
    font-size: 0.95rem;
  }

  .list-article-excerpt {
    font-size: 0.8rem;
  }

  .list-read-time {
    font-size: 0.75rem;
  }

  .read-link {
    font-size: 0.8rem;
  }
}

/* Mobile Animation Adjustments */
@media (max-width: 768px) {
  /* Reduce animation complexity on mobile */
  .list-article {
    animation: slideInLeft 0.4s ease-out backwards !important;
  }

  .list-article::before {
    /* Disable shimmer effect on mobile for performance */
    display: none;
  }

  .list-article:hover {
    /* Reduce transform on mobile */
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.1);
  }

  .list-img:hover {
    /* Reduce image zoom on mobile */
    transform: scale(1.08) rotate(1deg);
  }

  .list-article-title:hover {
    /* Keep text animation but reduce movement */
    transform: translateX(2px);
  }

  .articles-list-section {
    animation: fadeInUp 0.6s ease-out;
  }
}

/* Accessibility: Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .list-article,
  .list-article::before,
  .articles-list-section {
    animation: none !important;
  }

  .list-article:hover,
  .list-img:hover,
  .list-article-title:hover,
  .list-article-number:hover,
  .read-link::after {
    transition: none !important;
  }
}

/* No Posts Message */
.no-posts {
  text-align: center;
  padding: 5rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border: 2px dashed rgba(102, 126, 234, 0.2);
}

.no-posts-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.no-posts-title {
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 800;
  margin-bottom: 0.8rem;
}

.no-posts-subtitle {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .blog-section {
    padding: 3rem 1.5rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .featured-article {
    grid-template-columns: 1fr;
    margin-bottom: 3rem;
  }

  .featured-image {
    height: 250px;
  }

  .featured-content {
    padding: 2rem;
  }

  .featured-title {
    font-size: 1.6rem;
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

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .filter-info {
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .filter-tags {
    gap: 0.5rem;
  }

  .filter-tag {
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
  }
}
</style>