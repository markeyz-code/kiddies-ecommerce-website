<template>
  <div 
    class="relative overflow-hidden cursor-crosshair w-full h-full"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    ref="container"
  >
    <img 
      :src="src" 
      :alt="alt" 
      class="w-full h-full object-cover transition-transform duration-75 ease-out pointer-events-none"
      :style="imageStyle"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  zoomScale: {
    type: Number,
    default: 2.5
  }
})

const container = ref(null)
const isHovering = ref(false)
const mouseX = ref(50)
const mouseY = ref(50)

const onMouseEnter = () => {
  isHovering.value = true
}

const onMouseLeave = () => {
  isHovering.value = false
}

const onMouseMove = (e) => {
  if (!container.value) return
  const { left, top, width, height } = container.value.getBoundingClientRect()
  
  // Calculate percentage
  const x = ((e.clientX - left) / width) * 100
  const y = ((e.clientY - top) / height) * 100
  
  mouseX.value = x
  mouseY.value = y
}

const imageStyle = computed(() => {
  if (isHovering.value) {
    return {
      transformOrigin: `${mouseX.value}% ${mouseY.value}%`,
      transform: `scale(${props.zoomScale})`
    }
  }
  return {
    transformOrigin: 'center center',
    transform: 'scale(1)'
  }
})
</script>
