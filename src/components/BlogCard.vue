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
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(37, 99, 235, 0.1);
  position: relative;
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

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(37, 99, 235, 0.15);
  border-color: rgba(37, 99, 235, 0.3);
}

.blog-card:hover::before {
  opacity: 1;
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
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
}

.category-badge.personal-perspectives {
  background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
}

.category-badge.educational-articles {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.category-badge.spotlight-initiatives {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.category-badge.creative-expressions {
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
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

.card-title {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.blog-card:hover .card-title {
  color: #2563eb;
}

.card-excerpt {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  flex: 1;
  font-size: 0.95rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  border-top: 2px solid #f0f0f0;
  margin-bottom: 1.2rem;
  font-size: 0.85rem;
  color: #999;
  gap: 1rem;
}

.date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date::before {
  content: '📅';
}

.read-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.read-time::before {
  content: '⏱️';
}

.read-more {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
}

.read-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 64, 175, 0.6);
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
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
