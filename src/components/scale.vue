<!--
 * @Description: scale.vue
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScalePicker from '../../packages/ScalePicker'

const direction = ref<'horizontal' | 'vertical'>('vertical')
const currentValue = ref(0)

const handleScaleChange = (value: number) => {
    currentValue.value = value
}

const initPicker = () => {
    const el = document.querySelector('#scale') as HTMLElement
    if (!el) return
    // 清空容器，销毁旧实例
    el.innerHTML = ''

    const isHorizontal = direction.value === 'horizontal'
    new ScalePicker({
        el,
        scale: 2,
        start: 0,
        end: 100,
        width: isHorizontal ? 400 : 100,
        height: isHorizontal ? 100 : 400,
        unit: 10,
        capacity: 1,
        currentValue: currentValue.value,
        fontSize: 12,
        fontColor: '#333',
        onChange: handleScaleChange,
        direction: direction.value
    })
}

const toggleDirection = () => {
    direction.value = direction.value === 'horizontal' ? 'vertical' : 'horizontal'
    initPicker()
}

onMounted(() => {
    initPicker()
})
</script>

<template>
    <div class="flex flex-col items-center gap-6 p-8 min-h-screen bg-gray-100">
        <!-- 标题 -->
        <h2 class="text-xl font-semibold text-gray-700 tracking-wide">ScalePicker 刻度选择器</h2>

        <!-- 切换按钮 -->
        <button
            @click="toggleDirection"
            class="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500 text-white text-sm font-medium shadow hover:bg-blue-600 active:scale-95 transition-all select-none"
        >
            <span>{{ direction === 'horizontal' ? '⇅ 切换为纵向' : '⇄ 切换为横向' }}</span>
        </button>

        <!-- 当前方向标签 -->
        <div class="text-xs text-gray-400 -mt-4">
            当前：{{ direction === 'horizontal' ? '横向 (Horizontal)' : '纵向 (Vertical)' }}
        </div>

        <!-- ScalePicker 容器 -->
        <div
            id="scale"
            :class="direction === 'horizontal' ? 'w-400px h-100px' : 'w-100px h-400px'"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
        ></div>

        <!-- 当前值展示 -->
        <div class="flex items-center gap-2 text-sm text-gray-600">
            <span class="text-gray-400">当前值</span>
            <span
                class="px-3 py-1 bg-blue-50 text-blue-600 font-semibold rounded-full min-w-12 text-center"
            >
                {{ currentValue }}
            </span>
        </div>
    </div>
</template>

<style scoped></style>
