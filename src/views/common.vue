<template>
    <div>
        <template v-if="level==1">
            <h1>hello world</h1>
        </template>
        <template v-else-if="level==2">
            <h2>hello world</h2>
        </template>
        <template v-else>
            <h3>hello world</h3>
            <img :src="src2" />
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            level: {
                type: Number,
                default: function () { return 0 }
            }
        },
        data() {
            return { 
                src1: new URL('./img/eci.svg', import.meta.url).href,
                src2: new URL('./img/scene1.jpg', import.meta.url).href  
            }
        }
    }
</script>