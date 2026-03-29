<script setup>
defineProps({ label: String, modelValue: String, options: Array })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mb-5">
    <label v-if="label" class="block text-xs font-semibold text-primary mb-2">{{ label }}</label>
    <select :value="modelValue"
      class="w-full px-4 py-3.5 border border-card-border rounded-lg text-sm text-primary bg-white outline-none focus:border-accent font-[var(--font-app)]"
      @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>