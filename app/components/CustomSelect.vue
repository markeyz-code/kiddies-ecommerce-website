<template>
  <div class="relative w-full text-left" ref="containerRef">
    <!-- Optional Label -->
    <label v-if="label" :for="id" class="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 ml-0.5">
      {{ label }} <span v-if="required" class="text-rose-500">*</span>
    </label>

    <!-- Trigger Button (Custom Dropdown Trigger) -->
    <button
      :id="id"
      type="button"
      :disabled="disabled"
      @click="toggleDropdown"
      @keydown.down.prevent="openAndFocus"
      @keydown.up.prevent="openAndFocus"
      @keydown.esc.prevent="isOpen = false"
      :class="[
        'w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-2xl border transition-all duration-200 outline-none text-left select-none',
        isOpen ? 'border-brand-900 ring-2 ring-brand-900/10 bg-white' : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50',
        disabled ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed' : 'cursor-pointer text-stone-800',
        error ? 'border-rose-400 ring-1 ring-rose-200' : ''
      ]"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <span class="truncate block" :class="!selectedLabel ? 'text-stone-400 font-normal' : 'text-stone-800 font-semibold'">
        {{ selectedLabel || placeholder || 'Select an option' }}
      </span>

      <span class="ml-2 flex items-center pointer-events-none text-stone-400 transition-transform duration-200" :class="isOpen ? 'rotate-180 text-brand-900' : ''">
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <!-- Dropdown Menu Popover -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-1"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute left-0 right-0 z-50 mt-1.5 bg-white rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col py-1.5 focus:outline-none"
        style="max-height: 280px;"
      >
        <!-- Search Input Header -->
        <div class="px-3 pt-2 pb-2 border-b border-stone-100 sticky top-0 bg-white z-10">
          <div class="relative flex items-center">
            <svg class="h-3.5 w-3.5 absolute left-3 text-stone-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-900 focus:bg-white focus:outline-none transition-all placeholder:text-stone-400 font-medium"
              @keydown.esc.prevent="isOpen = false"
              @keydown.enter.prevent="selectFirstMatch"
            />
            <button
              v-if="searchQuery"
              type="button"
              @click="searchQuery = ''"
              class="absolute right-2 text-stone-400 hover:text-stone-600 p-1"
            >
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Options List -->
        <div class="overflow-y-auto flex-1 py-1 max-h-56 divide-y divide-stone-50" role="listbox">
          <button
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            type="button"
            @click="selectOption(option)"
            :class="[
              'w-full text-left px-4 py-2.5 text-xs font-medium flex items-center justify-between transition-colors',
              modelValue === option.value
                ? 'bg-brand-50 text-brand-900 font-bold'
                : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
            ]"
            role="option"
            :aria-selected="modelValue === option.value"
          >
            <span class="truncate pr-2">{{ option.label }}</span>
            <span v-if="modelValue === option.value" class="text-brand-900 flex-shrink-0">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </button>

          <!-- Empty State -->
          <div v-if="filteredOptions.length === 0" class="px-4 py-6 text-center text-xs text-stone-400">
            No matching options found
          </div>
        </div>
      </div>
    </transition>

    <!-- Error Message -->
    <p v-if="error" class="mt-1.5 text-xs font-semibold text-rose-600 ml-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
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
    default: () => 'custom-select-' + Math.random().toString(36).substring(2, 9)
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  options: {
    type: Array,
    default: () => []
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
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref(null);
const searchInputRef = ref(null);

// Normalize options array: [{ label, value }] or ['val']
const normalizedOptions = computed(() => {
  return (props.options || []).map(opt => {
    if (opt && typeof opt === 'object') {
      return {
        label: opt.label !== undefined ? String(opt.label) : String(opt.value),
        value: opt.value !== undefined ? opt.value : opt.label
      };
    }
    return {
      label: String(opt),
      value: opt
    };
  });
});

// Currently selected option's display label
const selectedLabel = computed(() => {
  const match = normalizedOptions.value.find(o => o.value === props.modelValue);
  return match ? match.label : '';
});

// Filtered options based on search query
const filteredOptions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return normalizedOptions.value;
  return normalizedOptions.value.filter(o => o.label.toLowerCase().includes(q));
});

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    searchQuery.value = '';
    nextTick(() => {
      searchInputRef.value?.focus();
    });
  }
};

const openAndFocus = () => {
  if (props.disabled) return;
  isOpen.value = true;
  searchQuery.value = '';
  nextTick(() => {
    searchInputRef.value?.focus();
  });
};

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
  searchQuery.value = '';
};

const selectFirstMatch = () => {
  if (filteredOptions.value.length > 0) {
    selectOption(filteredOptions.value[0]);
  }
};

// Click outside handler
const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClickOutside);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>
