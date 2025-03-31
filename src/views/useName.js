import { ref, computed } from 'vue'
export default () => {
    const name = ref(null)
    const upper_name = computed(() => {
        if(name.value === null) return null
        return name.value.slice(0, 1).toUpperCase() + name.value.slice(1)
    })
    return { name, upper_name }
}