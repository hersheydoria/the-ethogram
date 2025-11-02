<template>
  <section class="paws-section">
    <div class="container">
      <!-- Header -->
      <div class="paws-header">
        <h1 class="paws-title">🐾 Paws Behind The Scenes</h1>
        <p class="paws-subtitle">Meet Our Beloved Companions</p>
        <p class="paws-description">
          Discover the wonderful animals in our team's lives and learn fascinating facts about different species and their behaviors.
        </p>
      </div>

      <!-- Pets Grid -->
      <div class="pets-grid">
        <div 
          v-for="pet in pets" 
          :key="pet.id"
          class="pet-card"
          @click="selectedPet = pet"
        >
          <div class="pet-image-wrapper">
            <div class="pet-image">
              <component v-if="!pet.imageUrl" :is="pet.icon" class="pet-icon" :size="100" />
              <img v-else :src="pet.imageUrl" :alt="pet.name" class="pet-img">
            </div>
            <div class="pet-badge">{{ pet.type }}</div>
          </div>
          <div class="pet-info">
            <h3 class="pet-name">{{ pet.name }}</h3>
            <p class="pet-owner">Owned by: {{ pet.owner }}</p>
          </div>
        </div>
      </div>

      <!-- Pet Detail Modal -->
      <transition name="modal">
        <div v-if="selectedPet" class="modal-overlay" @click="selectedPet = null">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="selectedPet = null">✕</button>
            
            <div class="modal-body">
              <div class="modal-image">
                <component v-if="!selectedPet.imageUrl" :is="selectedPet.icon" class="modal-icon" :size="140" />
                <img v-else :src="selectedPet.imageUrl" :alt="selectedPet.name" class="modal-img">
              </div>
              
              <div class="modal-details">
                <h2 class="modal-name">{{ selectedPet.name }}</h2>
                <p class="modal-type"><strong>Type:</strong> {{ selectedPet.type }}</p>
                <p class="modal-owner"><strong>Owner:</strong> {{ selectedPet.owner }}</p>
                
                <div class="modal-facts">
                  <h3 class="facts-title">Fun Facts</h3>
                  <ul class="facts-list">
                    <li v-for="(fact, index) in selectedPet.funFacts" :key="index">
                      {{ fact }}
                    </li>
                  </ul>
                </div>
                
                <p class="modal-story">{{ selectedPet.story }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Fun Facts Section -->
      <div class="facts-section">
        <h2 class="facts-section-title">Did You Know?</h2>
        <div class="facts-cards">
          <div v-for="fact in generalFacts" :key="fact.id" class="fact-card">
            <component :is="fact.iconComponent" class="fact-icon-component" :size="40" />
            <h3 class="fact-title">{{ fact.title }}</h3>
            <p class="fact-content">{{ fact.content }}</p>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="back-button-container">
        <button @click="$emit('navigate-to-landing')" class="back-button">
          ← Back
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Dog, Cat, Bird, Rabbit, Fish, Squirrel, Lightbulb, MessageCircle, Heart, Home
} from 'lucide-vue-next'

defineEmits(['navigate-to-landing'])

const selectedPet = ref(null)

const pets = [
  {
    id: 1,
    name: 'Luna',
    type: 'Dog',
    icon: Dog,
    owner: 'Dr. Sarah',
    funFacts: [
      'Dogs have a sense of smell that is 10,000 to 100,000 times more sensitive than humans',
      'A dog\'s hearing range is much broader than humans',
      'Dogs can understand up to 250 different words'
    ],
    story: 'Luna is an energetic Golden Retriever who loves to play fetch in the park. She has been a wonderful companion to Dr. Sarah and brings joy to everyone in the office!'
  },
  {
    id: 2,
    name: 'Whiskers',
    type: 'Cat',
    icon: Cat,
    owner: 'Dr. James',
    funFacts: [
      'Cats have a specialized collarbone that allows them to squeeze through tight spaces',
      'Cats can rotate their ears independently up to 180 degrees',
      'A cat\'s purr vibrates at a frequency that may promote bone healing'
    ],
    story: 'Whiskers is a curious tabby cat who enjoys exploring the office and napping in sunny spots. He\'s a gentle reminder of how animals find peace in their own way.'
  },
  {
    id: 3,
    name: 'Tweety',
    type: 'Parrot',
    icon: Bird,
    owner: 'Dr. Emily',
    funFacts: [
      'Parrots can live 20-80 years depending on the species',
      'Parrots can mimic human speech and understand context',
      'They have excellent color vision and can see ultraviolet light'
    ],
    story: 'Tweety is a vibrant macaw who loves to interact with visitors. Dr. Emily has taught Tweety several words, and he never fails to greet everyone with enthusiasm!'
  },
  {
    id: 4,
    name: 'Nibbles',
    type: 'Rabbit',
    icon: Rabbit,
    owner: 'Dr. Michael',
    funFacts: [
      'Rabbits have eyes on the sides of their heads, giving them a 360-degree field of vision',
      'Rabbits can see in the dark thanks to their large eyes',
      'They communicate through thumping their feet and various body positions'
    ],
    story: 'Nibbles is a gentle Holland Lop rabbit who loves fresh vegetables. He teaches us about the importance of proper pet nutrition and care.'
  },
  {
    id: 5,
    name: 'Splash',
    type: 'Goldfish',
    icon: Fish,
    owner: 'Dr. Jessica',
    funFacts: [
      'Goldfish have a memory span of at least 3 months',
      'Fish can recognize individual human faces',
      'Goldfish can see all colors including ultraviolet'
    ],
    story: 'Splash brightens up the office with his graceful movements. He\'s a reminder that even small pets deserve care, attention, and proper living environments.'
  },
  {
    id: 6,
    name: 'Pepper',
    type: 'Guinea Pig',
    icon: Squirrel,
    owner: 'Dr. Lisa',
    funFacts: [
      'Guinea pigs are highly social animals and should not be kept alone',
      'They can jump nearly as high as they are long',
      'Guinea pigs can communicate with over 10 different sounds'
    ],
    story: 'Pepper is a cheerful guinea pig who loves interaction and treats. She\'s a great example of how proper socialization benefits animal well-being.'
  }
]

const generalFacts = [
  {
    id: 1,
    iconComponent: Lightbulb,
    title: 'Animal Intelligence',
    content: 'Many animals possess complex cognitive abilities. Elephants can recognize themselves in mirrors, crows can solve multi-step puzzles, and octopuses have excellent problem-solving skills.'
  },
  {
    id: 2,
    iconComponent: MessageCircle,
    title: 'Communication',
    content: 'Animals communicate in diverse ways - through vocalizations, body language, chemical signals, and more. Understanding these signals is key to proper animal care.'
  },
  {
    id: 3,
    iconComponent: Heart,
    title: 'Emotional Intelligence',
    content: 'Research shows that many animals experience emotions. Dogs feel joy and loyalty, elephants mourn their dead, and many species form lifelong bonds.'
  },
  {
    id: 4,
    iconComponent: Home,
    title: 'Environmental Needs',
    content: 'Each species has specific environmental requirements. Proper temperature, lighting, space, and enrichment are essential for animal health and happiness.'
  }
]
</script>

<style scoped>
.paws-section {
  padding: 5rem 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Header */
.paws-header {
  text-align: center;
  margin-bottom: 4rem;
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

.paws-title {
  font-size: 3.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root.dark-mode .paws-title {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.paws-subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin-bottom: 1rem;
}

.paws-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Pets Grid */
.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.pet-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px var(--card-shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid var(--border-color);
  animation: fadeInUp 0.6s ease-out;
}

:root.light-mode .pet-card {
  background: #FFFFFF;
  border-color: #E5E7EB;
}

.pet-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px var(--card-shadow);
  border-color: #2563eb;
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

.pet-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.pet-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.pet-emoji {
  font-size: 6rem;
  animation: float 3s ease-in-out infinite;
}

.pet-icon {
  color: white;
  animation: float 3s ease-in-out infinite;
}

.pet-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.pet-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.pet-info {
  padding: 1.5rem;
  text-align: center;
}

.pet-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.pet-owner {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: var(--card-bg);
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

:root.light-mode .modal-content {
  background: #FFFFFF;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-primary);
  z-index: 10;
  transition: all 0.3s ease;
}

.modal-close:hover {
  transform: scale(1.2);
}

.modal-body {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
  align-items: start;
}

.modal-image {
  width: 100%;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-emoji {
  font-size: 8rem;
}

.modal-icon {
  color: white;
}

.modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-name {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.modal-type,
.modal-owner {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
}

.modal-facts {
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1rem 0;
}

.facts-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.facts-list {
  margin: 0;
  padding-left: 1.5rem;
}

.facts-list li {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.modal-story {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin: 0;
  font-style: italic;
}

/* Fun Facts Section */
.facts-section {
  margin: 4rem 0;
  text-align: center;
}

.facts-section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root.dark-mode .facts-section-title {
  background: linear-gradient(135deg, #2563eb 0%, #f97316 50%, #a16207 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.facts-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.fact-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px var(--card-shadow);
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
}

:root.light-mode .fact-card {
  background: #FFFFFF;
  border-color: #E5E7EB;
}

.fact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px var(--card-shadow);
}

.fact-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.fact-icon-component {
  color: #2563eb;
  margin-bottom: 1rem;
}

.fact-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.fact-content {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Back Button */
.back-button-container {
  text-align: center;
  margin-top: 3rem;
}

.back-button {
  background: linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(188, 108, 37, 0.3);
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .paws-section {
    padding: 3rem 1.5rem;
  }

  .paws-title {
    font-size: 2.5rem;
  }

  .paws-subtitle {
    font-size: 1.3rem;
  }

  .pets-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .modal-body {
    grid-template-columns: 1fr;
  }

  .modal-image {
    height: 250px;
  }
}
</style>
