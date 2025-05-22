<template>
    <button :class="['btn', 'mb-3', 'px-5', 'atlantis-btn']" @click="$emit('click')" type="button">
        <slot />
    </button>
</template>

<script setup>
// El color es fijo por diseño, pero mantenemos la estructura de tamaño y clases de Bootstrap
</script>

<style scoped>
.atlantis-btn {
    background-color: #1e4361 !important;
    color: #fff !important;
    border: none;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1.1rem;
    transition: background 0.2s;
}

.atlantis-btn:hover,
.atlantis-btn:focus {
    background-color: #4bb3f4 !important;
    color: #fff !important;
}
</style>
