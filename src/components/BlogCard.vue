<template>
  <article class="blog-card">
    <div class="card-image">
      <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" class="card-img" />
      <span v-else class="emoji-icon">{{ post.image }}</span>
      <span class="category-badge" :class="post.category">{{ post.category }}</span>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ post.title }}</h3>
      <p class="card-excerpt">{{ post.excerpt }}</p>
      <div class="card-footer">
        <span class="date">{{ formattedDate }}</span>
        <span class="read-time">{{ post.readTime }}</span>
      </div>
      <button class="read-more" @click="$emit('read-post', post.id)">Read More →</button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

defineEmits(['read-post'])

const formattedDate = computed(() => {
  const date = new Date(props.post.date)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})
</script>

<style scoped>
.blog-card {
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 20px var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  position: relative;
  height: 100%;
}

:root.light-mode .blog-card {
  background: #FFFFFF;
  border-color: #E5E7EB;
  color: #1F2937;
}

.blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

:root.light-mode .blog-card::before {
  background: linear-gradient(90deg, #7FA8C9 0%, #9CA3AF 50%, #CBD5E1 100%);
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(37, 99, 235, 0.15);
  border-color: rgba(37, 99, 235, 0.3);
}

:root.light-mode .blog-card:hover {
  background: var(--card-bg);
  box-shadow: 0 15px 40px rgba(90, 122, 148, 0.3);
  border-color: #5A7A94;
}

.card-image {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  padding: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  overflow: hidden;
  width: 100%;
  flex-shrink: 0;
}

.card-image::after {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: moveBackground 20s linear infinite;
}

@keyframes moveBackground {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

.emoji-icon {
  font-size: 4rem;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: block;
}

.category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  letter-spacing: 0.5px;
  z-index: 10;
}

.category-badge.personal-experiences {
  background: linear-gradient(135deg, #BC6C25 0%, #A55A1F 100%);
}

.category-badge.personal-perspectives {
  background: linear-gradient(135deg, #DDA15E 0%, #CC8F48 100%);
}

.category-badge.educational-articles {
  background: linear-gradient(135deg, #C49A36 0%, #A67C2F 100%);
}

.category-badge.spotlight-initiatives {
  background: linear-gradient(135deg, #4A6D42 0%, #3D5C35 100%);
}

.category-badge.creative-expressions {
  background: linear-gradient(135deg, #606C38 0%, #4D5829 100%);
}

/* Fallback for old category names still in use */
.category-badge.clinical {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
}

.category-badge.education {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.category-badge.welfare {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.category-badge.ethics {
  background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
}

.category-badge.wellbeing {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.category-badge.lifestyle {
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
}

.category-badge.interviews {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  color: white;
}

.category-badge.creative {
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
}

.category-badge.campaigns {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.category-badge.initiatives {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.category-badge.livestock {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
}

.category-badge.wildlife {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.category-badge.awareness {
  background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
}

.category-badge.rescue {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.category-badge.outreach {
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
  color: white;
}

.category-badge.onehealth {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
}

.card-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

:root.light-mode .card-content {
  background: var(--card-bg);
}

.card-title {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.4;
  transition: color 0.3s ease;
}

:root.light-mode .card-title {
  color: #1F2937;
}

.blog-card:hover .card-title {
  color: #2563eb;
}

:root.light-mode .blog-card:hover .card-title {
  color: #FFFFFF;
}

.card-excerpt {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.7;
  flex: 1;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

:root.light-mode .card-excerpt {
  color: #4B5563;
}

:root.light-mode .blog-card:hover .card-excerpt {
  color: #2563eb;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  border-top: 2px solid var(--border-color);
  margin-bottom: 1.2rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  gap: 1rem;
  transition: border-color 0.3s ease, color 0.3s ease;
}

:root.light-mode .card-footer {
  border-top-color: #9CA3AF;
  color: #4B5563;
}

.date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date::before {
  content: '📅';
  display: none;
}

.read-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.read-time::before {
  content: '⏱️';
  display: none;
}

.read-more {
  background: #4A6D42;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 15px rgba(74, 109, 66, 0.4);
}

:root.light-mode .read-more {
  background: #4A6D42;
  box-shadow: 0 4px 15px rgba(74, 109, 66, 0.4);
}

.read-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 109, 66, 0.6);
  background: #3D5C35;
}

:root.light-mode .read-more:hover {
  box-shadow: 0 6px 20px rgba(40, 54, 24, 0.6);
  background: #1F2912;
}

@media (max-width: 768px) {
  .card-image {
    height: 150px;
  }
  
  .emoji-icon {
    font-size: 3.5rem;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
}
</style>
