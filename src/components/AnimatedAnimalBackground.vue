<template>
  <div class="animal-bg-layer">
    <span v-for="(icon, i) in icons" :key="i" class="animal-icon" :style="randomStyle(i)">{{ icon }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leftIcons = [
  // Egyptian animal/creature hieroglyphs and similar Unicode (no emojis)
  '𓃥','𓃠','𓃰','𓃱','𓃯','𓃸','𓃗','𓃟','𓃒','𓆈','𓆉','𓆏','𓆙','𓆊','𓆣','𓆧','𓆜','𓆡','𓅃','𓅟','𓅭',
]
const rightIcons = [
  // More animal/avian/fish/insect/plant hieroglyphs and symbols
  '𓅓','𓅛','𓅷','𓅺','𓅼','𓅽','𓅾','𓅿','𓆑','𓆒','𓆗','𓆘','𓆚','𓆛','𓆝','𓆞','𓆟','𓆢','𓆤','𓆦','𓆨','𓆫','𓆮','𓆯','𓆱','𓆲',
]
const icons = [...leftIcons, ...rightIcons]

// Seeded random number generator for consistent positioning
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate fixed scattered positions for all icons using seed
function generateFixedPositions(count) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    // Use different seeds for top and left to ensure variety
    const top = (seededRandom(i * 2 + 1) * 100).toFixed(2) + '%';
    const left = (seededRandom(i * 2 + 2) * 100).toFixed(2) + '%';
    positions.push({ top, left });
  }
  return positions;
}

const iconPositions = generateFixedPositions(icons.length);

const randomStyle = (i) => {
  // Each icon gets a unique position and size based on its index
  const pos = iconPositions[i];
  const size = (seededRandom(i * 3 + 10) * 2 + 2.5).toFixed(2) + 'rem';
  const opacity = (seededRandom(i * 3 + 20) * 0.25 + 0.1).toFixed(2);
  return {
    top: pos.top,
    left: pos.left,
    fontSize: size,
    opacity,
  }
}
</script>

<style scoped>
.animal-bg-layer {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.animal-icon {
  position: absolute;
  user-select: none;
  filter: blur(0.5px) brightness(0.9);
  color: #DDA15E;
  opacity: 0.18;
  transition: opacity 0.4s;
}

</style>
