<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-bold text-stone-700 mb-1">{{ label }}</label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :required="required"
        :disabled="disabled"
        :class="[
          'appearance-none block w-full px-4 py-3 border border-stone-200 placeholder-stone-400 text-stone-900 rounded-full focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 sm:text-sm transition-all duration-300 bg-white disabled:bg-stone-100 disabled:text-stone-400',
          error ? 'border-rose-400 focus:ring-rose-100 focus:border-rose-400' : ''
        ]"
      >
        <option value="" disabled>{{ placeholder || 'Select an option' }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <svg class="h-4 w-4 text-stone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <div v-if="error" class="absolute inset-y-0 right-10 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-rose-600">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => Math.random().toString(36).substring(2, 9)
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => [] // Array of { value: '', label: '' }
  }
})

defineEmits(['update:modelValue'])
</script>
