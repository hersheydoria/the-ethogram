<template>
  <section class="blog-post-section">
    <div class="post-container">
      <!-- Side Panel - Related Articles -->
      <aside class="side-panel">
        <div class="side-panel-content">
          <h3 class="side-panel-title"><BookOpen :size="20" /> Related Articles</h3>
          <div class="related-posts">
            <button
              v-for="(relatedPost, index) in displayedRelatedArticles"
              :key="relatedPost.id"
              @click="$emit('select-post', relatedPost.id)"
              class="related-post-card"
              :class="{ active: relatedPost.id === post.id }"
            >
              <div class="card-image">
                <img v-if="relatedPost.imageUrl" :src="relatedPost.imageUrl" :alt="relatedPost.title" class="article-img" />
                <span v-else class="emoji-placeholder">{{ relatedPost.image }}</span>
              </div>
              <div class="card-content">
                <p class="card-title">{{ relatedPost.title }}</p>
                <p v-if="relatedPost.excerpt" class="card-excerpt">{{ relatedPost.excerpt }}</p>
                <div class="card-meta">
                  <span class="card-date">{{ formatDate(relatedPost.date) }}</span>
                  <span class="card-read-time">{{ relatedPost.readTime }}</span>
                </div>
              </div>
            </button>

            <!-- See More Button -->
            <button
              v-if="relatedArticles.length > 2"
              @click="toggleShowMore"
              class="see-more-btn"
            >
              {{ showMoreRelated ? '▲ See Less' : '▼ See More' }} ({{ relatedArticles.length - 2 }} more)
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main-content">
        <div class="container">
          <button class="back-btn" @click="$emit('back')"><ArrowLeft :size="18" /> Back to Articles</button>
          
          <article class="blog-post">
            <div class="post-header">
              <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" class="post-img" />
              <span v-else class="emoji-icon">{{ post.image }}</span>
              <span class="category-badge" :class="post.category">{{ post.category }}</span>
            </div>
            
            <div class="post-content">
              <h1 class="post-title">{{ post.title }}</h1>
              
              <div class="post-meta">
                <span class="date"><Calendar :size="18" /> {{ formattedDate }}</span>
                <span class="read-time"><Clock :size="18" /> {{ post.readTime }}</span>
              </div>
              
              <div class="post-body" v-html="post.content"></div>

              <!-- Tags / Keywords -->
              <div v-if="post.tags && post.tags.length > 0" class="tags-section">
                <h3>Tags</h3>
                <div class="tags-container">
                  <span v-for="tag in post.tags" :key="tag" class="tag-badge">
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Media Gallery -->
              <div v-if="post.media && post.media.length > 0" class="media-section">
                <h3><Image :size="20" /> Related Media</h3>
                <div class="media-gallery">
                  <div v-for="(media, index) in post.media" :key="index" class="media-item">
                    <div class="media-placeholder">
                      <span class="media-icon"><Frame :size="32" /></span>
                    </div>
                    <p class="media-title">{{ media.title }}</p>
                    <p class="media-description">{{ media.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Related Links / Organizations -->
              <div v-if="post.relatedLinks && post.relatedLinks.length > 0" class="links-section">
                <h3><Link :size="20" /> Related Organizations & Resources</h3>
                <div class="links-list">
                  <a 
                    v-for="(link, index) in post.relatedLinks" 
                    :key="index"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="related-link"
                  >
                    <span class="link-icon">{{ link.icon }}</span>
                    <span class="link-text">{{ link.name }}</span>
                    <span class="external-icon"><ExternalLink :size="16" /></span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { BookOpen, ArrowLeft, Calendar, Clock, Image, Frame, Link, ExternalLink } from 'lucide-vue-next'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  allPosts: {
    type: Array,
    default: () => []
  }
})

defineEmits(['back', 'select-post'])

const showMoreRelated = ref(false)

const formattedDate = computed(() => {
  const date = new Date(props.post.date)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const relatedArticles = computed(() => {
  return props.allPosts.filter(p => p.category === props.post.category && p.id !== props.post.id)
})

const displayedRelatedArticles = computed(() => {
  if (showMoreRelated.value) {
    return relatedArticles.value
  }
  return relatedArticles.value.slice(0, 2)
})

const toggleShowMore = () => {
  showMoreRelated.value = !showMoreRelated.value
}
</script>

<style scoped>
.blog-post-section {
  padding: 2.5rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  flex: 1;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.6s ease-out;
  transition: background-color 0.3s ease;
}

.blog-post-section::before {
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.post-container {
  display: flex;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Side Panel Styles */
.side-panel {
  width: 280px;
  flex-shrink: 0;
}

.side-panel-content {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px var(--card-shadow);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  animation: slideInLeft 0.6s ease-out;
  transition: background-color 0.3s ease;
}

:root.light-mode .side-panel-content {
  background: #CBD5E1;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.side-panel-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: border-color 0.3s ease;
}

:root.light-mode .side-panel-title {
  color: #1F3A52;
  border-bottom-color: #7FA8C9;
}

.related-posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-post-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  display: flex;
  flex-direction: column;
}

:root.light-mode .related-post-card {
  background: #A8C5DD;
  border-color: #7FA8C9;
  color: #1F2937;
}

.related-post-card:hover {
  border-color: #2563eb;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
  transform: translateY(-3px);
}

:root.light-mode .related-post-card:hover {
  border-color: #5B8EC9;
  box-shadow: 0 8px 20px rgba(91, 142, 201, 0.3);
}

.related-post-card.active {
  background: var(--card-bg);
  border-color: #2563eb;
  box-shadow: 0 8px 20px var(--card-shadow);
}

:root.light-mode .related-post-card.active {
  background: #A8C5DD;
  border-color: #5B8EC9;
  color: #1F2937;
}

.card-image {
  width: 100%;
  height: 140px;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  transition: background-color 0.3s ease;
}

.article-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-post-card:hover .article-img {
  transform: scale(1.05);
}

.emoji-placeholder {
  font-size: 3rem;
  animation: bounce 3s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.card-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

:root.light-mode .card-title {
  color: #1F3A52;
}

.card-excerpt {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

:root.light-mode .card-excerpt {
  color: #3D5A7D;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: auto;
  transition: color 0.3s ease;
}

.card-date {
  font-weight: 600;
  color: #2563eb;
}

.card-read-time {
  color: #9ca3af;
}

.see-more-btn {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  color: white;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  margin-top: 0.5rem;
  box-shadow: 0 4px 15px rgba(188, 108, 37, 0.3);
}

.see-more-btn:hover {
  background: linear-gradient(135deg, #DDA15E 0%, #BC6C25 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(188, 108, 37, 0.4);
}

.see-more-btn:active {
  transform: translateY(0);
}

/* Main Content */
.main-content {
  flex: 1;
  min-width: 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.back-btn {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(188, 108, 37, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-btn:hover {
  background: linear-gradient(135deg, #DDA15E 0%, #BC6C25 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(188, 108, 37, 0.6);
}

.back-btn:active {
  transform: translateX(-2px);
}

.blog-post {
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px var(--card-shadow);
  animation: slideUp 0.6s ease-out 0.1s backwards;
  transition: background-color 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-header {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.post-header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.emoji-icon {
  font-size: 5rem;
  position: relative;
  z-index: 2;
  animation: bounce 3s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.category-badge {
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

/* Category Badge Colors */
.category-badge.personal-experiences {
  background: linear-gradient(135deg, #BC6C25 0%, #A55A1F 100%);
}

.category-badge.personal-perspectives {
  background: linear-gradient(135deg, #DDA15E 0%, #CC8F48 100%);
}

.category-badge.educational-articles {
  background: linear-gradient(135deg, #C49A36 0%, #A67C2F 100%);
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.category-badge.spotlight-initiatives {
  background: linear-gradient(135deg, #283618 0%, #1F2912 100%);
}

.category-badge.creative-expressions {
  background: linear-gradient(135deg, #606C38 0%, #4D5829 100%);
}

.post-content {
  padding: 3.5rem 2.5rem;
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: 0 8px 32px var(--card-shadow);
  transition: background-color 0.3s ease;
}

:root.light-mode .post-content {
  background: #CBD5E1;
}

.post-title {
  font-size: 2.8rem;
  color: var(--text-primary);
  margin-bottom: 1.8rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
}

:root.light-mode .post-title {
  color: #1F3A52;
}

.post-meta {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.8rem;
  border-bottom: 3px solid var(--border-color);
  font-size: 1.05rem;
  color: var(--text-secondary);
  font-weight: 500;
  animation: fadeInUp 0.6s ease-out 0.2s backwards;
  transition: border-color 0.3s ease, color 0.3s ease;
}

:root.light-mode .post-meta {
  color: #3D5A7D;
  border-bottom-color: #7FA8C9;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-body {
  line-height: 1.9;
  color: var(--text-primary);
  font-size: 1.1rem;
  animation: fadeInUp 0.6s ease-out 0.3s backwards;
  transition: color 0.3s ease;
}

:root.light-mode .post-body {
  color: #1F3A52;
}

.post-body h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-top: 2.5rem;
  margin-bottom: 1.2rem;
  font-weight: 800;
  padding-bottom: 0.8rem;
  border-bottom: 3px solid #f97316;
  transition: color 0.3s ease;
}

.post-body h3 {
  font-size: 1.5rem;
  color: #a16207;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.post-body p {
  margin-bottom: 1.2rem;
  text-align: justify;
}

.post-body ul,
.post-body ol {
  margin-left: 2.5rem;
  margin-bottom: 1.5rem;
}

.post-body li {
  margin-bottom: 0.8rem;
  line-height: 1.8;
}

.post-body blockquote {
  border-left: 5px solid #632024;
  padding: 1.5rem;
  padding-left: 1.8rem;
  margin: 2rem 0;
  color: var(--text-secondary);
  font-style: italic;
  background: var(--bg-secondary);
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Media Section Styles */
.media-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border-color);
  transition: border-color 0.3s ease;
}

:root.light-mode .media-section {
  background: #A8C5DD;
  padding: 2rem;
  border-radius: 12px;
  border-top: none;
  border-left: 4px solid #7FA8C9;
}

.media-section h3 {
  font-size: 1.6rem;
  color: #BC6C25;
  margin-bottom: 1.5rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

:root.dark-mode .media-section h3 {
  color: #DDA15E;
}

:root.light-mode .media-section h3 {
  color: #1F3A52;
}

.media-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.media-item {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  padding: 1.5rem;
  text-align: center;
}

:root.dark-mode .media-item {
  background: rgba(188, 108, 37, 0.1);
  border-color: rgba(188, 108, 37, 0.2);
}

:root.light-mode .media-item {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(127, 168, 201, 0.3);
}

.media-item:hover {
  border-color: #BC6C25;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(188, 108, 37, 0.2);
}

:root.dark-mode .media-item:hover {
  border-color: #DDA15E;
  box-shadow: 0 8px 20px rgba(221, 161, 94, 0.3);
}

:root.light-mode .media-item:hover {
  border-color: #5B8EC9;
  box-shadow: 0 8px 20px rgba(91, 142, 201, 0.3);
}

.media-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.media-icon {
  font-size: 3.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.media-title {
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

:root.light-mode .media-title {
  color: #1F3A52;
}

.media-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  transition: color 0.3s ease;
}

:root.light-mode .media-description {
  color: #3D5A7D;
}

/* Links Section Styles */
.links-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border-color);
  transition: border-color 0.3s ease;
}

:root.light-mode .links-section {
  background: #A8C5DD;
  padding: 2rem;
  border-radius: 12px;
  border-top: none;
  border-left: 4px solid #7FA8C9;
}

.links-section h3 {
  font-size: 1.6rem;
  color: #BC6C25;
  margin-bottom: 1.5rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

:root.dark-mode .links-section h3 {
  color: #DDA15E;
}

:root.light-mode .links-section h3 {
  color: #1F3A52;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  background: var(--bg-secondary);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid var(--border-color);
}

:root.dark-mode .related-link {
  background: rgba(188, 108, 37, 0.1);
  border-color: rgba(188, 108, 37, 0.2);
}

:root.light-mode .related-link {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(127, 168, 201, 0.3);
}

.related-link:hover {
  background: linear-gradient(135deg, rgba(188, 108, 37, 0.15) 0%, rgba(221, 161, 94, 0.1) 100%);
  border-color: #BC6C25;
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(188, 108, 37, 0.2);
}

:root.dark-mode .related-link:hover {
  background: linear-gradient(135deg, rgba(188, 108, 37, 0.2) 0%, rgba(221, 161, 94, 0.15) 100%);
  border-color: #DDA15E;
  box-shadow: 0 4px 15px rgba(221, 161, 94, 0.3);
}

:root.light-mode .related-link:hover {
  background: rgba(255, 255, 255, 0.7);
  border-color: #5B8EC9;
  box-shadow: 0 4px 15px rgba(91, 142, 201, 0.3);
}

.link-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.link-text {
  flex: 1;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;
}

:root.light-mode .link-text {
  color: #1F3A52;
}

.external-icon {
  color: #f97316;
  font-size: 1.2rem;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .blog-post-section {
    padding: 1.5rem;
  }

  .post-container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .side-panel {
    width: 100%;
    order: 2;
  }

  .main-content {
    order: 1;
  }

  .side-panel-content {
    position: static;
    top: auto;
  }

  .card-image {
    height: 120px;
  }

  .card-content {
    padding: 0.8rem;
  }

  .card-title {
    font-size: 0.85rem;
  }

  .card-excerpt {
    font-size: 0.7rem;
  }

  .card-meta {
    font-size: 0.7rem;
  }

  .post-header {
    padding: 3rem 1.5rem;
  }

  .emoji-icon {
    font-size: 4.5rem;
  }

  .category-badge {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    top: 1rem;
    right: 1rem;
  }

  .post-content {
    padding: 2rem 1.5rem;
  }

  .post-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .post-meta {
    flex-direction: column;
    gap: 0.8rem;
    border-bottom: 2px solid #eee;
    padding-bottom: 1rem;
  }

  .post-body {
    font-size: 1rem;
    line-height: 1.8;
  }

  .post-body h2 {
    font-size: 1.6rem;
    margin-top: 1.8rem;
  }

  .post-body h3 {
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }

  .post-body blockquote {
    padding: 1rem;
    padding-left: 1.2rem;
    margin: 1.5rem 0;
  }

  .media-section,
  .links-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }

  .media-gallery {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .media-item {
    padding: 1rem;
  }

  .media-placeholder {
    height: 150px;
  }

  .media-icon {
    font-size: 2.5rem;
  }

  .links-section h3,
  .media-section h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .related-link {
    padding: 1rem;
    font-size: 0.95rem;
  }

  .link-icon {
    font-size: 1.2rem;
  }

  .external-icon {
    font-size: 1rem;
  }
}

/* Tags Section */
.tags-section {
  margin: 3rem 0;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border-left: 4px solid #BC6C25;
  box-shadow: 0 4px 12px var(--card-shadow);
  animation: slideInUp 0.5s ease-out;
  transition: background-color 0.3s ease;
}

:root.dark-mode .tags-section {
  background: rgba(188, 108, 37, 0.1);
  border-left-color: #DDA15E;
  box-shadow: 0 4px 12px rgba(188, 108, 37, 0.2);
}

:root.light-mode .tags-section {
  background: #A8C5DD;
  border-left-color: #7FA8C9;
  box-shadow: 0 4px 12px rgba(91, 142, 201, 0.2);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tags-section h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: color 0.3s ease;
}

:root.light-mode .tags-section h3 {
  color: #1F3A52;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tag-badge {
  background: linear-gradient(135deg, rgba(188, 108, 37, 0.15) 0%, rgba(221, 161, 94, 0.05) 100%);
  color: #BC6C25;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(188, 108, 37, 0.3);
  transition: all 0.3s ease;
  display: inline-block;
  cursor: default;
}

:root.dark-mode .tag-badge {
  background: linear-gradient(135deg, rgba(221, 161, 94, 0.15) 0%, rgba(188, 108, 37, 0.05) 100%);
  color: #DDA15E;
  border-color: rgba(221, 161, 94, 0.4);
}

:root.light-mode .tag-badge {
  background: rgba(255, 255, 255, 0.4);
  color: #2D5182;
  border-color: rgba(45, 81, 130, 0.3);
}

.tag-badge:hover {
  background: linear-gradient(135deg, rgba(188, 108, 37, 0.2) 0%, rgba(221, 161, 94, 0.1) 100%);
  border-color: #BC6C25;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(188, 108, 37, 0.3);
}

:root.dark-mode .tag-badge:hover {
  background: linear-gradient(135deg, rgba(221, 161, 94, 0.25) 0%, rgba(188, 108, 37, 0.15) 100%);
  border-color: #DDA15E;
  box-shadow: 0 4px 12px rgba(221, 161, 94, 0.4);
}

:root.light-mode .tag-badge:hover {
  background: rgba(255, 255, 255, 0.6);
  border-color: #5B8EC9;
  box-shadow: 0 4px 12px rgba(91, 142, 201, 0.3);
}

@media (max-width: 768px) {
  .tags-section {
    padding: 1.5rem;
    margin: 2rem 0;
  }

  .tags-section h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .tag-badge {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
