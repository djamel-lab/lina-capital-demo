<script setup>
defineProps({ modelValue: Boolean })
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="flex items-start gap-3 p-3.5 bg-white border border-card-border rounded-lg mb-3 cursor-pointer hover:border-accent transition-colors">
    <input type="checkbox" :checked="modelValue" class="w-5 h-5 mt-0.5 accent-accent shrink-0" @change="$emit('update:modelValue', $event.target.checked)" />
    <span class="text-xs text-primary leading-relaxed"><slot /></span>
  </label>
</template>