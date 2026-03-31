# Scale Picker

[English](./README-en.md) | 中文

一个基于 TypeScript 和 Canvas 的强大刻度选择器组件。

## Demo 展示

下面是 ScalePicker 的演示效果：

<img src="src/assets/demo.gif" alt="Demo演示" width="200px" style="display: block; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px;">

## 特性

- 🎯 TypeScript 支持，完整的类型定义
- 🎨 基于 Canvas 的高性能渲染
- ⚡ 惯性滑动效果
- 🎛️ 高度可定制的样式和配置
- 🔄 支持横向 / 纵向两种渲染方向，可动态切换
- 📦 支持 ES Module 和 CommonJS

## 安装

```bash
npm install scale-picker
```

## 使用方法

### 基础用法

```javascript
import ScalePicker from 'scale-picker'

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

### 横向模式（horizontal）

刻度轴位于顶部，刻度线向下延伸，指针从顶部中央指向当前刻度。
适合宽度大于高度的容器。

```javascript
new ScalePicker({
    el: document.querySelector('#scale'),
    width: 400,
    height: 100,
    start: 0,
    end: 100,
    unit: 10,
    capacity: 1,
    currentValue: 0,
    fontSize: 12,
    fontColor: '#333',
    direction: 'horizontal', // 默认值，可省略
    onChange: value => {
        console.log('当前值:', value)
    }
})
```

### 纵向模式（vertical）

刻度轴位于左侧，刻度线向右延伸，数字标签显示于刻度线右侧，指针从左侧中央指向当前刻度。
适合高度大于宽度的容器。

```javascript
new ScalePicker({
    el: document.querySelector('#scale'),
    width: 100,
    height: 400,
    start: 0,
    end: 100,
    unit: 10,
    capacity: 1,
    currentValue: 0,
    fontSize: 12,
    fontColor: '#333',
    direction: 'vertical',
    onChange: value => {
        console.log('当前值:', value)
    }
})
```

### 在 Vue 中使用（基础）

```vue
<template>
    <div id="scale" class="scale-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ScalePicker from 'scale-picker'

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

| 属性             | 类型                              | 必需 | 默认值         | 描述                                          |
| ---------------- | --------------------------------- | ---- | -------------- | --------------------------------------------- |
| `el`             | `HTMLElement \| null`             | ✅   | -              | 目标容器元素                                  |
| `width`          | `number`                          | ✅   | -              | 组件宽度（px）                                |
| `height`         | `number`                          | ✅   | -              | 组件高度（px）                                |
| `start`          | `number`                          | ✅   | -              | 刻度起始值                                    |
| `end`            | `number`                          | ✅   | -              | 刻度结束值                                    |
| `unit`           | `number`                          | ✅   | -              | 刻度间隔（px）                                |
| `capacity`       | `number`                          | ✅   | -              | 刻度容量值                                    |
| `currentValue`   | `number`                          | ✅   | -              | 当前值                                        |
| `fontSize`       | `number`                          | ✅   | -              | 字体大小                                      |
| `scale`          | `number`                          | ❌   | `1`            | 缩放比例                                      |
| `fontColor`      | `string`                          | ❌   | `'#333'`       | 字体颜色                                      |
| `background`     | `string`                          | ❌   | `''`           | 背景颜色                                      |
| `scaleLineColor` | `string`                          | ❌   | `'#1675DE'`    | 刻度线颜色                                    |
| `midLineColor`   | `string`                          | ❌   | `'#e5c17c'`    | 中间指针颜色                                  |
| `openUnitChange` | `boolean`                         | ❌   | `false`        | 是否开启刻度对齐吸附                          |
| `direction`      | `'horizontal' \| 'vertical'`      | ❌   | `'horizontal'` | 渲染方向：横向或纵向                          |
| `onChange`       | `(value: number) => void`         | ❌   | -              | 值变化回调函数                                |

### direction 渲染差异说明

| 特性         | `horizontal`（横向）             | `vertical`（纵向）               |
| ------------ | -------------------------------- | -------------------------------- |
| 刻度轴位置   | 顶部（y = 0）                    | 左侧（x = 0）                    |
| 刻度线方向   | 向下延伸                         | 向右延伸                         |
| 大刻度长度   | 高度的 1/2                       | 宽度的 1/2                       |
| 小刻度长度   | 高度的 1/4                       | 宽度的 1/4                       |
| 数字标签位置 | 刻度线下方                       | 刻度线右侧                       |
| 指针位置     | 顶部水平居中，向下指             | 左侧垂直居中，向右指             |
| 推荐容器比例 | 宽 > 高（如 400 × 100）          | 高 > 宽（如 100 × 400）          |
| 滑动方向     | 水平拖拽                         | 垂直拖拽                         |

## 浏览器支持

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
