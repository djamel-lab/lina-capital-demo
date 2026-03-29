<script setup>
defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center backdrop-blur-sm" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl max-w-lg w-[90%] p-8 relative max-h-[90vh] overflow-y-auto">
      <button class="absolute top-4 right-5 text-tertiary hover:text-primary text-xl bg-transparent border-none cursor-pointer" @click="$emit('close')">✕</button>
      <slot />
    </div>
  </div>
</template>