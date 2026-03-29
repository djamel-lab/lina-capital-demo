<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  block: { type: Boolean, default: false },
})
</script>

<template>
  <button
    :class="[
      'font-semibold cursor-pointer transition-all duration-200 rounded-lg font-[var(--font-app)]',
      block ? 'w-full' : '',
      variant === 'primary' ? 'bg-accent text-sidebar hover:bg-accent-hover' : '',
      variant === 'secondary' ? 'bg-filter-bg text-primary hover:bg-card-border' : '',
      variant === 'danger' ? 'bg-red-100 text-danger' : '',
      variant === 'login' ? 'bg-gradient-to-r from-login-cyan to-login-cyan-dark text-white hover:shadow-lg' : '',
      size === 'sm' ? 'px-3.5 py-1.5 text-xs' : '',
      size === 'md' ? 'px-8 py-4 text-base' : '',
      size === 'lg' ? 'px-8 py-4.5 text-xl font-bold' : '',
    ]"
  >
    <slot />
  </button>
</template>