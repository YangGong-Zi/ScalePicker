import vue from '@vitejs/plugin-vue'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), UnoCSS()],
    server: {
        port: 8000
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'packages/ScalePicker.ts'),
            name: 'ScalePicker', // 为库提供一个全局变量名（在UMD模式中使用）
            fileName: format => `scale-picker.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    // 例如，如果使用lodash，可以这样配置：'lodash': '_'
                }
            }
        }
    }
})
