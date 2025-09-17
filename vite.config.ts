import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
        dts({
            // 包含额外的类型声明文件
            include: ['packages/**/*.ts', 'packages/**/*.d.ts'],
            // 指定输出目录
            outDir: 'dist',
            // 控制生成的文件名
            entryRoot: 'packages',
            // 可以自定义转换逻辑
            beforeWriteFile: (filePath, content) => {
                // 确保主入口文件生成正确的声明文件
                if (filePath.includes('index.d.ts')) {
                    return {
                        filePath: path.join('dist', 'ScalePicker.d.ts'),
                        content
                    }
                }
                return {
                    filePath,
                    content
                }
            }
        }),
        vitePluginBundleObfuscator({
            options: {
                // 混淆配置选项
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                numbersToExpressions: true,
                simplify: true,
                stringArrayShuffle: true,
                splitStrings: true,
                stringArrayThreshold: 0.75
            }
        })
    ],
    server: {
        port: 8000
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'packages/index.ts'),
            name: 'ScalePicker', // 为库提供一个全局变量名（在UMD模式中使用）
            fileName: format => `ScalePicker.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [],
            output: {
                format: 'es',
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    // 例如，如果使用lodash，可以这样配置：'lodash': '_'
                },
                exports: 'named'
            }
        }
    }
})
