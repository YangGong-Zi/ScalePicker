module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // Vue 规则
        'vue/multi-word-component-names': 'off',
        'vue/no-setup-props-destructure': 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/attribute-hyphenation': ['error', 'always'],

        // TypeScript 规则
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // 基础规则
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        indent: ['error', 2],
        'comma-dangle': ['error', 'never'],
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-trailing-spaces': 'error',
        'eol-last': 'error'
    }
}
