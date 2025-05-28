<template>
    <div class="activity-option d-flex align-items-center mb-3" :class="{ 'activity-option--other': isOther }">
        <input type="checkbox" class="form-check-input me-2" :id="label" v-model="checkedProxy" />
        <div class="activity-content d-flex align-items-center flex-grow-1">
            <img v-if="icon" :src="icon" alt="icono" class="activity-icon me-2" />
            <input v-if="isOther" type="text" class="form-control activity-other-input" placeholder="Otra:"
                v-model="otherValue" />
            <span v-else class="activity-label">{{ label }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
    label: String,
    icon: String,
    checked: Boolean,
});
const emit = defineEmits(['update:checked']);

const isOther = computed(() => props.label.toLowerCase().includes('otra'));
const otherValue = ref('');

const checkedProxy = computed({
    get: () => props.checked,
    set: val => emit('update:checked', val)
});
</script>

<style scoped>
.activity-option {
    border: 2px solid #6ec6ff;
    border-radius: 12px;
    padding: 8px 12px;
    background: #fff;
    transition: box-shadow 0.2s;
}

.activity-option--other {
    border-style: dashed;
}

.activity-icon {
    width: 32px;
    height: 32px;
}

.activity-label {
    color: #222;
    font-size: 1.1rem;
    font-weight: 500;
}

.activity-other-input {
    border: none;
    outline: none;
    font-size: 1.1rem;
    color: #6ec6ff;
    background: transparent;
}
</style>
