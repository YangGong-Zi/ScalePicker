# Scale Picker

一个基于 TypeScript 和 Canvas 的强大刻度选择器组件。

## 特性

- 🎯 TypeScript 支持，完整的类型定义
- 🎨 基于 Canvas 的高性能渲染
- 📱 支持触摸和鼠标交互
- ⚡ 惯性滑动效果
- 🎛️ 高度可定制的样式和配置
- 📦 支持 ES Module 和 CommonJS

## 安装

```bash
npm install @scale-picker/core
```

## 使用方法

### 基础用法

```javascript
import ScalePicker from '@scale-picker/core'

const scalePicker = new ScalePicker({
    el: document.querySelector('#scale-container'),
    width: 300,
    height: 120,
    start: 0,
    end: 100,
    unit: 10,
    capacity: 1,
    currentValue: 50,
    fontSize: 14,
    fontColor: '#333',
    onChange: value => {
        console.log('当前值:', value)
    }
})
```

### 在 Vue 中使用

```vue
<template>
    <div id="scale" class="scale-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ScalePicker from '@scale-picker/core'

onMounted(() => {
    new ScalePicker({
        el: document.querySelector('#scale'),
        width: 300,
        height: 120,
        start: 0,
        end: 100,
        unit: 10,
        capacity: 1,
        currentValue: 25,
        fontSize: 12,
        fontColor: '#333',
        onChange: value => {
            console.log('刻度值变化:', value)
        }
    })
})
</script>

<style scoped>
.scale-container {
    width: 300px;
    height: 120px;
    background: #fff;
}
</style>
```

## API 参考

### 配置选项 (ScalePickerOptions)

| 属性             | 类型                      | 必需 | 默认值      | 描述                 |
| ---------------- | ------------------------- | ---- | ----------- | -------------------- |
| `el`             | `HTMLElement \| null`     | ✅   | -           | 目标容器元素         |
| `width`          | `number`                  | ✅   | -           | 组件宽度             |
| `height`         | `number`                  | ✅   | -           | 组件高度             |
| `start`          | `number`                  | ✅   | -           | 刻度起始值           |
| `end`            | `number`                  | ✅   | -           | 刻度结束值           |
| `unit`           | `number`                  | ✅   | -           | 刻度间隔（像素）     |
| `capacity`       | `number`                  | ✅   | -           | 刻度容量值           |
| `currentValue`   | `number`                  | ✅   | -           | 当前值               |
| `fontSize`       | `number`                  | ✅   | -           | 字体大小             |
| `scale`          | `number`                  | ❌   | `1`         | 缩放比例             |
| `fontColor`      | `string`                  | ❌   | `'#333'`    | 字体颜色             |
| `background`     | `string`                  | ❌   | `''`        | 背景颜色             |
| `scaleLineColor` | `string`                  | ❌   | `'#1675DE'` | 刻度线颜色           |
| `midLineColor`   | `string`                  | ❌   | `'#e5c17c'` | 中间指针颜色         |
| `openUnitChange` | `boolean`                 | ❌   | `false`     | 是否开启刻度间隔改变 |
| `onChange`       | `(value: number) => void` | ❌   | -           | 值变化回调函数       |

### 方法

| 方法名              | 描述             |
| ------------------- | ---------------- |
| `init()`            | 初始化组件       |
| `createCanvas()`    | 创建 Canvas 元素 |
| `createScale()`     | 绘制刻度         |
| `createMidCursor()` | 绘制中间指针     |
| `addEvent()`        | 添加交互事件     |

## 浏览器支持

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
