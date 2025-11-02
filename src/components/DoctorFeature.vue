<template>
  <section class="doctor-feature-section">
    <div class="container">
      <div class="feature-wrapper">
        <!-- Doctor Image -->
        <div class="doctor-image-side">
          <div class="doctor-image">
            <UserCheck v-if="!doctorInfo.imageUrl" class="doctor-icon" :size="120" />
            <img v-else :src="doctorInfo.imageUrl" :alt="doctorInfo.name" class="doctor-img">
          </div>
          <div class="feature-badge">
            <span class="badge-label">Featured This Week</span>
            <Star class="badge-icon-component" :size="20" />
          </div>
        </div>

        <!-- Doctor Info -->
        <div class="doctor-info-side">
          <div class="feature-label">Animal Welfare Week Feature</div>
          <h2 class="feature-title">{{ doctorInfo.name }}</h2>
          <p class="doctor-role">{{ doctorInfo.role }}</p>
          <p class="doctor-bio">{{ doctorInfo.bio }}</p>

          <!-- Quote Section -->
          <div class="quote-section">
            <Quote class="quote-icon-component" :size="32" />
            <p class="quote-text">{{ doctorInfo.quote }}</p>
            <p class="quote-author">— {{ doctorInfo.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { UserCheck, Star, Quote } from 'lucide-vue-next'

defineEmits(['navigate-to-articles'])

const doctorInfo = {
  name: 'Dr. Katherine Mae I. Caterial',
  role: 'Chief Veterinarian & Animal Welfare Director',
  image: '👩‍⚕️',
  imageUrl: null,
  bio: 'Dr. Rebecca Santos is a compassionate veterinarian with over 15 years of experience in animal welfare and conservation. She\'s passionate about ensuring all animals receive the care and respect they deserve.',
  quote: 'Every animal deserves the right to live free from hunger, thirst, physical discomfort, pain, and the freedom to express natural behaviors. Animal Welfare Week reminds us of our responsibility to protect these fundamental rights.'
}
</script>

<style scoped>
.doctor-feature-section {
  padding: 5rem 2rem;
  background: transparent;
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.doctor-feature-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: transparent;
  border-radius: 50%;
  pointer-events: none;
}

.doctor-feature-section::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: transparent;
  border-radius: 50%;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.feature-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(37, 99, 235, 0.2);
  animation: slideInUp 0.8s ease-out;
  padding: 3rem;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:root.dark-mode .feature-wrapper {
  background: rgba(20, 30, 50, 0.8);
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

:root.light-mode .feature-wrapper {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(37, 99, 235, 0.25);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Doctor Image Side */
.doctor-image-side {
  position: relative;
  height: 100%;
  min-height: 500px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.doctor-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.doctor-emoji {
  font-size: 12rem;
  animation: float 4s ease-in-out infinite;
}

.doctor-icon {
  color: #2563eb;
  animation: float 4s ease-in-out infinite;
}

.doctor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.feature-badge {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  animation: slideInUp 0.6s ease-out 0.3s backwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.badge-label {
  font-weight: 600;
  color: #2563eb;
  font-size: 0.9rem;
}

.badge-icon {
  font-size: 1.3rem;
  animation: pulse 2s ease-in-out infinite;
}

.badge-icon-component {
  color: #2563eb;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Doctor Info Side */
.doctor-info-side {
  padding: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.feature-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

:root.dark-mode .feature-title {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.doctor-role {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2563eb;
  margin: 0;
}

.doctor-bio {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin: 0;
}

/* Quote Section */
.quote-section {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%);
  padding: 2rem;
  border-radius: 15px;
  border-left: 5px solid #2563eb;
  margin: 1rem 0;
}

.quote-icon {
  font-size: 2.5rem;
  color: #2563eb;
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.quote-icon-component {
  color: #2563eb;
  opacity: 0.3;
  margin-bottom: 0.5rem;
}

.quote-text {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.8;
  font-weight: 500;
}

.quote-author {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2563eb;
  margin: 1rem 0 0 0;
  text-align: right;
}

/* Call to Action */
.feature-cta {
  align-self: flex-start;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.feature-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.3);
}

.feature-cta:active {
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 1024px) {
  .feature-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2.5rem;
  }

  .doctor-image-side {
    min-height: 400px;
  }

  .doctor-info-side {
    padding: 2rem;
  }

  .feature-title {
    font-size: 2.2rem;
  }

  .doctor-emoji {
    font-size: 8rem;
  }
}

@media (max-width: 768px) {
  .doctor-feature-section {
    padding: 2rem 1rem;
  }

  .feature-wrapper {
    padding: 2rem;
    gap: 1.5rem;
  }

  .doctor-image-side {
    min-height: 450px;
  }

  .doctor-info-side {
    padding: 1.5rem;
  }

  .feature-title {
    font-size: 2rem;
  }

  .doctor-role {
    font-size: 1rem;
  }

  .doctor-bio {
    font-size: 0.95rem;
  }

  .quote-section {
    padding: 1.5rem;
    margin: 1rem 0;
  }

  .quote-text {
    font-size: 1rem;
  }

  .points-list li {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }

  .feature-cta {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .doctor-feature-section {
    padding: 1.5rem 0.75rem;
  }

  .feature-wrapper {
    padding: 1.5rem;
    gap: 1rem;
  }

  .doctor-image-side {
    min-height: 500px;
  }

  .doctor-info-side {
    padding: 1rem;
  }

  .feature-title {
    font-size: 1.6rem;
  }

  .doctor-role {
    font-size: 0.95rem;
  }

  .doctor-bio {
    font-size: 0.9rem;
  }

  .feature-label {
    font-size: 0.75rem;
  }

  .quote-section {
    padding: 1rem;
    margin: 0.8rem 0;
  }

  .quote-text {
    font-size: 0.9rem;
  }

  .quote-author {
    font-size: 0.85rem;
  }
}
</style>
