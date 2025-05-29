<template>
    <h1 :style="{ color }" class="mb-4">
        <slot />
    </h1>
</template>

<script setup>
const props = defineProps({
    color: {
        type: String,
        default: '#6cb9f2',
    },
});
</script>
