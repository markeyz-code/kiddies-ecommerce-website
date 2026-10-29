<template>
  <div v-if="!hideOnCheckoutRoutes">
    <!-- Chat Button -->
    <button 
      v-show="!footerVisible || isOpen"
      @click="toggleChat"
      aria-label="Open customer support chat"
      class="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-brand-700 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-brand-800 transition-colors z-50 focus:outline-none"
    >
      <MessageSquare v-if="!isOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </button>

    <!-- Chat Window -->
    <div 
      v-if="isOpen"
      :class="[
        'fixed bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-cream-200 transition-all duration-300',
        isFullScreen ? 'inset-0 w-full h-full rounded-none' : 'bottom-20 left-3 right-3 w-auto sm:left-auto sm:right-6 sm:w-96'
      ]"
      :style="isFullScreen ? '' : 'height: 500px; max-height: 80vh;'"
    >
      <!-- Header -->
      <div class="bg-brand-700 p-4 text-white flex justify-between items-start">
        <div>
          <h3 class="font-bold text-lg">Customer Support</h3>
          <p class="text-brand-100 text-sm">We typically reply in a few minutes.</p>
        </div>
        <button @click="isFullScreen = !isFullScreen" class="text-brand-100 hover:text-white group relative">
          <Maximize v-if="!isFullScreen" class="w-5 h-5" />
          <Minimize v-else class="w-5 h-5" />
          <span class="absolute -bottom-8 right-0 bg-brand-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
            {{ isFullScreen ? 'Exit full screen' : 'Switch to full screen mode for better chatting' }}
          </span>
        </button>
      </div>

      <!-- Welcome Form (if not joined) -->
      <div v-if="!isJoined" class="flex-1 p-6 flex flex-col justify-center space-y-4">
        <div class="text-center mb-4">
          <p class="text-brand-500">Please enter your name and email to start chatting with us.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-700 mb-1">Your Name</label>
          <input 
            v-model="customerName"
            @keyup.enter="joinChat"
            type="text" 
            placeholder="John Doe"
            class="w-full px-4 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-brand-700 mb-1">Your Email</label>
          <input 
            v-model="customerEmail"
            @keyup.enter="joinChat"
            type="email" 
            placeholder="john@example.com"
            class="w-full px-4 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-500"
          />
        </div>
        <button 
          @click="joinChat"
          :disabled="!customerName.trim() || !customerEmail.trim()"
          class="w-full bg-brand-700 text-white py-2 px-4 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Chat
        </button>
      </div>

      <!-- Chat Messages -->
      <div v-else class="flex-1 overflow-y-auto p-4 space-y-4 bg-cream-50 flex flex-col relative" @click="showEmojiPicker = false">
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-brand-500 text-sm space-y-2 mb-4">
          <div class="bg-coral-100 text-ink p-3 rounded-lg text-center max-w-[90%] shadow-sm">
            <p class="font-bold mb-1">Hi {{ customerName }}! 👋</p>
            <p>You can begin chatting now. One of our support agents will be with you shortly.</p>
          </div>
        </div>
        <div 
          v-for="(msg, index) in messages" 
          :key="index"
          :class="['max-w-[80%] rounded-2xl px-4 py-2 text-sm', msg.sender === 'customer' ? 'bg-brand-700 text-white self-end rounded-br-sm' : 'bg-white text-ink border border-cream-200 self-start rounded-bl-sm']"
        >
          <template v-if="msg.type === 'image'">
            <img :src="msg.message" class="max-w-full rounded-lg" alt="Uploaded Image" />
          </template>
          <template v-else>
            {{ msg.message }}
          </template>
        </div>
      </div>

      <!-- Message Input -->
      <div v-if="isJoined" class="p-3 bg-white border-t border-cream-200 relative">
        <div v-if="showEmojiPicker" class="absolute bottom-full left-2 mb-2 z-50 shadow-xl rounded-lg">
          <ClientOnly>
            <EmojiPicker @select="onSelectEmoji" :native="true" />
          </ClientOnly>
        </div>
        <form @submit.prevent="sendMessage" class="flex items-center space-x-2">
          <button type="button" @click.stop="showEmojiPicker = !showEmojiPicker" class="text-brand-400 hover:text-brand-500">
            <Smile class="w-6 h-6" />
          </button>
          
          <button type="button" @click="fileInput.click()" class="text-brand-400 hover:text-brand-500">
            <Paperclip class="w-5 h-5" />
          </button>
          <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden" />

          <input 
            v-model="newMessage"
            type="text" 
            placeholder="Type your message..."
            class="flex-1 px-4 py-2 border border-brand-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-500 text-sm"
          />
          <button 
            type="submit"
            :disabled="!newMessage.trim()"
            class="bg-brand-700 text-white p-2 rounded-full hover:bg-brand-800 transition-colors disabled:opacity-50"
          >
            <Send class="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { rawBaseUrl, GATEWAY_ENDPOINT } from '~/api_factory/axios.config';
import { useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { io } from 'socket.io-client'
import { MessageSquare, X, Maximize, Minimize, Smile, Paperclip, Send } from 'lucide-vue-next'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const isOpen = ref(false)
const isJoined = ref(false)
const isFullScreen = ref(false)
const customerName = ref('')
const customerEmail = ref('')
const newMessage = ref('')
const messages = ref([])
const sessionId = ref('')
const showEmojiPicker = ref(false)
const fileInput = ref(null)
let socket = null

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && !isJoined.value) {
    const storedName = localStorage.getItem('chatCustomerName')
    const storedEmail = localStorage.getItem('chatCustomerEmail')
    if (storedName && storedEmail) {
      customerName.value = storedName
      customerEmail.value = storedEmail
      joinChat()
    }
  }
}

const route = useRoute();
const hideOnCheckoutRoutes = computed(() => ['/cart', '/checkout', '/checkout-success', '/account'].includes(route.path));
const footerVisible = ref(false);
let footerObserver = null;

const generateSessionId = () => {
  return 'sess_' + Math.random().toString(36).substr(2, 9)
}

const joinChat = () => {
  if (!customerName.value.trim() || !customerEmail.value.trim()) return
  
  socket = io(rawBaseUrl, { transports: ['websocket', 'polling'] })
  
  const storedSession = localStorage.getItem('chatSessionId')
  if (storedSession) {
    sessionId.value = storedSession
  } else {
    sessionId.value = generateSessionId()
    localStorage.setItem('chatSessionId', sessionId.value)
  }
  
  localStorage.setItem('chatCustomerName', customerName.value.trim())
  localStorage.setItem('chatCustomerEmail', customerEmail.value.trim())

  socket.emit('join_room', sessionId.value)
  
  GATEWAY_ENDPOINT.get(`/chat/session/${sessionId.value}`)
    .then(({ data }) => {
      if (Array.isArray(data)) {
        messages.value = data
      }
    })
    .catch(err => console.error('Error fetching chat history:', err))

  socket.on('receive_message', (message) => {
    messages.value.push(message)
    scrollToBottom()
  })

  isJoined.value = true
}

const onSelectEmoji = (emoji) => {
  newMessage.value += emoji.i
}

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target.result
      const messagePayload = {
        sessionId: sessionId.value,
        sender: 'customer',
        message: base64,
        type: 'image',
        customerName: customerName.value.trim(),
        customerEmail: customerEmail.value.trim()
      }
      socket.emit('send_message', messagePayload)
      scrollToBottom()
    }
    reader.readAsDataURL(file)
  }
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !socket) return

  const messagePayload = {
    sessionId: sessionId.value,
    sender: 'customer',
    message: newMessage.value.trim(),
    type: 'text',
    customerName: customerName.value.trim(),
    customerEmail: customerEmail.value.trim()
  }

  socket.emit('send_message', messagePayload)
  newMessage.value = ''
  showEmojiPicker.value = false
  scrollToBottom()
}

const scrollToBottom = () => {
  setTimeout(() => {
    const chatContainer = document.querySelector('.overflow-y-auto')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, 50)
}

onMounted(() => {
  const footer = document.querySelector('footer');
  if (footer && 'IntersectionObserver' in window) {
    footerObserver = new IntersectionObserver((entries) => {
      footerVisible.value = entries[0]?.isIntersecting || false;
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    footerObserver.observe(footer);
  }
})

onUnmounted(() => {
  if (socket) {
    socket.disconnect()
  }
  if (footerObserver) {
    footerObserver.disconnect()
    footerObserver = null
  }
})
</script>
