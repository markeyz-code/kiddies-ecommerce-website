<template>
  <div class="w-full bg-brand-900 text-white py-8 px-6 text-center font-serif flex flex-col items-center justify-center">
    <div class="flex items-center space-x-6 justify-center flex-wrap">
      <span class="text-sm font-sans font-bold tracking-widest uppercase">Labor Day Event</span>
      <h2 class="text-5xl font-normal tracking-wide">Extra 40% Off* Sale</h2>
      <span class="text-lg font-sans font-semibold tracking-wider">WITH CODE <span class="font-extrabold text-xl">EXTRA40</span></span>
      
      <div class="flex items-center space-x-6 font-sans text-sm font-semibold ml-8 underline underline-offset-4">
        <NuxtLink to="/category/girl" class="hover:opacity-75 transition-opacity">Shop Girl</NuxtLink>
        <NuxtLink to="/category/boy" class="hover:opacity-75 transition-opacity">Shop Boy</NuxtLink>
        <NuxtLink to="/category/baby" class="hover:opacity-75 transition-opacity">Shop Baby</NuxtLink>
      </div>
    </div>
    
    <div class="mt-4 text-[10px] font-sans opacity-80">
      *Other terms and conditions apply. <NuxtLink to="/products" class="underline">See details.</NuxtLink>
    </div>
  </div>
</template>

<script setup>
</script>
