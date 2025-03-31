<template>
    <div>
        <h2>Vue2.7 Class Component</h2>
        <button @click="onAdd">Count: {{count}}</button>
        <button @click="onUnbindDesktop({desktopName:'web001'})">测试confirm</button>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { confirm } from "@/utils/decorator.js";
    @Component
    export default class HelloWorld extends Vue {
        public count: number = 0;
        public onAdd() {
            this.count++;
        }
        @confirm({
            msg: row => ` 移出置放群组？`,
            confirmOptions: { dangerouslyUseHTMLString: true },
            hasBeforeClose: true
        })
        onUnbindDesktop(row) {
            this.count--;
        }
    }
</script>