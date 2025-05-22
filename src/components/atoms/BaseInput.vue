<template>
    <input
        :type="type"
        class="form-control mb-3"
        :placeholder="placeholder"
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    type: {
        type: String,
        default: 'text'
    },
    placeholder: String,
    id: String
});
</script>
