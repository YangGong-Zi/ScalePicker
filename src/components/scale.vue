<!--
 * @Description: scale.vue
-->
<script setup lang="ts">
    import anyScale from './anyScale'
    import { onMounted } from 'vue'

    onMounted(() => {
        new anyScale({
            el: document.querySelector('#scale'),
            scale: 2,
            start: 0,
            end: 50,
            width: 200,
            height: 120,
            unit: 10, // 刻度间隔 'px'
            capacity: 1, // 刻度容量值
            currentValue: 0,
            fontSize: 12,
            fontColor: '#333',
        })
    })
</script>
<template>
    <div id="scale" class="w-400px h-200px bg-#fff"></div>
</template>

<style scoped>

</style>
