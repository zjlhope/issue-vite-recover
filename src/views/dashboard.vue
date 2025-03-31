<template>
    <div>
        <p>
            用户名：{{form.username}}
        </p>
        <p>
            地址：{{form.address}}
        </p>
        <el-button @click="change_count">count:{{count}}</el-button>
        <img :src="url"/>
        <el-input v-model="form.username" placeholder="%__API_ENDPOINT__%"></el-input>
        <LevelWidget :level="1"></LevelWidget>
        <LevelWidget :level="2"></LevelWidget>
        <LevelWidget></LevelWidget>
    </div>
</template>

<script setup>
    import { http_desktop } from '@/api/index'
    import { ref, computed, watch, onMounted } from 'vue'
    import url from '@/assets/security.svg'
    import LevelWidget from './common.vue'
    const conditions = ref([
        { field: "username", label: "用户名" },
        { field: "address", label: "地址" },
    ])
    const form = ref({ username: null, address: null })
    const count = ref(0)
    const change_count = () => {
        count.value++
    }
</script>