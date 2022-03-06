import typescript from '@rollup/plugin-typescript'
import {resolve} from 'path'
import {defineConfig} from 'vite'

module.exports = defineConfig({
    plugins: [
        {
            ...typescript({tsconfig: './tsconfig.json'}),
            apply: 'build',
            declaration: true,
            declarationDir: 'types/',
            rootDir: '/',
        },
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'InvestecOpenApi',
            fileName: (format) => `investec-api.${format}.js`,
        },
        rollupOptions: {},
    },
})
