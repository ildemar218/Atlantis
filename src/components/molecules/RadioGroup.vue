<template>
    <div class="radio-group mb-3">
        <label class="form-label mb-2" :style="labelStyle">{{ label }}</label>
        <div :class="directionClass">
            <label v-for="option in options" :key="option.value" class="form-check-label me-3">
                <input type="radio" class="form-check-input me-2" :value="option.value" v-model="modelValueProxy" />
                {{ option.label }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    label: String,
    options: Array, // [{ label: '...', value: '...' }]
    modelValue: String,
    direction: {
        type: String,
        default: 'row', // 'row' or 'column'
    },
    labelStyle: {
        type: Object,
        default: () => ({ color: '#6ec6ff', fontWeight: 'bold' })
    }
});
const emit = defineEmits(['update:modelValue']);
const modelValueProxy = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val)
});
const directionClass = computed(() => props.direction === 'column' ? 'd-flex flex-column gap-2' : 'd-flex gap-3');
</script>

<style scoped>
.radio-group {
    width: 100%;
}
</style>
