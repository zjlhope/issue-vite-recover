<template>
    <div>
        <h1>hello,errors {{count}}</h1>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    const count = ref(0)
</script>