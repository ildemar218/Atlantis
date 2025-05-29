<template>
    <div class="form-field mb-3">
        <label class="form-label" :for="id" :style="{ color: '#6ec6ff', fontWeight: 'bold' }">
            {{ label }}
        </label>
        <BaseInput
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :modelValue="modelValue"
            @update:modelValue="emit('update:modelValue', $event)"
            :style="'border: 2px solid #6ec6ff; border-radius: 10px; background: #fff;'"
        />
    </div>
</template>

<script setup>
import BaseInput from '../atoms/BaseInput.vue';
const props = defineProps({
    label: String,
    modelValue: String,
    type: {
        type: String,
        default: 'text',
    },
    placeholder: String,
    id: String
});
const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.form-field {
    width: 100%;
}
</style>
