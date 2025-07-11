module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'vue',
        '@typescript-eslint'
    ],
    'rules': {
        'vue/multi-word-component-names': 'off', // 关闭组件命名规则
        'semi': [0],
        'quotes': [2, 'single'],
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/no-setup-props-destructure': 'off'
    }
}
