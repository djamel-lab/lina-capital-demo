<script setup>
defineProps({ label: String, modelValue: [String, Number], type: { type: String, default: 'text' }, placeholder: String })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mb-5">
    <label v-if="label" class="block text-xs font-semibold text-primary mb-2">{{ label }}</label>
    <input :type="type" :value="modelValue" :placeholder="placeholder"
      class="w-full px-4 py-3.5 border border-card-border rounded-lg text-sm text-primary bg-white outline-none focus:border-accent font-[var(--font-app)]"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>